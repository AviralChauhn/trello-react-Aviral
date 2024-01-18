import { createSlice } from "@reduxjs/toolkit";

const checkItemSlice = createSlice({
  name: "checkItem",
  initialState: {
    checkItemsData: {},
    isCreateClicked: false,
    checkItemName: {},
  },
  reducers: {
    fetchCheckItem(state, action) {
      const { id, checkItemsData } = action.payload;
      state.checkItemsData = {
        ...state.checkItemsData,
        [id]: { id, data: checkItemsData },
      };
    },
    toggleCreate(state, action) {
      state.isCreateClicked = !state.isCreateClicked;
    },
    deleteCheckItem(state, action) {
      const { checklistId, checkItemId } = action.payload;
      const updatedData = { ...state.checkItemsData };
      updatedData[checklistId].data = updatedData[checklistId].data.filter(
        (value) => value.id !== checkItemId
      );
      state.checkItemsData = updatedData;
    },
    setCheckItemName(state, action) {
      const { id, value } = action.payload;
      state.checkItemName = {
        ...state.checkItemName,
        [id]: { id, name: value },
      };
    },
    resetCheckItemName(state, action) {
      state.checkItemName = {};
    },
    createCheckItem(state, action) {
      const { newCheckItem, id } = action.payload;

      if (state.checkItemName[id]) {
        state.checkItemsData[id].data.push(newCheckItem);
      } else {
        state.checkItemsData[id] = { id, data: [newCheckItem] };
      }
    },
    updateCheckItem(state, action) {
      const { checklistId, checkItemId, stateUpdate } = action.payload;
      state.checkItemsData[checklistId].data = state.checkItemsData[
        checklistId
      ].data.map((value) =>
        value.id === checkItemId ? { ...value, state: stateUpdate } : value
      );
    },
  },
});

export const checkItemActions = checkItemSlice.actions;
export default checkItemSlice;
