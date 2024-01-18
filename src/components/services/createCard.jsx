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
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../../store/card-slice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const CreateCard = (props) => {
  const { id } = props;
  const [isError, setIsError] = useState(false);
  const cardName = useSelector((state) => state.card.cardName[id]);
  const dispatch = useDispatch();

  function handleCardChange(e) {
    dispatch(cardActions.setCardName({ id, value: e.target.value }));
  }

  async function handleCardClick() {
    try {
      const newCard = await createNewCard(id, cardName?.name);
      dispatch(cardActions.createCard({ id, newCard })); // Modified payload structure
      dispatch(cardActions.resetName());
    } catch (error) {
      console.log("Error creating card:", error);
      setIsError(true);
    }
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginLeft: "1vw" }}
    >
      <Accordion
        sx={{
          width: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          margin: "12px",
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
        {isError ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Error Creating card!!!
            </Alert>
          </Stack>
        ) : (
          <AccordionDetails>
            <Typography>
              <TextField
                type="text"
                value={cardName ? cardName.name : ""}
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
        )}
      </Accordion>
    </div>
  );
};

export default CreateCard;
