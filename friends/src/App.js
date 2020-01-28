import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";

import "./App.css";

const logo = require("./images/logo.svg");


export default () => (

  <>
    <img src={logo} className="logo"/>

  <Router>
    
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/login" component={LoginForm} />
      {/* <PrivateRoute path="/friends" component={FriendsList} /> */}
    </Switch>
  </Router>

  </>
);

