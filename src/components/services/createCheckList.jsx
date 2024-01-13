// import { Button } from "@mui/material";
import React, { useReducer, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { APIKey, APIToken } from "./config";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { createNewCheckList } from "../../axiosAPI";
const startState = {
  checkListName: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "checkListName": {
      return {
        ...state,
        checkListName: action.payload,
      };
    }
    case "resetCheckListName": {
      return {
        ...state,
        checkListName: "",
      };
    }
  }
};
const CreateCheckList = (props) => {
  const { id, handleChecklistCreated } = props;
  // const [checkListName, setChecKListName] = useState("");
  const [state, dispatch] = useReducer(reducer, startState);
  const createCheckList = async (name) => {
    try {
      const newCheckList = await createNewCheckList(id, name);
      handleChecklistCreated({
        type: "createCheckList",
        payload: newCheckList,
      });
      dispatch({ type: "resetCheckListName" });
    } catch (error) {
      console.log("Error creating checklist:", error);
    }
  };
  function handleCreateClick() {
    createCheckList(state.checkListName);
  }
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Create Checklist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TextField
              value={state.checkListName}
              label="Enter list Name..."
              type="text"
              onChange={(e) => {
                dispatch({ type: "checkListName", payload: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              color="success"
              sx={{ marginTop: "1vh" }}
              onClick={handleCreateClick}
            >
              Create
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CreateCheckList;
