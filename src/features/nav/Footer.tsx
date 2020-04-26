import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Link from "./Link";

export interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <Box
      component="footer"
      style={{ backgroundColor: "#292f36" }}
      marginTop={3}
      marginLeft="-8px"
      marginRight="-8px"
      marginBottom="-8px"
      padding={2}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Link to="/privacy-policy">
              <Typography>Privacy Policy</Typography>
            </Link>
          </Grid>

          <Grid item xs={4}>
            <Link to="/terms">
              <Typography>Terms of Service</Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
