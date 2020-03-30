export interface DeckTheme {
  colors?: Record<string, string>;
  styles?: Record<string, Record<string, string | number>>;
}

export const blankTheme = {
  colors: {},
  styles: {
    h1: {
      fontSize: 0.5
    },
    h2: {
      fontSize: 0.4
    },
    p: {
      fontSize: 0.3
    }
  }
};
