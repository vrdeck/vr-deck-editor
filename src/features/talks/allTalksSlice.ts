import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Selector } from "src/app/store";
import api from "src/lib/api";
import { Talk } from "src/lib/Talk";

export interface AllTalksSlice {
  talksLoading: boolean;
  talks: Talk[];
}

const initialState: AllTalksSlice = {
  talksLoading: false,
  talks: [],
};

export const slice = createSlice({
  name: "allTalks",
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

export const loadAllTalks = () => async (dispatch: Dispatch) => {
  dispatch(talksLoadStart());

  try {
    const response = await api.get<{ data: Talk[] }>("/talks");
    const talks = response.data.data;

    dispatch(talksLoadSuccess(talks));
  } catch (e) {
    dispatch(talksLoadError());
  }
};

export const selectTalks: Selector<Talk[]> = (state) => {
  return state.allTalks.talks;
};

export const selectTalk = (talkSlug: string): Selector<Talk> => (state) => {
  const talks = selectTalks(state);
  return talks.find(({ slug }) => slug === talkSlug) as Talk;
};

export const selectTalksLoading: Selector<boolean> = (state) => {
  return state.allTalks.talksLoading;
};

export default slice.reducer;
