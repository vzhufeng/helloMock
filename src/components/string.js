import React, { Component } from "react";
import Mock from "mockjs";
import { stringArr } from "./const";

export default class String extends Component {
  state = {
    min: 1,
    max: 1,
    result: null,
    random: null,
    sentence: null,
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
    let data = Mock.mock({
      [`string|${min}-${max}`]: str
    });
    this.setState({ result: data.string });
  };

  getSentence = () => {
    this.setState({ sentence: Mock.mock('@boolean()') ? Mock.mock('@paragraph(1, 6)') : Mock.mock('@cparagraph(1, 6)') });
  };

  randomData = ()=>{
    this.setState({ random: Mock.mock('@string(1, 50)') });
  }

  render() {
    const { min, max, result, random, sentence } = this.state;
    const { onChangeMin, onChangeMax, getData, randomData, getSentence } = this;

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
        <p>
          <button className="button" onClick={randomData}>
            随机（扩展下有bug）
          </button>
          <span className="result">{random}</span>
        </p>
        <p>
          <button className="button" onClick={getSentence}>
            长文本
          </button>
          <span className="result">{sentence}</span>
        </p>
      </div>
    );
  }
}
