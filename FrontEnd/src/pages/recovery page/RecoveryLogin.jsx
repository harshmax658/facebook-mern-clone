import React, { useState } from "react";
import Container from "../../components/Container/Container";
import LoginWindow from "../../components/Login Window/LoginWindow";
import "./RecoveryLoginStyle.scss";
import FormInput from "../../components/Forms/FormInput/FormInput";
import CustomButton from "../../components/Forms/Custom Button/CustomButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordFailure,
  resetPasswordStart,
} from "../../redux/user/action";
import { useEffect } from "react";

const RecoveryLogin = () => {
  const [value, setvalue] = useState({
    id: "",
    newPass: "",
  });
  const { newPass, id } = value;
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPassword } = useSelector((state) => state.userReducer);
  useEffect(() => {
    return () => {
      dispatch(resetPasswordFailure());
    };
  }, []);
  return (
    <>
      <div className="navBar">
        <LoginWindow RecoveryLogin={true} />
      </div>
      <div className="rDetails">
        <Container id="s">
          <div className="findTag">
            {resetPassword ? "Choose a new password" : "Find Your Account"}
          </div>
          <div className="pd">
            <p>
              {resetPassword
                ? "Create a new password that is at least 6 characters long. A strong password has a combination of letters, digits and punctuation marks."
                : "Please enter your email address or mobile number to search for your account."}
            </p>
            <FormInput
              type="text"
              name={resetPassword ? "newPass" : "id"}
              value={resetPassword ? newPass : id}
              onChange={(e) => {
                const { name, value } = e.target;
                console.log(name);
                setvalue((prev) => {
                  return { ...prev, [name]: value };
                });
              }}
              placeholder={`${
                resetPassword
                  ? "New Password"
                  : " Email address or phone number"
              }`}
              required
            />
          </div>
          <div className="buttons">
            <div className="operations">
              <CustomButton
                onClick={() => {
                  history.push("/login");
                }}
              >
                {resetPassword ? "skip" : "Cancel"}
              </CustomButton>

              {resetPassword ? (
                <CustomButton
                  className="search"
                  onClick={() => {
                    dispatch(resetPasswordStart(value));
                  }}
                >
                  Continue
                </CustomButton>
              ) : (
                <CustomButton
                  className="search"
                  onClick={() => {
                    dispatch(resetPasswordStart(value));
                    // setvalue();
                  }}
                >
                  Search
                </CustomButton>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RecoveryLogin;
