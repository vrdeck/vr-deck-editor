import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

export interface HomeFeatureProps {
  icon: React.ReactNode;
  header: React.ReactNode;
  body: React.ReactNode;
}

const HomeFeature: React.FunctionComponent<HomeFeatureProps> = ({
  icon,
  header,
  body,
}) => {
  return (
    <Grid item xs={12} sm={4}>
      <Box display="flex" justifyContent="center">
        {icon}
      </Box>
      <Typography variant="h5" gutterBottom>
        {header}
      </Typography>

      {body}
    </Grid>
  );
};

export default HomeFeature;
