import { Deck, blankSlide } from "./Deck";
import { DeckTheme, blankTheme } from "./DeckTheme";

export interface Talk {
  id?: number;
  name: string;
  slug: string;
  deck: Deck;
  theme: DeckTheme;
  audio: string;
  motionCapture: string;
  images: TalkImage[];
}

export interface TalkImage {
  id: number;
  image: string;
}

export const blankTalk: Talk = {
  name: "",
  slug: "",
  theme: blankTheme,
  deck: { slides: [blankSlide] },
  motionCapture: "",
  audio: "",
  images: [],
};

export const talkViewUrl = (talk: Talk): string =>
  `${process.env.REACT_APP_VIEWER}/${talk.slug}`;
