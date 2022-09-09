import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Login from "../Login/Login";
import SignUp from "../signUp/SignUp";

const LoginWindow = ({ signup, setSignup, RecoveryLogin }) => {
  const history = useHistory();
  return (
    <>
      <section className="homepage_container">
        <section className="login_signup_container">
          <div className="intro">
            <div className={`logo ${RecoveryLogin ? "cursor" : ""}`}>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt=""
                onClick={() => {
                  RecoveryLogin && history.push("/");
                }}
              />
            </div>
            {!RecoveryLogin && (
              <p>
                Facebook helps you connect and share with the people in your
                life.
              </p>
            )}
          </div>
          <div className="loginScreen">
            <Login setSignup={setSignup} RecoveryLogin={RecoveryLogin} />
          </div>
        </section>
        {!RecoveryLogin && signup && (
          <div className="signup_box">
            <SignUp cancelForm={setSignup} />
          </div>
        )}
      </section>
    </>
  );
};

export default LoginWindow;
