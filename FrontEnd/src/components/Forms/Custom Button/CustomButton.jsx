import React from "react";
import "./custom_button_style.scss";

const Button = ({ children, className, ...otherprops }) => {
  return (
    <>
      <button
        className={`custom_button ${className ? className : ""}`}
        {...otherprops}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
