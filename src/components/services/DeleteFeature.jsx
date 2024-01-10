import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { APIKey, APIToken } from "./config";

const DeleteFeature = ({ type, id, checkId, onDelete }) => {
  const handleDelete = () => {
    let url = "";
    let method = "DELETE";
    let itemId = "";

    switch (type) {
      case "card":
        url = `https://api.trello.com/1/cards/${id}?key=${APIKey}&token=${APIToken}`;
        itemId = id;
        break;
      case "checklist":
        url = `https://api.trello.com/1/checklists/${id}?key=${APIKey}&token=${APIToken}`;
        itemId = id;
        break;
      case "checkItem":
        url = `https://api.trello.com/1/checklists/${id}/checkItems/${checkId}?key=${APIKey}&token=${APIToken}`;
        itemId = checkId;
        break;
      case "list":
        url = `https://api.trello.com/1/lists/${id}/closed?value=true&key=${APIKey}&token=${APIToken}`;
        method = "PUT";
        itemId = id;
        break;
      default:
        console.error("Invalid type");
        return Promise.reject(new Error("Invalid type"));
    }

    return axios({ method, url })
      .then(() => onDelete(itemId))
      .catch((error) => {
        console.error("Error deleting item:", error);
        return Promise.reject(error);
      });
  };

  return type == "list" ? (
    <Button
      variant="outlined"
      color="error"
      onClick={handleDelete}
      sx={{ height: "4vh", marginTop: "0.7vh" }}
    >
      Delete
    </Button>
  ) : (
    <Button
      startIcon={<DeleteIcon />}
      color="error"
      onClick={handleDelete}
    ></Button>
  );
};

export default DeleteFeature;
