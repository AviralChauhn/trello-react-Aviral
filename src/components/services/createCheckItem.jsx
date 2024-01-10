import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { APIKey, APIToken } from "./config";
const CreateCheckItem = (props) => {
  const { id, isCheckItemCreated } = props;
  const [checkItemName, setCheckItemName] = useState("");
  function handleName(e) {
    setCheckItemName(e.target.value);
  }
  const createCheckItem = () => {
    axios
      .post(
        `https://api.trello.com/1/checklists/${id}/checkItems?name=${checkItemName}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        response;
        isCheckItemCreated(response.data);
        setCheckItemName("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ padding: "2vh", position: "relative", display: "flex" }}>
      <TextField
        value={checkItemName}
        label="Enter item name...."
        onChange={(e) => handleName(e)}
      />
      <Button variant="contained" color="success" onClick={createCheckItem}>
        Submit
      </Button>
    </div>
  );
};

export default CreateCheckItem;
