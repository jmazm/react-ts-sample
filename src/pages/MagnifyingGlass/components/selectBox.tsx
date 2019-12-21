import React, {Component} from 'react';
import '../style/index.less';

interface Props {
    glassWidth: number;
    glassHeight: number;
    glassY: number;
    glassX: number;
}

export default class ComponentRenderer extends Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  public render() {
    const { glassWidth, glassHeight, glassY, glassX } = this.props;
    const boxStyle = {
        width: `${glassWidth + 5 * 2}px`,
        height: `${glassHeight + 5 * 2}px`,
        transform: `translate(${glassX - 5}px, ${glassY - 5}px)`
    };

    const lineSize = 5;
    const topSize = {
        width: `${glassWidth}px`,
        height: `${lineSize}px`,
        transform: `translate(${5}px, 0)`
    };

    const rightSize = {
        width: `${lineSize}px`,
        height: `${glassHeight}px`,
        transform: `translate(${glassWidth + 5}px, 2px)`
    };

    const bottomSize = {
        width: `${glassWidth}px`,
        height: `${lineSize}px`,
        transform: `translate(${5}px, ${glassHeight + 5}px)`
    };

    const leftSize = {
        width: `${lineSize}px`,
        height: `${glassHeight}px`,
        transform: `translate(0, 2px)`
    };

    return (
        <div className="glass-select-box" style={boxStyle}>
            <div className="glass-frame"></div>
            <div className="glass-select-line line-top" style={topSize}></div>
            <div className="glass-select-line line-right" style={rightSize}></div>
            <div className="glass-select-line line-bottom" style={bottomSize}></div>
            <div className="glass-select-line line-left" style={leftSize}></div>
            <div className="glass-select-point point-left-top"></div>
            <div className="glass-select-point point-right-top"></div>
            <div className="glass-select-point point-left-bottom"></div>
            <div className="glass-select-point point-right-bottom"></div>
        </div>
    );
  }
}
