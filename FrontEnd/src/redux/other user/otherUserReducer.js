import { FETCH_OTHER_USER_SUCCESS, FETCH_OTHER_USER_FAILURE } from "./action";

const initialState = {
  otherUser: {},
  userPosts: null,
  error: null,
  loading: true,
  profileImage: null,
};

const otherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OTHER_USER_SUCCESS: {
      const { data, currentUser } = action.data;
      let dataObject = {};
      console.log(data);
      data.forEach((data) => {
        if (currentUser === data._id) {
          return;
        }
        dataObject[data._id] = data;
      });
      console.log(dataObject);
      return {
        ...state,
        otherUser: dataObject,
        loading: false,
        // userPosts: dataObject,
        // profileImage: data.avatar,
      };
    }

    case FETCH_OTHER_USER_FAILURE: {
      return { ...state, error: action.data.message, loading: false };
    }

    default:
      return { ...state };
  }
};

export default otherUserReducer;
