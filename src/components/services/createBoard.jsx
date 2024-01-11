import React from "react";
import axios from "axios";
import CreateModal from "./createModal";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../axiosAPI";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateBoard = () => {
  const navigate = useNavigate();
  async function fetchdata(name) {
    try {
      const boardData = await createBoard(name);
      navigate(`/board/${boardData.id}`);
    } catch (error) {
      console.log("Error Creating Board");
    }
  }

  return (
    <div>
      <CreateModal fetchdata={fetchdata} />
    </div>
  );
};

export default CreateBoard;
