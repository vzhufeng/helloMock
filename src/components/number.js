import React, { Component } from "react";

export default class Number extends Component {
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
        I'm number;
      </div>
    );
  }
}
