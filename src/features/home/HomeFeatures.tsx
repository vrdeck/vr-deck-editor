import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";

import ListAltIcon from "@material-ui/icons/ListAlt";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import DevicesIcon from "@material-ui/icons/Devices";
import HomeFeature from "./HomeFeature";

export interface HomeFeaturesProps {}

const HomeFeatures: React.FunctionComponent<HomeFeaturesProps> = () => {
  return (
    <Box marginBottom={4}>
      <Box marginBottom={3}>
        <Typography variant="h4" align="center">
          Virtual Reality content, accessible to all
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <HomeFeature
          icon={<ListAltIcon fontSize="large" />}
          header="Write on the web"
          body={
            <>
              <Typography>
                Writing in VR is hard. So you can set up and manage slide decks
                though a simple web interface.
              </Typography>

              <Typography>
                Slides can include text and images. And audio cues are coming
                soon!
              </Typography>
            </>
          }
        />

        <HomeFeature
          icon={<HeadsetMicIcon fontSize="large" />}
          header="Record in VR"
          body={
            <>
              <Typography gutterBottom>
                When you're ready to record your talk, click a link to open a VR
                experience in your browser.
              </Typography>

              <Typography>
                Chrome and the Oculus Browser have full support, with Firefox
                support. You can record in any headset with a mic and hand
                tracking, like the Oculus Rift or Quest.
              </Typography>
            </>
          }
        />

        <HomeFeature
          icon={<DevicesIcon fontSize="large" />}
          header="Watch anywhere"
          body={
            <>
              <Typography gutterBottom>
                Once you're created the next great talk, you'll want to share
                it!
              </Typography>

              <Typography gutterBottom>
                Most people don't have a VR headset yet. But your talk is a
                website, and while it looks best in VR, it works great on any
                modern browser, mobile or desktop.
              </Typography>

              <Typography>Just click the green button to play!</Typography>
            </>
          }
        />
      </Grid>
    </Box>
  );
};

export default HomeFeatures;
