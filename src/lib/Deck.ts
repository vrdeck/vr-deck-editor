export interface SlideLine {
  kind: string;
  content: string;
}

export type Slide = SlideLine[];

export interface Deck {
  slides: Slide[];
}

export const blankSlideLine: SlideLine = {
  kind: "p",
  content: ""
};

export const blankSlide: Slide = [blankSlideLine];
