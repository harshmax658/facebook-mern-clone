import React, { useEffect } from "react";

import "./app.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import { Redirect } from "react-router";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";
import FriendsPage from "./pages/friends page/FriendsPage";
import Update from "./pages/update/Update";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const App = () => {
  const { token } = useSelector((state) => state.userReducer);
  const history = useHistory();
  useEffect(() => {
    if (!token) history.push("/login");
  });
  return (
    <>
      {token && (
        <>
          <Header />
          <div className="homepage">
            <Switch>
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="/friends" exact component={FriendsPage} />
              <Route path="/update" exact component={Update} />
              <Route path="/" component={HomePage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </>
      )}
    </>
  );
};

export default App;
