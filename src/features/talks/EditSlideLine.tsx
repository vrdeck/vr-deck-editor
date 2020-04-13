import React from "react";
import {
  Box,
  TextField,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { SlideLine } from "src/lib/Deck";
import { OnChange, useFormUpdate } from "src/lib/Event";
import { TalkImage } from "src/lib/Talk";

import ImageSelector from "./ImageSelector";

export interface EditSlideLineProps {
  value: SlideLine;
  images: TalkImage[];
  slideNumber: number;
  lineNumber: number;
  onChange: (slide: number, line: number, slideLine: SlideLine) => void;
  onAdd: (slide: number, line: number) => void;
  onRemove: (slide: number, line: number) => void;
}

const LINE_OPTIONS = [
  { value: "p", label: "Text" },
  { value: "h1", label: "Large Heading" },
  { value: "h2", label: "Medium Heading" },
  { value: "img", label: "Image" },
];

const EditSlideLine: React.FunctionComponent<EditSlideLineProps> = ({
  value,
  images,
  slideNumber,
  lineNumber,
  onChange,
  onAdd,
  onRemove,
}) => {
  const handleChange: OnChange<SlideLine> = (event) =>
    onChange(slideNumber, lineNumber, event.target.value);

  const handleUpdate = useFormUpdate(value, handleChange);

  const { kind, image, content } = value;

  return (
    <Box display="flex" flexDirection="row" marginBottom={2}>
      <FormControl>
        <InputLabel>Format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={kind}
          onChange={handleUpdate("kind") as any}
        >
          {LINE_OPTIONS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box flexGrow={1}>
        {kind === "img" ? (
          <ImageSelector
            value={image}
            images={images}
            onChange={handleUpdate("image")}
          />
        ) : (
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={handleUpdate("content")}
          ></TextField>
        )}
      </Box>

      <IconButton
        color="secondary"
        onClick={() => onRemove(slideNumber, lineNumber)}
      >
        <CloseIcon />
      </IconButton>

      <IconButton onClick={() => onAdd(slideNumber, lineNumber)}>
        <AddIcon color="action" />
      </IconButton>
    </Box>
  );
};

export default React.memo(EditSlideLine);
