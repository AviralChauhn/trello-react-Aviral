import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import CreateBoard from "./services/createBoard";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2vh",
        margin: "0",
        width: "100vw",
        position: "fixed",
        top: "0",
        overflow: "hidden",
        boxShadow: "2px 2px 5px rgba(5, 5, 5, 0.2)",
      }}
    >
      <div className="heading">
        <div style={{ display: "flex", marginLeft: "7vw" }}>
          <AppsIcon style={{ marginTop: "1.5vh" }} />
          <Link to="/">
            <HomeIcon style={{ marginTop: "1.5vh" }} />
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "1.5vh" }}>
        <CreateBoard />
      </div>
    </Box>
  );
};

export default NavBar;
