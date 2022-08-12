import React, { useState } from "react";
import "./comment.scss";
import { useSelector } from "react-redux";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const Comment = ({
  content,
  user,
  deleteComment,
  _id,
  likes,
  likeToggle,
  isLike,
}) => {
  const { currentUser, profileImage } = useSelector(
    (state) => state.userReducer
  );

  const { firstName, surname } = user;
  const [userLike, setUserLike] = useState(isLike(likes));
  const [likesCount, setLikesCount] = useState(likes.length);

  const toggleLikeOnComments = async () => {
    const data = await likeToggle(_id, "Comment");
    if (data) {
      setUserLike("liked");
      setLikesCount(likesCount + 1);
    } else {
      setUserLike("");
      if (likesCount > 0) setLikesCount(likesCount - 1);
    }
  };

  return (
    <div className="user_comment">
      <div className="user_image">
        <img src={profileImage} alt="" />
      </div>
      <div className="content">
        <div className="dataContent">
          <div className="data">
            <div className="user_name">{`${firstName} ${surname}`}</div>
            <div className="content">{content}</div>
            {likesCount > 0 && (
              <div className="reaction_data">
                <div className="reaction">
                  <ThumbUpAltIcon />
                </div>
                <span>{likesCount}</span>
              </div>
            )}
          </div>
          {currentUser._id === user._id && (
            <div className="action" onClick={() => deleteComment(_id)}>
              ...
            </div>
          )}
        </div>
        <div className="likes">
          <span
            className={`${userLike} ${userLike === "liked" && isLike(likes)}`}
            onClick={toggleLikeOnComments}
          >
            like
          </span>
          <span>Reply</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
