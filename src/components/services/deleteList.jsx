import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const DeleteList = (props) => {
  const { id, onDelete } = props;
  const handleDelete = async () => {
    try {
      await axios.put(
        `https://api.trello.com/1/lists/${id}/closed?&key=${APIKey}&token=${APIToken}`,
        { value: true }
      );
      onDelete(id);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };
  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteList;
