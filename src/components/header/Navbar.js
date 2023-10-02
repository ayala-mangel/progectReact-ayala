import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useContext, useState } from "react";
import {
  Avatar,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { GeneralContext } from "../../App";

import { createTheme, ThemeProvider } from "@mui/material";
import { dark, light } from "../UI/features/theme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Button, CssVarsProvider, Sheet } from "@mui/joy";
import SearchBar from "./SearchBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import InfoIcon from "@mui/icons-material/Info";

export const RoleType = {
  none: 0,
  user: 1,
  bussiness: 2,
  admin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
  return permissions?.includes(userRoleType);
};

export const checkAllPermissions = (permissions, userRoleType) => {
  if (!permissions) return false;
  for (var perm of userRoleType) {
    if (!permissions.includes(perm)) return false;
  }
  return true;
};
/* export function checkPermissions(permissions, rolesToCheck) {
  if (Array.isArray(permissions)) {
    return rolesToCheck.some((role) => permissions.includes(role));
  }
  return false; // Return false if permissions is undefined or not an array
} */

export const pages = [
  { route: "/about", title: "About" },
  { route: "/signup", title: "Sign-Up", permissions: [RoleType.none] },
  { route: "/login", title: "Log-In", permissions: [RoleType.none] },
  {
    route: "/fav-cards",
    title: "Fav Cards",
    permissions: [RoleType.user, RoleType.bussiness, RoleType.admin],
  },
  {
    route: "/my-cards",
    title: "My Cards",
    permissions: [RoleType.bussiness, RoleType.admin],
  },
  { route: "/sandbox", title: "Sandbox", permissions: [RoleType.admin] },
];

const settings = [
  {
    route: "/account",
    title: "profile",
    permissions: [RoleType.user, RoleType.bussiness, RoleType.admin],
  },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    user,
    roleType,
    setUser,
    setRoleType,
    setLoader,
    isDark,
    setIsDark,
    mode,
    setMode,
  } = useContext(GeneralContext);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;

  const handledark = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  /* const filterData = data.filter((item) => {
    return item.name.toLowerCase().startsWith(query.toLowerCase());
  }); */

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setRoleType(RoleType.none);
      setLoader(false);
      navigate("/");
    });

    handleCloseUserMenu();
  };

  return (
    <Box>
      <Card
        // variant="solid"
        color="red"
        invertedColors
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar position="sticky">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h4"
              component="a"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                marginRight: 2,
                fontFamily: "fantasy",
              }}
            >
              Bcard
            </Typography>
            <IconButton
              onClick={handleOpenNavMenu}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* תפריט המבורגר */}
                {pages
                  .filter(
                    (p) =>
                      !p.permissions ||
                      checkPermissions(p.permissions, roleType)
                  )
                  .map((page) => (
                    <Link
                      to={page.route}
                      key={page.route}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.title}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages
                .filter(
                  (p) =>
                    !p.permissions || checkPermissions(p.permissions, roleType)
                )
                .map((page) => (
                  <Link
                    to={page.route}
                    key={page.route}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        backgroundColor:
                          page.route === path ? "cornflowerblue" : "#1976D2",
                      }}
                    >
                      {page.title}
                    </Button>
                  </Link>
                ))}
            </Box>
            <Box x={{ display: { xs: "inline-flex", md: "none" } }}>
              <SearchBar />
            </Box>
            <IconButton onClick={handledark} sx={{ p: 1, paddingLeft: 2 }}>
              {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>
            {user ? (
              <Box sx={{ flexGrow: 0, p: 1 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fullName} src={user.imgUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Link
                      to={setting.route}
                      key={setting.route}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {user.fullName}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Loguot</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
      </Card>
    </Box>
  );
}
