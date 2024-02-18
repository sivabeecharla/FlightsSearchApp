import { call, put, takeLatest, take, select, delay } from "redux-saga/effects";
import { types } from "../Types/Flights";
import FlightsList from "./Class/FlightsListClass";
/**
 * @description get flights data
 */
function* getFligtsData({ payload }) {
    try {
        yield put({ type: types.IS_LOADING, payload: true });
        const result = yield call(FlightsList.getFlightsList, payload);
        if (result.status) {
            yield put({ type: types.IS_LOADING, payload: false });
        } else {
            yield put({ type: types.IS_LOADING, payload: false });
            if(result?.message){
                Toast.show(result?.message, Toast.LONG);
            }
        }
    } catch (error) {
        yield put({ type: types.ON_GET_FLIGHTS_DATA_FAILURE, payload: error });
        yield put({ type: types.IS_LOADING, payload: false });
    }
}


export default function* flightsSaga() {
    yield takeLatest(types.GET_FLIGHTS_DATA, getFligtsData);
  
}