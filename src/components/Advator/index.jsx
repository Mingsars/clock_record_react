import React, { Component } from "react";
import { Menu, Dropdown, message } from "antd";
import { LogoutOutlined, SettingFilled } from "@ant-design/icons";
import { userLogout } from "../../servers/login";
import { iln8 } from "../../tools";
import "./index.less";

export default class Advator extends Component {
  state = {
    menus: [
      {
        name: "menu.config",
        icon: <SettingFilled />,
      },
      {
        name: "menu.logout",
        icon: <LogoutOutlined />,
      },
    ],
    userInfo: {
      advatorUrl:
        "https://pics0.baidu.com/feed/91ef76c6a7efce1be2ad4625e3def4d7b68f65f7.jpeg?token=d9a9ca5daac6123f84b795371e32c82b",
      name: "超级管理员",
      vip: 5,
    },
  };

  getHandle = (name) => {
    if (name === "menu.config") {
      return this.userConfig;
    } else if (name === "menu.logout") {
      return this.logout;
    }
  };

  userConfig = () => {
    console.log("用户设置");
  };

  logout = () => {
    const { changeLoginStatus } = this.props;
    userLogout().then((res) => {
      message.success(res.msg);
      changeLoginStatus(false);
    });
  };

  render() {
    const { menus, userInfo } = this.state;
    const menu = (
      <Menu>
        {menus.map((item, index) => (
          <Menu.Item key={index} onClick={this.getHandle(item.name)}>
            <span className="mr5">{iln8(item.name)}</span>
            <span style={{ float: "right" }}>{item.icon}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
    const templete = userInfo.vip > 0 ? (
      <div className="user-info">
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <div className="user-advator">
            <img src={userInfo.advatorUrl} alt="" />
          </div>
        </Dropdown>
        <div className="user-vip-label vip-text">Vip{userInfo.vip}</div>
        <div
        className="user-name vip-text user-name-vip"
        >
          {userInfo.name}
        </div>
      </div>
    ) : (
      <div className="user-info">
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <div className="user-advator">
            <img src={userInfo.advatorUrl} alt="" />
          </div>
        </Dropdown>
        <div
        className="user-name"
        >
          {userInfo.name}
        </div>
      </div>
    )
    return templete
  }
}
