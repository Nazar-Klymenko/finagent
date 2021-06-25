import { combineReducers } from "@reduxjs/toolkit";
import { alerts } from "./alert/reducers";
import { user } from "./auth/reducers";

const rootReducer = combineReducers({ alerts, user });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
