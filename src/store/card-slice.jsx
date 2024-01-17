import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardData: [],
    cardName: [],
  },
  reducers: {
    fetchCardData(state, action) {
      const cardIndex = state.cardData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cardIndex === -1) {
        state.cardData.push({
          id: action.payload.id,
          data: action.payload.CardsData,
        });
      } else {
        state.cardData.map((item) => {
          if (item.id == action.payload.id) {
            return { ...item, data: action.payload.CardsData };
          } else {
            return item;
          }
        });
      }
    },
    deleteCard(state, action) {
      state.cardData = state.cardData.map((item) => {
        return {
          ...item,
          data: item.data.filter((value) => value.id !== action.payload),
        };
      });
      return state;
    },
    setCardName(state, action) {
      const existingCardItem = state.cardName.find(
        (item) => item.id === action.payload.id
      );

      if (existingCardItem) {
        existingCardItem.name = action.payload.value;
      } else {
        state.cardName.push({
          id: action.payload.id,
          name: action.payload.value,
        });
      }
    },
    createCard(state, action) {
      const { newCard, id } = action.payload;

      const cardIndex = state.cardName.findIndex((item) => item.id === id);

      if (cardIndex !== -1) {
        state.cardData[cardIndex].data.push(newCard);
      } else {
        state.cardData.push({ id: id, data: newCard });
      }

      return state;
    },
    resetName(state, action) {
      state.cardName = [];
    },
  },
});
export const cardActions = cardSlice.actions;
export default cardSlice;
