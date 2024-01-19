import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CreateCheckItem from "../components/services/createCheckItem";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCheckItemInChecklist, updateCheckItemState } from "../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../store/checkItem-slice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Checkitem = ({ id, cardId }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const checkItemsData = useSelector((state) => state.checkItem.checkItemsData);
  const isCreateClicked = useSelector(
    (state) => state.checkItem.isCreateClicked
  );

  const getData = async () => {
    try {
      const checkItemsData = await getCheckItemInChecklist(id);
      dispatch(checkItemActions.fetchCheckItem({ id, checkItemsData }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function handleCreateClick() {
    dispatch(checkItemActions.toggleCreate());
  }

  function handleDelete(deletedId) {
    dispatch(
      checkItemActions.deleteCheckItem({
        checklistId: id,
        checkItemId: deletedId,
      })
    );
  }

  const updateCheckItem = async (checkitemid, cardId, state) => {
    try {
      const stateUpdate = await updateCheckItemState(
        cardId,
        checkitemid,
        state
      );
      dispatch(
        checkItemActions.updateCheckItem({
          checklistId: id,
          checkItemId: checkitemid,
          stateUpdate,
        })
      );
    } catch (error) {
      console.log("Error updating checkitem:", error);
      alert("Error Updating checkitem");
      window.location.reload();
    }
  };

  return (
    <>
      {isError ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Error Fetching Checkitems!!!!</Alert>
        </Stack>
      ) : (
        Object.values(checkItemsData).map((checklist) =>
          checklist.data.map((item) => {
            if (item.idChecklist === id) {
              return (
                <p
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f5f5f5",
                    marginBlock: "1vh",
                  }}
                >
                  <Checkbox
                    defaultChecked={item.state === "complete"}
                    checked={item.state === "complete"}
                    onChange={() => {
                      updateCheckItem(item.id, cardId, item.state);
                    }}
                  />
                  {item.name}
                  <DeleteFeature
                    type="checkItem"
                    id={id}
                    checkId={item.id}
                    onDelete={() => handleDelete(item.id)}
                  />
                </p>
              );
            }
          })
        )
      )}
      <div>{isCreateClicked && <CreateCheckItem id={id} />}</div>
      <>
        <Button variant="outlined" color="success" onClick={handleCreateClick}>
          Create A CheckItem
        </Button>
        <Button
          startIcon={<ClearIcon />}
          color="error"
          onClick={() => {
            dispatch(checkItemActions.toggleCreate());
          }}
        ></Button>
      </>
    </>
  );
};

export default Checkitem;
