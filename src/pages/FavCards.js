import React, { useContext, useEffect } from "react";
import ComponentCard from "../components/cards/ComponentCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import { GeneralContext } from "../App";
import Cards from "../components/cards/Cards";
import { TOKEN } from "../api/token";

export default function FavCards({ card }) {
  const { setLoader, cards, setCards } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards/favorite?${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data.map((card) => ({ ...card, favorite: true })));
      })
      .catch((err) => {
        console.log("There are no favorite cards");
      })
      .finally(() => setLoader(false));
  }, [setCards, setLoader]);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 750,
      }}
    >
      <Container sx={{ margin: "auto", alignItems: "center" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Favorite Cards
        </Typography>
        {/*   <Grid sx={{ flexGrow: 1, paddingTop: 3 }} container spacing={2} pb={2}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <ComponentCard key={card.id} card={card} />
          </Grid>
        ))}
      </Grid> */}
        <Cards card={card} />
      </Container>
    </Box>
  );
}
