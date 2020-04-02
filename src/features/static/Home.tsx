import React from "react";
import {
  Container,
  Typography,
  Link as MaterialLink,
  Button
} from "@material-ui/core";

const sampleViewer = `${process.env.REACT_APP_VIEWER}/test-deck`;

const Home = () => {
  return (
    <Container>
      <Typography variant="h1">VR Deck</Typography>
      <Typography>VR Deck is cool.</Typography>
      <MaterialLink href={sampleViewer} color="inherit">
        <Button>Sample Talk</Button>
      </MaterialLink>
    </Container>
  );
};

export default Home;
