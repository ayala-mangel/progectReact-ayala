import "./App.css";
import { createContext, useEffect, useState } from "react";
import Navbar, { RoleType, checkPermissions } from "./components/header/Navbar";
import Router from "./Router";
import Loader from "./components/Loader";
import ComponentCard from "./components/cards/ComponentCard";
import SnackbarCom from "./components/SnackbarCom";
import { createTheme, ThemeProvider } from "@mui/material";
import { dark, light } from "./components/UI/features/theme";
import Footer from "./components/footer/Footer";
export const GeneralContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [roleType, setRoleType] = useState(RoleType.none);
  const [snackbarText, setSnackbarText] = useState("");
  const [cards, setCards] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [isDark, setIsDark] = useState(false);
  //const [currentMode, setCurrentMode] = useState(light);

  /* useEffect(() => {
    setCurrentMode(isDark ? dark : light);
  }, [isDark]); */

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  useEffect(() => {
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setRoleType(RoleType.user);
        console.log(data);
        // check why the user has no permissions array
        setUserPermissions([RoleType.bussiness, RoleType.admin, RoleType.user]);
        snackbar(`${data.firstName} logged!`);

        if (data.business) {
          setRoleType(RoleType.business);
        } else if (data.admin) {
          setRoleType(RoleType.admin);
        }
      })
      .catch((err) => {
        setRoleType(RoleType.none);
        snackbar(err.message);
      })
      .finally(() => setLoader(false));
  }, []);

  /*   useEffect(() => {
    fetch(
      `https://api.shipap.co.il/cards?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCards(data);
      });
  }); */

  /*   const cardData = {
    id: 57,
    clientId: 29,
    title: "כותרת",
    description: "תאור",
  }; */

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        setLoader,
        roleType,
        setRoleType,
        cards,
        setCards,
        userPermissions,
        setIsDark,
        isDark,
      }}
    >
      <Navbar />

      <Router />
      <Footer />
      {loader && <Loader />}
      {snackbarText && <SnackbarCom text={snackbarText} />}
    </GeneralContext.Provider>
  );
}

export default App;
