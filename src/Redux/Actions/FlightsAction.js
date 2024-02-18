import { types } from "../Types/Flights";

/**
 * @description get data
 */
export const getFlightsData = (payload) => ({
    type: types.GET_FLIGHTS_DATA,
    payload,
});

/**
 * @description show Loading
 */
export const setLoading = (payload) => ({
    type: types.SET_LOADING_REQUEST,
    payload,
});
