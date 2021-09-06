import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { iln8 } from "../../tools";
import IdentifyCode from "../IdentifyCode";
import { userRegist } from "../../servers/login";
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
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label={iln8("login.username")}
            name="username"
            rules={[{ required: true, message: "请输入账号!" }]}
          >
            <Input size="large" placeholder="账号" />
          </Form.Item>

          <Form.Item
            label={iln8("login.password")}
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password size="large" placeholder="密码" />
          </Form.Item>

          <Form.Item
            label={iln8("login.identifyCode")}
            name="identifyCode"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <Input
              size="large"
              placeholder="验证码"
              addonAfter={
                <IdentifyCode
                  ref={(c) => (this.identifyEle = c)}
                  canvasWidth={100}
                  canvasHeight={38}
                />
              }
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={registBtnLoading}
            >
              {iln8("login.freeRegist")}
            </Button>
          </Form.Item>

          <div className="has-account">
            {iln8("login.hasAccount")}?{" "}
            <a href onClick={this.login}>
              {iln8("login.login")}
            </a>
          </div>
        </Form>
      </div>
    );
  }
}
