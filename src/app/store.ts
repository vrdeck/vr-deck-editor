import {
  TypedUseSelectorHook,
  useSelector as useUntypedSelector
} from "react-redux";
import {
  combineReducers,
  configureStore,
  Selector as UntypedSelector
} from "@reduxjs/toolkit";

import userReducer from "src/features/user/userSlice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type Selector<R> = UntypedSelector<RootState, R>;

const rootReducer = combineReducers({ user: userReducer });

/** useSelector, with correct types */
export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;

const store = configureStore({
  reducer: rootReducer
});

export default store;
