import { Button, TextField } from "@mui/material";
import React, { useReducer, useState } from "react";
import axios from "axios";
import { APIKey, APIToken } from "./config";
import { createNewCard, createNewCheckItem } from "../../axiosAPI";
const startState = {
  checkItemName: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setName": {
      return {
        ...state,
        checkItemName: action.payload,
      };
    }
    case "resetName": {
      return {
        ...state,
        checkItemName: "",
      };
    }
  }
};
const CreateCheckItem = (props) => {
  const { id, isCheckItemCreated } = props;
  // const [checkItemName, setCheckItemName] = useState("");
  const [state, dispatch] = useReducer(reducer, startState);
  function handleName(e) {
    // setCheckItemName(e.target.value);
    dispatch({ type: "setName", payload: e.target.value });
  }
  const createCheckItem = async () => {
    // axios
    //   .post(
    //     `https://api.trello.com/1/checklists/${id}/checkItems?name=${checkItemName}&key=${APIKey}&token=${APIToken}`
    //   )
    //   .then((response) => {
    //     response;
    //     isCheckItemCreated(response.data);
    //     setCheckItemName("");
    //   })
    //   .catch((err) => console.log(err));
    try {
      const newCheckItem = await createNewCheckItem(id, state.checkItemName);
      // isCheckItemCreated(newCheckItem);
      // setCheckItemName("");
      isCheckItemCreated({ type: "createNewCheckItem", payload: newCheckItem });
      dispatch({ type: "resetName" });
    } catch (error) {
      console.log("Error creating checkitem:", error);
    }
  };
  return (
    <div style={{ padding: "2vh", position: "relative", display: "flex" }}>
      <TextField
        value={state.checkItemName}
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
