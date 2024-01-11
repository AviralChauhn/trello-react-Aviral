import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { getBoards } from "../../axiosAPI";
const BoardContext = createContext();
const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [backgroundImageObject, setBackgroundImageObject] = useState({});
  const [backgroundColorObject, setBackgroundColorObject] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardsData = await getBoards();
        setBoards(boardsData);

        const backgroundObj = {};
        boardsData.forEach((board) => {
          backgroundObj[board.id] = board.prefs.backgroundImage;
        });
        setBackgroundImageObject(backgroundObj);

        const backgroundColorObj = {};
        boardsData.forEach((board) => {
          backgroundColorObj[board.id] = board.prefs.backgroundColor;
        });
        setBackgroundColorObject(backgroundColorObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <BoardContext.Provider
      value={{ backgroundImageObject, backgroundColorObject }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

export default BoardProvider;
