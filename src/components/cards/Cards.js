import React, { useContext, useEffect } from "react";
import ComponentCard from "./ComponentCard";
import { Container, Grid } from "@mui/material";
import { GeneralContext } from "../../App";
import { search } from "../header/SearchBar";
import { TOKEN } from "../../api/token";
import { useSnackbar } from "../SnackbarCom";

export default function Cards() {
  const { cards, userPermissions, searchWord, setCards, setLoader } =
    useContext(GeneralContext);
  const snackbar = useSnackbar();

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards?${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        snackbar("error", `No Cards Availible: ${err}`);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <Container sx={{ margin: "auto", alignItems: "center" }}>
      <Grid sx={{ flexGrow: 1, paddingTop: 3 }} container spacing={2} pb={2}>
        {cards
          .filter((card) =>
            search(searchWord, card.title, card.description, card.subTitle)
          )
          .map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
              <ComponentCard
                key={card.id}
                card={card}
                userPermissions={userPermissions}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
