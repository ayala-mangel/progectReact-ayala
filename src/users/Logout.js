import { useContext, useState } from "react";
import { RoleType } from "./roletype";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
import { useSnackbar } from "../components/SnackbarCom";

export default function Logout() {
  const { setLoader, setUser, setRoleType } = useContext(GeneralContext);
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [anchorElUser, setAnchorElUser] = useState(null);

  //const handleCloseUserMenu = () => {
  // setAnchorElUser(null);
  // };

  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setRoleType(RoleType.none);
      navigate("/");
      setLoader(false);
      snackbar("success", "The user has successfully logged out");
    });
    //   .finally(() => setLoader(false));

    // handleCloseUserMenu();
  };

  return (
    <MenuItem onClick={logout}>
      <Typography textAlign="center">Loguot</Typography>
    </MenuItem>
  );
}
