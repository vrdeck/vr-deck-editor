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
  private: boolean;
}

export interface TalkImage {
  id: number;
  image: string;
  filename: string;
  width: number;
  height: number;
}

export const blankTalk: Talk = {
  name: "",
  slug: "",
  theme: blankTheme,
  deck: { slides: [blankSlide] },
  motionCapture: "",
  audio: "",
  images: [],
  private: false,
};

export const talkViewUrl = (talk: Talk): string =>
  `${process.env.REACT_APP_VIEWER}/${talk.slug}`;
