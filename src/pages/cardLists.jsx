import React, { useEffect, useReducer, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import { Watch } from "react-loader-spinner";
import List from "@mui/material/List";
import { useParams } from "react-router-dom";
import CreateList from "../components/services/createList";
import CardsInList from "./cardsInList";
import { useNavigate } from "react-router-dom";
import DeleteFeature from "../components/services/DeleteFeature";
import { getListOnBoard } from "../axiosAPI";
// import { useBoardContext } from "../components/services/BoardProvider";
import { useBoardContext } from "../components/services/BoardProvider";
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../store/list-slice";
const CardLists = () => {
  const { id } = useParams();
  const listData = useSelector((state) => state.list.listData);
  const isData = useSelector((state) => state.list.isData);
  const dispatch = useDispatch();
  // const startState = {
  //   listData: [],
  //   isData: true,
  // };
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "fetchListData": {
  //       return {
  //         ...state,
  //         listData: action.payload,
  //       };
  //     }
  //     case "setData": {
  //       return {
  //         ...state,
  //         isData: false,
  //       };
  //     }
  //     case "createNewList": {
  //       return {
  //         ...state,
  //         listData: [...state.listData, action.payload],
  //       };
  //     }
  //   }
  // };
  // const [listData, setListData] = useState([]);
  // const [isData, setIsData] = useState(true);
  // const [state, dispatch] = useReducer(reducer, startState);
  const navigate = useNavigate();
  const { backgroundImageObject, backgroundColorObject } = useBoardContext();
  const fetchData = async () => {
    try {
      const lists = await getListOnBoard(id);
      // dispatch({ type: "fetchListData", payload: lists });
      dispatch(listActions.fetchListData(lists));
      dispatch(listActions.toggleIsData());
      // dispatch({ type: "setData" });
      // setIsData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate(`/error`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function handleDelete(deletedId) {
    dispatch(listActions.deleteList(deletedId));
  }

  return (
    <div
      style={{
        display: "flex",
        width: "",
        marginTop: "10vh",
        backgroundImage: `url(${backgroundImageObject[id]})`,
        backgroundColor: backgroundColorObject[id]
          ? backgroundColorObject[id]
          : "#0079BF",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "90vh",
        overflowX: "auto",
      }}
    >
      <div></div>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          marginTop: "5vh",
        }}
      >
        {!isData ? (
          listData.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  marginInline: "1.5vw",
                  width: "20vw",
                  minWidth: 280,
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "10px",
                      }}
                    >
                      <h3> {item.name} </h3>
                      <DeleteFeature
                        type="list"
                        id={item.id}
                        onDelete={handleDelete}
                      />
                    </ListSubheader>
                  }
                >
                  <CardsInList id={item.id} />
                </List>
              </div>
            );
          })
        ) : (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Watch
              visible={true}
              height="80"
              width="80"
              radius="48"
              color="#0000FF"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
      <CreateList />
    </div>
  );
};

export default CardLists;
