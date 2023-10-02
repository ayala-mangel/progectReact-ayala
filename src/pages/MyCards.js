import {
  Container,
  SpeedDial,
  SpeedDialIcon,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/cards/Cards";
import { GeneralContext } from "../App";
import { TOKEN } from "../api/token";

export default function MyCards({ card }) {
  const navigate = useNavigate();
  const { cards, setCards } = useContext(GeneralContext);

  fetch(`https://api.shipap.co.il/business/cards?${TOKEN}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      setCards(data);
    });

  return (
    <Container sx={{ margin: "auto", alignItems: "center" }}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        My Cards
      </Typography>{" "}
      <SpeedDial
        container
        spacing={2}
        ariaLabel="button"
        icon={<SpeedDialIcon />}
        onClick={() => navigate("/business/cards")}
      />
      <Cards card={card} />
    </Container>
  );
}
