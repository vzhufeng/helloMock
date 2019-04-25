import React, { Component } from "react";
import Mock from "mockjs";
import { parseJson, parseObject } from "../util";

export default class Boolean extends Component {
  state = {
    result: ""
  };

  componentDidMount = () => {
    document.onkeydown = function check() {
      if (event.keyCode === 9) {
        document.execCommand("insertHTML", false, "&nbsp;&nbsp;");
        return false;
      }
    };
  };

  getData = (kind, min, max) => {
    switch (kind) {
      case "string":
        return Mock.Random.string(1, 150);

      case "number":
        return max
          ? Mock.Random.integer(min, max)
          : Mock.Random.integer(0, 10000000);

      case "bool":
        return Mock.Random.boolean();

      default:
        return Mock.Random.integer(0, 10000000);
    }
  };

  getMockData = input => {
    let mockData = {};
    const that = this;
    function walk(node, parent) {
      const arr = Object.keys(node);
      for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const ele = node[key];
        if (toString.call(ele) === "[object Object]") {
          parent[key] = {};
          walk(ele, parent[key]);
        } else if (toString.call(ele) === "[object Array]") {
          const repeat = that.getData("number", 1, 15);
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
      const repeat = that.getData("number", 1, 15);
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
        alert('解析出错，请检查输入的格式')
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

  render() {
    const { result } = this.state;
    const { generate, copy } = this;

    return (
      <div className="data-type">
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
