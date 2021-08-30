import React, { Component } from "react";
import { Modal } from "antd";
import ClockItemDetail from "./components/ClockItemDetail";
import { iln8 } from "../../tools";
import { AlertOutlined } from "@ant-design/icons";
import "./index.scss";

export default class Clock extends Component {
  state = { clockList: [], modalType: "", isModalShow: false };

  showModel = (type) => {
    return () => {
      this.setState({ modalType: type, isModalShow: true });
    };
  };

  hideModal = () => {
    this.setState({ modalType: '', isModalShow: false });
  }

  render() {
    const { clockList, modalType, isModalShow } = this.state;
    const template =
      clockList.length === 0 ? (
        <div className="clock container">
          <div className="no-item">
            <AlertOutlined
              style={{ fontSize: "1rem", color: "rgba(0,0,0,0.5)" }}
            />
            <p className="mt5">
              暂时没有打卡项哦，来
              <span className="add-clock-item" onClick={this.showModel("add")}>
                新增
              </span>
              一个试试吧~
            </p>
          </div>
          <Modal
            visible={isModalShow}
            title={modalType === "add" ? iln8("clock.add") : iln8("clock.edit")}
            onCancel={this.hideModal}
            footer={null}
          >
            <ClockItemDetail />
          </Modal>
        </div>
      ) : (
        <div className="clock container">
          <Modal
            visible={isModalShow}
            title={modalType === "add" ? iln8("clock.add") : iln8("clock.edit")}
            onCancel={this.hideModal}
            footer={null}
          >
            <ClockItemDetail />
          </Modal>
        </div>
      );
    return template;
  }
}
