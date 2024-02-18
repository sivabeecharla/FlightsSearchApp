import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Sagas from './Sagas'
import reducer from './Reducers'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)))
// then run the saga
sagaMiddleware.run(Sagas)