import { combineReducers } from "redux";

import userReducer from "./user/userReducers";
import userPostsReducer from "./User Posts/userPostsReducers";
import otherUserReducer from "./other user/otherUserReducer";
import profileReducer from "./Profile/profileReducer";

const rootReducer = combineReducers({
  userReducer,
  userPostsReducer,
  otherUserReducer,
  profileReducer,
});

export default rootReducer;
