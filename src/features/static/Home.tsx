import React from "react";
import {
  Container,
  Typography,
  Link as MaterialLink,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useSelector } from "src/app/store";
import { talkViewUrl } from "src/lib/Talk";

import { loadAllTalks, selectTalks } from "../talks/allTalksSlice";

const Home = () => {
  const dispatch = useDispatch();

  const talks = useSelector(selectTalks);

  React.useEffect(() => {
    dispatch(loadAllTalks());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h1">VR Deck</Typography>
      <Typography>
        A tool for presenting and viewing short talks in virtual reality.
      </Typography>

      <Typography>Check out these talks:</Typography>

      <List>
        {talks.map((talk) => (
          <MaterialLink
            key={talk.slug}
            href={talkViewUrl(talk)}
            target="_blank"
          >
            <ListItem button>
              <ListItemText primary={talk.name} secondary={talk.slug} />
            </ListItem>
          </MaterialLink>
        ))}
      </List>
    </Container>
  );
};

export default Home;
