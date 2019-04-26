import React, { Component } from "react";
import Mock from "mockjs";

export default class String extends Component {
  state = {
    min: 10,
    max: 10,
    result: null,
    stringType: "中文"
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
    const { min, max, stringType } = this.state;
    this.setState({
      result:
        stringType === "中文"
          ? Mock.Random.cword(+min, +max)
          : Mock.Random.string(+min, +max)
    });
  };

  onChangeStringType = v => {
    this.setState({ stringType: v });
  };

  render() {
    const { min, max, result, stringType } = this.state;
    const {
      onChangeMin,
      onChangeMax,
      getData,
      onChangeStringType
    } = this;

    return (
      <div className="data-type">
        <div>
          <span className="label">类型</span>
          {["中文", "英文"].map((v, k) => {
            return (
              <div
                key={k}
                className="radio"
                onClick={onChangeStringType.bind(this, v)}
              >
                <input
                  type="radio"
                  value={v}
                  checked={stringType === v}
                  onChange={onChangeStringType.bind(this, v)}
                />
                {v}
              </div>
            );
          })}
        </div>
        <p>
          <span className="label">最小长度</span>
          <input type="text" value={min} onChange={onChangeMin} />
        </p>
        <p>
          <span className="label">最大长度</span>
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
