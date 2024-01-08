import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateList = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  function fetchData(name) {
    axios
      .post(
        `https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response;
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  }
  function handleInput(e) {
    setName(e.target.value);
  }
  function handleSubmit() {
    fetchData(name);
    setName("");
    setIsSubmit(true);
  }
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <button
              style={{
                border: "none",
                backgroundColor: "white",
                width: "100%",
              }}
            >
              Add A List
            </button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <input
              type="text"
              onChange={(e) => handleInput(e)}
              style={{ height: "3vh" }}
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
