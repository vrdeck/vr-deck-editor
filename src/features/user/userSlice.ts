import { createSlice, Dispatch } from "@reduxjs/toolkit";

import { Selector } from "src/app/store";
import { User } from "src/lib/User";
import api from "src/lib/api";

export interface UserSlice {
  userLoading: boolean;
  user: User | null;
}

const initialState: UserSlice = { user: null, userLoading: true };

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoadStart: state => {
      state.userLoading = true;
    },
    userLoadSuccess: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
    },
    userLoadError: state => {
      state.userLoading = false;
    }
  }
});

export const { userLoadStart, userLoadSuccess, userLoadError } = slice.actions;

export const loadUser = () => async (dispatch: Dispatch) => {
  dispatch(userLoadStart());

  try {
    const response = await api.get<{ data: User }>("/me");
    const user = response.data.data;

    dispatch(userLoadSuccess(user));
  } catch (e) {
    dispatch(userLoadError());
  }
};

export const selectUser: Selector<User | null> = state => {
  return state.user.user;
};

export const selectUserLoading: Selector<boolean> = state => {
  return state.user.userLoading;
};

export default slice.reducer;
