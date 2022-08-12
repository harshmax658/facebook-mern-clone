import React from "react";
import "./postInputPopup.scss";
import { RiMic2Fill } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";

import { GoSmiley } from "react-icons/go";
import { FaUserTag } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { GiCrossMark } from "react-icons/gi";

import CustomButton from "../Forms/Custom Button/CustomButton";

const PostInputPopup = ({
  sendPostData,
  setCreatePost,
  postInputHandler,
  postData,
  postUrl,
  avatar,
  setPostUrl,
}) => {
  const postImageHandler = (e) => {
    setPostUrl(e.target.files[0]);
  };

  return (
    <div className="postInput">
      <div className="post_box">
        <div className="title">
          <p>Create post</p>
          <div className="cancelButton" onClick={() => setCreatePost(false)}>
            <GiCrossMark />
          </div>
        </div>
        <div className="input">
          <div className="user">
            <div className="userImg">
              <img src={avatar} alt="" />
            </div>
            <div className="user_visibility">
              <div className="name"> Harsh Kumar</div>
              <div className="visibilty"> Public</div>
            </div>
          </div>
          <div className="textArea">
            <textarea
              name="post"
              id="postInput"
              cols="20"
              value={postData}
              onChange={postInputHandler}
              placeholder="What's on your mind,Harsh?"
              rows="10"
            ></textarea>
          </div>
          <div className="action_buttons">
            <p>
              <HiOutlineColorSwatch className="icons" />
            </p>

            <p>
              <GoSmiley className="icons" />
            </p>
          </div>
        </div>
        <div className="post_media">
          <div className="addPostMedia">Add to your post</div>
          <div className="mediaItems">
            <form encType="multipart/form-data">
              <input
                type="file"
                id="image"
                name="image"
                onChange={postImageHandler}
              />
              <label htmlFor="image">
                <IoMdPhotos className="icons" />
              </label>

              <FaUserTag className="icons" />
              <GoSmiley className="icons" />
              <IoLocationSharp className="icons" />
              <RiMic2Fill className="icons" />
            </form>
          </div>
        </div>
        <CustomButton
          className="post_media button"
          disabled={!postData && !postUrl ? "disabled" : ""}
          onClick={sendPostData}
        >
          Post
        </CustomButton>
      </div>
    </div>
  );
};

export default PostInputPopup;
