import React from "react";
import "./whiteBox.scss";

const WhiteBox = (props) => {
  return (
    <div className={`whiteBox ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};

export default WhiteBox;
