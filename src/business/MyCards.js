import React from "react";

export default function MyCards() {
  fetch(
    `https://api.shipap.co.il/business/cards?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .then((data) => {});

  return <div>MyCards</div>;
}
