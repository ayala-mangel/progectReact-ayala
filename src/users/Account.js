import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel, snackbarClasses } from "@mui/material";
import { structureClient } from "./structureClient";
import { dark, light } from "../components/UI/features/theme";

const defaultTheme = createTheme();

export default function Account() {
  const navigate = useNavigate();
  const { user, setUser, setLoader, isDark } = useContext(GeneralContext);

  /*   const defaultTheme = createTheme(
    isDark
      ? {
          palette: {
            mode: "dark",
          },
        }
      : {
          palette: {
            mode: "light",
          },
        }
  ); */

  /* const handleSubmit = (ev) => {
    ev.preventDefault();
    const obj = {};
    const elements = ev.target.elements;

    structureClient
      .filter((s) => !s.initialOnly)
      .forEach((s) => {
        if (s.type === "boolean") {
          obj[s.name] = elements[s.name].checked;
        } else {
          obj[s.name] = elements[s.name].value;
        }
      });

    setLoader(true);

    fetch(
      `https://api.shipap.co.il/clients/update?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj),
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Update successful");
        } else {
          console.error("Update failed", res.status);
          const isJsonResponse = res.headers
            .get("content-type")
            ?.includes("application/json");
          if (isJsonResponse) {
            console.error("Error Data:", res.json());
          } else {
            console.error("Non-JSON response:", res.text());
          }
          // res.json();
        }
      })
      .catch((err) => console.error("Update error:", err))
      .finally(() => setLoader(false));
  }; */

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const obj = {};
    const elements = ev.target.elements;

    structureClient
      .filter((s) => !s.initialOnly)
      .forEach((s) => {
        if (s.type === "boolean") {
          obj[s.name] = elements[s.name].checked;
        } else {
          obj[s.name] = elements[s.name].value;
        }
      });

    setLoader(true);

    try {
      const response = await fetch(
        `https://api.shipap.co.il/clients/update?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
        {
          credentials: "include",
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(obj),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect to another page.
        snackbarClasses("sucsses");
      } else {
        // Handle error, log the error details.
        console.error("Update failed. Status:", response.status);

        // Check if the response contains JSON data before parsing.
        const isJsonResponse = response.headers
          .get("content-type")
          ?.includes("application/json");

        if (isJsonResponse) {
          const errorData = await response.json();
          console.error("Error Data:", errorData);
        } else {
          console.error("Non-JSON response:", await response.text());
        }
      }
    } catch (error) {
      // Handle network or other errors.
      console.error("Update error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      {user ? (
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
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Update Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                {structureClient
                  .filter((s) => !s.initialOnly)
                  .map((s) => (
                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                      {s.type === "boolean" ? (
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              name={s.name}
                              checked={user[s.name]}
                              onChange={(ev) =>
                                setUser({
                                  ...user,
                                  [s.name]: ev.target.checked,
                                })
                              }
                            />
                          }
                          label={s.label}
                          labelPlacement="start"
                        />
                      ) : (
                        <TextField
                          margin="normal"
                          required={s.required}
                          fullWidth
                          id={s.name}
                          label={s.label}
                          name={s.name}
                          type={s.type}
                          autoComplete={s.name}
                          value={user[s.name]}
                          onChange={(ev) =>
                            setUser({ ...user, [s.name]: ev.target.value })
                          }
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
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
}
