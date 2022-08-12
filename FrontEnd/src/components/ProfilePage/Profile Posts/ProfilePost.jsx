import React, { useEffect, useState } from "react";
import "./profilePost.scss";
import FeedSection from "../../Feed section/FeedSection";

import { useSelector } from "react-redux";

import Intro from "../sideBoxes/Intro/Intro";
import Photos from "../sideBoxes/photos/Photos";
import Friends from "../sideBoxes/Friends/Freinds";

const ProfilePost = ({ userPosts, refreshPost, setRefreshPost }) => {
  const { isPost, userFriends, profileUser } = useSelector(
    (state) => state.profileReducer
  );
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // console.log(userFriends);
    userFriends.forEach((data) => {
      if (data.userId._id === profileUser._id) {
        setFriends((prev) => {
          return [...prev, data.friendId];
        });
      } else {
        setFriends((prev) => {
          return [...prev, data.userId];
        });
      }
    });
  }, [userFriends, profileUser]);
  return (
    <div className="profile_post">
      <div className="info">
        <div className="box">
          <Intro />
          <Photos />
          <Friends friends={friends} />
        </div>
      </div>
      <div className="postSection">
        <FeedSection
          post={userPosts}
          refreshPost={refreshPost}
          setRefreshPost={setRefreshPost}
          loading={isPost}
        />
      </div>
    </div>
  );
};

export default ProfilePost;
