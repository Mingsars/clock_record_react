import React, { Component } from "react";
import Advator from "../Advator";
import Login from "../../components/Login";
import Regist from "../../components/Regist";
import { Button, Modal } from "antd";
import { iln8 } from "../../tools";
import "./index.less";

export default class Header extends Component {
  state = {
    pageTabs: ["pageTab.unKonw", "pageTab.clock"],
    activeTab: "pageTab.clock",
    isLogin: false,
    isModalShow: false, //  登录/注册弹窗是否可见
    modalType: "", // 点击的是登录还是注册
  };

  setActiveTab = (activeName) => {
    return () => {
      this.setState({ activeTab: activeName });
    };
  };

  showModel = (type) => {
    return () => {
      this.setState({ modalType: type, isModalShow: true });
    };
  };

  hideModal = () => {
    this.setState({ isModalShow: false });
  };

  handleCancel = () => {
    const { loginModal, registModal } = this;
    if (this.state.modalType === 'login') {
      loginModal.reset();
    } else {
      registModal.reset();
    }
    this.setState({ isModalShow: false });
  };

  changeModalType = (type) => {
    this.setState({ modalType: type });
  };

  changeLoginStatus = (status) => {
    this.setState({ isLogin: status });
  };

  render() {
    const { pageTabs, activeTab, isLogin, isModalShow, modalType } = this.state;
    const LoginTemplate = (
      <div className="flex flex-around flex-vertical-center line-height-80 full-height">
        <Button type="primary" onClick={this.showModel("login")}>
          {iln8("login.login")}
        </Button>

        <Button type="primary" onClick={this.showModel("regist")} danger>
          {iln8("login.freeRegist")}
        </Button>
      </div>
    );

    return (
      <div className="header">
        <div className="container header-body">
          <div className="logo gradient-text line-height-80">M & S</div>
          <div className="page-tabs">
            {pageTabs.map((tab, index) => (
              <div
                className={
                  activeTab === tab
                    ? "page-tab-item line-height-80 active"
                    : "page-tab-item line-height-80"
                }
                key={index}
                onClick={this.setActiveTab(tab)}
              >
                {iln8(tab)}
              </div>
            ))}
          </div>
          <div className="user">{isLogin ? <Advator changeLoginStatus={this.changeLoginStatus}/> : LoginTemplate}</div>
        </div>

        <Modal
          visible={isModalShow}
          title={
            modalType === "login" ? iln8("login.login") : iln8("login.regist")
          }
          onCancel={this.handleCancel}
          footer={null}
        >
          {modalType === "login" ? (
            <Login
              changeModalType={this.changeModalType}
              hideModal={this.hideModal}
              changeLoginStatus={this.changeLoginStatus}
              ref={c => this.loginModal = c}
            />
          ) : (
            <Regist
              changeModalType={this.changeModalType}
              hideModal={this.hideModal}
              ref={c => this.registModal = c}
            />
          )}
        </Modal>
      </div>
    );
  }
}
