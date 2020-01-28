import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";

import "./App.css";

const logo = require("./images/logo.svg");


export default () => (

  <>
    <img src={logo} className="logo"/>

  <Router>
    
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/friends" component={FriendsList} />
      <ProtectedRoute path="/friends/add" component={AddFriend} />
      <Route path="/" component={LoginForm} />
    </Switch>
  </Router>

  </>
);

