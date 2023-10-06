import React, { useContext } from "react";
import { Box, Container, Typography } from "@mui/material";
import { GeneralContext } from "../../App";
import Cards from "./Cards";

export default function PageCards({ card }) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 750,
      }}
    >
      <Container sx={{ margin: "auto", alignItems: "center" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          All Cards
        </Typography>
        <Cards card={card} />
      </Container>
    </Box>
  );
}
