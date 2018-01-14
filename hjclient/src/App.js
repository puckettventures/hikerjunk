import React, { Component } from "react";

import { createStore } from "redux";
import Main from "./views/Main.js";
import Login from "./views/Login.js";
import Signup from "./views/Signup.js";
import MapBox from "./component/MapBox.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const masterReducer = (state = 0, action) => {
  console.log(action);
  return 0;
};

const store = createStore(masterReducer);

class App extends Component {
  componentDidMount() {
    console.log(store.getState());
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/user/:userId/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/auth" render={() => window.location.reload()} />
        </Switch>
      </Router>
    );
  }
}

export default App;
