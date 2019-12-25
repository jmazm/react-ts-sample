import { Layout, Menu, Button } from 'antd';
import React, { Component } from 'react';
import './index.less';
import CaseTree from './component/caseTree';
const { Header, Content, Sider } = Layout;

import testData from './data';

export default class Capsule extends Component {
  onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info);
  };
  render() {
    return (
      <Layout className="capsule-test-wrapper">
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '15px 0', background: '#fff', height: '100%' }}>
            <Sider width={250} style={{ background: '#fff', borderRight: '1px solid #eee' }}>
              <div className="sider-inner">
                <CaseTree data={testData} onSelect={this.onSelect} onCheck={this.onCheck} />
                <div className="btn-wrapper">
                  <Button type="primary">重置</Button>
                  <Button type="primary">确认</Button>
                </div>
              </div>

            </Sider>
            <Content style={{ padding: '0 24px' }}>Content</Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}