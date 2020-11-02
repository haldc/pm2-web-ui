import { createStore, applyMiddleware, Dispatch } from 'redux';
import { useDispatch as _useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IGlobalState {
  authSynced: boolean;
};

const initialState: IGlobalState = {
  authSynced: false
};

const reducers = {
  auth: (state, action) => ({ ...state, client: action.client, authSynced: true })
};

const reducer = (state = initialState, action) => {
  const rd = reducers[action.type];
  return rd ? rd(state, action) : state;
};

export const initializeStore = (state = initialState) => createStore(reducer, state, composeWithDevTools(applyMiddleware()));

