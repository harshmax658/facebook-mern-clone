import {
  FETCH_USER_PROFILE_DATA_SUCCESS,
  FETCH_USER_PROFILE_DATA_FAILURE,
  FETCH_USER_POST_SUCCESS,
  FETCH_USER_POST_FAILURE,
  RESET_USER_POSTS,
} from "./action";
const initialUserState = {
  profileUser: null,
  token: null,
  profileImage: null,
  userPosts: {},
  profileFriends: {},
  loading: true,
  error: null,
  userFriends: [],
};

const profileReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_DATA_SUCCESS: {
      const { user } = action.data;

      const friends = {};
      user.friendship.forEach((data) => {
        friends[data._id] = data;
      });

      return {
        ...state,
        profileUser: user,
        loading: false,
        profileImage: user.avatar,
        isPost: false,
        profileFriends: friends,
        userFriends: user.friendship,
      };
    }
    case FETCH_USER_POST_SUCCESS: {
      let dataObject = {};
      action.data.data.forEach((data) => {
        dataObject[data._id] = data;
      });

      return { ...state, userPosts: dataObject, isPost: true };
    }
    case RESET_USER_POSTS: {
      return { ...state, userPosts: {}, isPost: false };
    }

    case FETCH_USER_POST_FAILURE:
    case FETCH_USER_PROFILE_DATA_FAILURE: {
      console.log(action.data);
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
