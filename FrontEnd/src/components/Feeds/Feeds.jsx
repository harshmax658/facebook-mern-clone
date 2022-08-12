import React from "react";
import "./feeds.scss";
import Post from "../post/Post";
import { ObjectToArray } from "../../redux/User Posts/utilityFunction";
import { useSelector } from "react-redux";

const Feeds = ({ post }) => {
  const { token, currentUser } = useSelector((state) => state.userReducer);

  function isLike(array) {
    let likess = array;

    let back = false;
    for (let likeData of likess) {
      if (likeData.user === currentUser._id) {
        back = true;
        break;
      }
    }
    if (back) {
      return true;
    } else {
      return false;
    }
  }

  const posts = ObjectToArray(post);
  // console.log(post);
  return (
    <>
      <div className="userPost">
        {posts.map((data, key) => {
          return (
            <Post
              key={key}
              data={data}
              isLike={isLike}
              posts={posts}
              token={token}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </>
  );
};

export default Feeds;
