import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Talk } from "src/lib/Talk";

import FileInput from "./FileInput";
import { useDispatch } from "react-redux";
import { uploadImage, deleteImage } from "./currentTalkSlice";

export interface TalkImagesProps {
  talk: Talk;
}

const TalkImages: React.FunctionComponent<TalkImagesProps> = ({ talk }) => {
  const dispatch = useDispatch();

  const handleUploadImage = (image: File) => dispatch(uploadImage(image));
  const handleDeleteImage = (imageId: number) => dispatch(deleteImage(imageId));

  return (
    <Box>
      <List>
        <ListItem>
          <Typography>Images Uploaded: {talk.images.length}</Typography>
        </ListItem>

        <ListItem>
          <FileInput color="primary" onChange={handleUploadImage}>
            Upload New Image
          </FileInput>
        </ListItem>

        {talk.images.map((image) => (
          <ListItem key={image.id}>
            <ListItemAvatar>
              <Avatar alt={image.filename} src={image.image} variant="square" />
            </ListItemAvatar>

            <ListItemText primary={image.filename}></ListItemText>

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteImage(image.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default React.memo(TalkImages);
