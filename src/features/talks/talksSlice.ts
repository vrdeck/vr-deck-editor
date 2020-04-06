import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Selector } from "src/app/store";
import api from "src/lib/api";
import { Talk } from "src/lib/Talk";

export interface TalksSlice {
  talksLoading: boolean;
  talks: Talk[];
}

const initialState: TalksSlice = {
  talksLoading: false,
  talks: [],
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    talksLoadStart: (state) => {
      state.talksLoading = true;
    },
    talksLoadSuccess: (state, action: PayloadAction<Talk[]>) => {
      state.talks = action.payload;
      state.talksLoading = false;
    },
    talksLoadError: (state) => {
      state.talksLoading = false;
    },
  },
});

export const {
  talksLoadStart,
  talksLoadSuccess,
  talksLoadError,
} = slice.actions;

export const loadTalks = () => async (dispatch: Dispatch) => {
  dispatch(talksLoadStart());

  try {
    const response = await api.get<{ data: Talk[] }>("/me/talks");
    const talks = response.data.data;

    dispatch(talksLoadSuccess(talks));
  } catch (e) {
    dispatch(talksLoadError());
  }
};

export const selectTalks: Selector<Talk[]> = (state) => {
  return state.talks.talks;
};

export const selectTalksLoading: Selector<boolean> = (state) => {
  return state.talks.talksLoading;
};

export default slice.reducer;
