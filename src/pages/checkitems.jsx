import axios from "axios";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { APIKey, APIToken } from "../components/services/config";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CreateCheckItem from "../components/services/createCheckItem";
import DeleteFeature from "../components/services/DeleteFeature";
const Checkitems = (props) => {
  const { id, cardId } = props;
  const [checkItemsData, setCheckItemsData] = useState([]);
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const fetchCheckItem = () => {
    axios
      .get(
        `https://api.trello.com/1/checklists/${id}/checkItems?key=${APIKey}&token=${APIToken}`
      )
      .then((response) => setCheckItemsData(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCheckItem();
  }, []);
  function handleCreateClick() {
    setIsCreateClicked(true);
  }
  function isCheckItemCreated(newData) {
    setCheckItemsData((prevData) => [...prevData, newData]);
  }
  function handleDelete(deletedid) {
    setCheckItemsData((prevList) =>
      prevList.filter((item) => item.id !== deletedid)
    );
  }
  const updateCheckitem = async (id, cardId, state) => {
    try {
      const newState = state === "complete" ? "incomplete" : "complete";

      const response = await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${id}?state=${newState}&key=${APIKey}&token=${APIToken}`
      );

      // Use response.data to get the updated state from the API response
      console.log(response.data);

      // Update the local state with the new state
      setCheckItemsData((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, state: newState } : item
        )
      );

      return response;
    } catch (error) {
      console.error("Error updating checklist state:", error);
    }
  };
  return (
    <div>
      {checkItemsData.map((item) => {
        return (
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
        );
      })}
      <div>
        {isCreateClicked && (
          <CreateCheckItem id={id} isCheckItemCreated={isCheckItemCreated} />
        )}
      </div>
      <div>
        <Button variant="outlined" color="success" onClick={handleCreateClick}>
          Create A CheckItem
        </Button>
        <Button
          startIcon={<ClearIcon />}
          color="error"
          onClick={() => {
            setIsCreateClicked(false);
          }}
        ></Button>
      </div>
    </div>
  );
};

export default Checkitems;
