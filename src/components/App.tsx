import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import Navbar from "./nav/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
