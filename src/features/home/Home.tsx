import React from "react";
import { Container } from "@material-ui/core";

import HomeTalks from "./HomeTalks";
import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";

const Home = () => {
  return (
    <>
      <HomeHero />

      <Container>
        <HomeFeatures />
        <HomeTalks />
      </Container>
    </>
  );
};

export default Home;
