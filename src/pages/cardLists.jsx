import axios from "axios";
import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import { Watch } from "react-loader-spinner";
import List from "@mui/material/List";
import { useParams } from "react-router-dom";
import CreateList from "../components/services/createList";
import CardsInList from "./cardsInList";
import DeleteFeature from "../components/services/DeleteFeature";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CardLists = () => {
  const { id } = useParams();
  const [listData, setListData] = useState([]);

  function fetchData() {
    axios
      .get(
        `https://api.trello.com/1/boards/${id}/lists?key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(response);
        return response;
      })
      .then((text) => setListData([...text.data]))
      .catch((err) => console.error(err));
  }

  function handleDelete(deletedId) {
    setListData((prevList) => prevList.filter((item) => item.id !== deletedId));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "",
        marginTop: "15vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
        }}
      >
        {listData.length ? (
          listData.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  marginInline: "1.5vw",
                  width: "20vw",
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
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3> {item.name} </h3>
                      <DeleteFeature
                        type="list"
                        id={item.id}
                        onDelete={handleDelete}
                      />
                    </ListSubheader>
                  }
                >
                  <CardsInList id={item.id} />
                </List>
              </div>
            );
          })
        ) : (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Watch
              visible={true}
              height="80"
              width="80"
              radius="48"
              color="#0000FF"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
      <CreateList setListData={setListData} />
    </div>
  );
};

export default CardLists;
