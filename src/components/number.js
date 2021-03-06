import React, { Component } from "react";
import Mock from"mockjs";

export default class Number extends Component {
  state = {
    min: 0,
    max: 100,
    result: null,
    pointMin: 0,
    pointMax: 4,
  };

  onChangeMax = e => {
    const v = e.target.value;
    this.setState({ max: v.replace(/[^\d-]/g, "") });
  };

  onChangeMin = e => {
    const v = e.target.value;
    this.setState({ min: v.replace(/[^\d-]/g, "") });
  };

  onChangePointMin = e => {
    const v = e.target.value;
    this.setState({ pointMin: v.replace(/[^\d]/g, "") });
  };

  onChangePointMax = e => {
    const v = e.target.value;
    this.setState({ pointMax: v.replace(/[^\d]/g, "") });
  };

  getData = () => {
    const { min, max, pointMin, pointMax } = this.state;
    this.setState({ result: Mock.Random.float(+min, +max, +pointMin, +pointMax) });
  };

  render() {
    const { min, max, result, pointMin, pointMax } = this.state;
    const {
      onChangeMin,
      onChangeMax,
      getData,
      onChangePointMin,
      onChangePointMax,
    } = this;

    return (
      <div className="data-type">
        <p>
          <span className="label">最小值</span>
          <input type="text" value={min} onChange={onChangeMin} />
        </p>
        <p>
          <span className="label">最大值</span>
          <input type="text" value={max} onChange={onChangeMax} />
        </p>
        <p>
          <span className="label">小数点最小位数</span>
          <input type="text" value={pointMin} onChange={onChangePointMin} />
        </p>
        <p>
          <span className="label">小数点最大位数</span>
          <input type="text" value={pointMax} onChange={onChangePointMax} />
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
