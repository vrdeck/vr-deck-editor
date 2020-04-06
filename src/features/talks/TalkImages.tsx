import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Talk } from "src/lib/Talk";

import FileInput from "./FileInput";
import { useDispatch } from "react-redux";
import { uploadImage } from "./currentTalkSlice";

export interface TalkImagesProps {
  talk: Talk;
}

const TalkImages: React.FunctionComponent<TalkImagesProps> = ({ talk }) => {
  const dispatch = useDispatch();

  const handleUploadImage = (image: File) => dispatch(uploadImage(image));

  return (
    <Box>
      <Typography>Images Uploaded: {talk.images.length}</Typography>

      <FileInput onChange={handleUploadImage} />
    </Box>
  );
};

export default TalkImages;
