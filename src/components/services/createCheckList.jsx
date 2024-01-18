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
import { useDispatch, useSelector } from "react-redux";
import { checklistActions } from "../../store/checkLists-slice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// const startState = {
//   checkListName: "",
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "checkListName": {
//       return {
//         ...state,
//         checkListName: action.payload,
//       };
//     }
//     case "resetCheckListName": {
//       return {
//         ...state,
//         checkListName: "",
//       };
//     }
//   }
// };
const CreateCheckList = (props) => {
  const { id } = props;
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.checkList.name);
  // const [checkListName, setChecKListName] = useState("");
  // const [state, dispatch] = useReducer(reducer, startState);
  const createCheckList = async (name) => {
    try {
      const newCheckList = await createNewCheckList(id, name);
      dispatch(checklistActions.createCheckList(newCheckList));
      dispatch(checklistActions.resetName());
    } catch (error) {
      console.log("Error creating checklist:", error);
      setIsError(true);
    }
  };
  function handleCreateClick() {
    createCheckList(name);
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
        {isError ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Error Creating checkList!!!
            </Alert>
          </Stack>
        ) : (
          <AccordionDetails>
            <Typography>
              <TextField
                value={name}
                label="Enter list Name..."
                type="text"
                onChange={(e) => {
                  dispatch(checklistActions.setName(e.target.value));
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
        )}
      </Accordion>
    </div>
  );
};

export default CreateCheckList;
