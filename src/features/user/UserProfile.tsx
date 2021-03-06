import React from "react";

import { Box, Avatar, Container, Typography } from "@material-ui/core";

import { useSelector } from "src/app/store";
import { selectUser } from "./userSlice";

export interface UserProfileProps {}

const UserProfile: React.FunctionComponent<UserProfileProps> = () => {
  const user = useSelector(selectUser);

  if (!user) return null;

  return (
    <Container>
      <Box display="flex" alignItems="center">
        <Box>
          <Avatar alt={user.name} src={user.avatar}></Avatar>
        </Box>
        <Typography>{user.name || "Me"}</Typography>
      </Box>
      <Typography>Email: {user.email}</Typography>

      <Typography>{user.bio}</Typography>
    </Container>
  );
};

export default UserProfile;
