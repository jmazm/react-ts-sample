import React, { Component, createRef } from 'react';

import './index.less';

interface Item {
	value: number;
}

interface IState {
	list: Item[];
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
		// endIndex: 0,
		// visibleHeight: 0,
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
			list
		});
	};

	scrollHandler = () => {
		const scrollTop = this.wrapper.current.scrollTop;
		this.updateVisibleData(scrollTop);
	};

	updateVisibleData = (scrollTop = 0) => {
		// 计算可视区域的起始数据索引
		this.startIndex = this.calIndex(scrollTop);

		// 计算可视区域的结束数据索引
		this.endIndex = this.calIndex(scrollTop + this.wrapper.current.clientHeight);

		// 计算可视区域能显示的数据列表
		const visibleList = this.state.list.slice(this.startIndex, this.endIndex);

		this.setState({
			visibleList
		});
	};

	getItemSize = (val) => {
		return this.itemHeight + val % 10;
	};

	/**
	 * 计算内容的高度
	 */
	calcContentHeight = () => {
		const { list } = this.state;
		const total = list.reduce((ac, cur) => (ac += this.getItemSize(cur.value)), 0);

		return total;
	};

	/**
	 * 计算可视区域 item 开始和结束的索引
	 * @param scrollTop 
	 */
	calIndex = (scrollTop = 0) => {
		const { list } = this.state;
		let total = 0;

		for (let i = 0, len = list.length; i < len; i++) {
			total += this.getItemSize(list[i].value);

			if (total >= scrollTop || i === len - 1) {
				return i;
			}
		}

		return 0;
	};

	/**
	 * 计算锚点的offset值
	 * @param index 
	 */
	calcItemSizeAndOffset = (index) => {
		const { list } = this.state;
		let total = 0;

		for (let i = 0, len = Math.min(index, list.length - 1); i <= len; i++) {
			const size = this.getItemSize(list[i].value);

			if (i === len) {
				return {
					offset: total,
					size
				};
			}

			total += size;
		}

		return {
			offset: 0,
			total: 0
		};
	};

	async componentDidMount() {
		await this.init();
		this.updateVisibleData();
	}

	render() {
		const { visibleList } = this.state;

		const wrapperStyle = {};

		const ghostStyle = {
			height: `${this.calcContentHeight()}px`
		};

		const listStyle = {
			transform: `translate3d(0, ${this.calcItemSizeAndOffset(this.startIndex).offset}px, 0)`
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
									height: `${this.getItemSize(item.value)}px`
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
