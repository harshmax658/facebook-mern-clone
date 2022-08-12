import { takeLatest, all, call, put } from "redux-saga/effects";

import { SET_USER_FEED_START } from "./action";
import { setUserFeedSuccess, setUserFeedFailure } from "./action";

function* statFetchUserFeed({ data: { token } }) {
  try {
    const fetchReq = yield fetch("/api/v1/home/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (fetchReq.status === 200) {
      const { data } = yield fetchReq.json();

      yield put(setUserFeedSuccess(data));
    } else {
      throw new Error("notPossible");
    }
  } catch (error) {
    yield put(setUserFeedFailure(error));
  }
}
function* fetchUserFeed() {
  yield takeLatest(SET_USER_FEED_START, statFetchUserFeed);
}

export default function* userPostSaga() {
  yield all([call(fetchUserFeed)]);
}
