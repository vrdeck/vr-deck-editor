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
import talksReducer from "src/features/talks/talksSlice";
import currentTalkReducer from "src/features/talks/currentTalkSlice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type Selector<R> = UntypedSelector<RootState, R>;

const rootReducer = combineReducers({
  user: userReducer,
  talks: talksReducer,
  currentTalk: currentTalkReducer
});

/** useSelector, with correct types */
export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;

const store = configureStore({
  reducer: rootReducer
});

export default store;
