export interface SlideLine {
  kind: string;
  content: string;
  image: string;
}

export type Slide = SlideLine[];

export interface Deck {
  slides: Slide[];
}

export const blankSlideLine: SlideLine = {
  kind: "p",
  content: "",
  image: "",
};

export const blankSlide: Slide = [blankSlideLine];
