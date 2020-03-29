import { createSlice, Dispatch } from "@reduxjs/toolkit";

import { Selector } from "../../app/store";
import { User } from "../../lib/User";
import api from "../../lib/api";

interface UserSlice {
  userLoading: boolean;
  user: User | null;
}

const initialState: UserSlice = { user: null, userLoading: true };

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: state => {
      state.userLoading = true;
    },
    userLoaded: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
    }
  }
});

export const { userLoaded, userLoading } = slice.actions;

export const loadUser = () => async (dispatch: Dispatch) => {
  dispatch(userLoading());

  const response = await api.get<{ data: User }>("/me");
  const user = response.data.data;

  dispatch(userLoaded(user));
};

export const selectUser: Selector<User | null> = state => {
  return state.user.user;
};

export const selectUserLoading: Selector<boolean> = state => {
  return state.user.userLoading;
};

export default slice.reducer;
