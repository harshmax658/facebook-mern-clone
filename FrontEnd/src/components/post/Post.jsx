import React, { useState } from "react";
import "./post.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import CreateComment from "../create comment/CreateComment";
import Comment from "../comment/Comment";
import { useDispatch } from "react-redux";

import { deletePost } from "../../redux/User Posts/action";

const Post = ({ data, isLike, token, currentUser }) => {
  const [likesCount, setLikesCount] = useState(0);

  const { user, content, image, _id, comments, likes } = data;

  const [commentsCount, setCommentsCount] = useState(comments.length);
  const [comment, setComment] = useState("");
  const [userLike, setUserLike] = useState(false);

  const dispatch = useDispatch();

  const [postComments, setPostComments] = useState(comments);

  const addComment = async (e) => {
    if (e.key === "Enter") {
      const dataBody = {
        comment: comment,
        post: {
          _id,
        },
      };

      const sendComment = await fetch("/api/v1/comments/add-comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify(dataBody),
      });
      const jsonData = await sendComment.json();
      if (sendComment.status === 200) {
        setPostComments((prev) => [jsonData.data, ...prev]);
        setCommentsCount((prev) => prev + 1);
      } else {
        console.log(jsonData);
      }
      setComment("");
    }
  };
  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const deleteComment = async (id) => {
    const comment = await fetch(`/api/v1/comments/delete-comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const jsonData = await comment.json();
    if (comment.status === 200) {
      console.log(jsonData);
      const newPostList = postComments.filter((data) => data._id !== id);
      setPostComments(newPostList);
      setCommentsCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    } else {
      console.log(jsonData);

      console.log("!Bingo");
    }
  };
  const destroyPost = async () => {
    const deletePostData = await fetch(`/api/v1/post/delete-post/${_id}`, {
      method: "Delete",
      headers: {
        Authorization: token,
      },
      credentials: "include",
    });

    const jsonData = await deletePostData.json();
    if (deletePostData.status === 200) {
      console.log("Delete");
      dispatch(deletePost(_id));
    } else {
      console.log(jsonData);
      console.log("!Delete");
    }
  };
  const likeToggle = async (id, type) => {
    const likeFetch = await fetch(
      `/api/v1/like/toggle/?id=${id}&type=${type}`,
      {
        method: "Post",
        headers: {
          Authorization: token,
        },
        credentials: "include",
      }
    );
    const jsonLike = await likeFetch.json();
    if (likeFetch.status === 200) {
      if (likeFetch.status === 200) {
        if (jsonLike.data.deleted) {
          if (type === "Post") {
            if (likesCount > 0) setLikesCount(likesCount - 1);
            setUserLike(false);
          } else {
            return false;
          }
        } else {
          if (type === "Post") {
            setLikesCount(likesCount + 1);
            setUserLike(true);
          } else {
            return true;
          }
        }
      } else {
        console.log(jsonLike);
      }
    } else {
      console.log(jsonLike);
    }
  };

  return (
    <div className="post">
      <div className="postCreater">
        <div className="name_and_time">
          <div className="user_data">
            <img src={user.avatar} alt="" />
            <div>
              <p>{`${user.firstName} ${user.surname}`}</p>
              <p>14 h </p>
            </div>
          </div>
        </div>
        {currentUser._id === user._id && (
          <span onClick={destroyPost}> ---</span>
        )}
      </div>
      <div className={`postDescription ${!image && "noImage"}`}>{content}</div>
      {image && (
        <div className="postContent">
          <img src={image} alt="" />
        </div>
      )}
      <div className="post_reactions">
        <div className="likes_counts">
          {likes.length + likesCount !== 0 && likes.length + likesCount}
        </div>
        <div className="comments_and_share_counts">
          <p className="comment_counts">{commentsCount} comments</p>
          <p className="share_counts">133 shares</p>
        </div>
      </div>
      <div className={`post_action_buttons `}>
        <p
          onClick={() => likeToggle(_id, "Post")}
          className={` ${isLike(likes) && "liked"} ${
            userLike ? "liked" : ""
          }  `}
        >
          <AiOutlineLike className={`icons `} /> like
        </p>
        <p>
          <FaRegCommentAlt className="icons" />
          comment
        </p>
        <p>
          <RiShareForwardLine className="icons" />
          share
        </p>
      </div>

      <div className="post_comments">
        {postComments.map((data, key) => {
          return (
            <Comment
              key={key}
              {...data}
              likeToggle={likeToggle}
              deleteComment={deleteComment}
              isLike={isLike}
            />
          );
        })}
      </div>
      <CreateComment
        addComment={addComment}
        comment={comment}
        commentHandler={commentHandler}
      />
    </div>
  );
};

export default Post;
