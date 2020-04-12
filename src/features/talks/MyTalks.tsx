import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction,
  Link as MaterialLink,
  Paper,
} from "@material-ui/core";
import { useSelector } from "src/app/store";
import { selectTalks, selectTalksLoading, loadTalks } from "./talksSlice";
import Link from "../nav/Link";
import { useDispatch } from "react-redux";

export interface MyTalksProps {}

const MyTalks: React.FunctionComponent<MyTalksProps> = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectTalksLoading);
  const talks = useSelector(selectTalks);

  React.useEffect(() => {
    dispatch(loadTalks());
  }, [dispatch]);

  if (loading) return null;

  return (
    <Container>
      <Typography variant="h4">Your Talks</Typography>

      <Paper>
        {talks.length === 0 ? (
          <Box
            padding={2}
            display="flex"
            justify-contents="center"
            align-items="center"
          >
            <Typography>
              You don't have any talks yet! Time to share your knowledge with
              the world.
            </Typography>
          </Box>
        ) : (
          <List>
            {talks.map((talk) => {
              const name = `${talk.name} ${talk.private ? "(private)" : ""}`;

              return (
                <ListItem key={talk.slug}>
                  <ListItemText primary={name} secondary={talk.slug} />

                  <ListItemSecondaryAction>
                    <Link to={`/talks/${talk.slug}`}>
                      <Button>Edit</Button>
                    </Link>

                    <MaterialLink
                      href={`${process.env.REACT_APP_VIEWER}/${talk.slug}`}
                    >
                      <Button>View</Button>
                    </MaterialLink>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}

        <Box padding={2}>
          <Link to="/talks/new">
            <Button color="primary" variant="contained">
              Create Talk
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default MyTalks;
