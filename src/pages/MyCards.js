import { SpeedDial, SpeedDialIcon, ThemeProvider } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/cards/Cards";
import { GeneralContext } from "../App";

export default function MyCards({ card }) {
  const navigate = useNavigate();
  const { cards, setCards } = useContext(GeneralContext);

  fetch(
    `https://api.shipap.co.il/business/cards?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setCards(data);
    });

  return (
    <>
      {" "}
      <SpeedDial
        container
        spacing={2}
        ariaLabel="button"
        sx={{ position: "absolute" }}
        icon={<SpeedDialIcon />}
        onClick={() => navigate("/business/cards")}
      />
      <Cards card={card} />
    </>
  );
}
