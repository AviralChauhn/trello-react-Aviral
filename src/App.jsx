import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Boards from "./pages/Boards";
import CardLists from "./pages/cardLists";
import "./App.css";
import Error from "./pages/Error";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/board/:id" element={<CardLists />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
