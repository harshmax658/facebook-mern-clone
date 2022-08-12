import {
  SET_USER_FEED_SUCCESS,
  UPDATE_POSTS_DATA,
  ADD_NEW_POST,
  DELETE_POST,
  RESET_USER_POSTS,
  ADD_COMMENT_ON_POST,
} from "./action";

const initialState = {
  feedIsPresent: false,
  userFeed: {},
  loading: true,
};

const userPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_FEED_SUCCESS: {
      let dataObject = {};
      action.data.forEach((data) => {
        dataObject[data._id] = data;
      });

      return {
        ...state,
        userFeed: dataObject,
        feedIsPresent: true,
        loading: false,
      };
    }
    case ADD_NEW_POST: {
      console.log(action.data);
      return { ...state, userFeed: { ...action.data, ...state.userFeed } };
    }
    case ADD_COMMENT_ON_POST: {
      console.log(action.data);
      return {
        ...state,
        userFeed: {
          ...state.userFeed,
          [action.data.post]: {
            ...state.userFeed[action.data.post],
            comments: [
              action.data,
              ...state.userFeed[action.data.post].comments,
            ],
          },
        },
      };
    }
    case RESET_USER_POSTS: {
      return { ...state, loading: true, userFeed: {} };
    }
    case DELETE_POST: {
      delete state.userFeed[action.data];
      return { ...state };
    }
    case UPDATE_POSTS_DATA: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default userPostsReducer;
