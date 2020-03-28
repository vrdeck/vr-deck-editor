import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Link as MaterialLink
} from "@material-ui/core";

import Link from "./Link";

const googleLogin = `${process.env.REACT_APP_AUTH_PATH}/auth/google`;

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6">
            <Link to="/" color="inherit">
              VR Deck
            </Link>
          </Typography>
        </Box>

        <MaterialLink href={googleLogin}>
          <Button color="inherit">Login with Google</Button>
        </MaterialLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
