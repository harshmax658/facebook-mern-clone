import { takeLatest, all, call, put } from "redux-saga/effects";

import { FETCH_OTHER_USER_START } from "./action";
import { fetchOtherUserSuccess, fetchOtherUserFailure } from "./action";

function* fetchUserStart({ data: { token } }) {
  try {
    const users = yield fetch("/api/v1/user/get-all-user", {
      headers: {
        Authorization: token,
      },
    });
    if (users.status === 200) {
      const jsonData = yield users.json();
      console.log(users);
      console.log(jsonData);

      yield put(fetchOtherUserSuccess(jsonData));
    } else {
      console.log(users);
      throw new Error("Invalid");
    }
  } catch (error) {
    console.log(error);
    yield put(fetchOtherUserFailure(error));
  }
}

function* fetchUser() {
  yield takeLatest(FETCH_OTHER_USER_START, fetchUserStart);
}
export default function* otherUserSaga() {
  yield all([call(fetchUser)]);
}
