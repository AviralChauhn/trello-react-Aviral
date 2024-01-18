import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItem } from "../../axiosAPI";

const DeleteFeature = ({ type, id, checkId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteItem(type, id, checkId, onDelete);
    } catch (error) {
      console.log("Error deleting", error);
      alert("Error Deleting !!!!");
    }
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
