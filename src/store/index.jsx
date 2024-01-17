import { configureStore } from "@reduxjs/toolkit";
import checkListsSlice from "./checkLists-slice";
import checkItemSlice from "./checkItem-slice";
import listSlice from "./list-slice";
import boardSlice from "./board-slice";
import cardSlice from "./card-slice";

export const store = configureStore({
  reducer: {
    checkList: checkListsSlice.reducer,
    checkItem: checkItemSlice.reducer,
    list: listSlice.reducer,
    card: cardSlice.reducer,
    board: boardSlice.reducer,
  },
});
