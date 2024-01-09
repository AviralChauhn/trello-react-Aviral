import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const DeleteCard = (props) => {
  const { id, setCardData } = props;
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/cards/${id}?key=${APIKey}&token=${APIToken}`
      );

      setCardData((prevList) => prevList.filter((item) => item.id !== id));

      return response;
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };
  return (
    <div>
      <Button
        startIcon={<DeleteIcon />}
        color="error"
        onClick={handleDelete}
      ></Button>
    </div>
  );
};

export default DeleteCard;
