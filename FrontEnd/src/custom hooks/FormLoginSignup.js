import { useState } from "react";

const FormLoginSignup = (value) => {
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // for login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // for Signup
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    day: new Date().getDate(),
    month: monthsArray[new Date().getMonth()],
    year: new Date().getFullYear(),
    sex: "",
  });

  const formDataHandler = (e) => {
    if (value === "login") {
      const { name, value } = e.target;
      setLoginData((prev) => {
        return { ...prev, [name]: value };
      });
    }
    if (value === "signup") {
      const { name, value } = e.target;

      setSignUpData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  if (value === "login") {
    return [loginData, formDataHandler];
  } else if (value === "signup") {
    return [signUpData, formDataHandler];
  }
  return null;
};

export default FormLoginSignup;
