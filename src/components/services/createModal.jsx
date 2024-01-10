import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import modalimg from "../imgs/ModalStart.svg";
import modalBack from "../imgs/modalBack.jpeg";
import { Link, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
const CreateModal = ({ fetchdata }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = () => {
    fetchdata(name);
    setName("");
    handleClose();
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Board
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Write Your Board Name....."
              value={name}
              type="text"
              onChange={(e) => handleChange(e)}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            {/* <Link to={`/board/${id}`} style={{ textDecoration: "none" }}> */}
            <button
              onClick={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "5px",
                marginTop: "1vh",
                alignItems: "center",
                backgroundColor: "blue",
                color: "white",
                height: "4vh",
                width: "18vw",
                border: "none",
                boxShadow: "2px 2px 5px rgba(5, 5, 5, 0.413)",
              }}
            >
              Create Board
            </button>
            {/* </Link> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateModal;
