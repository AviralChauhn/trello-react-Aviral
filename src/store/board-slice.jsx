import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    data: [],
    open: false,
    name: "",
  },
  reducers: {
    fetchBoardsData(state, action) {
      state.data = action.payload;
    },
    openModal(state, action) {
      state.open = true;
    },
    closeModal(state, action) {
      state.open = false;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    resetName(state, action) {
      state.name = "";
    },
  },
});
export const boardAction = boardSlice.actions;
export default boardSlice;
