import { createSlice } from "@reduxjs/toolkit";

const checkItemSlice = createSlice({
  name: "checkItem",
  initialState: {
    checkItemsData: [],
    isCreateClicked: false,
    checkItemName: [],
  },
  reducers: {
    fetchCheckItem(state, action) {
      const checklistIndex = state.checkItemsData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (checklistIndex === -1) {
        state.checkItemsData.push({
          id: action.payload.id,
          data: action.payload.checkItemsData,
        });
      } else {
        state.checkItemsData.map((item) => {
          if (item.idChecklist == action.payload.id) {
            return { ...item, data: action.payload.checkItemsData };
          } else {
            return item;
          }
        });
      }
    },
    toggleCreate(state, action) {
      state.isCreateClicked = !state.isCreateClicked;
    },
    deleteCheckItem(state, action) {
      state.checkItemsData = state.checkItemsData.map((item) => {
        return {
          ...item,
          data: item.data.filter((value) => value.id !== action.payload),
        };
      });
      return state;
    },
    setCheckItemName(state, action) {
      const existingCheckItem = state.checkItemName.find(
        (item) => item.id === action.payload.id
      );

      if (existingCheckItem) {
        existingCheckItem.name = action.payload.value;
      } else {
        state.checkItemName.push({
          id: action.payload.id,
          name: action.payload.value,
        });
      }
    },
    resetCheckItemName(state, action) {
      state.checkItemName = [];
    },
    createCheckItem(state, action) {
      const { newCheckItem, id } = action.payload;

      const checklistIndex = state.checkItemName.findIndex(
        (item) => item.id === id
      );

      if (checklistIndex !== -1) {
        state.checkItemsData[checklistIndex].data.push(newCheckItem);
      } else {
        state.checkItemsData.push({ id: id, data: newCheckItem });
      }

      return state;
    },
    updateCheckItem(state, action) {
      state.checkItemsData = state.checkItemsData.map((item) => {
        return {
          ...item,
          data: item.data.map((value) => {
            if (value.id === action.payload.id) {
              return { ...value, state: action.payload.stateUpdate };
            } else {
              return value;
            }
          }),
        };
      });
    },
  },
});

export const checkItemActions = checkItemSlice.actions;
export default checkItemSlice;
