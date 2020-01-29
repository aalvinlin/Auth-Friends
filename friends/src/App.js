import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import FriendsList from "./components/FriendsList";

import AddFriend from "./components/AddFriend";
import EditFriend from "./components/EditFriend";
import DeleteFriend from "./components/DeleteFriend";


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
      <ProtectedRoute path="/friends/edit" component={EditFriend} />
      <ProtectedRoute path="/friends/delete" component={DeleteFriend} />
      <Route path="/" component={LoginForm} />
    </Switch>
  </Router>

  </>
);

