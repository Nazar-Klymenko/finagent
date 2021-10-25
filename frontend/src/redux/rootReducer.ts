import { combineReducers } from "@reduxjs/toolkit";
import { alerts } from "./alert/reducers";

const rootReducer = combineReducers({ alerts });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
