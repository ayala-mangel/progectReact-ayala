import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Switch,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { GeneralContext } from "../App";
import { structureClient } from "./structureClient";
import { dark, light } from "../components/UI/features/theme";
import { TOKEN } from "../api/token";
import { useSnackbar } from "../components/SnackbarCom";

export default function Signup() {
  const [user, setUser] = useState({});
  const { setLoader, isDark } = useContext(GeneralContext);
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z0-9]{3,20}$/),
    middleName: Joi.string().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    phone: Joi.number().required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[!@#$%^&*-_*]).{8,30}$/
      )
      .required()
      .messages({
        "string.pattern.base": "Password must meet the specified criteria",
        "any.required": "Password is required",
      }),
    imgUrl: Joi.string().max(100),
    imgAlt: Joi.string().min(3).max(20),
    state: Joi.string().min(3).max(20),
    country: Joi.string().min(3).max(20).required(),
    city: Joi.string().min(3).max(20).required(),
    street: Joi.string().min(3).max(20).required(),
    houseNumber: Joi.number().min(3).max(20).required(),
    postalCode: Joi.number().min(3),
    business: Joi.boolean(),
  });

  const validate = (formData) => {
    return schema.validate(formData, { abortEarly: false });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setLoader(true);

    const formData = new FormData(ev.target);

    const obj = {};
    structureClient.forEach((s) => {
      if (s.type === "boolean") {
        obj[s.name] = formData.get(s.name) === "on";
      } else {
        obj[s.name] = formData.get(s.name);
      }
    });

    const validationResult = validate(obj);

    if (validationResult.error) {
      const validationErrors = validationResult.error.details.map(
        (e) => e.message
      );
      alert(validationErrors.join("\n"));
      setLoader(false);
      return; // Exit early if validation fails
    }
    console.log(obj);
    fetch(`https://api.shipap.co.il/clients/signup?${TOKEN}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        navigate("/login");
        snackbar("success", "The user has successfully registered");
      })
      .catch((err) => {
        snackbar("error", err.message);
      });
  };

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              {structureClient.map((s) => (
                <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                  {s.type === "boolean" ? (
                    <FormControlLabel
                      control={<Switch color="primary" name={s.name} />}
                      label={s.label}
                      labelPlacement="start"
                    />
                  ) : (
                    <TextField
                      margin="normal"
                      name={s.name}
                      required={s.required}
                      fullWidth
                      id={s.name}
                      label={s.label}
                      type={s.type}
                      autoComplete={s.name}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">Already have an account? Log-In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
