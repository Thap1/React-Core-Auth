import { Button, Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Item from "antd/lib/list/Item";
import React, { useState } from "react";
import PropTypes from "prop-types";

const LeftMenu = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <Button onClick={toggleCollapsed}>Collapsed</Button>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu
            defaultSelectedKeys={["1"]}
            theme='dark'
            // inlineCollapsed={collapsed}
            mode='inline'>
            <Menu.Item>
              <div>Item 1</div>
            </Menu.Item>
            <Menu.Item>
              <div>Item 2</div>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Menu>
            <Item>{children}</Item>
          </Menu>
        </Content>
      </Layout>
    </div>
  );
};

LeftMenu.propTypes = {
  children: PropTypes.node,
};

export default LeftMenu;
