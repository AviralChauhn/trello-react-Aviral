import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateCard from "../components/services/createCard";
import CheckLists from "./checkLists";
import DeleteFeature from "../components/services/DeleteFeature";

const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const cardsInList = (props) => {
  const { id } = props;
  //   console.log(id);

  const [cardData, setCardData] = useState([]);
  const fetchCards = () => {
    axios
      .get(
        `https://api.trello.com/1/lists/${id}/cards?key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        // console.log(response);
        return response;
      })
      .then((text) => setCardData([...text.data]))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCards();
  }, []);
  function handleDelete(deletedid) {
    setCardData((prevList) => prevList.filter((item) => item.id !== deletedid));
  }
  const handleCardCreated = (newCardData) => {
    setCardData((prevCardData) => [...prevCardData, newCardData]);
  };
  return (
    <div>
      <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
        {cardData.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // paddingBlock: "1vh",
                height: "4vh",
                backgroundColor: "#f5f5f5",
                marginBottom: "1vh",
                marginInline: "1vw",
                borderRadius: "5px",
              }}
            >
              <p style={{ marginLeft: "2vw" }}>{item.name}</p>
              <CheckLists id={item.id} />
              <div>
                <DeleteFeature
                  type="card"
                  id={item.id}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          );
        })}
        <CreateCard id={id} onCardCreate={handleCardCreated} />
      </div>
    </div>
  );
};

export default cardsInList;
