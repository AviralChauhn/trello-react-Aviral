import axios from "axios";
import React from "react";
import { APIKey, APIToken } from "./config";

const UpdateCheckitem = (props) => {
  const { id, cardId, state, setCheckItemsData } = props;
  const updateCheckitem = () => {
    const newState = state === "complete" ? "incomplete" : "complete";
    axios
      .put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${id}?state=${newState}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(response);
        setCheckItemsData((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, state: newState } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };
  return <div></div>;
};

export default UpdateCheckitem;
