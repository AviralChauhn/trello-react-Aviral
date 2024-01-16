import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    listData: [],
    isData: true,
    name: "",
  },
  reducers: {
    fetchListData(state, action) {
      state.listData = action.payload;
    },
    toggleIsData(state, action) {
      state.isData = false;
    },
    deleteList(state, action) {
      state.listData = state.listData.filter(
        (item) => item.id !== action.payload
      );
    },
    setListName(state, action) {
      state.name = action.payload;
    },
    resetListName(state, action) {
      state.name = "";
    },
    createList(state, action) {
      state.listData.push(action.payload);
    },
  },
});
export const listActions = listSlice.actions;
export default listSlice;
