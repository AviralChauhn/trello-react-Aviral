import React, { useEffect, useReducer, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, fabClasses } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CreateCheckItem from "../components/services/createCheckItem";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCheckItemInChecklist, updateCheckItemState } from "../axiosAPI";
const startState = {
  checkItemsData: [],
  isCreateClicked: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "fetchCheckItemData": {
      return {
        ...state,
        checkItemsData: action.payload,
      };
    }
    case "toggleInput": {
      return {
        ...state,
        isCreateClicked: !state.isCreateClicked,
      };
    }
    case "createNewCheckItem": {
      return {
        ...state,
        checkItemsData: [...state.checkItemsData, action.payload],
      };
    }
    case "updateCheckItem": {
      return {
        ...state,
        checkItemsData: state.checkItemsData.map((item) =>
          item.id === action.payload.checkItemId
            ? { ...item, state: action.payload.updatedState }
            : item
        ),
      };
    }
  }
};
const Checkitems = (props) => {
  const { id, cardId } = props;
  // const [checkItemsData, setCheckItemsData] = useState([]);
  // const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [state, dispatch] = useReducer(reducer, startState);
  const fetchCheckItem = async () => {
    try {
      const checkitems = await getCheckItemInChecklist(id);
      dispatch({ type: "fetchCheckItemData", payload: checkitems });
    } catch (error) {
      console.log("Error fetching Data");
    }
  };
  useEffect(() => {
    fetchCheckItem();
  }, []);
  function handleCreateClick() {
    // setIsCreateClicked(true);
    dispatch({ type: "toggleInput" });
  }
  // function isCheckItemCreated(newData) {
  //   setCheckItemsData((prevData) => [...prevData, newData]);
  // }
  function handleDelete(deletedid) {
    dispatch({
      type: "fetchCheckItemData",
      payload: state.checkItemsData.filter((item) => item.id !== deletedid),
    });
  }
  // setCheckItemsData((prevList) =>
  //     prevList.map((item) =>
  //       item.id === checkItemId ? { ...item, state: newState } : item
  //     )
  //   );
  const updateCheckitem = async (id, cardId, state) => {
    try {
      const stateUpdate = await updateCheckItemState(cardId, id, state);
      dispatch({ type: "updateCheckItem", payload: { id, stateUpdate } });
    } catch (error) {
      console.log("Error updating checkitem:", error);
    }
  };
  return (
    <div>
      {state.checkItemsData.map((item) => {
        return (
          <>
            <p
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                marginBlock: "1vh",
              }}
            >
              <Checkbox
                defaultChecked={item.state === "complete" ? true : false}
                onChange={() => {
                  updateCheckitem(item.id, cardId, item.state);
                }}
              />
              {item.name}
              <DeleteFeature
                type="checkItem"
                id={id}
                checkId={item.id}
                onDelete={handleDelete}
              />
            </p>
          </>
        );
      })}
      <div>
        {state.isCreateClicked && (
          <CreateCheckItem id={id} isCheckItemCreated={dispatch} />
        )}
      </div>
      <>
        <Button variant="outlined" color="success" onClick={handleCreateClick}>
          Create A CheckItem
        </Button>
        <Button
          startIcon={<ClearIcon />}
          color="error"
          onClick={() => {
            dispatch({ type: "toggleInput" });
          }}
        ></Button>
      </>
    </div>
  );
};

export default Checkitems;
