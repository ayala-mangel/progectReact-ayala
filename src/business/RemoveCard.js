import React, { useContext, useState } from "react";
import { GeneralContext } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import { TOKEN } from "../api/token";

export default function RemoveCard({ card }) {
  const { setLoader, cards, setCards } = useContext(GeneralContext);

  const remove = async (id) => {
    if (!window.confirm("Delete the card")) {
      return;
    }
    setLoader(true);

    try {
      // Send a DELETE request to the server to delete the card
      const response = await fetch(
        `https://api.shipap.co.il/business/cards/${id}?${TOKEN}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the card from the list of cards if it exists
        if (cards && Array.isArray(cards)) {
          const updatedCards = cards.filter((x) => x.id !== id);
          setCards(updatedCards);
        }
      } else {
        console.error("Failed to delete the card");
      }
    } catch (error) {
      console.error("An error occurred while deleting the card:", error);
    } finally {
      setLoader(false);
    }
  };
  return <DeleteIcon onClick={() => remove(card.id)} />;
}
