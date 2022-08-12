import { call, all, takeLatest, put } from "redux-saga/effects";
import { FETCH_USER_PROFILE_DATA_START, FETCH_USER_POST_START } from "./action";
import {
  fetchUserProfileDataSuccess,
  fetchUserProfileDataFailure,
  fetchUserPostSuccess,
  fetchUserPostFailure,
} from "./action";

function* fetchUserprofileStart({ data: { id, token } }) {
  try {
    const user = yield fetch(`/api/v1/user/get-user-data/?id=${id}`, {
      headers: {
        Authorization: token,
      },
      credentials: "include",
    });

    if (user.status === 200) {
      const jsonData = yield user.json();
      yield put(fetchUserProfileDataSuccess(jsonData));
    } else {
      throw new Error("invalid");
    }
  } catch (error) {
    yield put(fetchUserProfileDataFailure(error));
  }
}
function* fetchUserprofile() {
  yield takeLatest(FETCH_USER_PROFILE_DATA_START, fetchUserprofileStart);
}

function* fetchUserPostStart({ data: { token, id } }) {
  try {
    const post = yield fetch(`/api/v1/user/get-posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      credentials: "include",
    });
    if (post.status === 200) {
      const postJson = yield post.json();
      yield put(fetchUserPostSuccess(postJson));
    } else {
      throw new Error("Invalid");
    }
  } catch (error) {
    yield put(fetchUserPostFailure(error));
    console.log(error);
  }
}

function* fetchUserPost() {
  yield takeLatest(FETCH_USER_POST_START, fetchUserPostStart);
}
export default function* profileSaga() {
  yield all([call(fetchUserprofile), call(fetchUserPost)]);
}
