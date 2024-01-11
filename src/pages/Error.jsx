import React from "react";
import img from "../components/imgs/errrimg.png";
const Error = () => {
  return (
    <div
      style={{
        marginTop: "20vh",
        display: "flex",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <img src={img} />
    </div>
  );
};

export default Error;
