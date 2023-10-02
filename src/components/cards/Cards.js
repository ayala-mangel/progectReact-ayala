import React, { useContext, useEffect } from "react";
import ComponentCard from "./ComponentCard";
import {
  Container,
  Grid,
  SpeedDial,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";
import { search } from "../header/SearchBar";
import { TOKEN } from "../../api/token";

export default function Cards() {
  const { cards, roleType, userPermissions, searchWord, setCards, setLoader } =
    useContext(GeneralContext);

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
        console.log("No Cards Availible");
      })
      .finally(() => {
        setLoader(false);
      });
  }, [setCards, setLoader]);

  console.log(cards);

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
                //roleType={roleType}
                userPermissions={userPermissions}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
