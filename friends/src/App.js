import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import FriendsList from "./components/FriendsList";

import "./App.css";

const logo = require("./images/logo.svg");


export default () => (

  <>
    <img src={logo} className="logo"/>

  <Router>
    
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/login" component={LoginForm} />
      <Route path="/friends" component={FriendsList} />
    </Switch>
  </Router>

  </>
);

