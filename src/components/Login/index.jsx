import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { iln8 } from "../../tools";
import { userLogin } from "../../servers/login";
import "./index.less";

export default class Login extends Component {
  state = {loginBtnLoading: false}

  onFinish = (val) => {
    const { hideModal, changeLoginStatus } = this.props;
    this.setState({loginBtnLoading: true});
    userLogin(val).then(res => {
      this.setState({loginBtnLoading: false});
      message.success(res.msg);
      changeLoginStatus(true);
      hideModal();
    }).catch(err => {
      this.setState({loginBtnLoading: false});
      message.error(err.msg);
    })
  };

  onFinishFailed = () => {
    message.error(iln8("login.loginFailed"));
  };

  forgetPassword = () => {
    message.info(iln8("login.forgetPassword"));
  };

  regist = () => {
    const { changeModalType } = this.props;
    changeModalType('regist');
  }
  render() {
    const { loginBtnLoading } = this.state;
    return (
      <div className="login-modal">
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
            <Input placeholder="账号"/>
          </Form.Item>

          <Form.Item
            label={iln8("login.password")}
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="密码"/>
          </Form.Item>

          <div className="flex flex-center">
            <a href className="forget-password" onClick={this.forgetPassword}>
              忘记密码
            </a>
          </div>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit" block loading={loginBtnLoading}>
              {iln8("login.login")}
            </Button>
          </Form.Item>

          <div className="no-account">
            {iln8("login.noAccount")}? <a href onClick={this.regist}>{ iln8('login.regist') }</a>
          </div>
        </Form>
      </div>
    );
  }
}
