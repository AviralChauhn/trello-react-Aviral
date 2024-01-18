import React, { useReducer } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import modalimg from "../imgs/ModalStart.svg";
import modalBack from "../imgs/modalBack.jpeg";
import { Link, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { boardAction } from "../../store/board-slice";
import { NoEncryption } from "@mui/icons-material";
const CreateModal = ({ fetchdata }) => {
  // const [name, setName] = useState("");
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "open_modal": {
  //       return {
  //         ...state,
  //         open: true,
  //       };
  //     }
  //     case "close_modal": {
  //       return {
  //         ...state,
  //         open: false,
  //       };
  //     }
  //     case "setName": {
  //       return {
  //         ...state,
  //         name: action.payload,
  //       };
  //     }
  //     case "resetName": {
  //       return {
  //         ...state,
  //         name: "",
  //       };
  //     }
  //   }
  // };
  // const startState = {
  //   open: false,
  //   name: "",
  // };
  // const [state, dispatch] = useReducer(reducer, startState);
  // const [open, setOpen] = useState(false);
  const { id } = useParams();
  const name = useSelector((state) => state.board.name);
  const open = useSelector((state) => state.board.open);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(boardAction.openModal());
  };
  const handleClose = () => {
    dispatch(boardAction.closeModal());
  };
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
    dispatch(boardAction.setName(e.target.value));
  };
  const handleSubmit = () => {
    fetchdata(name);
    handleClose();
    dispatch(boardAction.resetName());
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          boxShadow: "none",
          backgroundColor: "#1c74d4",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#1c74d4",
          },
        }}
      >
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
              alignItems: "center",
            }}
          >
            <TextField
              label="Write Board Name....."
              value={name}
              type="text"
              onChange={(e) => handleChange(e)}
              style={{ borderRadius: "10px" }}
            />
            {/* <Link to={`/board/${id}`} style={{ textDecoration: "none" }}> */}
            <button
              onClick={handleSubmit}
              style={{
                // display: "flex",
                // justifyContent: "center",
                borderRadius: "5px",
                // alignItems: "center",
                marginLeft: "1vw",
                backgroundColor: "blue",
                color: "white",
                // height: "6vh",
                // width: "8vw",
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
