import { Tree } from 'antd';
import React, { Component } from 'react';
import '../index.less';
const { TreeNode } = Tree;


interface IProps {
  data: any;
  onSelect: (selectedKeys: string, info: any) => void;
  onCheck: (checkedKeys: string, info: any) => void;
}

export default class TestCaseTree extends Component<IProps, any> {
  onSelect = (selectedKeys: any, info: any) => {
    this.props.onSelect(selectedKeys, info);
  };

  onCheck = (checkedKeys: any, info: any) => {
    this.props.onCheck(checkedKeys, info);
  };

  getParentNodeData = () => {
    const { data } = this.props;
    return Object.keys(data);
  }

  getChildNodeData = (parent: string): string[] => {
    const { data } = this.props;
    return data[parent];
  }

  render() {
    return (
      <div className="tree-wrapper">
        <Tree
          checkable={true}
          defaultExpandAll={true}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          {
            this.getParentNodeData().map((parent, pIndex) => {
              return (
                <TreeNode title={parent} key={`${pIndex}`}>
                  {
                    this.getChildNodeData(parent).map((child, cIndex) => {
                      return <TreeNode title={child} key={`${pIndex}-${cIndex}`} />;
                    })
                  }
                </TreeNode>
              );
            })
          }
        </Tree>
      </div>
    );
  }
}