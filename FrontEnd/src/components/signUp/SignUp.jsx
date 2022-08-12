import React, { useState } from "react";
import Input from "../Forms/FormInput/FormInput";
import "./signupStyle.scss";
import CustomButton from "../Forms/Custom Button/CustomButton";

import FormLoginSignup from "../../custom hooks/FormLoginSignup";

import CloseIcon from "@material-ui/icons/Close";

const SignUp = ({ cancelForm }) => {
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
  const [data] = useState({
    day: new Date().getDate(),
    month: monthsArray[new Date().getMonth()],
    year: new Date().getFullYear(),
  });
  const [signupData, setSignupData] = FormLoginSignup("signup");
  const { firstName, surname, email, password, day, month, year, sex } =
    signupData;

  const datesGenerator = (name) => {
    if (name === "day") {
      let day = [];
      for (let i = 31; i >= 1; --i) {
        day[i - 1] = i;
      }
      return day;
    } else if (name === "month") {
      return monthsArray;
    } else if (name === "year") {
      let year = [];
      for (let i = data.year; i >= 1920; --i) {
        year[i] = i;
      }
      return year.reverse();
    }
  };

  const onSelectData = (data) => {
    return datesGenerator(data).map((data, id) => {
      return (
        <option value={data} key={id}>
          {data}
        </option>
      );
    });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    const req = await fetch("/api/v1/user/create-user", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    if (req.status === 200 && req) {
      window.alert("Registration succesfull");
      cancelForm(false);
    } else {
      window.alert("Registration Failed");
      console.log(await req.json());
    }
  };

  return (
    <>
      <section className="signup_container">
        <div className="signupbox">
          <div className="info">
            <div>
              <p>Sign Up</p>
              <p>It's quick and easy</p>
            </div>
            <div className="cancelButton">
              <CloseIcon
                className="closeButton"
                onClick={() => cancelForm(false)}
              />
            </div>
          </div>
          <form className="user_details" onSubmit={signUpHandler}>
            <div className="userName">
              <Input
                name="firstName"
                value={firstName}
                onChange={setSignupData}
                type="text"
                placeholder="First name"
              />
              <Input
                name="surname"
                value={surname}
                onChange={setSignupData}
                type="text"
                placeholder="Surname"
              />
            </div>
            <Input
              name="email"
              type="text"
              value={email}
              onChange={setSignupData}
              placeholder="Mobile number or email address"
            />
            <Input
              name="password"
              value={password}
              type="password"
              onChange={setSignupData}
              placeholder="New password"
            />
            <div className="user_selection">
              <p>Birthday</p>
              <div className="select">
                <select
                  name="day"
                  id="day"
                  className="selectItem"
                  value={day}
                  onChange={setSignupData}
                >
                  {onSelectData("day")}
                </select>
                <select
                  name="month"
                  id="month"
                  className="selectItem"
                  value={month}
                  onChange={setSignupData}
                >
                  {onSelectData("month")}
                </select>
                <select
                  name="year"
                  id="year"
                  className="selectItem"
                  onChange={setSignupData}
                  value={year}
                >
                  {onSelectData("year")}
                </select>
              </div>
            </div>
            <div className="user_selection">
              <p>gender</p>
              <div className="select">
                <Input
                  id="women"
                  className="selectItem"
                  label="Women"
                  forName="women"
                  name="sex"
                  value={sex}
                  onChange={setSignupData}
                  type="radio"
                  // select
                />
                <Input
                  id="man"
                  className="selectItem"
                  label="Man"
                  forName="man"
                  value={sex}
                  name="sex"
                  onChange={setSignupData}
                  type="radio"
                />
                <Input
                  id="custom"
                  className="selectItem"
                  label="Custom"
                  forName="custom"
                  name="sex"
                  value={sex}
                  onChange={setSignupData}
                  type="radio"
                />
              </div>
            </div>
            <div className="termsAndConditions">
              <p>
                By clicking Sign Up, you agree to our Terms , Data Policy and
                Cookie Policy . We may send you SMS notifications. You can opt
                out to stop receiving them whenever you want.
              </p>
            </div>
            <div className="formSubmit">
              <CustomButton type="submit">Sign Up</CustomButton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
