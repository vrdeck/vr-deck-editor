import React, { useCallback } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { Deck, SlideLine } from "src/lib/Deck";
import { Talk } from "src/lib/Talk";

import {
  updateSlideLine,
  addSlide,
  addSlideLine,
  removeSlide,
  removeSlideLine,
} from "./currentTalkSlice";
import EditSlide from "./EditSlide";

export interface EditDeckProps {
  talk: Talk;
  value: Deck;
}

const EditDeck: React.FunctionComponent<EditDeckProps> = ({ value, talk }) => {
  const dispatch = useDispatch();

  const handleSlideUpdate = useCallback(
    (slide: number, line: number, slideLine: SlideLine) => {
      dispatch(updateSlideLine({ slide, line, slideLine }));
    },
    [dispatch]
  );

  const handleAddSlideLine = useCallback(
    (slide: number, line: number) => dispatch(addSlideLine({ slide, line })),
    [dispatch]
  );

  const handleRemoveSlideLine = useCallback(
    (slide: number, line: number) => dispatch(removeSlideLine({ slide, line })),
    [dispatch]
  );

  const handleAddSlide = useCallback(
    (slide: number) => dispatch(addSlide({ slide })),
    [dispatch]
  );

  const handleRemoveSlide = useCallback(
    (slide: number) => dispatch(removeSlide({ slide })),
    [dispatch]
  );

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h3">Deck</Typography>

      {value.slides.map((slide, slideNumber) => (
        <EditSlide
          key={slideNumber}
          slide={slide}
          images={talk.images}
          slideNumber={slideNumber}
          onChange={handleSlideUpdate}
          onAddSlideLine={handleAddSlideLine}
          onRemoveSlideLine={handleRemoveSlideLine}
          onAddSlide={handleAddSlide}
          onRemoveSlide={handleRemoveSlide}
        />
      ))}

      <Box marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddSlide(value.slides.length)}
        >
          Add Slide
        </Button>
      </Box>
    </Box>
  );
};

export default EditDeck;
