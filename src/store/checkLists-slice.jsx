import { createSlice } from "@reduxjs/toolkit";

const checkListsSlice = createSlice({
  name: "checklists",
  initialState: {
    checkListsData: [],
    open: false,
    name: "",
  },
  reducers: {
    toggleModal(state, action) {
      state.open = !state.open;
    },
    fetchCheckListsData(state, action) {
      state.checkListsData = action.payload;
    },
    deleteCheckListsData(state, action) {
      state.checkListsData = state.checkListsData.filter(
        (item) => item.id !== action.payload
      );
      return state;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    resetName(state, action) {
      state.name = "";
    },
    createCheckList(state, action) {
      state.checkListsData.push(action.payload);
    },
  },
});
export const checklistActions = checkListsSlice.actions;
export default checkListsSlice;
