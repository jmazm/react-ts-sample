import React, {Component} from 'react';
import SelectBox from './components/selectBox';
import { getPoint, getTransformData } from '../../utils';
import { MAX_1080P_GLASS_ZOOM_SIZE, MAX_720P_GLASS_ZOOM_SIZE, MIN_GLASS_ZOOM_SIZE, HOT_AREA_SIZE, LEFT_BOTTOM, LEFT_TOP, RIGHT_TOP, RIGHT_BOTTOM } from './const';

export default class MagnifyingGlass extends Component {
    private glass: any;
    private bgWrapper: any;
    private zoom: number = 1.5;
    private isMouseDown: boolean = false;
    private isGlassHotArea: boolean = false;
    private zoomOrientation: string = '';
    private mousePosX: number = 0;
    private mousePosY: number = 0;
    private slideWidth: number = 0;
    private slideHeight: number = 0;

    public state = {
        imgSrc: '',
        glassX: 0,
        glassY: 0,
        glassWidth: 370,
        glassHeight: 370
    };

    constructor (props: any) {
        super(props);
    }

    /**
     * 大图的位置
     */
    private getBigImagePos = () => {
        const { glassX, glassY, glassWidth, glassHeight } = this.state;
        const bigImageX = (glassX + glassWidth / 2) * this.zoom - glassWidth / 2;
        const bigImageY = (glassY + glassHeight / 2) * this.zoom - glassHeight / 2;
        return {
            bigImageX: -bigImageX,
            bigImageY: -bigImageY
        };
    }

    private scale = (e: any) => {
        const { translateX, translateY } = getTransformData(this.glass);
        const slideWidth = this.slideWidth;
        const glassObj = this.glass.getBoundingClientRect();
        const {clientX, clientY} = getPoint(e);
        const maxSize = slideWidth >= 1920 ? MAX_1080P_GLASS_ZOOM_SIZE : MAX_720P_GLASS_ZOOM_SIZE;
        let basicXDis = 0;
        let basicYDis = 0;
    
        // 根据缩放的方向，计算鼠标移动的相对位移
        switch (this.zoomOrientation) {
          case LEFT_TOP:
            basicXDis = this.mousePosX - clientX;
            basicYDis = this.mousePosY - clientY;
            break;
          case RIGHT_TOP:
            basicXDis = clientX - this.mousePosX;
            basicYDis = this.mousePosY - clientY;
            break;
          case RIGHT_BOTTOM:
            basicXDis = clientX - this.mousePosX;
            basicYDis = clientY - this.mousePosY;
            break;
          case LEFT_BOTTOM:
            basicXDis = this.mousePosX - clientX;
            basicYDis = clientY - this.mousePosY;
            break;
        }
    
        // 矫正因缩放导致鼠标位置发生偏移
        basicXDis = basicXDis;
        basicYDis = basicYDis;
    
        // 放大镜的宽度
        let width = glassObj.width + basicXDis * 2;
        // 放大镜的高度
        let height = glassObj.height + basicYDis * 2;
        // 放大镜的x坐标
        const x = translateX - basicXDis;
        // 放大镜的y坐标
        const y = translateY - basicYDis;
    
        // 宽度大于最大值
        if (width > maxSize) {
          // 重置为最大宽度
          width = maxSize;
        } else if (width < MIN_GLASS_ZOOM_SIZE) {
          width = MIN_GLASS_ZOOM_SIZE;
        } else {
          const rightLimit = (this.zoomOrientation === RIGHT_TOP || this.zoomOrientation === RIGHT_BOTTOM) && clientX >= glassObj.left - HOT_AREA_SIZE;
          const leftLimit = (this.zoomOrientation === LEFT_TOP || this.zoomOrientation === LEFT_BOTTOM) && clientX <= glassObj.right + HOT_AREA_SIZE;
    
          if (rightLimit || leftLimit) {
            this.setState({
                glassWidth: width,
                glassX: x,
            });
          }
        }
    
        if (height > maxSize) {
          height = maxSize;
        } else if (height < MIN_GLASS_ZOOM_SIZE) {
          height = MIN_GLASS_ZOOM_SIZE;
        } else {
          const topLimit = (this.zoomOrientation === LEFT_TOP || this.zoomOrientation === RIGHT_TOP) && clientY <= glassObj.top + HOT_AREA_SIZE + glassObj.height;
          const bottomLimit = (this.zoomOrientation === LEFT_BOTTOM || this.zoomOrientation === RIGHT_BOTTOM) && clientY >= glassObj.bottom - glassObj.height - HOT_AREA_SIZE;
    
          if (topLimit || bottomLimit) {
            this.setState({
                glassHeight: height,
                glassY: y,
            });
          }
        }

        this.mousePosX = clientX;
        this.mousePosY = clientY;
      }
    
      /**
       * 拖动放大镜
       */
      private dragGlass = (e: any) => {
        const {clientX, clientY} = getPoint(e);
        const { translateX, translateY } = getTransformData(this.glass);
        const { glassWidth, glassHeight } = this.state;
    
        // 这里需要除以stageRatio，因为画布缩放，导致鼠标的xy有偏移，需要矫正
        // translate不需要除以stageRatio，因为它是真实的值
        let newX = translateX + (clientX - this.mousePosX);
        let newY = translateY + (clientY - this.mousePosY);
        const slideWidth = this.slideWidth;
        const slideHeight = this.slideHeight;

        if (newX > slideWidth - glassWidth / 2) { // 右边界
          newX = slideWidth - glassWidth / 2;
        } else if (newX < (-glassWidth / 2)) { // 左边界
          newX = (-glassWidth / 2);
        }
    
        if (newY > slideHeight - glassHeight / 2) { // 下边界
          newY = slideHeight - glassHeight / 2;
        } else if (newY <  (-glassHeight / 2)) { // 上边界
          newY = (-glassHeight / 2);
        }
    
        // 更新放大镜的位移
        this.setState({
          glassX: newX,
          glassY: newY,
        });
    
        // 更新鼠标的位置
        this.mousePosX = clientX;
        this.mousePosY = clientY;
    }
    /**
     * 获取缩放的热区
     */
    private getZoomHotArea = (e: any) => {
        const { clientX, clientY } = getPoint(e);
        // 这里不需要除以stageRatio，只需要用真实的值计算即可，所以这里使用了getBoundingClientRect()而不是transform
        const { left, top, width, height } = this.glass.getBoundingClientRect();
        const selectBoxPadding = 5; // 选框的padding
        let zoomOrientation = '';

        if (!/glass-frame/.test(e.target.className)) {
        // 左
        if (clientX >= left - selectBoxPadding - HOT_AREA_SIZE && clientX <= left + HOT_AREA_SIZE) {
            // 左上角
            if (clientY >= top - selectBoxPadding - HOT_AREA_SIZE && clientY <= top + HOT_AREA_SIZE) {
            zoomOrientation = LEFT_TOP;
            }

            // 左下角
            if (clientY >= top + selectBoxPadding + height - HOT_AREA_SIZE && clientY <= top + height + HOT_AREA_SIZE) {
            zoomOrientation = LEFT_BOTTOM;
            }
        }

        // 右
        if (clientX >= left + width - HOT_AREA_SIZE && clientX <= left + width + selectBoxPadding + HOT_AREA_SIZE) {
            // 右上角
            if (clientY >= top - selectBoxPadding - HOT_AREA_SIZE && clientY <= top + HOT_AREA_SIZE) {
            zoomOrientation = RIGHT_TOP;
            }

            // 右下角
            if (clientY >= top + selectBoxPadding + height - HOT_AREA_SIZE && clientY <= top + height + HOT_AREA_SIZE) {
            zoomOrientation = RIGHT_BOTTOM;
            }
        }
        }

        return zoomOrientation;
    }

    private handleMouseDown = (e: any) => {
        this.isMouseDown = true;
        const {clientX, clientY} = getPoint(e);
        this.mousePosX = clientX;
        this.mousePosY = clientY;

        // 点击的是热区
        if (this.getZoomHotArea(e)) {
            this.isGlassHotArea = true;
            this.zoomOrientation = this.getZoomHotArea(e);
        }

        document.addEventListener('mousemove', this.handleMouseMove, false);
        document.addEventListener('mouseup', this.handleMouseUp, false);
        document.addEventListener('touchmove', this.handleMouseMove, false);
        document.addEventListener('touchend', this.handleMouseUp, false);
    }
    
    private handleMouseMove = (e: any) => {
        if (this.isMouseDown) {
            if (this.isGlassHotArea) {
            this.scale(e);
            } else {
            this.dragGlass(e);
            }
        }
    }

    private handleMouseUp = () => {
        this.isMouseDown = false;
        this.isGlassHotArea = false;
        document.removeEventListener('mousemove', this.handleMouseMove, false);
        document.removeEventListener('mouseup', this.handleMouseUp, false);
        document.removeEventListener('touchmove', this.handleMouseMove, false);
        document.removeEventListener('touchend', this.handleMouseUp, false);
    }

    public componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseDown, false);
        document.addEventListener('touchstart', this.handleMouseDown, false);
    }

    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown, false);
        document.removeEventListener('touchstart', this.handleMouseDown, false);
    }
    
    render () {
        this.slideWidth = document.body.clientWidth;
        this.slideHeight = this.bgWrapper && this.bgWrapper.clientHeight;
        const { imgSrc, glassX, glassY, glassWidth, glassHeight } = this.state;
        const glassWrapperStyle = {
        width: `${this.slideWidth}px`,
        height: `${this.slideHeight}px`
        };
        const glassStyle = {
        width: `${glassWidth}px`,
        height: `${glassHeight}px`,
        transform: `translate(${glassX}px, ${glassY}px)`,
        };

        const {bigImageX, bigImageY} = this.getBigImagePos();
        const glassImgStyle = {
        width: `${this.zoom * this.slideWidth}px`,
        height: `${this.zoom * this.slideHeight}px`,
        transform: `translate(${bigImageX}px, ${bigImageY}px)`,
        };
       return (
        <div className='enow__magnifying-glass' style={glassWrapperStyle}>
        {/* 背景图 */}
        <div className="bg-wrapper" ref={el => this.bgWrapper = el}>
           <img className="bg" src={imgSrc}/>
        </div>
        <div className="glass-wrapper">
          <div className="glass-mask">
            <div className="glass-img-wrapper" ref={el => this.glass = el} style={glassStyle}>
              <img className="glass-img" src={imgSrc} style={glassImgStyle}/>
            </div>
            <SelectBox {
              ...{
                glassWidth,
                glassHeight,
                glassY,
                glassX,
              }
            }/>
          </div>
        </div>
      </div>
       )
    }
}