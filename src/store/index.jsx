import { configureStore } from "@reduxjs/toolkit";
import checkListsSlice from "./checkLists-slice";
import checkItemSlice from "./checkItem-slice";
import listSlice from "./list-slice";

export const store = configureStore({
  reducer: {
    checkList: checkListsSlice.reducer,
    checkItem: checkItemSlice.reducer,
    list: listSlice.reducer,
  },
});
