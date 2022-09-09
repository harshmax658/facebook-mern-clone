import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  IS_USER_AUTHENTICATE,
  FRIEND_REQUEST_SENT_START,
  RESET_PASSWORD_START,
} from "./action";
import {
  signInSuccess,
  resetPasswordFailure,
  signInFailure,
  resetPasswordSuccess,
} from "./action";
import { SIGN_IN_START } from "./action";

function* friendRequestSentStart({ data: { token, otherUserId } }) {}
function* friendRequestSent() {
  yield takeLatest(FRIEND_REQUEST_SENT_START, friendRequestSentStart);
}

function* authenticateUser({ data: { history } }) {
  try {
    const res = yield fetch("/isUserLogged", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 200) {
      const jsonData = yield res.json();

      yield put(signInSuccess(jsonData));
    } else {
      // history.push("/");
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* checkUserAuthentication() {
  yield takeLatest(IS_USER_AUTHENTICATE, authenticateUser);
}

function* userLoginStart({ data: { loginData, history } }) {
  try {
    const response = yield fetch("/api/v1/user/login", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const dataInJson = yield response.json();
    if (response.status === 200) {
      const getData = yield fetch("/api/v1/user/get-user-data", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: dataInJson.token,
        },
        credentials: "include",
      });
      console.log(getData);
      if (getData.status === 200) {
        const getDataJson = yield getData.json();
        yield put(signInSuccess(getDataJson));
      } else {
        throw new Error("getDataJson.message");
      }
    } else {
      throw new Error(dataInJson.message);
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* userLogin() {
  yield takeLatest(SIGN_IN_START, userLoginStart);
}
function* resetPasswordStart({ data }) {
  try {
    console.log(data);
    const postData = yield fetch("/api/v1/user/resetPassword", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ detail: data }),
    });
    if (postData.status === 200) {
      yield put(resetPasswordSuccess());
    }
  } catch (error) {
    yield put(resetPasswordFailure(error));
  }
}
function* resetPassword() {
  yield takeLatest(RESET_PASSWORD_START, resetPasswordStart);
}

export function* userSaga() {
  yield all([
    call(checkUserAuthentication),
    call(friendRequestSent),
    call(userLogin),
    call(resetPassword),
  ]);
}
