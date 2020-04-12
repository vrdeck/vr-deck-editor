import React from "react";
import { Box, TextField, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { SlideLine } from "src/lib/Deck";
import { OnChange, useFormUpdate } from "src/lib/Event";
import { Talk } from "src/lib/Talk";

import ImageSelector from "./ImageSelector";

export interface EditSlideLineProps {
  value: SlideLine;
  talk: Talk;
  onChange: OnChange<SlideLine>;
  onAdd: () => void;
  onRemove: () => void;
}

const EditSlideLine: React.FunctionComponent<EditSlideLineProps> = ({
  value,
  onChange,
  onAdd,
  onRemove,
  talk,
}) => {
  const handleUpdate = useFormUpdate(value, onChange);

  const { kind, image, content } = value;

  return (
    <Box display="flex" flexDirection="row">
      <TextField
        label="Format"
        value={kind}
        onChange={handleUpdate("kind")}
      ></TextField>

      <Box flexGrow={1}>
        {kind === "img" ? (
          <ImageSelector
            value={image}
            images={talk.images}
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

      <IconButton color="secondary" onClick={onRemove}>
        <CloseIcon />
      </IconButton>

      <IconButton onClick={onAdd}>
        <AddIcon color="action" />
      </IconButton>
    </Box>
  );
};

export default EditSlideLine;
