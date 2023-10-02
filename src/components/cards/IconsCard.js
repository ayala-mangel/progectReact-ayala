import { CardActions, IconButton } from "@mui/joy";
import React, { useContext } from "react";
import RemoveCard from "../../business/RemoveCard";
import { Link, useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { GeneralContext } from "../../App";
import EditCard from "../../business/EditCard";
import AddFavoriteCard from "./AddFavoriteCard";
import {
  RoleType,
  checkPermissions,
  checkAllPermissions,
} from "../header/Navbar";

export default function IconsCard({ card }) {
  const { userPermissions } = useContext(GeneralContext);
  const navigate = useNavigate();

  //  console.log(setUserPermissions);

  const checkRoleType = checkAllPermissions(userPermissions, [
    RoleType.bussiness,
    RoleType.admin,
  ]);
  const checkRoleTypeLike = checkAllPermissions(userPermissions, [
    RoleType.bussiness,
    RoleType.admin,
    RoleType.user,
  ]);

  return (
    <CardActions sx={{ pt: 0, justifyContent: "space-between" }}>
      {checkRoleTypeLike && <AddFavoriteCard card={card} />}
      {/* <Link to={`/business/cards/${card.id}`} state={card}> */}
      {checkRoleType && (
        <IconButton
          className="icon"
          aria-label="Edit card"
          size="sm"
          variant="solid"
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "3.2rem",
            //  bottom: 0,
            //transform: "translateY(50%)",
          }}
          onClick={() =>
            navigate(`/business/cards/${card.id}`, { state: card })
          }
        >
          <EditIcon />
        </IconButton>
      )}
      {checkRoleType && (
        <IconButton
          className="icon"
          aria-label="Delete"
          size="sm"
          variant="solid"
          sx={{
            color: "#FBFCFE",
            backgroundColor: "#0B0D0E",
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "5.4rem",
          }}
        >
          <RemoveCard card={card} />
        </IconButton>
      )}
    </CardActions>
  );
}
