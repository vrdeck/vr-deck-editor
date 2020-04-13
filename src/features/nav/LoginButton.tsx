import React from "react";
import { Link as MaterialLink, Button, ButtonProps } from "@material-ui/core";

export interface LoginButtonProps {}

const googleLogin = `${process.env.REACT_APP_AUTH_PATH}/auth/google`;

const LoginButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <MaterialLink href={googleLogin} color="inherit">
      <Button {...props} />
    </MaterialLink>
  );
};

export default LoginButton;
