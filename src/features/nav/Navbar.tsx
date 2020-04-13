import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
} from "@material-ui/core";

import { useSelector } from "src/app/store";
import { selectUser, selectUserLoading } from "src/features/user/userSlice";

import Link from "./Link";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6">
            <Link to="/" color="inherit">
              <Box display="flex" alignItems="center">
                <img alt="VR Deck Logo" src="/logo.png" height="40px" />
                <Box marginLeft={1}>VR Deck</Box>
              </Box>
            </Link>
          </Typography>
        </Box>

        {!userLoading && (
          <>
            {!user && (
              <LoginButton color="inherit">Login with Google</LoginButton>
            )}

            {user && (
              <>
                <Link to="/talks" color="inherit">
                  <Button color="inherit">Talks</Button>
                </Link>

                <Link to="/me" color="inherit">
                  <Avatar alt={user.name} src={user.avatar}></Avatar>
                </Link>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
