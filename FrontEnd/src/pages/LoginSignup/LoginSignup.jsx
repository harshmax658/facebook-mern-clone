import React, { useState } from "react";
import Login from "../../components/Login/Login";
import "./loginSignup.scss";
import SignUp from "../../components/signUp/SignUp";

const LoginSignup = () => {
  const [signup, setSignup] = useState(false);

  return (
    <>
      <section id="home">
        <section className="homepage_container">
          <section className="login_signup_container">
            <div className="intro">
              <div className="logo">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                  alt=""
                />
              </div>
              <p>
                Facebook helps you connect and share with the people in your
                life.
              </p>
            </div>
            <div className="loginScreen">
              <Login setSignup={setSignup} />
            </div>
          </section>

          {signup && (
            <div className="signup_box">
              <SignUp cancelForm={setSignup} />
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default LoginSignup;
