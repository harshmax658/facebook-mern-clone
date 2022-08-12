import React, { useEffect, useState } from "react";

import "./homepage.scss";
import UserSection from "../../components/UserSection/UserSection";

import UserFriend from "../../components/userFriends/UserFriend";
import { useSelector, useDispatch } from "react-redux";

import FeedSection from "../../components/Feed section/FeedSection";
import { setUserFeedStart } from "../../redux/User Posts/action";

const HomePage = () => {
  const { currentUser, token } = useSelector((state) => state.userReducer);
  const { userFeed, loading } = useSelector((state) => state.userPostsReducer);
  const [refreshPost, setRefreshPost] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFeedStart({ token }));
  }, [token, dispatch, refreshPost]);
  console.log(token);
  return (
    <>
      {token && currentUser && (
        <div className="homepageInner">
          <div className="userSection">
            <UserSection />
          </div>

          <FeedSection
            post={userFeed}
            refreshPost={refreshPost}
            setRefreshPost={setRefreshPost}
            loading={loading}
          />

          <div className="usersFriendsSection">
            <p>contacts</p>
            <UserFriend token={token} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
