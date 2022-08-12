import React, { useState } from "react";
import "./createPost.scss";
import { RiLiveLine } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";
import { GoSmiley } from "react-icons/go";
import PostInputPopup from "../post input popup/PostInputPopup";
import { useSelector } from "react-redux";

const CreatePost = ({ setRefreshPost, refreshPost }) => {
  const [createPost, setCreatePost] = useState(false);
  const [postData, setPostData] = useState("");

  const [postUrl, setPostUrl] = useState(null);

  const { token, currentUser } = useSelector((state) => state.userReducer);
  const { avatar, firstName, surname } = currentUser;

  const postInputHandler = (e) => {
    setPostData(e.target.value);
  };
  const sendPostData = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (postUrl) {
      data.append("image", postUrl);
    }
    data.append("content", postData);

    const fetchReq = await fetch("/api/v1/post/create-post", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    if (fetchReq.status === 200) {
      const fetchReqJson = await fetchReq.json();
      console.log(fetchReqJson);
      setCreatePost(false);
      setPostData("");
      setRefreshPost(!refreshPost);
    } else {
      console.log(fetchReq);
    }
  };

  return (
    <>
      <div className="create_post">
        <div className="post_input">
          <div className="user">
            <img src={avatar} alt="" />
          </div>
          <div className="open_input_popup" onClick={() => setCreatePost(true)}>
            <p> {`What's on your mind,${firstName}?`}</p>
          </div>
        </div>
        <div className="others">
          <div
            className="live_video othersIcons"
            onClick={() => setCreatePost(true)}
          >
            <RiLiveLine className="icons" />
            Live Video
          </div>
          <div
            className="photos_video othersIcons"
            onClick={() => setCreatePost(true)}
          >
            <IoMdPhotos className="icons" />
            Photos Video
          </div>
          <div
            className="feeling othersIcons"
            onClick={() => setCreatePost(true)}
          >
            <GoSmiley className="icons" />
            feeling
          </div>
        </div>
      </div>
      {createPost && (
        <PostInputPopup
          setCreatePost={setCreatePost}
          postInputHandler={postInputHandler}
          sendPostData={sendPostData}
          postUrl={postUrl}
          postData={postData}
          setPostUrl={setPostUrl}
          avatar={avatar}
        />
      )}
    </>
  );
};

export default CreatePost;
