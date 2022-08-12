export const FETCH_USER_PROFILE_DATA_START = "FETCH_USER_PROFILE_DATA_START";
export const FETCH_USER_PROFILE_DATA_SUCCESS =
  "FETCH_USER_PROFILE_DATA_SUCCESS";
export const FETCH_USER_PROFILE_DATA_FAILURE =
  "FETCH_USER_PROFILE_DATA_FAILURE";

export const FETCH_USER_POST_START = "FETCH_USER_POST_START";
export const FETCH_USER_POST_SUCCESS = "FETCH_USER_POST_SUCCESS";
export const FETCH_USER_POST_FAILURE = "FETCH_USER_POST_FAILURE";

export const RESET_USER_POSTS = "RESET_USER_POSTS";

export const fetchUserProfileDataStart = (data) => {
  return {
    type: FETCH_USER_PROFILE_DATA_START,
    data,
  };
};

export const fetchUserProfileDataSuccess = (data) => {
  return {
    type: FETCH_USER_PROFILE_DATA_SUCCESS,
    data,
  };
};

export const fetchUserProfileDataFailure = (data) => {
  return {
    type: FETCH_USER_PROFILE_DATA_FAILURE,
    data,
  };
};
export const fetchUserPostStart = (data) => {
  return {
    type: FETCH_USER_POST_START,
    data,
  };
};
export const fetchUserPostSuccess = (data) => {
  return {
    type: FETCH_USER_POST_SUCCESS,
    data,
  };
};

export const fetchUserPostFailure = (data) => {
  return {
    type: FETCH_USER_POST_FAILURE,
    data,
  };
};

export const restUserPosts = () => {
  return {
    type: RESET_USER_POSTS,
  };
};
