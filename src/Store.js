import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import resetEnhancer from './enhancer/reset.js';
import { reducer as loadingReducer } from './components/loading';
import { reducer as sidebarReducer } from './components/sidebar';
import data from './components/sidebar/data';

const originalReducers = {
  loading: loadingReducer,
  sidebar: sidebarReducer,
  routing: routerReducer
};
const reducer = combineReducers(originalReducers);
const win = window;
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  resetEnhancer,
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
);

const initialState = {sidebar: data};
const store = createStore(reducer, initialState, storeEnhancers);
store._reducers = originalReducers;
export default store;