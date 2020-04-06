import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction,
  Link as MaterialLink
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
      <Typography>Your Talks</Typography>

      {talks.length === 0 ? (
        <Typography>No Talks</Typography>
      ) : (
        <List>
          {talks.map(talk => (
            <ListItem key={talk.slug}>
              <ListItemText primary={talk.name} secondary={talk.slug} />

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
          ))}
        </List>
      )}

      <Link to="/talks/new">
        <Button>Create Talk</Button>
      </Link>
    </Container>
  );
};

export default MyTalks;
