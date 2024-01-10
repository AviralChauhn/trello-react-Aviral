// import { Button } from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { APIKey, APIToken } from "./config";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const CreateCheckList = (props) => {
  const { id, handleChecklistCreated } = props;
  const [checkListName, setChecKListName] = useState("");
  const createCheckList = (name) => {
    axios
      .post(
        `https://api.trello.com/1/checklists?idCard=${id}&name=${name}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(response);
        handleChecklistCreated(response.data);
      })
      .catch((err) => console.log(err));
  };
  function handleCreateClick() {
    createCheckList(checkListName);
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
              value={checkListName}
              label="Enter list Name..."
              type="text"
              style={{ width: "10.5vw" }}
              onChange={(e) => {
                setChecKListName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              color="success"
              sx={{ height: "6vh" }}
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
