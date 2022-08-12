import React, { useEffect } from "react";
import CustomButton from "../Forms/Custom Button/CustomButton";
import FormInput from "../Forms/FormInput/FormInput.jsx";
import "./login.scss";
import FormLoginSignup from "../../custom hooks/FormLoginSignup";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signInStart } from "../../redux/user/action";

const Login = ({ setSignup }) => {
  const [loginData, setLoginData] = FormLoginSignup("login");
  const dispatch = useDispatch();

  const { email, password } = loginData;

  const state = useSelector((state) => state.userReducer);

  const { token } = state;
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token, history]);

  const signUpHandler = () => {
    setSignup(true);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    // const response = await fetch("/api/v1/user/login", {
    //   method: "Post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(loginData),
    // });
    // console.log(response);
    // const dataInJson = await response.json();
    // if (response.status === 200) {
    //   const getData = await fetch("/api/v1/user/get-user-data", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: dataInJson.token,
    //     },
    //     credentials: "include",
    //   });
    //   if (getData.status === 200) {
    //     const getDataJson = await getData.json();
    //     // const returnData = dispatch(setUser(getDataJson));
    //     // if (returnData) history.push("/");
    //   }
    // } else {
    //   console.log(dataInJson);
    // }
    dispatch(signInStart({ loginData, history }));
    console.log("first");
  };
  return (
    <>
      <div className="login_container">
        <div className="user_input">
          <form className="user_input_form" onSubmit={loginHandler}>
            <FormInput
              type="text"
              name="email"
              value={email}
              onChange={setLoginData}
              placeholder="Email address or phone number"
              required
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={setLoginData}
              placeholder="Password"
              required
            />
            <CustomButton type="submit" className="login">
              Log In
            </CustomButton>
          </form>
          <a href="http://localhost:3000/">Forgotten password?</a>
        </div>
        <CustomButton onClick={() => signUpHandler()}>
          Create New Account
        </CustomButton>
      </div>
    </>
  );
};

export default Login;
