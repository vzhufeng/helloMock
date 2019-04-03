import React, { Component } from "react";
import Mock from "mockjs";

export default class DateComp extends Component {
  state = {
    resultDate: null,
    resultTime: null,
    resultUnix: null,
  };

  getUnix = () => {
    let now = new Date().getTime();
    let data = Mock.mock({
      [`number|${now - 500000000000}-${now}`]: 1
    });
    let info = new Date(data.number);
    this.setState({ resultUnix: `${data.number} ${info.getFullYear()}-${info.getMonth()+1}-${info.getDate()} ${info.getHours()}:${info.getMinutes()}:${info.getSeconds()}` });
  };

  getDate = () => {
    this.setState({ resultDate: Mock.mock('@date()') });
  };

  getTime = () => {
    this.setState({ resultTime: Mock.mock('@time()') });
  };

  render() {
    const { resultDate, resultTime, resultUnix } = this.state;
    const { getDate, getTime, getUnix } = this;

    return (
      <div className="data-type">
        <p>
          <button className="button" onClick={getDate}>
            生成日期
          </button>
          <span className="result">{resultDate}</span>
        </p>
        <p>
          <button className="button" onClick={getTime}>
            生成时间
          </button>
          <span className="result">{resultTime}</span>
        </p>
        <p>
          <button className="button" onClick={getUnix}>
            生成时间戳
          </button>
          <span className="result">{resultUnix}</span>
        </p>
      </div>
    );
  }
}
