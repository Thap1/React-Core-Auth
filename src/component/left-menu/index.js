import { Button, Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const LeftMenu = (prop) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { menuLists, children } = prop;

  const handleClickItem = (element) => {
    history.push(element.key);
    console.log("menuPath:::", element.key);
  };

  const menu = (param) => {
    if (param) {
      return (
        <Menu
          onClick={handleClickItem}
          defaultSelectedKeys={["1"]}
          theme='dark'
          mode='inline'>
          {param.map((menuItem) => {
            return (
              <Menu.Item key={menuItem.menuPath}>
                <span>{menuItem.menuName}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      );
    }
  };

  return (
    <div>
      <Layout>
        <Sider collapsed={collapsed}>
          <Button onClick={toggleCollapsed}>click</Button>
          {menu(menuLists)}
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </div>
  );
};

LeftMenu.propTypes = {
  children: PropTypes.node,
  menuLists: PropTypes.any,
};

export default LeftMenu;
