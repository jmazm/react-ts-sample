import React, { Component } from 'react';
// import SelectBox from './components/selectBox';

export default class MagnifyingGlass extends Component {
  // private glass: any;
  // private zoom: number = 1.5;

  public state = {
    imgSrc: '',
    glassX: 0,
    glassY: 0,
    glassWidth: 0,
    glassHeight: 0
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    // const { slideWidth, slideHeight } = this.props.model.getSlideSize();
    // const { imgSrc, glassX, glassY, glassWidth, glassHeight, isActiveCloseLight } = props.model.get(['imgSrc', 'glassX', 'glassY', 'glassWidth', 'glassHeight']);
    // const glassWrapperStyle = {
    //   width: `${slideWidth}px`,
    //   height: `${slideHeight}px`
    // };
    // const glassStyle = {
    //   width: `${glassWidth}px`,
    //   height: `${glassHeight}px`,
    //   transform: `translate(${glassX}px, ${glassY}px)`,
    // };

    // const { bigImageX, bigImageY } = this.getBigImagePos();
    // const glassImgStyle = {
    //   width: `${this.zoom * slideWidth}px`,
    //   height: `${this.zoom * slideHeight}px`,
    //   transform: `translate(${bigImageX}px, ${bigImageY}px)`,
    // };
    // return (
    //   <div className='enow__magnifying-glass' style={glassWrapperStyle}>
    //     {/* 背景图 */}
    //     <div className="bg-wrapper">
    //       <img className="bg" src={imgSrc} />
    //     </div>
    //     <div className="glass-wrapper">
    //       <div className={`glass-mask ${isActiveCloseLight ? 'close-light' : ''}`}>
    //         <div className="glass-img-wrapper" ref={el => this.glass = el} style={glassStyle}>
    //           <img className="glass-img" src={imgSrc} style={glassImgStyle} />
    //         </div>
    //         <SelectBox {
    //           ...{
    //             glassWidth,
    //             glassHeight,
    //             glassY,
    //             glassX,
    //           }
    //         }/>
    //       </div>
    //     </div>
    //   </div>
    // );
    return <div />;
  }
}