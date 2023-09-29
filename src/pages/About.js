import { ThemeProvider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { GeneralContext } from "../App";
import { dark, light } from "../components/UI/features/theme";

export default function About() {
  const { isDark } = useContext(GeneralContext);
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Typography>About</Typography>
    </ThemeProvider>
  );
}
