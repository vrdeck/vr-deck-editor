import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

export interface MyTalksProps {}

const MyTalks: React.FunctionComponent<MyTalksProps> = () => {
  return (
    <Container>
      <Typography>Your Talks</Typography>
      <Box></Box>
    </Container>
  );
};

export default MyTalks;
