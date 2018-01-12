import React, { Component } from "react";
import Main from "./views/Main.js";
import Login from "./views/Login.js";
import MapBox from "./component/MapBox.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
