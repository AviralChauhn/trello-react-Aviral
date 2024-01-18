import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardData: {},
    cardName: {},
  },
  reducers: {
    fetchCardData(state, action) {
      const { id, CardsData } = action.payload;
      state.cardData = {
        ...state.cardData,
        [id]: { id, data: CardsData },
      };
    },
    deleteCard(state, action) {
      const deletedId = action.payload.id;
      state.cardData = Object.fromEntries(
        Object.entries(state.cardData).map(([key, value]) => [
          key,
          {
            ...value,
            data: value.data.filter((card) => card.id !== deletedId),
          },
        ])
      );
      delete state.cardName[deletedId];
    },
    setCardName(state, action) {
      const { id, value } = action.payload;
      state.cardName = {
        ...state.cardName,
        [id]: { id, name: value },
      };
    },
    createCard(state, action) {
      const { newCard, id } = action.payload;

      if (state.cardData[id]) {
        state.cardData[id].data.push(newCard);
      } else {
        state.cardData[id] = { id, data: [newCard] };
      }
      if (!state.cardName[id]) {
        state.cardName[id] = { id, name: "" };
      }
    },
    resetName(state, action) {
      state.cardName = {};
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice;
