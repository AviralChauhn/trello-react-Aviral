import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { createNewList } from "../../axiosAPI";

const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateList = (props) => {
  const { setListData } = props;
  const { id } = useParams();
  const [name, setName] = useState("");
  async function fetchData(name) {
    try {
      const listData = await createNewList(id, name);
      setListData((prev) => [...prev, listData]);
      return listData;
    } catch (error) {
      console.log("Error Creating List", error);
    }
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
                width: "10vw",
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
