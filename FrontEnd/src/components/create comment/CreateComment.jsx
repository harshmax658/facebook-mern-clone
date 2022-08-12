import React from "react";
import "./createComment.scss";
import { useSelector } from "react-redux";
import FormInput from "../Forms/FormInput/FormInput";

import { BsEmojiSmile } from "react-icons/bs";
import { TiCameraOutline } from "react-icons/ti";
import { AiOutlineFileGif } from "react-icons/ai";
import { MdOutlineStickyNote2 } from "react-icons/md";
const CreateComment = ({ comment, commentHandler, addComment }) => {
  const { profileImage } = useSelector((state) => state.userReducer);

  return (
    <div className="create_comment" id="create_comment">
      <div className="user_image">
        <img src={profileImage} alt="" />
      </div>
      <div className="input">
        <FormInput
          value={comment}
          placeholder="Write a comment..."
          onChange={commentHandler}
          onKeyDown={addComment}
        />
        <div className="input_icons">
          <BsEmojiSmile className="icons" />
          <TiCameraOutline className="icons" />
          <AiOutlineFileGif className="icons" />
          <MdOutlineStickyNote2 className="icons" />
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
