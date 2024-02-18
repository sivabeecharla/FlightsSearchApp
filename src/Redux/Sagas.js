import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import FlightSaga from './Sagas/FlightsSaga';

/** @description combine sagas.*/
export default function* Sagas() {
    yield all([
        // Combine all saga here like so AuthSaga(),
        FlightSaga(),
    ]);
}