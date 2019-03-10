import React, { Component } from "react";
import ReactDOM from "react-dom";

import Mock from "./test.js";

class App extends Component {
  render() {
    return <Mock />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
