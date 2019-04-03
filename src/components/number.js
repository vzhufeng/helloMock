import React, { Component } from "react";
import Mock from"mockjs";

export default class Number extends Component {
  state = {
    min: 0,
    max: 100,
    result: null,
    random: null,
    pointMin: 0,
    pointMax: 4,
  };

  onChangeMax = e => {
    const v = e.target.value;
    this.setState({ max: v.replace(/[^\d]/g, "") });
  };

  onChangeMin = e => {
    const v = e.target.value;
    this.setState({ min: v.replace(/[^\d]/g, "") });
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
    let data = Mock.mock({
      [`number|${min}-${max}.${pointMin}-${pointMax}`]: 1
    });
    this.setState({ result: data.number });
  };

  randomData = ()=>{
    this.setState({ random: Mock.mock('@float(0, 1000000, 0, 8)') });
  }

  render() {
    const { min, max, result, random, pointMin, pointMax } = this.state;
    const {
      onChangeMin,
      onChangeMax,
      getData,
      randomData,
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
          <span className="label">小数位数下限</span>
          <input type="text" value={pointMin} onChange={onChangePointMin} />
        </p>
        <p>
          <span className="label">小数位数上限</span>
          <input type="text" value={pointMax} onChange={onChangePointMax} />
        </p>
        <p>
          <button className="button" onClick={getData}>
            生成
          </button>
          <span className="result">{result}</span>
        </p>
        <p>
          <button className="button" onClick={randomData}>
            随机
          </button>
          <span className="result">{random}</span>
        </p>
      </div>
    );
  }
}
