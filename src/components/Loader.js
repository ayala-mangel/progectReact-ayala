import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  return (
    <CircularProgress
      disableShrink
      color="secondary"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //   position: "fixed",
        //  top: 0,
        //   right: 0,
        //   left: 0,
        //   bottom: 0,
      }}
    />
  );
}
