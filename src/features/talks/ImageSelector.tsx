import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

import { TalkImage } from "src/lib/Talk";
import { OnChange } from "src/lib/Event";

export interface ImageSelectorProps {
  value: string;
  images: TalkImage[];
  onChange: OnChange<string>;
}

const ImageSelector: React.FunctionComponent<ImageSelectorProps> = ({
  value,
  images,
  onChange,
}) => {
  const [id] = useState(`image-select-${Math.random()}`);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const e = event as React.ChangeEvent<{ value: string }>;
    onChange(e);
  };

  return (
    <FormControl>
      <InputLabel id={id}>Choose Image</InputLabel>
      <Select
        labelId={id}
        id="demo-simple-select-helper"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">None</MenuItem>

        {images.map((image) => (
          <MenuItem key={image.id} value={image.id}>
            <img alt={image.filename} src={image.image} height="300px" />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Pick an uploaded file, or upload a new file first.
      </FormHelperText>
    </FormControl>
  );
};

export default ImageSelector;
