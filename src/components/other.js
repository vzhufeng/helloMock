import React, { Component } from "react";
import Mock from "mockjs";

export default class Boolean extends Component {
  state = {
    result: null
  };

  getData = () => {
    let data = Mock.mock({
      [`boolean|1`]: true
    });
    this.setState({ result: JSON.stringify(data.boolean) });
  };

  render() {
    const { result } = this.state;
    const { getData } = this;

    return (
      <div className="data-type">
        <p>
          <button className="button" onClick={getData}>
            生成
          </button>
          <span className="result">{result}</span>
        </p>
      </div>
    );
  }
}
