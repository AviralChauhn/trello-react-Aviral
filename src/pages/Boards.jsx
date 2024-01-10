import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CreateBoard from "../components/services/createBoard";
import CardModal from "../components/services/CardModal";
import { ThreeCircles } from "react-loader-spinner";
const Boards = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get(
        "https://api.trello.com/1/members/me/boards?key=4aeb0a47815eecee3ba69f1ba386559b&token=ATTA393b892e76564b45fbf21cfceae1f7b3267a7d4b22f659edab872a7ab5f2c8516CA3A037"
      )
      .then((response) => setData(response.data));
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
                        key={item.id}
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
