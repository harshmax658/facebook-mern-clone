import React, { useState } from "react";
import Login from "../../components/Login/Login";
import "./loginSignup.scss";
import SignUp from "../../components/signUp/SignUp";
import RecoveryLogin from "../recovery page/RecoveryLogin";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import LoginWindow from "../../components/Login Window/LoginWindow";

const LoginSignup = () => {
  const [signup, setSignup] = useState(false);

  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <>
      <Switch>
        <Route path={`${url}/recovery`} component={RecoveryLogin} />
      </Switch>
      {!pathname.includes("recovery") && (
        <section id="home">
          <LoginWindow signup={signup} setSignup={setSignup} />
        </section>
      )}
    </>
  );
};

export default LoginSignup;
