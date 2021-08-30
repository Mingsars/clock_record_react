import React, { Component } from 'react'

export default class IdentifyCode extends Component {

  state = {identifyCode: '', ctx: null,}
  componentDidMount() {
    const { canvasEle } = this;
    this.setState({ ctx: canvasEle.getContext('2d') });
    setTimeout(() => {
      this.setCode();
    }, 0);
  }

  getCode = () => {
    let res = '';
    for (let i = 0; i < 4; i++) {
      res = res + Math.floor(Math.random() * 10);
    }
    this.setState({identifyCode: res});
    return res;
  }

  setCode = (code) => {
    const newCode = code || this.getCode();
    const { canvasWidth, canvasHeight } = this.props;
    const { ctx } = this.state;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const textContentWidth = Math.fround(ctx.measureText(newCode).width);
    ctx.font = `0.2rem bold`;
    ctx.fillText(newCode, (canvasWidth - textContentWidth) / 2 - 10, canvasHeight - 10); 
  }

  checkCode = (code) => {
    return code === this.state.identifyCode;
  }

  render() {
    const {canvasWidth, canvasHeight} = this.props;
    return (
      <div style={{height: `${canvasHeight}px`}}>
        <canvas id="idenfity-code" ref={c => this.canvasEle = c} width={canvasWidth} height={canvasHeight}></canvas>
      </div>
    )
  }
}
