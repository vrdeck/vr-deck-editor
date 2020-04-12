import React from "react";
import { Box, Button, ButtonProps } from "@material-ui/core";

export interface FileInputProps extends Omit<ButtonProps, "onChange"> {
  onChange: (file: File) => void;
}

const FileInput: React.FunctionComponent<FileInputProps> = ({
  children,
  onChange,
  ...props
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

        <Button variant="contained" component="span" {...props}>
          {children}
        </Button>
      </label>
    </Box>
  );
};

export default FileInput;
