import React from "react";
import { Box, Button } from "@material-ui/core";

export interface FileInputProps {
  onChange: (file: File) => void;
}

const FileInput: React.FunctionComponent<FileInputProps> = ({
  children,
  onChange,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return null;
    const file = event.target.files[0];
    onChange(file);

    // Clear out input
    event.target.value = "";
  };
  return (
    <Box>
      <label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button variant="contained" component="span">
          {children}
        </Button>
      </label>
    </Box>
  );
};

export default FileInput;
