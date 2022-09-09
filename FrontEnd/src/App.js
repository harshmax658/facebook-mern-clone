import React, { useEffect } from "react";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import "./app.css";
import { Switch, Route } from "react-router-dom";

import { useHistory } from "react-router";
import RouteHandler from "./RouteHandler";
import { useDispatch, useSelector } from "react-redux";
import { isuser } from "./redux/user/action";
import RecoveryLogin from "./pages/recovery page/RecoveryLogin";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);

  // useEffect(() => {
  // const homeData = async () => {
  //   const fetchReq = await fetch("/api/v1/home/", {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   });
  //   if (fetchReq.status === 200) {
  //     const { data } = await fetchReq.json();
  //     dispatch(setUserFeed(data));
  //   } else {
  //     console.log(fetchReq);
  //   }
  // };
  // if (!feedIsPresent) homeData();
  // }, [token, dispatch, userFeed, feedIsPresent]);
  useEffect(() => {
    if (!token) dispatch(isuser({ history }));
  }, [dispatch, token, history]);
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginSignup} />
        <Route path="/" component={RouteHandler} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </>
  );
};

export default App;
