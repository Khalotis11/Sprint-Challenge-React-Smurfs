import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  newSmurfs = smurfs => {
    this.setState({ smurfs });
  };
  render() {
    return (
      <div className="App">
        <div className="link-container">
          <NavLink className="link-btn btn1" to="/">
            Home
          </NavLink>
          <NavLink className="link-btn btn2" to="/smurf-form">
            Add Smurfs
          </NavLink>
        </div>
        <div>
          <Route
            exact
            path="/"
            render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
          />
          <Route
            path="/smurf-form"
            render={props => <SmurfForm {...props} newSmurf={this.newSmurfs} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
