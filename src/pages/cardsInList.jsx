import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateCard from "../components/services/createCard";
import CheckLists from "./checkLists";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCardsOnList } from "../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/card-slice";

const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const cardsInList = (props) => {
  const { id } = props;

  // const [cardData, setCardData] = useState([]);
  const cardData = useSelector((state) => state.card.cardData);
  const dispatch = useDispatch();
  const fetchCards = async () => {
    try {
      const CardsData = await getCardsOnList(id);
      dispatch(cardActions.fetchCardData({ CardsData, id }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(cardData);
  useEffect(() => {
    fetchCards();
  }, []);
  function handleDelete(deletedid) {
    dispatch(cardActions.deleteCard(deletedid));
  }
  // const handleCardCreated = (newCardData) => {
  //   setCardData((prevCardData) => [...prevCardData, newCardData]);
  // };

  return (
    <div>
      <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
        {cardData.map((item) =>
          item.data.map((value) => {
            if (value.idList === id) {
              // console.log(cardData);
              return (
                <div
                  key={value.id}
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
                  <p style={{ marginLeft: "2vw" }}>{value.name}</p>
                  <CheckLists id={value.id} />
                  <div>
                    <DeleteFeature
                      type="card"
                      id={value.id}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
        <CreateCard id={id} />
      </div>
    </div>
  );
};

export default cardsInList;
