import React, { useContext } from "react";
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

export default function Cards() {
  const { cards, roleType, userPermissions } = useContext(GeneralContext);
  const navigate = useNavigate();

  return (
    <>
      <Grid sx={{ flexGrow: 1, paddingTop: 3 }} container spacing={2} pb={2}>
        {cards.map((card) => (
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
    </>
  );
}
