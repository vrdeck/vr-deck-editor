import React from "react";
import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  Link as MaterialLink,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
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

  const { slug } = useParams();
  const talkLoading = useSelector(selectTalkLoading);
  const talk = useSelector(selectCurrentTalk);

  React.useEffect(() => {
    if (slug) {
      dispatch(loadTalk(slug));
    } else {
      dispatch(newTalk());
    }
  }, [dispatch, slug]);

  function handleUpdate<T extends keyof Talk>(field: T) {
    return (event: ChangeEvent<Talk[T]>) => {
      dispatch(updateTalk({ [field]: event.target.value }));
    };
  }

  function handleSave() {
    dispatch(saveTalk());
  }

  if (talkLoading || !talk) return null;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Edit Talk</Typography>
        {talk.id && (
          <MaterialLink href={talkViewUrl(talk)} target="_blank">
            <Button variant="contained" color="secondary">
              View in VR
            </Button>
          </MaterialLink>
        )}
      </Box>

      <Box display="flex" flexDirection="column">
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

        <TalkImages talk={talk} />

        <EditDeck value={talk.deck} talk={talk} />

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default EditTalk;
