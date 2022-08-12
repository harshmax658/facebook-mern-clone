export const FETCH_OTHER_USER_START = "FETCH_OTHER_USER_START";
export const FETCH_OTHER_USER_SUCCESS = "FETCH_OTHER_USER_SUCCESS";
export const FETCH_OTHER_USER_FAILURE = "FETCH_OTHER_USER_FAILURE";

export const fetchOtherUserStart = (data) => {
  return {
    type: FETCH_OTHER_USER_START,
    data,
  };
};
export const fetchOtherUserSuccess = (data) => {
  return {
    type: FETCH_OTHER_USER_SUCCESS,
    data,
  };
};
export const fetchOtherUserFailure = (data) => {
  return {
    type: FETCH_OTHER_USER_FAILURE,
    data,
  };
};
