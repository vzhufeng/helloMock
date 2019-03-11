import React, { Component } from "react";

import Number from "./number";
import String from "./string";

import './index.scss'

export default class Mock extends Component {
  state = {
    type: "number"
  };

  onChangeType = e => {
    this.setState({ type: e.target.value });
  };

  renderComp = type => {
    const compMap = {
      number: <Number />,
      string: <String />
    };
    return compMap[type];
  };

  render() {
    const { type } = this.state;
    const { onChangeType, renderComp } = this;

    return (
      <div>
        <span>数据类型：</span>
        <select value={type} onChange={onChangeType}>
          {["number", "string"].map((v, k) => {
            return (
              <option key={k} value={v}>
                {v}
              </option>
            );
          })}
        </select>
        {renderComp(type)}
      </div>
    );
  }
}
