import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CreateCheckItem from "../components/services/createCheckItem";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCheckItemInChecklist, updateCheckItemState } from "../axiosAPI";
const Checkitems = (props) => {
  const { id, cardId } = props;
  const [checkItemsData, setCheckItemsData] = useState([]);
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const fetchCheckItem = async () => {
    try {
      const checkitems = await getCheckItemInChecklist(id);
      setCheckItemsData(checkitems);
    } catch (error) {
      console.log("Error fetching Data");
    }
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
      await updateCheckItemState(cardId, id, state, setCheckItemsData);
    } catch (error) {
      console.log("Error updating checkitem:", error);
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
