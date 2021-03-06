import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Selector } from "src/app/store";
import api from "src/lib/api";
import { Talk, blankTalk, TalkImage } from "src/lib/Talk";
import { blankSlide, blankSlideLine, SlideLine } from "src/lib/Deck";

export interface TalksSlice {
  talkLoading: boolean;
  talk: Talk | null;
}

const initialState: TalksSlice = {
  talkLoading: false,
  talk: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newTalk: (state) => {
      state.talk = blankTalk;
    },
    talkLoadStart: (state) => {
      state.talkLoading = true;
      state.talk = null;
    },
    talkLoadSuccess: (state, action: PayloadAction<Talk>) => {
      state.talk = action.payload;
      state.talkLoading = false;
    },
    talkLoadError: (state) => {
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
    },
    uploadImageSuccess(state, action: PayloadAction<{ talkImage: TalkImage }>) {
      if (!state.talk) return;
      const { talkImage } = action.payload;

      state.talk.images.push(talkImage);
    },
    deleteImageSuccess(state, action: PayloadAction<{ imageId: number }>) {
      if (!state.talk) return;
      state.talk.images = state.talk.images.filter(
        (image) => image.id !== action.payload.imageId
      );
    },
  },
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
  removeSlideLine,
  uploadImageSuccess,
  deleteImageSuccess,
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
        talk,
      });
      const updatedTalk = response.data.data;

      dispatch(updateTalk(updatedTalk));
    } else {
      const response = await api.post<{ data: Talk }>(`/me/talks`, {
        talk,
      });
      const updatedTalk = response.data.data;

      dispatch(updateTalk(updatedTalk));
    }
  } catch (e) {}
};

export const uploadImage = (image: File) => async (
  dispatch: Dispatch,
  getState: any
) => {
  const state = getState();
  const talk = selectCurrentTalk(state);
  if (!talk) return;

  try {
    const { height, width } = await getImageDimensions(image);

    const form = new FormData();
    form.append("talk_image[image]", image);
    form.append("talk_image[height]", `${height}`);
    form.append("talk_image[width]", `${width}`);

    const response = await api.post<{ data: TalkImage }>(
      `/me/talks/${talk.id}/images`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const talkImage = response.data.data;

    dispatch(uploadImageSuccess({ talkImage }));
  } catch (e) {
    console.error("image failed");
  }
};

export const deleteImage = (imageId: number) => async (
  dispatch: Dispatch,
  getState: any
) => {
  const state = getState();
  const talk = selectCurrentTalk(state);
  if (!talk) return;

  try {
    await api.delete(`/me/talks/${talk.id}/images/${imageId}`);

    dispatch(deleteImageSuccess({ imageId }));
  } catch (e) {
    console.error("image failed");
  }
};

export const selectTalkLoading: Selector<boolean> = (state) => {
  return state.currentTalk.talkLoading;
};

export const selectCurrentTalk: Selector<Talk | null> = (state) => {
  return state.currentTalk.talk;
};

const getImageDimensions = (
  image: File
): Promise<{ height: number; width: number }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();

      img.onload = function () {
        // Resolve with the image data
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      if (reader.result) {
        img.src = reader.result as string;
      } else {
        reject("image not loaded");
      }
    };

    reader.readAsDataURL(image);
  });

export default slice.reducer;
