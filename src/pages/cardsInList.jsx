import React, { useEffect, useState } from "react";
import CreateCard from "../components/services/createCard";
import CheckLists from "./checkLists";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCardsOnList } from "../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/card-slice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const cardsInList = (props) => {
  const { id } = props;
  const [isError, setIsError] = useState(false);
  const cardData = useSelector((state) => state.card.cardData);
  const dispatch = useDispatch();

  const fetchCards = async () => {
    try {
      const CardsData = await getCardsOnList(id);
      dispatch(cardActions.fetchCardData({ id, CardsData }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  function handleDelete(deletedId) {
    dispatch(cardActions.deleteCard({ id: deletedId }));
  }

  return (
    <div>
      <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
        {isError ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">Error Fetching Cards!!!!</Alert>
          </Stack>
        ) : (
          Object.values(cardData).map((item) =>
            item.data.map((value) => {
              if (value.idList === id) {
                return (
                  <div
                    key={value.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
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
                        onDelete={() => handleDelete(value.id)}
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })
          )
        )}
        <CreateCard id={id} />
      </div>
    </div>
  );
};

export default cardsInList;
