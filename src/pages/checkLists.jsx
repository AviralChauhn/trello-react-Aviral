import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CheckLists = (props) => {
  const { id } = props;
  const [checkListsData, setCheckListsData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    fetchChecklist();
  };
  const handleClose = () => setOpen(false);
  // console.log(id);
  const fetchChecklist = () => {
    axios
      .get(
        `https://api.trello.com/1/cards/${id}/checklists?key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        setCheckListsData(response.data);
      })
      .catch((err) => console.log(err));
  };
  // console.log(checkListsData);
  return (
    <div style={{ paddingBottom: "6vh" }}>
      <button
        onClick={handleOpen}
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: "14vw",
          position: "absolute",
          left: "0",
          marginLeft: "1vw",
          height: "6vh",
          cursor: "pointer",
        }}
      ></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {checkListsData.map((item) => {
            return (
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                key={item.id}
              >
                {item.name}
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default CheckLists;
