import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Selector } from "src/app/store";
import api from "src/lib/api";
import { Talk, blankTalk } from "src/lib/Talk";
import { blankSlide, blankSlideLine, SlideLine } from "src/lib/Deck";

export interface TalksSlice {
  talkLoading: boolean;
  talk: Talk | null;
}

const initialState: TalksSlice = {
  talkLoading: false,
  talk: null
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newTalk: state => {
      state.talk = blankTalk;
    },
    talkLoadStart: state => {
      state.talkLoading = true;
      state.talk = null;
    },
    talkLoadSuccess: (state, action: PayloadAction<Talk>) => {
      state.talk = action.payload;
      state.talkLoading = false;
    },
    talkLoadError: state => {
      state.talkLoading = false;
    },
    updateTalk(state, action: PayloadAction<Partial<Talk>>) {
      if (!state.talk) return;

      state.talk = { ...state.talk, ...action.payload };
    },
    addSlide(state, action: PayloadAction<{ slide: number }>) {
      if (!state.talk) return;

      const { slide } = action.payload;

      state.talk.deck.slides.splice(slide + 1, 0, blankSlide);
    },
    addSlideLine(
      state,
      action: PayloadAction<{
        slide: number;
        line: number;
      }>
    ) {
      if (!state.talk) return;

      const { line, slide } = action.payload;

      state.talk.deck.slides[slide].splice(line + 1, 0, blankSlideLine);
    },
    removeSlide(state, action: PayloadAction<{ slide: number }>) {
      if (!state.talk) return;

      const { slide } = action.payload;

      state.talk.deck.slides.splice(slide, 1);
    },
    removeSlideLine(
      state,
      action: PayloadAction<{
        slide: number;
        line: number;
      }>
    ) {
      if (!state.talk) return;

      const { line, slide } = action.payload;

      state.talk.deck.slides[slide].splice(line, 1);
    },
    updateSlideLine(
      state,
      action: PayloadAction<{
        slide: number;
        line: number;
        slideLine: SlideLine;
      }>
    ) {
      if (!state.talk) return;

      const { line, slide, slideLine } = action.payload;

      state.talk.deck.slides[slide][line] = slideLine;
    }
  }
});

export const {
  talkLoadStart,
  talkLoadSuccess,
  talkLoadError,
  newTalk,
  updateTalk,
  updateSlideLine,
  addSlide,
  addSlideLine,
  removeSlide,
  removeSlideLine
} = slice.actions;

export const loadTalk = (slug: string) => async (dispatch: Dispatch) => {
  dispatch(talkLoadStart());

  try {
    const response = await api.get<{ data: Talk }>(`/me/talks/${slug}`);
    const talk = response.data.data;

    dispatch(talkLoadSuccess(talk));
  } catch (e) {
    dispatch(talkLoadError());
  }
};

export const saveTalk = () => async (dispatch: Dispatch, getState: any) => {
  const state = getState();
  const talk = selectCurrentTalk(state);
  if (!talk) return;

  try {
    if (talk.id) {
      const response = await api.put<{ data: Talk }>(`/me/talks/${talk.id}`, {
        talk
      });
      const updatedTalk = response.data.data;

      dispatch(updateTalk(updatedTalk));
    } else {
      const response = await api.post<{ data: Talk }>(`/me/talks`, {
        talk
      });
      const updatedTalk = response.data.data;

      dispatch(updateTalk(updatedTalk));
    }
  } catch (e) {}
};

export const selectTalkLoading: Selector<boolean> = state => {
  return state.currentTalk.talkLoading;
};

export const selectCurrentTalk: Selector<Talk | null> = state => {
  return state.currentTalk.talk;
};

export default slice.reducer;
