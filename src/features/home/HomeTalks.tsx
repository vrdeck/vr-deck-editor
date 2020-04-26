import React from "react";
import { Box, Link as MaterialLink, Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useSelector } from "src/app/store";
import { talkViewUrl, Talk } from "src/lib/Talk";
import { selectTalks } from "src/features/talks/allTalksSlice";
import { loadAllTalks } from "src/features/talks/allTalksSlice";

export interface TalksProps {}

const HomeTalks: React.FunctionComponent<TalksProps> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadAllTalks());
  }, [dispatch]);

  const talks = useSelector(selectTalks);

  if (talks.length === 0) return null;

  const welcomeTalk = talks.find(({ slug }) => slug === "welcome") as Talk;
  const recordingTalk = talks.find(({ slug }) => slug === "101") as Talk;
  const danceTalk = talks.find(({ slug }) => slug === "dance") as Talk;

  return (
    <>
      <Box marginBottom={3}>
        <Typography variant="h4" align="center">
          Learn more with some talks!
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={4}>
          <MaterialLink
            key={welcomeTalk.slug}
            href={talkViewUrl(welcomeTalk)}
            target="_blank"
            color="inherit"
          >
            <Typography variant="h5" gutterBottom>
              {welcomeTalk.name}
            </Typography>

            <Typography>An introduction to VR Deck.</Typography>
          </MaterialLink>
        </Grid>

        <Grid item xs={12} sm={4}>
          <MaterialLink
            key={recordingTalk.slug}
            href={talkViewUrl(recordingTalk)}
            target="_blank"
            color="inherit"
          >
            <Typography variant="h5" gutterBottom>
              {recordingTalk.name}
            </Typography>

            <Typography>Learn more about creating talks in VR Deck.</Typography>
          </MaterialLink>
        </Grid>

        <Grid item xs={12} sm={4}>
          <MaterialLink
            key={danceTalk.slug}
            href={talkViewUrl(danceTalk)}
            target="_blank"
            color="inherit"
          >
            <Typography variant="h5" gutterBottom>
              Dance Party!
            </Typography>

            <Typography>
              Experience the full effect of the dance party.
            </Typography>
          </MaterialLink>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeTalks;
