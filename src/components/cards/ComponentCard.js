import React, { useContext } from "react";

import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import AspectRatio from "@mui/joy/AspectRatio";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { sizing } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCard from "../../business/RemoveCard";
import { CardHeader } from "@mui/material";
import { Box, Card } from "@mui/joy";
import IconsCard from "./IconsCard";
import { RoleType, checkPermissions } from "../header/Navbar";
import { GeneralContext } from "../../App";

export default function ComponentCard({ card }) {
  const navigate = useNavigate();
  const { userPermissions, roleType } = useContext(GeneralContext);
  /*  const cardImage =
    card.imgUrl.length > 8
      ? card.ImgUrl
      : "https://i.ibb.co/Hn3fFRD/no-image-icon-23494.png"; */
  // console.log(card);
  return (
    <Card
      variant="outlined"
      size="md"
      sx={(theme) => ({
        boxShadow: "md",
        "--joy-shadowChannel": theme.vars.palette.danger.darkChannel,

        gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
        "&:hover": {
          borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          transform: "translateY(-2px)",
          color: "#0B6BCB",
          scale: 1.1,
        },
      })}
    >
      <CardOverflow>
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
          }}
        >
          <img
            src={card.imgUrl}
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            /* srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x" */
            loading="lazy"
            alt={card.imgAlt}
          />
        </AspectRatio>
        <IconsCard
          card={card}
          //roleType={roleType}
          permissions={userPermissions}
        />
      </CardOverflow>
      <CardContent sx={{ pb: 1 }}>
        <CardHeader
          title={card.title}
          subheader={card.subtitle}
          sx={{ p: 0, mb: 1 }}
        />
        <Divider />
        <Box mt={1}>
          <Typography variant="body2" noWrap>
            <b>phone: </b>
            {card.phone}
            <br />
            <b>email: </b>
            {card.email}
            <br />
            <b>address: </b> {card.state} {card.country} {card.city}{" "}
            {card.street}
            <br />
            <b>card number: </b>0{card.id}
          </Typography>
        </Box>
      </CardContent>
      {/* <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">6.3k views</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">1 hour ago</Typography>
        </CardContent>
      </CardOverflow> */}
    </Card>
  );
}
