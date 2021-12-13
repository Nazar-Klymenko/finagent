import { Action, applyMiddleware, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk, { ThunkAction } from "redux-thunk";

import rootReducer, { RootState } from "./rootReducer";

const middleware = [reduxThunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
