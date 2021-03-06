import React, { Component } from "react";
import { Modal, message } from "antd";
import ClockItemDetail from "./components/ClockItemDetail";
import { iln8 } from "../../tools";
import { AlertOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { Input, Spin } from 'antd'
import { userClock, getUserClockList } from '../../servers/clock'
import "./index.scss";

const { TextArea } = Input;

export default class Clock extends Component {
  componentDidMount() {
    this.getClockList();
  }

  state = {
    clockList: [], modalType: "", isModalShow: false, clockBtnLoading: false, contentLoading: false,
  };

  showModel = (type) => {
    return () => {
      this.setState({ modalType: type, isModalShow: true });
    };
  };

  hideModal = () => {
    this.setState({ modalType: '', isModalShow: false });
  }

  clock = (data) => {
    if (this.state.clockBtnLoading) return;
    return () => {
      this.setState({ clockBtnLoading: true });
      userClock(data).then(res => {
        message.success(res.msg);
        this.getClockList();
      }).finally(() => {
        this.setState({ clockBtnLoading: false });
      })
    }
  }

  getClockList = () => {
    this.setState({ contentLoading: true });
    getUserClockList().then(res => {
      this.setState({ clockList: res.data });
      this.setState({ contentLoading: false });
    })
  }

  render() {
    const { clockList, modalType, isModalShow, clockBtnLoading, contentLoading } = this.state;
    const numOfHaveDone = clockList.filter(item => item.isCheck).length;
    const template =
      clockList.length === 0 ? (
        <Spin spinning={contentLoading}>
          <div className="clock">
            <div className="clock-content container">
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
            </div>
            <Modal
              visible={isModalShow}
              title={modalType === "add" ? iln8("clock.add") : iln8("clock.edit")}
              onCancel={this.hideModal}
            >
              <ClockItemDetail />
            </Modal>
          </div>
        </Spin>
      ) : (
          <Spin spinning={contentLoading}>
            <div className="clock">
              <div className="clock-content container flex flex-wrap">
                <div className="list-count">今日已完成 <label className="has-done">{numOfHaveDone}</label>  / <label className="all-count">{clockList.length}</label></div>
                {
                  clockList.map((item) => {
                    if (item.isCheck) {
                      return (
                        <div className="clock-item" key={item.id}>
                          <h1 className="clock-item-title">{item.title}</h1>
                          <div className="clock-item-mask">备注：{item.mask}</div>
                          <div className="clock-item-btn clock-item-done mt20 flex flex-center">
                            <span className="clock-submit-span">已完成 <CheckOutlined /></span>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="clock-item" key={item.id}>
                          <h1 className="clock-item-title">{item.title}</h1>
                          <TextArea rows={5} showCount maxLength={100} placeholder="写下打卡备注吧~" />
                          <div className="clock-item-btn clock-item-submit mt20 flex flex-center">
                            <Spin spinning={clockBtnLoading}>
                              <span className="clock-submit-span" onClick={this.clock(item)}>打卡</span>
                            </Spin>
                          </div>
                        </div>
                      )
                    }
                  })
                }
                <div className="clock-item-add">
                  <PlusOutlined onClick={this.showModel("add")} />
                </div>
              </div>
              <Modal
                visible={isModalShow}
                title={modalType === "add" ? iln8("clock.add") : iln8("clock.edit")}
                onCancel={this.hideModal}
              >
                <ClockItemDetail />
              </Modal>
            </div >
          </Spin>
        );
    return template;
  }
}
