import React, { useContext, useEffect, useState } from "react";
import ComponentCard from "./ComponentCard";
import {
  Container,
  Grid,
  SpeedDial,
  SpeedDialIcon,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AddCard from "../../business/AddCard";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";
import Cards from "./Cards";
import SnackbarCom from "../SnackbarCom";
import { dark, light } from "../UI/features/theme";

export default function PageCard() {
  const { cards, setCards, setLoader, isDark } = useContext(GeneralContext);
  const navigate = useNavigate();

  /*   const addCardExample = () => {
    const card = {
      id: "1",
      clientId: "1",
      createdTime: "String",
      title: "google",
      description: "Some Card",
      subtitle: "String",
      phone: "String",
      email: "String",
      web: "String",
      imgUrl:
        "https://w7.pngwing.com/pngs/523/198/png-transparent-google-logo-google-search-google-play-google-text-logo-number-thumbnail.png",
      imgAlt: "String",
      state: "String",
      country: "String",
      city: "String",
      street: "String",
      houseNumber: "Number",
      zip: "String",
    };

    fetch(
      `https://api.shipap.co.il/business/cards?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(card),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  }; */

  // addCardExample();
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.shipap.co.il/cards?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        SnackbarCom("No Cards Availible");
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  console.log(cards);
  return (
    //<ThemeProvider theme={isDark ? dark : light}>
    <Container sx={{ margin: "auto", alignItems: "center" }}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        All Cards
      </Typography>
      <Cards />
    </Container>
    // </ThemeProvider>
  );
}
