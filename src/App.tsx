import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./features/nav/Navbar";
import Home from "./features/static/Home";
import PrivacyPolicy from "./features/static/PrivacyPolicy";
import Terms from "./features/static/Terms";
import UserProfile from "./features/user/UserProfile";
import MyTalks from "./features/talks/MyTalks";

import { loadUser } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/privacy-policy">
          <PrivacyPolicy />
        </Route>

        <Route path="/terms">
          <Terms />
        </Route>

        <Route path="/me">
          <UserProfile />
        </Route>

        <Route path="/talks">
          <MyTalks />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
