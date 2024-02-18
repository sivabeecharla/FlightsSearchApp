// import { Alert } from "react-native";
import { types } from "../Types/Flights";
const INITIAL_STATE = {
    isLoading: false,
    flightsListData: [],
};

const ListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_FLIGHTS_DATA:
            return {
                ...state,
                flightsListData: action.payload,
            };

        default:
            return state;
    }
};

export default ListReducer;