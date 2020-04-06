import React from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from "@material-ui/core";

import { Deck, SlideLine } from "src/lib/Deck";
import { ChangeEvent } from "src/lib/Event";
import EditSlideLine from "./EditSlideLine";
import { useDispatch } from "react-redux";
import {
  updateSlideLine,
  addSlide,
  addSlideLine,
  removeSlide,
  removeSlideLine,
} from "./currentTalkSlice";
import { Talk } from "src/lib/Talk";

export interface EditDeckProps {
  talk: Talk;
  value: Deck;
}

const EditDeck: React.FunctionComponent<EditDeckProps> = ({ value, talk }) => {
  const dispatch = useDispatch();

  const handleSlideUpdate = (slide: number, line: number) => (
    event: ChangeEvent<SlideLine>
  ) => {
    const slideLine = event.target.value;
    dispatch(updateSlideLine({ slide, line, slideLine }));
  };

  const handleAddSlide = (slide: number) => () => dispatch(addSlide({ slide }));

  const handleAddSlideLine = (slide: number, line: number) => () =>
    dispatch(addSlideLine({ slide, line }));

  const handleRemoveSlide = (slide: number) => () =>
    dispatch(removeSlide({ slide }));

  const handleRemoveSlideLine = (slide: number, line: number) => () =>
    dispatch(removeSlideLine({ slide, line }));

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h3">Deck</Typography>

      {value.slides.map((slide, slideNumber) => (
        <Box marginBottom={2} key={slideNumber}>
          <Card>
            <CardContent>
              {slide.map((slideLine, lineNumber) => (
                <EditSlideLine
                  key={lineNumber}
                  talk={talk}
                  value={slideLine}
                  onChange={handleSlideUpdate(slideNumber, lineNumber)}
                  onAdd={handleAddSlideLine(slideNumber, lineNumber)}
                  onRemove={handleRemoveSlideLine(slideNumber, lineNumber)}
                />
              ))}
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSlide(slideNumber)}
              >
                Add Slide
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveSlide(slideNumber)}
              >
                Remove Slide
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default EditDeck;
