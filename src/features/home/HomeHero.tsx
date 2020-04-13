import React from "react";
import { Box, Container, Typography, Button } from "@material-ui/core";

import { useSelector } from "src/app/store";
import Link from "src/features/nav/Link";
import LoginButton from "src/features/nav/LoginButton";
import { selectUserLoading, selectUser } from "src/features/user/userSlice";

export interface HomeHeroProps {}

const HomeHero: React.FunctionComponent<HomeHeroProps> = () => {
  const userLoading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);

  return (
    <Box position="relative" minHeight="450px" marginBottom={4} paddingTop={2}>
      <Box
        position="absolute"
        top="-72px"
        left="-8px"
        bottom="0"
        right="-8px"
        zIndex={-1}
      >
        <video
          autoPlay
          loop
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
          }}
        >
          <source src="/VrDance.mp4" type="video/mp4" />
        </video>
      </Box>

      <Container>
        <Typography variant="h1" style={{ color: "white" }}>
          VR Deck
        </Typography>
        <Typography style={{ color: "white" }}>
          A tool for presenting and viewing short talks in virtual reality.
        </Typography>

        <Box paddingTop={2} paddingBottom={2}>
          {!userLoading &&
            (user ? (
              <Link to="/talks">
                <Button variant="contained" color="primary">
                  Your Talks
                </Button>
              </Link>
            ) : (
              <LoginButton variant="contained" color="primary">
                Create an Account
              </LoginButton>
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
