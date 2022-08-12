export const SET_USER_FEED_START = "SET_USER_FEED_START";
export const SET_USER_FEED_SUCCESS = "SET_USER_FEED_SUCCESS";
export const SET_USER_FEED_FAILURE = "SET_USER_FEED_FAILURE";

export const SET_USER_FEED = "SET_USER_FEED";
export const ADD_COMMENT_ON_POST = "ADD_COMMENT_ON_POST";

export const UPDATE_POSTS_DATA = "UPDATE_POSTS_DATA";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const DELETE_POST = "DELETE_POST";
export const RESET_USER_POSTS = "RESET_USER_POSTS";

export const addCommentOnPost = (data) => {
  return {
    type: ADD_COMMENT_ON_POST,
    data,
  };
};
export const resetUserPost = () => {
  return {
    type: RESET_USER_POSTS,
  };
};
export const setUserFeedStart = (data) => {
  return {
    type: SET_USER_FEED_START,
    data,
  };
};
export const setUserFeedSuccess = (data) => {
  return {
    type: SET_USER_FEED_SUCCESS,
    data,
  };
};
export const setUserFeedFailure = (data) => {
  return {
    type: SET_USER_FEED_FAILURE,
    data,
  };
};
export const setUserFeed = (data) => {
  return {
    type: SET_USER_FEED,
    data,
  };
};
export const updatePostsData = (data) => {
  return {
    type: UPDATE_POSTS_DATA,
    data,
  };
};
export const addNewPost = (data) => {
  return {
    type: ADD_NEW_POST,
    data,
  };
};
export const deletePost = (data) => {
  return {
    type: DELETE_POST,
    data,
  };
};
