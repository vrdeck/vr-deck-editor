import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Link as MaterialLink,
} from "@material-ui/core";

import { useSelector } from "src/app/store";
import Link from "src/features/nav/Link";
import { selectUserLoading, selectUser } from "src/features/user/userSlice";
import { talkViewUrl } from "src/lib/Talk";
import { selectTalk } from "../talks/allTalksSlice";

export interface HomeHeroProps {}

const HomeHero: React.FunctionComponent<HomeHeroProps> = () => {
  const userLoading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);
  const welcomeTalk = useSelector(selectTalk("welcome"));

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
          muted
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
              welcomeTalk && (
                <MaterialLink href={talkViewUrl(welcomeTalk)}>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </MaterialLink>
              )
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
