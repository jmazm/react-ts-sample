import React, { Component, createRef } from 'react';

import './index.less';

interface Item {
	value: number;
}

interface IState {
	list: Item[];
	// endIndex: number;
	contentHeight: number;
	// visibleHeight: number;
	interval: number;
	offset: number;
	visibleList: Item[];
}

export default class VirtualList extends Component<{}, IState> {
	wrapper: any;
	listContainer: any;
	itemHeight: number = 30;

	startIndex: number = 0;
	endIndex: number = 0;

	state: IState = {
		list: [],
		contentHeight: 0,
		interval: 2,
		offset: 10,
		visibleList: []
	};
	constructor(props) {
		super(props);
		this.wrapper = createRef();
		this.listContainer = createRef();
	}

	init = () => {
		const list: Item[] = [];

		for (let i = 0; i < 1000; i++) {
			list.push({
				value: i
			});
		}

		this.setState({
			list,
			contentHeight: this.itemHeight * list.length
		});
	};

	scrollHandler = () => {
		const scrollTop = this.wrapper.current.scrollTop;
		this.updateVisibleData(scrollTop);
	};

	updateVisibleData = (scrollTop = 0) => {
		// 计算出可视区域能显示的 item 数
		const visibleCount = Math.ceil(this.wrapper.current.clientHeight / this.itemHeight);

		// 计算可视区域的起始数据索引
		this.startIndex = Math.floor(scrollTop / this.itemHeight);

		// 计算可视区域的结束数据索引
		this.endIndex = this.startIndex + visibleCount;

		// 计算可视区域能显示的数据列表
		const visibleList = this.state.list.slice(this.startIndex, this.endIndex);

		this.setState({
			visibleList
		});
	};

	async componentDidMount() {
		await this.init();
		this.updateVisibleData();
	}

	render() {
		const { visibleList, contentHeight } = this.state;

		const wrapperStyle = {};

		const ghostStyle = {
			height: `${contentHeight}px`
		};

		const listStyle = {
			transform: `translate3d(0, ${this.startIndex * this.itemHeight}px, 0)`
		};

		return (
			<div
				className="infinite-list-wrapper"
				onScroll={this.scrollHandler}
				ref={this.wrapper}
				style={wrapperStyle}
			>
				<div className="infinite-list-ghost" style={ghostStyle} />
				<div className="infinite-list" style={listStyle}>
					{visibleList.map((item, index) => {
						return (
							<div
								className="list-item"
								key={index}
								style={{
									height: `${this.itemHeight}px`
								}}
							>
								{item.value}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
