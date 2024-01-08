import axios from "axios";
import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { useParams } from "react-router-dom";
import CreateList from "../components/services/createList";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CardLists = () => {
  const { id } = useParams();
  const [listData, setListData] = useState([]);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  function fetchData() {
    axios
      .get(
        `https://api.trello.com/1/boards/${id}/lists?key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response;
      })
      .then((text) => setListData(text.data))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(id);
  return (
    <div
      style={{
        display: "flex",
        width: "",
        marginTop: "15vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "start" }}>
        {listData.map((item) => {
          return (
            <div
              style={{
                marginInline: "3vw",
                width: "10vw",
                boxShadow: "2px 2px 5px rgba(5, 5, 5, 0.2)",
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    {item.name}
                  </ListSubheader>
                }
              ></List>
            </div>
          );
        })}
      </div>
      <CreateList />
    </div>
  );
};

export default CardLists;
