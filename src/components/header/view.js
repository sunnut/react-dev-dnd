import React from 'react';
import { Dropdown, Icon, Menu, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import * as LocalStorage from '../../util/localstorage';
import styles from './header.module.css';

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/home/setting">
        <Icon type="setting" />&nbsp;偏好设置
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link to="/login">
        <Icon type="poweroff" />&nbsp;退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

const addMenu = (menuItem) => {
  console.log('-----');
};

const Header = ({collapsed, setCollapsed}) => {
  return (
    <div className={styles['header-wrapper']}>
      <Tooltip placement="bottom" title={collapsed ? '展开' : '收缩'}>
        <span className={styles['header-collapsed']} onClick={() => setCollapsed(!collapsed)}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
      </Tooltip>
      <Tooltip placement="bottom" title="添加菜单">
        <span className={styles['header-collapsed']} onClick={() => addMenu({
          "icon": "area-chart",
          "key": "menu-new-" + new Date().getTime(),
          "label": "New Menu",
          "url": "/home/overview/test"
        })}>
          <Icon type="plus" />
        </span>
      </Tooltip>
      <div className={styles['header-user-info']}>
        <Dropdown overlay={menu} placement="bottomRight">
          <span className={styles['header-dropdown-link']}>
            <Icon type="user" /> {LocalStorage.get('TA-username') } <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;