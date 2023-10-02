import * as React from "react";

import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import { checkPermissions, pages } from "../header/Navbar";
import { GeneralContext } from "../../App";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { Card } from "@mui/joy";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/material";

export default function Footer() {
  const { user, roleType, setUser, setRoleType, setLoader, isDark, setIsDark } =
    React.useContext(GeneralContext);
  const path = useResolvedPath().pathname;
  const navigate = useNavigate();

  return (
    <Card
      //class="MuiBox-root css-1aj92xk"
      variant="solid"
      //variant="outlined"
      color="primary"
      // invertedColors
      sx={{
        //width: "100%",
        //  margin: "0px auto",
        //  padding: "32px 16px",
        //  boxSizing: "inherit",
        //flexGrow: 1,
        p: 2,
        //  borderRadius: { sm: "sm" },
        // pb: 7,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "#65656",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <IconButton
          //variant="plain"
          onClick={() => navigate("/")}
        >
          Bcard
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          //    flexDirection: { xs: "column", md: "row" },
          //  alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          // flexWrap: "wrap",
          // gap: 2,
        }}
      >
        {pages
          .filter(
            (p) => !p.permissions || checkPermissions(p.permissions, roleType)
          )
          .map((page) => (
            <Link
              to={page.route}
              key={page.route}
              style={{ textDecoration: "none", color: "white" }}
            >
              <IconButton
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  backgroundColor: page.route === path ? "cornflowerblue" : "",
                }}
                //variant="plain"
              >
                {page.title}
              </IconButton>
            </Link>
          ))}
      </Box>
    </Card>
  );
}
