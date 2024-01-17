import { Button, TextField } from "@mui/material";
import React from "react";
import { createNewCheckItem } from "../../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../../store/checkItem-slice";

const CreateCheckItem = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const checkItemName = useSelector((state) =>
    state.checkItem.checkItemName.find((item) => item.id === id)
  );

  const handleName = (e) => {
    dispatch(checkItemActions.setCheckItemName({ id, value: e.target.value }));
  };

  const createCheckItem = async () => {
    try {
      const newCheckItem = await createNewCheckItem(id, checkItemName?.name);
      dispatch(checkItemActions.createCheckItem({ newCheckItem, id }));
      dispatch(checkItemActions.resetCheckItemName());
    } catch (error) {
      console.log("Error creating checkitem:", error);
    }
  };

  return (
    <div style={{ padding: "2vh", position: "relative", display: "flex" }}>
      <TextField
        value={checkItemName ? checkItemName.name : ""}
        label="Enter item name...."
        onChange={(e) => handleName(e)}
      />
      <Button
        variant="contained"
        color="success"
        onClick={() => createCheckItem()}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateCheckItem;
