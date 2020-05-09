// import * as React from 'react';
import React, { Component } from 'react';
// import RouteMap from '../routes/routeMap';

class Cat extends Component<any> {
	render() {
		const mouse = this.props.mouse;
		return <img src="http://m.imeitou.com/uploads/allimg/2019102119/xybbwq2gytt.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />;
	}
}

class Mouse extends Component<any> {
	constructor(props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = { x: 0, y: 0 };
	}

	handleMouseMove(event) {
		this.setState({
			x: event.clientX,
			y: event.clientY
		});
	}

	render() {
		return (
			<div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
				{/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
				{this.props.render(this.state)}
			</div>
		);
	}
}

export default class MouseTracker extends Component {
	render() {
		return (
			<div>
				<h1>移动鼠标!</h1>
				<Mouse render={(mouse) => <Cat mouse={mouse} />} />
			</div>
		);
	}
}
