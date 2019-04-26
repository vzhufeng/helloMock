import React, { Component } from "react";
import Mock from "mockjs";
import { parseJson, parseObject } from "../util";

export default class Boolean extends Component {
  state = {
    result: "",
    numType: "int",
    stringType: "中文",
    dateType: "unix",
    numMax: 1000000,
    numMin: 0,
    pointMax: 4,
    pointMin: 0,
    stringMax: 20,
    stringMin: 1,
    arrayMax: 10,
    arrayMin: 1
  };

  componentDidMount = () => {
    document.onkeydown = function check() {
      if (event.keyCode === 9) {
        document.execCommand("insertHTML", false, "&nbsp;&nbsp;");
        return false;
      }
    };
  };

  getData = (kind) => {
    const {
      numMax,
      numMin,
      stringMin,
      stringMax,
      stringType,
      numType,
      dateType,
      pointMin,
      pointMax
    } = this.state;
    switch (kind) {
      case "string":
        return stringType === "中文"
          ? Mock.Random.cword(+stringMin, +stringMax)
          : Mock.Random.string(+stringMin, +stringMax);

      case "number":
        return numType === "int"
          ? Mock.Random.integer(+numMin, +numMax)
          : Mock.Random.float(+numMin, +numMax, +pointMin, +pointMax);

      case "bool":
        return Mock.Random.boolean();

      case "address":
        return Mock.Random.city(true);

      case "color":
        return Mock.Random.color();

      case "url":
        return Mock.Random.url();

      case "email":
        return Mock.Random.email();

      case "datetime":
        switch (dateType) {
          case "date time":
            return Mock.Random.date() + " " + Mock.Random.time();
          case "date":
            return Mock.Random.date();
          case "time":
            return Mock.Random.time();
          case "unix":
            const now = new Date().getTime();
            return Mock.Random.integer(+now - 500000000000, +now);
        }

      case "ip":
        return Mock.Random.ip();

      case "name":
        return Mock.Random.cname();

      default:
        return Mock.Random.integer(+numMin, +numMax);
    }
  };

  getMockData = input => {
    let mockData = {};
    const that = this;
    const { arrayMin, arrayMax } = this.state;
    function walk(node, parent) {
      const arr = Object.keys(node);
      for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const ele = node[key];
        if (toString.call(ele) === "[object Object]") {
          parent[key] = {};
          walk(ele, parent[key]);
        } else if (toString.call(ele) === "[object Array]") {
          const repeat = Mock.Random.integer(+arrayMin, +arrayMax);
          parent[key] = [];
          for (let j = 0; j < repeat; j++) {
            parent[key][j] = {};
            walk(ele[0], parent[key][j]);
          }
        } else {
          parent[key] = that.getData(ele);
        }
      }
    }
    // 根节点可能是对象或者数组
    if (toString.call(input) === "[object Object]") {
      walk(input, mockData);
    } else if (toString.call(input) === "[object Array]") {
      const repeat = Mock.Random.integer(+arrayMin, +arrayMax);
      mockData = [];
      for (let j = 0; j < repeat; j++) {
        mockData[j] = {};
        walk(input[0], mockData[j]);
      }
    }
    this.setState({ result: JSON.stringify(mockData, undefined, 1) });
    // return mockData;
  };

  generate = () => {
    let templ = document.querySelector(".templ-input").innerHTML;
    templ = templ.replace(/<[a-z\/\s]+>/gi, "");
    templ = templ.replace(/&nbsp;/gi, "");

    let obj = {};
    let temp = 1;
    try {
      obj = JSON.parse(templ);
      temp = 2;
    } catch (e) {}

    if (temp === 2) {
      this.getMockData(parseJson(obj));
    } else {
      try {
        this.getMockData(parseObject(templ));
      } catch (e) {
        alert("解析出错，请检查输入的格式");
      }
    }
  };

  copy = () => {
    const contentHolder = document.getElementById("content-holder");
    const range = document.createRange();
    const selection = window.getSelection();
    selection.removeAllRanges();
    range.selectNodeContents(contentHolder);
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  onChangeNumType = v => {
    this.setState({ numType: v });
  };

  onChangeStringType = v => {
    this.setState({ stringType: v });
  };

  onChangeDateType = v => {
    this.setState({ dateType: v });
  };

  onChangeNumMax = e => {
    const v = e.target.value;
    this.setState({ numMax: v.replace(/[^\d-]/g, "") });
  };

  onChangeNumMin = e => {
    const v = e.target.value;
    this.setState({ numMin: v.replace(/[^\d-]/g, "") });
  };

  onChangePointMax = e => {
    const v = e.target.value;
    this.setState({ pointMax: v.replace(/[^\d]/g, "") });
  };

  onChangePointMin = e => {
    const v = e.target.value;
    this.setState({ pointMin: v.replace(/[^\d]/g, "") });
  };

  onChangeStringMax = e => {
    const v = e.target.value;
    this.setState({ stringMax: v.replace(/[^\d]/g, "") });
  };

  onChangeStringMin = e => {
    const v = e.target.value;
    this.setState({ stringMin: v.replace(/[^\d]/g, "") });
  };

  onChangeArrayMax = e => {
    const v = e.target.value;
    this.setState({ arrayMax: v.replace(/[^\d]/g, "") });
  };

  onChangeArrayMin = e => {
    const v = e.target.value;
    this.setState({ arrayMin: v.replace(/[^\d]/g, "") });
  };

  renderTop = () => {
    const {
      numType,
      stringType,
      dateType,
      numMin,
      numMax,
      stringMin,
      stringMax,
      arrayMin,
      arrayMax,
      pointMin,
      pointMax
    } = this.state;
    const {
      onChangeNumType,
      onChangeStringType,
      onChangeDateType,
      onChangeNumMin,
      onChangeNumMax,
      onChangeStringMin,
      onChangeStringMax,
      onChangeArrayMin,
      onChangeArrayMax,
      onChangePointMax,
      onChangePointMin
    } = this;

    const jsonStr = `
{
  "a": "number",
  "b": "string",
  "c": {
    "d": {
      "e": "bool"
    }
  },
  "f": {
    "g": [
      {
        "h": "address"
      }
    ]
  },
  "i": "color",
  "j": "url",
  "k": "datetime",
  "m": "email",
  "n": "ip",
  "o": "name"
}
`;

    const objStr = `
{
  a: number,
  b: string,
  c: {
    d: {
      e: bool
    }
  },
  f: {
    g: [
      {
        h: address
      }
    ]
  },
  i: color,
  j: url,
  k: datetime,
  m: email,
  n: ip,
  o: name
}
`;

    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p>输出设置</p>
          <div className="templ-config">
            <p>number</p>
            <div>
              <span className="label">类型</span>
              {["int", "float"].map((v, k) => {
                return (
                  <div
                    key={k}
                    className="radio"
                    onClick={onChangeNumType.bind(this, v)}
                  >
                    <input
                      type="radio"
                      value={v}
                      checked={numType === v}
                      onChange={onChangeNumType.bind(this, v)}
                    />
                    {v}
                  </div>
                );
              })}
            </div>
            <div>
              <p>
                <span className="label">最小值</span>
                <input type="text" value={numMin} onChange={onChangeNumMin} />
              </p>
              <p>
                <span className="label">最大值</span>
                <input type="text" value={numMax} onChange={onChangeNumMax} />
              </p>
              <p>
                <span className="label">小数点最小位数</span>
                <input
                  type="text"
                  value={pointMin}
                  onChange={onChangePointMin}
                />
              </p>
              <p>
                <span className="label">小数点最大位数</span>
                <input
                  type="text"
                  value={pointMax}
                  onChange={onChangePointMax}
                />
              </p>
            </div>
          </div>
          <div className="templ-config">
            <p>string</p>
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
            <div>
              <p>
                <span className="label">最小长度</span>
                <input
                  type="text"
                  value={stringMin}
                  onChange={onChangeStringMin}
                />
              </p>
              <p>
                <span className="label">最大长度</span>
                <input
                  type="text"
                  value={stringMax}
                  onChange={onChangeStringMax}
                />
              </p>
            </div>
          </div>
          <div className="templ-config">
            <p>datetime</p>
            {["date time", "date", "time", "unix"].map((v, k) => {
              return (
                <div
                  key={k}
                  className="radio"
                  onClick={onChangeDateType.bind(this, v)}
                >
                  <input
                    type="radio"
                    value={v}
                    checked={dateType === v}
                    onChange={onChangeDateType.bind(this, v)}
                  />
                  {v}
                </div>
              );
            })}
          </div>
          <div className="templ-config">
            <p>数组配置</p>
            <div>
              <p>
                <span className="label">最小元素个数</span>
                <input
                  type="text"
                  value={arrayMin}
                  onChange={onChangeArrayMin}
                />
              </p>
              <p>
                <span className="label">最大元素个数</span>
                <input
                  type="text"
                  value={arrayMax}
                  onChange={onChangeArrayMax}
                />
              </p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p>输入示例</p>
          <div style={{marginBottom: '10px'}}>
            支持两种输出格式，json格式和对象格式，支持string, number, bool,
            address, color, url, datetime, email, ip,
            name这几种格式，属性值只能填上述值，输入其他属性值不会检测，会输出数字。对象格式输入时请勿带引号
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <div>json:</div>
              <pre>{jsonStr}</pre>
            </div>
            <div style={{ flex: 1 }}>
              <div>对象:</div>
              <pre>{objStr}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { result } = this.state;
    const { generate, copy } = this;

    return (
      <div className="data-type">
        {this.renderTop()}
        <div contentEditable="true" className="templ-input" />
        <button className="button" onClick={generate}>
          生成
        </button>
        <button className="button" onClick={copy}>
          复制
        </button>
        <pre id="content-holder">{result}</pre>
      </div>
    );
  }
}
