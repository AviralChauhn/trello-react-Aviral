import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { createNewList } from "../../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../../store/list-slice";

const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
// const startState = {
//   name: "",
// };
// // const [name, setName] = useState("");
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "setName": {
//       return {
//         ...state,
//         name: action.payload,
//       };
//     }
//     case "resetName": {
//       return {
//         ...state,
//         name: "",
//       };
//     }
//   }
// };
const CreateList = (props) => {
  const { setListData } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.list.name);
  // const [state, dispatch] = useReducer(reducer, startState);
  async function fetchData(name) {
    try {
      const newListData = await createNewList(id, name);
      // setListData((prev) => [...prev, listData]);
      // setListData({
      //   type: "createNewList",
      //   payload: newListData,
      // });
      dispatch(listActions.createList(newListData));
      return newListData;
    } catch (error) {
      console.log("Error Creating List", error);
    }
  }
  function handleInput(e) {
    // setName(e.target.value);
    // dispatch({ type: "setName", payload: e.target.value });
    dispatch(listActions.setListName(e.target.value));
  }
  function handleSubmit() {
    fetchData(name);
    // dispatch({ type: "resetName" });
    dispatch(listActions.resetListName());
  }
  return (
    <div>
      <Accordion
        style={{ marginRight: "5vw", marginTop: "5vh", minWidth: 280 }}
      >
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <button
              style={{
                border: "none",
                display: "flex",
                backgroundColor: "white",
                width: "15vw",
              }}
            >
              Add A List
            </button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <TextField
              type="text"
              value={name}
              label="Enter List Name....."
              onChange={(e) => handleInput(e)}
            />
            <Button
              variant="contained"
              style={{ marginTop: "1vh" }}
              onClick={handleSubmit}
            >
              Create a new list
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CreateList;
