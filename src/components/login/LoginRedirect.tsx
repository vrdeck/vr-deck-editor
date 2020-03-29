import React from "react";
import { Container, Typography } from "@material-ui/core";

import api from "../../lib/api";

const Login = () => {
  React.useEffect(() => {
    api.get('/users')
  })
  return (
    <Container>
      <Typography>Logged in!</Typography>
    </Container>
  );
};

export default Login;
