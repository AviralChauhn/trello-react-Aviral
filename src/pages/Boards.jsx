import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { APIKey, APIToken } from "../components/services/config";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { getBoards } from "../axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { boardAction } from "../store/board-slice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CreateModal from "../components/services/createModal";
import CreateBoard from "../components/services/createBoard";
const Boards = () => {
  // const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const data = useSelector((state) => state.board.data);
  const isData = useSelector((state) => state.board.isData);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const boardsData = await getBoards();
      dispatch(boardAction.fetchBoardsData(boardsData));
      dispatch(boardAction.setData());
      // setData(boardsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function boardMap() {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "10vh",
          // marginLeft: "8vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "10vh",
            justifyContent: "center",
          }}
        >
          {isError ? (
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack sx={{ width: "40%" }} spacing={2}>
                <Alert
                  severity="error"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Error Fetching Boards!!!!
                </Alert>
              </Stack>
            </div>
          ) : !isData ? (
            <>
              <div
                style={{
                  display: "flex",
                  width: "100vw",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {data.map((item) => {
                  return (
                    <>
                      <div style={{ marginInline: "4vw", marginTop: "5vh" }}>
                        <Link
                          key={item.id}
                          to={`/board/${item.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Card
                            sx={{
                              minWidth: 200,
                              height: "10vh",
                              backgroundImage: `url(${item.prefs.backgroundImage})`,
                              backgroundColor: `${item.prefs.backgroundColor}`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              justifyContent: "space-around",
                              minHeight: 75,
                            }}
                          >
                            <CardContent
                              sx={{
                                backgroundColor: "rgba(0,0,0,0.35)",
                                height: "11vh",
                                minHeight: 75,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 20,
                                  fontWeight: "bold",
                                }}
                                color="white"
                                gutterBottom
                              >
                                {item.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </>
                  );
                })}
                <div
                  style={{
                    minWidth: 200,
                    height: "10vh",
                    backgroundColor: "#1c74d4",
                    minHeight: 75,
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5vh",
                    marginLeft: "2vw",
                  }}
                >
                  <CreateBoard />
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#0000FF"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>
      </Box>
    );
  }
  return boardMap();
};
export default Boards;
