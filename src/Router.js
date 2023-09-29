import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./users/Login";
import Signup from "./users/Signup";
import About from "./pages/About";
import PageCard from "./components/cards/PageCard";
import AddCard from "./business/AddCard";
import EditCard from "./business/EditCard";
import FavCards from "./pages/FavCards";
import MyCards from "./pages/MyCards";
import Account from "./users/Account";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PageCard />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/business/cards" element={<AddCard />} />
      <Route path="/business/cards/:id" element={<EditCard />} />

      <Route path="/my-cards" element={<MyCards />} />

      <Route path="/fav-cards" element={<FavCards />} />

      <Route path="/account" element={<Account />} />
    </Routes>
  );
}
