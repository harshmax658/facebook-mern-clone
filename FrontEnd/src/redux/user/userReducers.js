import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  USER_LOGOUT,
  SET_USER_FEED,
  DELETE_POST,
  SET_PROFILE_IMAGE,
  ADD_NEW_POST,
  UPDATE_POSTS_DATA,
  Add_FRIEND,
  FRIEND_REQUEST_SENT_FAILURE,
  REMOVE_FRIEND,
} from "./action";
import { ObjectToArray } from "../User Posts/utilityFunction";

const initialUserState = {
  currentUser: null,
  token: null,
  profileImage: null,
  selfPosts: {},
  friends: {},
  loading: true,
  error: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      const { user, token } = action.data;
      console.log(action.data);

      const friends = {};
      user.friendship.forEach((data) => {
        // console.log(data);
        friends[data._id] = data;
      });
      // console.log(friends);
      return {
        ...state,
        currentUser: user,
        token,
        // selfPosts: dataObject,
        profileImage: user.avatar,
        friends: friends,
      };
    }
    case SET_USER_FEED: {
      let dataObject = {};
      action.data.forEach((data) => {
        dataObject[data._id] = data;
      });
      return { ...state, selfPosts: dataObject, loading: false };
    }
    case SET_PROFILE_IMAGE: {
      return { ...state, profileImage: action.data };
    }
    case Add_FRIEND: {
      return {
        ...state,
        friends: { ...state.friends, [action.data]: { _id: action.data } },
      };
    }
    case REMOVE_FRIEND: {
      let obj = {};
      ObjectToArray(state.friends)
        .filter((data) =>
          data._id ? data._id !== action.data : data !== action.data
        )
        .forEach((data) => {
          obj[data._id] = data;
        });

      return {
        ...state,
        friends: obj,
      };
    }

    case DELETE_POST: {
      delete state.selfPosts[action.data];
      return { ...state };
    }
    case ADD_NEW_POST: {
      console.log(action.data);
      return { ...state, selfPosts: { ...action.data, ...state.selfPosts } };
    }
    case UPDATE_POSTS_DATA: {
      const data = action.data;

      const updatedData = {
        ...state.selfPosts[data.post],
        comments: [action.data, ...state.selfPosts[data.post].comments],
      };

      return {
        ...state,
        selfPosts: { ...state.selfPosts, [data.post]: updatedData },
      };
    }
    case USER_LOGOUT: {
      return { ...state, currentUser: null, token: null };
    }

    case FRIEND_REQUEST_SENT_FAILURE:
    case SIGN_IN_FAILURE: {
      return { ...state, error: action.data.message };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
