import React, { Component } from "react";
import Mock from "mockjs";

export default class Boolean extends Component {
  state = {
    color: null,
    url: null,
    email: null,
    ip: null,
    city: null,
    cname: null,
  };

  getEmail = () => {
    const email = Mock.mock('@email()');
    this.setState({ email });
  }

  getCname = () => {
    const cname = Mock.mock('@cname()');
    this.setState({ cname });
  }

  getCity = () => {
    const city = Mock.mock('@city(true)');
    this.setState({ city });
  }

  getIp = () => {
    const ip = Mock.mock('@ip()');
    this.setState({ ip });
  }

  getColor = () => {
    const color = Mock.mock('@color()');
    this.setState({ color });
  };

  getUrl = () => {
    const url = Mock.mock('@url()');
    this.setState({ url });
  };

  render() {
    const { color, url, email, ip, city, cname } = this.state;
    const { getColor, getUrl, getEmail, getIp, getCity, getCname } = this;

    return (
      <>
        <div className="data-type">
          <p>颜色</p>
          <p>
            <button className="button" onClick={getColor}>
              生成
          </button>
            <span className="result">{color}</span>
            {color && <span className="color-dot" style={{ backgroundColor: color }}>&nbsp;</span>}
          </p>
        </div>
        <div className="data-type">
          <p>URL</p>
          <p>
            <button className="button" onClick={getUrl}>
              生成
          </button>
            <span className="result">{url}</span>
          </p>
        </div>
        <div className="data-type">
          <p>Email</p>
          <p>
            <button className="button" onClick={getEmail}>
              生成
          </button>
            <span className="result">{email}</span>
          </p>
        </div>
        <div className="data-type">
          <p>Ip地址</p>
          <p>
            <button className="button" onClick={getIp}>
              生成
          </button>
            <span className="result">{ip}</span>
          </p>
        </div>
        <div className="data-type">
          <p>省市</p>
          <p>
            <button className="button" onClick={getCity}>
              生成
          </button>
            <span className="result">{city}</span>
          </p>
        </div>
        <div className="data-type">
          <p>姓名</p>
          <p>
            <button className="button" onClick={getCname}>
              生成
          </button>
            <span className="result">{cname}</span>
          </p>
        </div>
      </>
    );
  }
}
