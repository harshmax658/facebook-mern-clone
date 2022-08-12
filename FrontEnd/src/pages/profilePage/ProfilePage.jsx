import React, { useEffect, useState } from "react";
import Header from "../../components/ProfilePage/Header/Header";
import "./profilePage.scss";
import { Switch, Route } from "react-router-dom";

import { useHistory, useParams, useRouteMatch } from "react-router";
import ProfilePost from "../../components/ProfilePage/Profile Posts/ProfilePost";
import {
  fetchUserProfileDataStart,
  fetchUserPostStart,
  // restUserPosts,
} from "../../redux/Profile/action";
import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchUserPostStart,
//   restUserPosts,
// } from "../../../redux/Profile/action";

const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  const { profileUser, loading, profileImage, userPosts } = useSelector(
    (state) => state.profileReducer
  );
  const { id } = useParams();
  const { path } = useRouteMatch();
  const [refreshPost, setRefreshPost] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    dispatch(fetchUserProfileDataStart({ id, token }));
    if (id) {
    } else {
      history.push("/");
    }
  }, [id, dispatch, history, token]);

  useEffect(() => {
    dispatch(fetchUserPostStart({ token, id }));
  }, [refreshPost, id, dispatch, token]);

  return (
    <div className="user_profile_page">
      {!loading && (
        <>
          <Header profileImage={profileImage} profileUser={profileUser} />
          <Switch>
            <Route
              path={`${path}/`}
              component={() => (
                <ProfilePost
                  userPosts={userPosts}
                  id={id}
                  refreshPost={refreshPost}
                  setRefreshPost={setRefreshPost}
                />
              )}
            />
          </Switch>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
