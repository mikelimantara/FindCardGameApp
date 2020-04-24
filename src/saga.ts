import { all, takeEvery, select, delay, put } from 'redux-saga/effects';

import ActionTypes from './actionTypes';
import * as actions from './actions';
import { selectCardsToMatch } from './selectors';

function* matchTwoCardsSaga() {
  const cards = yield select(selectCardsToMatch);
  if (cards[0] >= 0 && cards[1] >= 0) {
    yield put(actions.lockFlip());
    yield delay(1000);
    yield put(actions.matchTwoCards());
  }
}

function* resetGameSaga() {
  yield delay(200);
  yield put(actions.resetGame());
}

export default function* saga() {
  yield all([
    takeEvery(ActionTypes.FLIP_ALL_CARDS_TO_BACK, resetGameSaga),
    takeEvery(ActionTypes.FLIP_CARD, matchTwoCardsSaga),
  ]);
}
