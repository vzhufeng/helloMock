import React, { Component } from "react";
import Mock from "mockjs";

export default class Boolean extends Component {
  state = {
    image: null,
    color: '#000',
    bkColor: '#fff',
    content: 'hello mock',
    size: 34,
    width: 400,
    height: 300,
  };

  getImage = () => {
    const { width, height, color, bkColor, size, content } = this.state;
    const canvas = document.createElement('canvas');
    const contain = document.querySelector('.canvas-contain');
    // 每次先清除
    contain.innerHTML = '';

    canvas.id = "canvas-mock";
    // 放大2倍再缩小两倍，保证清晰
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);

    //背景
    ctx.fillStyle = bkColor;
    ctx.fillRect(0, 0, width, height);

    // 文本
    ctx.font = size + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(content, width / 2, height / 2);

    contain.appendChild(canvas)
  };

  onChangeContent = (e) => {
    const v = e.target.value.trim();
    this.setState({ content: v });
  };

  onChangeSize = (e) => {
    const v = e.target.value;
    this.setState({ size: v.replace(/[^\d]/g, "") });
  };

  onChangeWidth = (e) => {
    const v = e.target.value;
    this.setState({ width: v.replace(/[^\d]/g, "") });
  };

  onChangeHeight = (e) => {
    const v = e.target.value;
    this.setState({ height: v.replace(/[^\d]/g, "") });
  };

  onChangeColor = (e) => {
    const v = e.target.value.trim();
    this.setState({ color: v });
  };

  onChangeBkColor = (e) => {
    const v = e.target.value.trim();
    this.setState({ bkColor: v });
  };

  render() {
    const { iamge, width, height, color, content, bkColor, size } = this.state;
    const { getImage, onChangeContent, onChangeSize, onChangeColor, onChangeBkColor, onChangeHeight, onChangeWidth } = this;

    return (
      <div className="data-type">
        <div>
          <p>
            <span className="label">图片宽度</span>
            <input type="text" value={width} onChange={onChangeWidth} />
            <span className="label">图片高度</span>
            <input type="text" value={height} onChange={onChangeHeight} />
          </p>

          <p>
            <span className="label">文本内容</span>
            <input type="text" value={content} onChange={onChangeContent} />
            <span className="label">文本大小</span>
            <input type="text" value={size} onChange={onChangeSize} />
            <span className="label">文本颜色</span>
            <input type="text" value={color} onChange={onChangeColor} />
          </p>

          <p>
            <span className="label">背景颜色</span>
            <input type="text" value={bkColor} onChange={onChangeBkColor} />
          </p>

          <button className="button" onClick={getImage}>
            生成
          </button>
          <p style={{margin: '10px 0'}}>右键可保存</p>
          <div className="canvas-contain">{iamge}</div>
        </div>
      </div>
    );
  }
}
