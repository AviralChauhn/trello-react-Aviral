import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { createNewCheckItem } from "../../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../../store/checkItem-slice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const CreateCheckItem = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const checkItemName = useSelector(
    (state) => state.checkItem.checkItemName[id]
  );

  const handleName = (e) => {
    dispatch(checkItemActions.setCheckItemName({ id, value: e.target.value }));
  };

  const createCheckItem = async () => {
    try {
      const newCheckItem = await createNewCheckItem(id, checkItemName?.name);
      dispatch(checkItemActions.createCheckItem({ id, newCheckItem }));
      dispatch(checkItemActions.resetCheckItemName());
    } catch (error) {
      console.log("Error creating checkitem:", error);
      setIsError(true);
    }
  };

  return (
    <>
      {isError ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Error Creating checkItem!!!
          </Alert>
        </Stack>
      ) : (
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
      )}
    </>
  );
};

export default CreateCheckItem;
