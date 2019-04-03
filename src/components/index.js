import React, { Component } from "react";

import Number from "./number";
import String from "./string";
import Bool from "./bool";
import Date from "./date";
import Color from "./color";
import Other from "./other";

import "./index.scss";

export default class Mock extends Component {
  state = {
    type: "string"
  };

  onChangeType = e => {
    this.setState({ type: e.target.value });
  };

  compMap = {
    number: <Number />,
    string: <String />,
    bool: <Bool />,
    "date&time": <Date />,
    "color&image": <Color />,
    other: <Other />
  };

  render() {
    const { type } = this.state;
    const { onChangeType, compMap } = this;

    return (
      <div>
        <span>数据类型：</span>
        <select value={type} onChange={onChangeType}>
          {Object.keys(compMap).map((v, k) => {
            return (
              <option key={k} value={v}>
                {v}
              </option>
            );
          })}
        </select>
        {compMap[type]}
      </div>
    );
  }
}
