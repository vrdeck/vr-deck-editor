import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./nav/Navbar";
import Home from "./home/Home";
import Login from "./login/Login";
import PrivacyPolicy from "./static/PrivacyPolicy";
import Terms from "./static/Terms";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>

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
    </Router>
  );
}

export default App;
