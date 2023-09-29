import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { hover } from "@testing-library/user-event/dist/hover";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GeneralContext } from "../../App";

export default function AddFavoriteCard({ card }) {
  const [isLike, setIsLike] = useState(false);

  const { setLoader, setCards, cards } = useContext(GeneralContext);

  useEffect(() => {
    if (!card) return;
    setIsLike(card.favorite);
  }, [card]);

  const like = (ev) => {
    ev.preventDefault();
    setLoader(true);
    setIsLike((like) => !like);

    const url = isLike ? "unfavorite" : "favorite";

    fetch(
      `https://api.shipap.co.il/cards/${card.id}/${url}?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
    /*  .finally(() => setLoader(false)); */
  };

  return (
    <IconButton
      className="icon"
      aria-label="Like minimal photography"
      size="sm"
      //variant="solid"
      color={isLike ? "danger" : "neutral"}
      sx={{
        position: "absolute",
        zIndex: 2,
        borderRadius: "50%",
        right: "1rem",
        //  bottom: 0,
        //   transform: "translateY(50%)",
        scale: 1.5,
      }}
      onClick={like}
    >
      <Favorite className="like" />
    </IconButton>
  );
}
