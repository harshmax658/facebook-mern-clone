import React from "react";
import "./sideBox.scss";

const SideBox = ({ children, className }) => {
  return (
    <div className={`user_intro ${className ? className : null}`}>
      {children}
    </div>
  );
};

export default SideBox;
