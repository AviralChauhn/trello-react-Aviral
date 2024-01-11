import axios from "axios";
import { APIKey, APIToken } from "./components/services/config";
axios.defaults.baseURL = "https://api.trello.com/1/";
axios.defaults.params = {
  key: APIKey,
  token: APIToken,
};
const getBoards = async () => {
  try {
    const response = await axios.get("members/me/boards");
    return response.data;
  } catch (error) {
    console.error("Error getting boards:", error.message);
    throw error;
  }
};
const getListOnBoard = async (id) => {
  try {
    const response = await axios.get(`boards/${id}/lists`);
    return response.data;
  } catch (error) {
    console.error("Error getting lists");
    throw error;
  }
};
const getCardsOnList = async (id) => {
  try {
    const response = await axios.get(`lists/${id}/cards`);
    return response.data;
  } catch (error) {
    console.error("Error getting cards");
    throw error;
  }
};
const getCheckListOnCard = async (id) => {
  try {
    const response = await axios.get(`cards/${id}/checklists`);
    return response.data;
  } catch (error) {
    console.error("Error getting checkLists");
    throw error;
  }
};
const getCheckItemInChecklist = async (id) => {
  try {
    const response = await axios.get(`checklists/${id}/checkItems`);
    return response.data;
  } catch (error) {
    console.error("Error getting checkItems");
    throw error;
  }
};
const createBoard = async (name) => {
  try {
    const response = await axios.post("boards", {
      name: name,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new Board:", error.message);
    throw error;
  }
};
const createNewList = async (idBoard, newListName) => {
  try {
    const response = await axios.post("lists", {
      name: newListName,
      idBoard,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating new list:", error.message);
    throw error;
  }
};
const createNewCard = async (listId, cardName) => {
  try {
    const response = await axios.post("cards", {
      idList: listId,
      name: cardName,
    });
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error("Error creating new card:", error.message);
    throw error;
  }
};
const createNewCheckList = async (cardId, checklistname) => {
  try {
    const response = await axios.post("checklists", {
      idCard: cardId,
      name: checklistname,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error Creating checklist:", error);
    throw error;
  }
};
const createNewCheckItem = async (checklistId, newCheckItemName) => {
  try {
    const response = await axios.post(`checklists/${checklistId}/checkItems`, {
      name: newCheckItemName,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error creating checkItem:", error);
    throw error;
  }
};
const deleteItem = async (type, id, checkId, onDelete) => {
  try {
    let url = "";
    let method = "DELETE";
    let itemId = "";

    if (type === "card") {
      url = `cards/${id}`;
      itemId = id;
    } else if (type === "checklist") {
      url = `checklists/${id}`;
      itemId = id;
    } else if (type === "checkItem") {
      url = `checklists/${id}/checkItems/${checkId}`;
      itemId = checkId;
    } else if (type === "list") {
      url = `lists/${id}/closed?value=true`;
      method = "PUT";
      itemId = id;
    } else {
      console.error("Invalid type");
      return;
    }

    await axios({ method, url });
    onDelete(itemId);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
const updateCheckItemState = async (
  cardId,
  checkItemId,
  currentState,
  setCheckItemsData
) => {
  try {
    const newState = currentState === "complete" ? "incomplete" : "complete";

    const response = await axios.put(
      `cards/${cardId}/checkItem/${checkItemId}`,
      {
        state: newState,
      }
    );

    setCheckItemsData((prevList) =>
      prevList.map((item) =>
        item.id === checkItemId ? { ...item, state: newState } : item
      )
    );

    return response;
  } catch (error) {
    console.error("Error updating check item state:", error);
    throw error;
  }
};
export {
  getBoards,
  getListOnBoard,
  getCardsOnList,
  getCheckListOnCard,
  getCheckItemInChecklist,
  createBoard,
  createNewList,
  createNewCard,
  createNewCheckList,
  createNewCheckItem,
  deleteItem,
  updateCheckItemState,
};
