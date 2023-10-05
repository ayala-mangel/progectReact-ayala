import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}); */

const SnackbarContext = createContext(null);

export default function SnackbarCom({ children }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [variant, setVariant] = useState("filled");
  const [message, setMessage] = useState("in snackbar!");

  /* const handleClick = () => {
    setOpen(true);
  }; */

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const setSnack = useCallback(
    (color, message, variant = "filled") => {
      setOpen(true);
      setColor(color);
      setMessage(message);
      setVariant(variant);
    },
    [setOpen, setColor, setMessage, setVariant]
  );

  console.log(":", 5000);

  return (
    <>
      {/*   <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={color}
          variant={variant}
          /*    sx={{
            width: "100%",
            minWidth: 250,
            marginLeft: -125,
            backgroundColor: "#333",
            color: "#fff",
            textAlign: "center",
            borderRadius: 2,
            padding: 16,
            position: "fixed",
            zIndex: 1,
            left: "50%",
            bottom: 30,
            fontSize: 17,
          }} */
        >
          {/*     <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton> */}
          {message}
        </Alert>
      </Snackbar>

      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within a SnackbarCom");
  return context;
};
