import { takeLatest, all, call, put } from "redux-saga/effects";
import { IS_USER_AUTHENTICATE, FRIEND_REQUEST_SENT_START } from "./action";
import { signInSuccess, signInFailure } from "./action";
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
      history.push("/login");
    }
  } catch (error) {
    console.log(error);
    yield put(signInFailure(error));
  }
}

function* checkUserAuthentication() {
  yield takeLatest(IS_USER_AUTHENTICATE, authenticateUser);
}

function* userLoginStart({ data: { loginData, history } }) {
  try {
    console.log("call");
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
    console.log("err");
    yield put(signInFailure(error));
  }
}

function* userLogin() {
  console.log("ayayaaaa");
  yield takeLatest(SIGN_IN_START, userLoginStart);
}

export function* userSaga() {
  yield all([
    call(checkUserAuthentication),
    call(friendRequestSent),
    call(userLogin),
  ]);
}
