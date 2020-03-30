import React from "react";
import { Box, TextField, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { SlideLine } from "src/lib/Deck";
import { OnChange, useFormUpdate } from "src/lib/Event";

export interface EditSlideLineProps {
  value: SlideLine;
  onChange: OnChange<SlideLine>;
  onAdd: () => void;
  onRemove: () => void;
}

const EditSlideLine: React.FunctionComponent<EditSlideLineProps> = ({
  value,
  onChange,
  onAdd,
  onRemove
}) => {
  const handleUpdate = useFormUpdate(value, onChange);

  return (
    <Box display="flex" flexDirection="row">
      <Box flexGrow={1}>
        <TextField
          fullWidth
          label="Content"
          value={value.content}
          onChange={handleUpdate("content")}
        ></TextField>
      </Box>

      <TextField
        label="Format"
        value={value.kind}
        onChange={handleUpdate("kind")}
      ></TextField>

      <IconButton color="secondary" onClick={onRemove}>
        <CloseIcon />
      </IconButton>

      <IconButton color="primary" onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default EditSlideLine;
