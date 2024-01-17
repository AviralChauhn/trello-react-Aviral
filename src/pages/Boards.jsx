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
const Boards = () => {
  // const [data, setData] = useState([]);
  const data = useSelector((state) => state.board.data);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const boardsData = await getBoards();
      dispatch(boardAction.fetchBoardsData(boardsData));
      // setData(boardsData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          {data.length ? (
            data.map((item) => {
              return (
                <>
                  <div style={{ marginInline: "5vw", marginTop: "5vh" }}>
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
                        }}
                      >
                        <CardContent
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.35)",
                            height: "11vh",
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
            })
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
