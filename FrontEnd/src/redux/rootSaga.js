import { all, call } from "redux-saga/effects";
import { userSaga } from "./user/usersSaga";
import userPostSaga from "./User Posts/userPostSaga";
import otherUserSaga from "./other user/otherUserSaga";
import profileSaga from "./Profile/profileSaga";

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(userPostSaga),
    call(otherUserSaga),
    call(profileSaga),
  ]);
}
