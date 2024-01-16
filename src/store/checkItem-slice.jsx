import { createSlice } from "@reduxjs/toolkit";

const checkItemSlice = createSlice({
  name: "checkItem",
  initialState: {
    checkItemData: [],
    isCreateClicked: false,
    checkItemName: "",
  },
  reducers: {
    fetchCheckItem(state, action) {
      state.checkItemData = action.payload;
    },
    toggleCreate(state, action) {
      state.isCreateClicked = !state.isCreateClicked;
    },
    deleteCheckItem(state, action) {
      state.checkItemData = state.checkItemData.filter(
        (item) => item.id !== action.payload
      );
      return state;
    },
    setCheckItemName(state, action) {
      state.checkItemName = action.payload;
    },
    resetCheckItemName(state, action) {
      state.checkItemName = "";
    },
    createCheckItem(state, action) {
      state.checkItemData.push(action.payload);
    },
    updateCheckItem(state, action) {
      state.checkItemData = state.checkItemData.map((item) =>
        item.id === action.payload.id
          ? { ...item, state: action.payload.stateUpdate }
          : item
      );
      return state;
    },
  },
});
export const checkItemActions = checkItemSlice.actions;
export default checkItemSlice;
