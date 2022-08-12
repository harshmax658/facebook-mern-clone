import React from "react";
import "./formInput.scss";

const FormInput = ({ label, forName, ...otherProps }) => {
  return (
    <>
      <div className="form_input_group">
        {label && (
          <label className="form_input_label" htmlFor={forName}>
            {label}
          </label>
        )}
        <input {...otherProps} />
      </div>
    </>
  );
};

export default FormInput;
