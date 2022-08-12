export const IS_USER_AUTHENTICATE = "IS_USER_AUTHENTICATE";

export const SIGN_IN_START = "SIGN_IN_START";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const FRIEND_REQUEST_SENT_START = "FRIEND_REQUEST_SENT_START";
export const Add_FRIEND = "Add_FRIEND";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const FRIEND_REQUEST_SENT_FAILURE = "FRIEND_REQUEST_SENT_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";
export const SET_USER_FEED = "SET_USER_FEED";
export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";
export const DELETE_POST = "DELETE_POST";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const UPDATE_POSTS_DATA = "UPDATE_POSTS_DATA";

export const removeFriend = (data) => {
  return {
    type: REMOVE_FRIEND,
    data,
  };
};
export const addFriend = (data) => {
  return {
    type: Add_FRIEND,
    data,
  };
};

export const isuser = (data) => {
  return {
    type: IS_USER_AUTHENTICATE,
    data,
  };
};
export const signInStart = (data) => {
  return {
    type: SIGN_IN_START,
    data,
  };
};
export const signInSuccess = (data) => {
  return {
    type: SIGN_IN_SUCCESS,
    data,
  };
};
export const signInFailure = (data) => {
  return {
    type: SIGN_IN_FAILURE,
    data,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const setProfileImage = (data) => {
  return {
    type: SET_PROFILE_IMAGE,
    data,
  };
};
export const deletePostFromProfile = (data) => {
  return {
    type: DELETE_POST,
    data,
  };
};
export const addNewPostOnProfile = (data) => {
  return {
    type: ADD_NEW_POST,
    data,
  };
};
export const updatePostsOnProfile = (data) => {
  return {
    type: UPDATE_POSTS_DATA,
    data,
  };
};
