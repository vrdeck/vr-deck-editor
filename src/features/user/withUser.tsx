import React from "react";
import { useSelector } from "react-redux";
import { selectUserLoading } from "./userSlice";

export interface WithUserProps {}

const WithUser: React.FunctionComponent<WithUserProps> = ({ children }) => {
  const userLoading = useSelector(selectUserLoading);

  return <>{userLoading ? null : children}</>;
};

export default WithUser;
