import React, { useEffect, useReducer } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import axios from "axios";
import CreateCheckList from "../components/services/createCheckList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkitems from "./checkitems";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCheckListOnCard } from "../axiosAPI";
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
const startState = {
  checkListData: [],
  open: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "fetchCheckListData": {
      return {
        ...state,
        checkListData: action.payload,
      };
    }
    case "toggleModal": {
      return {
        ...state,
        open: !state.open,
      };
    }
    case "createCheckList": {
      return {
        ...state,
        checkListData: [...state.checkListData, action.payload],
      };
    }
  }
};
const CheckLists = (props) => {
  const { id } = props;
  // const [checkListsData, setCheckListsData] = useState([]);
  // const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, startState);
  const handleOpen = () => {
    // setOpen(true);
    dispatch({ type: "toggleModal" });
    fetchChecklist();
  };
  const handleClose = () => dispatch({ type: "toggleModal" });
  const fetchChecklist = async () => {
    try {
      const checkListData = await getCheckListOnCard(id);
      dispatch({ type: "fetchCheckListData", payload: checkListData });
    } catch (error) {
      console.log("Error fetching checklists");
    }
  };
  // function handleChecklistCreated(newData) {
  //   setCheckListsData((prevData) => [...prevData, newData]);
  // }
  function handleDelete(deletedid) {
    // setCheckListsData((prevList) =>
    //   prevList.filter((item) => item.id !== deletedid)
    // );
    dispatch({
      type: "fetchCheckListData",
      payload: state.checkListData.filter((item) => item.id !== deletedid),
    });
  }
  return (
    <div style={{ paddingBottom: "4vh" }}>
      <button
        onClick={handleOpen}
        style={{
          backgroundColor: "transparent",
          border: "none",
          minWidth: 200,
          width: "14vw",
          position: "absolute",
          left: "0",
          marginLeft: "1vw",
          height: "4vh",
          cursor: "pointer",
        }}
      ></button>
      <Modal
        open={state.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "auto" }}
      >
        <Box sx={style}>
          {state.checkListData.map((item) => {
            return (
              <Accordion
                sx={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                key={item.id}
              >
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "6rem",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      width: "100%",
                      position: "absolute",
                    }}
                  >
                    <DeleteFeature
                      type="checklist"
                      id={item.id}
                      onDelete={handleDelete}
                    />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Checkitems id={item.id} cardId={id} />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
          <CreateCheckList id={id} handleChecklistCreated={dispatch} />
        </Box>
      </Modal>
    </div>
  );
};

export default CheckLists;
