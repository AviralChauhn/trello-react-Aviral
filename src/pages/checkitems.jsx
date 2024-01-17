import React, { useEffect, useReducer, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, fabClasses } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CreateCheckItem from "../components/services/createCheckItem";
import DeleteFeature from "../components/services/DeleteFeature";
import { getCheckItemInChecklist, updateCheckItemState } from "../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../store/checkItem-slice";
import { FormControlLabel } from "@mui/material";
// const startState = {
//   checkItemsData: [],
//   isCreateClicked: false,
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "fetchCheckItemData": {
//       return {
//         ...state,
//         checkItemsData: action.payload,
//       };
//     }
//     case "toggleInput": {
//       return {
//         ...state,
//         isCreateClicked: !state.isCreateClicked,
//       };
//     }
//     case "createNewCheckItem": {
//       return {
//         ...state,
//         checkItemsData: [...state.checkItemsData, action.payload],
//       };
//     }
//     case "updateCheckItem": {
//       return {
//         ...state,
//         checkItemsData: state.checkItemsData.map((item) =>
//           item.id === action.payload.checkItemId
//             ? { ...item, state: action.payload.updatedState }
//             : item
//         ),
//       };
//     }
//   }
// };
// const Checkitems = (props) => {
//   const { id, cardId } = props;
//   const obj = id;
//   // console.log(obj);
//   const checkItemData = useSelector((state) => state.checkItem.checkItemData);
//   const isCreateClicked = useSelector(
//     (state) => state.checkItem.isCreateClicked
//   );
//   const dispatch = useDispatch();
//   // const [checkItemsData, setCheckItemsData] = useState([]);
//   // const [isCreateClicked, setIsCreateClicked] = useState(false);
//   // const [state, dispatch] = useReducer(reducer, startState);
//   const fetchCheckItem = async () => {
//     try {
//       const checkitems = await getCheckItemInChecklist(id);
//       dispatch(checkItemActions.fetchCheckItem(checkitems));
//     } catch (error) {
//       console.log("Error fetching Data");
//     }
//   };
//   useEffect(() => {
//     fetchCheckItem();
//   }, []);
//   function handleCreateClick() {
//     // setIsCreateClicked(true);
//     dispatch(checkItemActions.toggleCreate());
//   }
//   // function isCheckItemCreated(newData) {
//   //   setCheckItemsData((prevData) => [...prevData, newData]);
//   // }
//   function handleDelete(deletedid) {
//     dispatch(checkItemActions.deleteCheckItem(deletedid));
//   }
//   // setCheckItemsData((prevList) =>
//   //     prevList.map((item) =>
//   //       item.id === checkItemId ? { ...item, state: newState } : item
//   //     )
//   //   );
// const updateCheckitem = async (id, cardId, state) => {
//   try {
//     const stateUpdate = await updateCheckItemState(cardId, id, state);
//     // console.log(stateUpdate);
//     // dispatch({ type: "updateCheckItem", payload: { id, stateUpdate } });
//     dispatch(checkItemActions.updateCheckItem({ id, stateUpdate }));
//   } catch (error) {
//     console.log("Error updating checkitem:", error);
//   }
// };
//   return (
//     <div>
//       {console.log(checkItemData)}
//       {checkItemData.map((item) => {
//         // console.log(item);
//         if (item.idChecklist === id) {
//           console.log(checkItemData);
//           return (
//             <>
//               <p
//                 key={item.id}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   backgroundColor: "#f5f5f5",
//                   marginBlock: "1vh",
//                 }}
//               >
//                 <Checkbox
//                   defaultChecked={item.state === "complete" ? true : false}
//                   onChange={() => {
//                     updateCheckitem(item.id, cardId, item.state);
//                   }}
//                 />
//                 {item.name}
//                 <DeleteFeature
//                   type="checkItem"
//                   id={id}
//                   checkId={item.id}
//                   onDelete={handleDelete}
//                 />
//               </p>
//             </>
//           );
//         }
//       })}
//       <div>{isCreateClicked && <CreateCheckItem id={id} />}</div>
//       <>
//         <Button variant="outlined" color="success" onClick={handleCreateClick}>
//           Create A CheckItem
//         </Button>
//         <Button
//           startIcon={<ClearIcon />}
//           color="error"
//           onClick={() => {
//             dispatch(checkItemActions.toggleCreate());
//           }}
//         ></Button>
//       </>
//     </div>
//   );
// };
// const checklistIndex = state.checkItemsData.findIndex(
//   (item) => item.id === action.payload.checklistId
// );
// if (checklistIndex === -1) {
//   state.checkItemsData.push({
//     id: action.payload.checklistId,
//     data: action.payload.checkItemsData,
//   });
// } else {
//   state.checkItemsData.map((item) => {
//     if (item.idChecklist == action.payload.checklistId) {
//       return { ...item, data: action.payload.checkItemsData };
//     } else {
//       return item;
//     }
//   });
// }
const Checkitem = ({ id, cardId }) => {
  const dispatch = useDispatch();
  const checkItemsData = useSelector((state) => state.checkItem.checkItemsData);
  const isCreateClicked = useSelector(
    (state) => state.checkItem.isCreateClicked
  );
  const getData = async () => {
    try {
      const checkItemsData = await getCheckItemInChecklist(id);
      dispatch(checkItemActions.fetchCheckItem({ checkItemsData, id }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  function handleCreateClick() {
    //     // setIsCreateClicked(true);
    dispatch(checkItemActions.toggleCreate());
  }
  function handleDelete(deletedid) {
    dispatch(checkItemActions.deleteCheckItem(deletedid));
  }
  const updateCheckitem = async (id, cardId, state) => {
    try {
      console.log(id);
      console.log(cardId);
      console.log(state);
      const stateUpdate = await updateCheckItemState(cardId, id, state);
      dispatch(checkItemActions.updateCheckItem({ id, stateUpdate }));
    } catch (error) {
      console.log("Error updating checkitem:", error);
    }
  };
  // console.log(checkItemsData);
  return (
    <>
      {checkItemsData.map((checkItem) =>
        checkItem.data.map((item) => {
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
                  defaultChecked={item.state === "complete" ? true : false}
                  onChange={() => {
                    updateCheckitem(item.id, cardId, item.state);
                  }}
                />
                {item.name}
                <DeleteFeature
                  type="checkItem"
                  id={id}
                  checkId={item.id}
                  onDelete={handleDelete}
                />
              </p>
            );
          }
        })
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
