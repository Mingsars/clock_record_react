import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { iln8 } from "../../tools";
import { userLogin } from "../../servers/login";
import InputWithLabel from '../InputWithLabel'
import "./index.less";

export default class Login extends Component {
  state = { loginBtnLoading: false }

  submit = () => {
    const { hideModal, changeLoginStatus } = this.props;
    const { username, password } = this;
    const valOfUsername = username.state.value;
    const valOfPassword = password.state.value;
    if (!valOfUsername) {
      return message.info('请输入账号');
    } else if (!valOfPassword) {
      return message.info('请输入密码');
    } else {
      this.setState({ loginBtnLoading: true });
      userLogin({
        username: valOfUsername,
        password: valOfPassword,
      }).then(res => {
        this.setState({ loginBtnLoading: false });
        message.success(res.msg);
        changeLoginStatus(true);
        hideModal();
      }).catch(err => {
        this.setState({ loginBtnLoading: false });
        message.error(err.msg);
      })
    }
  }

  forgetPassword = () => {
    message.info(iln8("login.forgetPassword"));
  };

  regist = () => {
    const { changeModalType } = this.props;
    changeModalType('regist');
  }

  reset = () => {
    const { username, password } = this
    username.reset();
    password.reset();
  }

  render() {
    const { loginBtnLoading } = this.state;
    return (
      <div className="login-modal">

        <div className="modal-item">
          <InputWithLabel label="账号" ref={c => this.username = c} />
        </div>

        <div className="modal-item mt20">
          <InputWithLabel label="密码" type="password" ref={c => this.password = c} />
        </div>

        <div className="modal-item flex flex-center mt5">
          <a href className="forget-password" onClick={this.forgetPassword}>
            忘记密码
            </a>
        </div>

        <div className="modal-item">
          <Button type="primary" onClick={this.submit} block loading={loginBtnLoading}>
            {iln8("login.login")}
          </Button>
        </div>

        <div className="mt10 no-account">
          {iln8("login.noAccount")}? <a href onClick={this.regist}>{iln8('login.regist')}</a>
        </div>
      </div>
    );
  }
}
