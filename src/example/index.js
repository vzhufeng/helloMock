import React, { Component } from "react";
import ReactDOM from "react-dom";

import Mock from "Components/index";

class App extends Component {
  render() {
    return (
      <div>
        <p style={{ margin: "10px 0", textAlign: "right" }}>
          homepage:{" "}
          <a href="https://github.com/vzhufeng/helloMock">
            https://github.com/vzhufeng/helloMock
          </a>
        </p>

        <Mock />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
