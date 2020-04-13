import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./features/nav/Navbar";
import Home from "./features/home/Home";
import PrivacyPolicy from "./features/static/PrivacyPolicy";
import Terms from "./features/static/Terms";
import UserProfile from "./features/user/UserProfile";
import MyTalks from "./features/talks/MyTalks";
import { loadUser } from "./features/user/userSlice";
import WithUser from "./features/user/withUser";
import PrivateRoute from "./features/user/PrivateRoute";
import EditTalk from "./features/talks/EditTalk";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <WithUser>
        <Switch>
          <PrivateRoute path="/me">
            <UserProfile />
          </PrivateRoute>

          <PrivateRoute path="/talks/new">
            <EditTalk />
          </PrivateRoute>

          <PrivateRoute path="/talks/:slug">
            <EditTalk />
          </PrivateRoute>

          <PrivateRoute path="/talks">
            <MyTalks />
          </PrivateRoute>

          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>

          <Route path="/terms">
            <Terms />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </WithUser>
    </Router>
  );
}

export default App;
