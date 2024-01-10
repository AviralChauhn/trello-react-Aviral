import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";

const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateList = (props) => {
  const { setListData } = props;
  const { id } = useParams();
  const [name, setName] = useState("");
  function fetchData(name) {
    axios
      .post(
        `https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response;
      })
      .then((text) => setListData((prev) => [...prev, text.data]))
      .catch((err) => console.error(err));
  }
  function handleInput(e) {
    setName(e.target.value);
  }
  function handleSubmit() {
    fetchData(name);
    setName("");
  }
  return (
    <div>
      <Accordion style={{ marginRight: "5vw" }}>
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
          <Typography>
            <TextField
              type="text"
              value={name}
              label="Enter List Name....."
              onChange={(e) => handleInput(e)}
              style={{ width: "15vw" }}
            />
            <Button
              variant="contained"
              style={{ height: "3vh" }}
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
