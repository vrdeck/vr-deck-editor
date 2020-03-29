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
import { useSelector } from "../../app/store";
import { selectUser, selectUserLoading } from "../user/userSlice";

const googleLogin = `${process.env.REACT_APP_AUTH_PATH}/auth/google`;

const Navbar = () => {
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);

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

        {!userLoading && (
          <>
            <MaterialLink href={googleLogin} color="inherit">
              <Button color="inherit">Login with Google</Button>
            </MaterialLink>

            {user && (
              <Link to="me" color="inherit">
                <Button color="inherit">Me</Button>
              </Link>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
