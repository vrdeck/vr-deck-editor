import React, { useState, useCallback } from "react";
import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  Link as MaterialLink,
  Drawer,
  CardContent,
  Card,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  selectCurrentTalk,
  selectTalkLoading,
  loadTalk,
  newTalk,
  updateTalk,
  saveTalk,
} from "./currentTalkSlice";
import { Talk, talkViewUrl } from "src/lib/Talk";
import EditDeck from "./EditDeck";
import { ChangeEvent } from "src/lib/Event";
import TalkImages from "./TalkImages";

export interface EditTalkProps {}

const EditTalk: React.FunctionComponent<EditTalkProps> = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { slug } = useParams();
  const talkLoading = useSelector(selectTalkLoading);
  const talk = useSelector(selectCurrentTalk);

  const [imagesOpen, setImagesOpen] = useState(false);

  const talkSlug = talk?.slug;

  React.useEffect(() => {
    if (slug) {
      dispatch(loadTalk(slug));
    } else {
      dispatch(newTalk());
    }
  }, [dispatch, slug]);

  const handleUpdate = useCallback(
    <T extends keyof Talk>(field: T) => {
      return (event: ChangeEvent<Talk[T]>) => {
        dispatch(updateTalk({ [field]: event.target.value }));
      };
    },
    [dispatch]
  );

  const handleCheckUpdate = useCallback(
    <T extends keyof Talk>(field: T) => {
      return (event: any, checked: boolean) => {
        dispatch(updateTalk({ [field]: checked }));
      };
    },
    [dispatch]
  );

  const handleSave = useCallback(async () => {
    await dispatch(saveTalk());

    // Update the slug url if it changed.
    if (talkSlug && talkSlug !== slug) {
      history.replace(`/talks/${talkSlug}`);
    }
  }, [dispatch, history, slug, talkSlug]);

  if (talkLoading || !talk) return null;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Edit Talk</Typography>

        <Box display="flex">
          <Box marginRight={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setImagesOpen(true)}
            >
              Manage Images ({talk.images.length})
            </Button>
          </Box>

          {talk.id && (
            <MaterialLink href={talkViewUrl(talk)} target="_blank">
              <Button variant="contained" color="secondary">
                View in VR
              </Button>
            </MaterialLink>
          )}
        </Box>
      </Box>

      <Box display="flex" flexDirection="column">
        <Card>
          <CardContent>
            <TextField
              label="Name"
              value={talk.name}
              onChange={handleUpdate("name")}
            ></TextField>

            <TextField
              label="Slug"
              value={talk.slug}
              onChange={handleUpdate("slug")}
            ></TextField>

            <FormControlLabel
              control={
                <Switch
                  checked={talk.private}
                  onChange={handleCheckUpdate("private")}
                  color="primary"
                />
              }
              label="Private Talk"
            />
          </CardContent>
        </Card>

        <EditDeck value={talk.deck} talk={talk} />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!talkSlug}
        >
          Save
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={imagesOpen}
        onClose={() => setImagesOpen(false)}
      >
        <TalkImages talk={talk} />
      </Drawer>
    </Container>
  );
};

export default EditTalk;
