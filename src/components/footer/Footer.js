import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import { checkPermissions, pages } from "../header/Navbar";
import { GeneralContext } from "../../App";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { Card } from "@mui/joy";

export default function Footer() {
  const { user, roleType, setUser, setRoleType, setLoader, isDark, setIsDark } =
    React.useContext(GeneralContext);
  const path = useResolvedPath().pathname;
  const navigate = useNavigate();

  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: "sm" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
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
