import { Button, TextField } from "@mui/material";
import React, { useReducer, useState } from "react";
import axios from "axios";
import { APIKey, APIToken } from "./config";
import { createNewCard, createNewCheckItem } from "../../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../../store/checkItem-slice";
// const startState = {
//   checkItemName: "",
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "setName": {
//       return {
//         ...state,
//         checkItemName: action.payload,
//       };
//     }
//     case "resetName": {
//       return {
//         ...state,
//         checkItemName: "",
//       };
//     }
//   }
// };
const CreateCheckItem = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const checkItemName = useSelector((state) => state.checkItem.checkItemName);
  // const [checkItemName, setCheckItemName] = useState("");
  // const [state, dispatch] = useReducer(reducer, startState);
  function handleName(e) {
    // setCheckItemName(e.target.value);
    dispatch(checkItemActions.setCheckItemName(e.target.value));
  }
  const createCheckItem = async (name) => {
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
      const newCheckItem = await createNewCheckItem(id, name);
      dispatch(checkItemActions.createCheckItem(newCheckItem));
      dispatch(checkItemActions.resetCheckItemName());
    } catch (error) {
      console.log("Error creating checkitem:", error);
    }
  };
  return (
    <div style={{ padding: "2vh", position: "relative", display: "flex" }}>
      <TextField
        value={checkItemName}
        label="Enter item name...."
        onChange={(e) => handleName(e)}
      />
      <Button
        variant="contained"
        color="success"
        onClick={() => createCheckItem(checkItemName)}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateCheckItem;
