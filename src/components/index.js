import React, { Component } from "react";

import Number from "./number";
import String from "./string";
import Bool from "./bool";
import Date from "./date";
import Image from "./image";
import Other from "./other";

import "./index.scss";

export default class Mock extends Component {
  state = {
    type: "number"
  };

  onChangeType = v => {
    this.setState({ type: v });
  };

  compMap = {
    number: <Number />,
    string: <String />,
    bool: <Bool />,
    datetime: <Date />,
    image: <Image />,
    other: <Other />
  };

  render() {
    const { type } = this.state;
    const { onChangeType, compMap } = this;

    return (
      <div>
        <span>数据类型：</span>
        {
          Object.keys(compMap).map((v, k) => {
            return (
              <div key={k} style={{ display: 'inline-block', marginRight: '10px', cursor: 'pointer' }} onClick={onChangeType.bind(this, v)}>
                <input
                  type="radio"
                  value={v}
                  checked={type === v}
                  onChange={onChangeType.bind(this, v)} />
                {v}
              </div>
            );
          })
        }
        {compMap[type]}
      </div>
    );
  }
}
