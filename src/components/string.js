import React, { Component } from "react";
import Mock from "mockjs";
import { stringArr } from "./const";

export default class String extends Component {
  state = {
    min: 1,
    max: 1,
    result: null
  };

  onChangeMax = e => {
    const v = e.target.value;
    this.setState({ max: v.replace(/[^\d]/g, "") });
  };

  onChangeMin = e => {
    const v = e.target.value;
    this.setState({ min: v.replace(/[^\d]/g, "") });
  };

  getData = () => {
    const str = stringArr[Math.floor(Math.random() * stringArr.length)];

    const { min, max } = this.state;
    var data = Mock.mock({
      [`string|${min}-${max}`]: str
    });
    this.setState({ result: data.string });
  };

  render() {
    const { min, max, result } = this.state;
    const { onChangeMin, onChangeMax, getData } = this;

    return (
      <div className="data-type">
        <p>
          <span className="label">最小重复数</span>
          <input type="text" value={min} onChange={onChangeMin} />
        </p>
        <p>
          <span className="label">最大重复数</span>
          <input type="text" value={max} onChange={onChangeMax} />
        </p>
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
