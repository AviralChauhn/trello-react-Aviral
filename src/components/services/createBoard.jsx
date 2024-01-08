import React from "react";
import axios from "axios";
import CreateModal from "./createModal";
import { useNavigate } from "react-router-dom";
const APIKey = "4aeb0a47815eecee3ba69f1ba386559b";
const APIToken =
  "ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037";
const CreateBoard = () => {
  const navigate = useNavigate();
  function fetchdata(name) {
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${name}&key=${APIKey}&token=${APIToken}`
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          console.log(`Response: ${response.status} ${response.statusText}`);
          const data = response.data;
          navigate(`/board/${data.id}`);
        }
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <CreateModal fetchdata={fetchdata} />
    </div>
  );
};

export default CreateBoard;
