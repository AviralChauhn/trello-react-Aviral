import axios from "axios";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import { useState } from "react";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateCard = (props) => {
  const { id, onCardCreate } = props;
  const [cardName, setCardName] = useState("");
  function handleCardChange(e) {
    setCardName(e.target.value);
  }
  function handleCardClick() {
    axios
      .post(
        `https://api.trello.com/1/cards?idList=${id}&name=${cardName}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(response);
        onCardCreate();
      });
    setCardName("");
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "1vw",
      }}
    >
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
              Create New Card
            </button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <input
              type="text"
              placeholder="Insert your card name"
              style={{ width: "18vw", height: "4vh" }}
              onChange={(e) => handleCardChange(e)}
            />
            <Button
              variant="contained"
              style={{ height: "3vh" }}
              onClick={handleCardClick}
            >
              Create a Card
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CreateCard;
