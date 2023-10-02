import React, { useContext } from "react";
import { Container, Typography } from "@mui/material";
import { GeneralContext } from "../../App";
import Cards from "./Cards";
import { useColorScheme } from "@mui/joy/styles";

export default function PageCards({ card }) {
  const { isDark } = useContext(GeneralContext);

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

  return (
    //<ThemeProvider theme={isDark ? dark : light}>

    <Container sx={{ margin: "auto", alignItems: "center" }}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        All Cards
      </Typography>
      <Cards card={card} />
    </Container>
    //</ThemeProvider>
  );
}
