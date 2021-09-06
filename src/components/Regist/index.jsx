import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { iln8 } from "../../tools";
import IdentifyCode from "../IdentifyCode";
import { userRegist } from "../../servers/login";
import InputWithLabel from '../InputWithLabel'
import "./index.less";

export default class Login extends Component {
  state = { registBtnLoading: false };

  onFinish = (val) => {
    const { hideModal } = this.props;
    const { identifyEle } = this;
    this.setState({ registBtnLoading: true });
    const { identifyCode } = val;
    if (!identifyEle.checkCode(identifyCode)) {
      message.error("验证码错误");
      this.setState({ registBtnLoading: false });
    } else {
      userRegist(val)
        .then((res) => {
          message.success(res.msg);
          hideModal();
        })
        .catch((err) => {
          message.error(err.msg);
        })
        .finally((_) => {
          this.setState({ registBtnLoading: false });
        });
    }
  };

  submit = () => {
    const { hideModal, changeModalType } = this.props;
    const { username, password, identifyCode, identifyEle } = this;
    const valOfUsername = username.state.value;
    const valOfPassword = password.state.value;
    const valOfIdentifyCode = identifyCode.state.value;
    if (!valOfUsername) {
      return message.info('请输入账号');
    } else if (!valOfPassword) {
      return message.info('请输入密码');
    } else if (!identifyEle.checkCode(valOfIdentifyCode)) {
      message.error("验证码错误");
    } else {
      this.setState({ registBtnLoading: true });
      userRegist({
        username: valOfUsername,
        password: valOfPassword,
      })
        .then((res) => {
          message.success(res.msg);
          changeModalType('login');
        })
        .catch((err) => {
          message.error(err.msg);
        })
        .finally((_) => {
          this.setState({ registBtnLoading: false });
        });
    }
  }

  onFinishFailed = () => {
    message.error(iln8("login.loginFailed"));
  };

  login = () => {
    const { changeModalType } = this.props;
    changeModalType("login");
  };
  render() {
    const { registBtnLoading } = this.state;
    return (
      <div className="regist-modal">
        <div className="modal-item">
          <InputWithLabel label="账号" ref={c => this.username = c} />
        </div>

        <div className="modal-item mt20">
          <InputWithLabel label="密码" type="password" ref={c => this.password = c} />
        </div>

        <div className="modal-item mt20">
          <InputWithLabel label="验证码" addonAfter={
            <IdentifyCode
              ref={(c) => (this.identifyEle = c)}
              canvasWidth={100}
              canvasHeight={38}
            />
          } ref={c => this.identifyCode = c} />
        </div>

        <div className="modal-item mt10">
          <Button
            type="primary"
            onClick={this.submit}
            block
            loading={registBtnLoading}
          >
            {iln8("login.freeRegist")}
          </Button>
        </div>

        <div className="has-account mt5">
          {iln8("login.hasAccount")}?{" "}
          <a href onClick={this.login}>
            {iln8("login.login")}
          </a>
        </div>

      </div>
    );
  }
}
