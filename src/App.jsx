import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Boards from "./pages/Boards";
import CardLists from "./pages/cardLists";
import "./App.css";
import Error from "./pages/Error";
import BoardProvider from "./components/services/BoardProvider";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <BoardProvider>
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/board/:id" element={<CardLists />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BoardProvider>
    </BrowserRouter>
  );
};

export default App;
