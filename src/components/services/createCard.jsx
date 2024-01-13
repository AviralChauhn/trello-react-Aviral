import axios from "axios";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { createNewCard } from "../../axiosAPI";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateCard = (props) => {
  const { id, onCardCreate } = props;
  const [cardName, setCardName] = useState("");
  function handleCardChange(e) {
    setCardName(e.target.value);
  }
  async function handleCardClick() {
    try {
      const newCard = await createNewCard(id, cardName);
      onCardCreate(newCard);
      setCardName("");
    } catch (error) {
      console.log("Error creating card:", error);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "1vw",
      }}
    >
      <Accordion
        sx={{
          width: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          margin: "12px",
          // border: "2px solid black",
        }}
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
            <TextField
              type="text"
              value={cardName}
              label="Insert your card name"
              style={{ width: "100%" }}
              onChange={(e) => handleCardChange(e)}
            />
            <Button
              variant="contained"
              style={{ marginTop: "1vh" }}
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
