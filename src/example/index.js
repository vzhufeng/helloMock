import React, { Component } from "react";
import ReactDOM from "react-dom";

import Mock from "Components/index";

class App extends Component {
  render() {
    return <Mock />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
