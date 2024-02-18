import { combineReducers } from "redux";
/**
 * @Import_All_reducers
*/

import ListReducer from "./Reducers/FlightsListReducer";
const reducerCombination = combineReducers({
    // Combine all reducer here like so: ListReducer,
    ListReducer, 
});

export default reducerCombination;
