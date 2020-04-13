import React from "react";
import { Box, Card, CardContent, CardActions, Button } from "@material-ui/core";
import EditSlideLine from "./EditSlideLine";
import { Slide, SlideLine } from "src/lib/Deck";
import { TalkImage } from "src/lib/Talk";

export interface EditSlideProps {
  slide: Slide;
  images: TalkImage[];
  slideNumber: number;
  onChange: (slide: number, line: number, slideLine: SlideLine) => void;
  onAddSlide: (slide: number) => void;
  onRemoveSlide: (slide: number) => void;
  onAddSlideLine: (slide: number, line: number) => void;
  onRemoveSlideLine: (slide: number, line: number) => void;
}

const EditSlide: React.FunctionComponent<EditSlideProps> = ({
  slide,
  images,
  slideNumber,
  onChange,
  onAddSlide,
  onRemoveSlide,
  onAddSlideLine,
  onRemoveSlideLine,
}) => {
  return (
    <Box marginBottom={2}>
      <Card>
        <CardContent>
          {slide.map((slideLine, lineNumber) => (
            <EditSlideLine
              key={lineNumber}
              images={images}
              value={slideLine}
              slideNumber={slideNumber}
              lineNumber={lineNumber}
              onChange={onChange}              
              onAdd={onAddSlideLine}
              onRemove={onRemoveSlideLine}
            />
          ))}
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onAddSlide(slideNumber)}
          >
            Add Slide After
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => onRemoveSlide(slideNumber)}
          >
            Remove Slide
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default React.memo(EditSlide);
