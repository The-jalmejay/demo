import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./navbar";
import Cars from "./cars";
import NewCar from "./newcar";
import Delete from "./deletecar";
class MainComponent extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/cars/:id/edit" component={NewCar} />
            <Route path="/cars/:id/delete" component={Delete} />
            <Route path="/cars" component={Cars} />
            <Route path="/newCar" component={NewCar} />
            <Redirect from="/" to="/cars" />
          </Switch>
        </div>
      </div>
    );
  }
}
export default MainComponent;
