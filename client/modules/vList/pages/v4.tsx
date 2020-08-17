import React, { Component, createRef } from 'react';

import './index.less';

interface Item {
	value: number;
}

interface IState {
	list: Item[];
	interval: number;
	offset: number;
	visibleList: Item[];
	startIndex: number,
}

const getList =  () => {
	const data: Item[] = [];
	for (let i = 0; i < 1000; i++) {
		data.push({
			value: i
		});
	}

	return data
}

// 优化 contentHeight 的计算

export default class VirtualList extends Component<{}, IState> {
	wrapper: any;
	listContainer: any;
	itemHeight: number = 30;

	startIndex: number = 0;
	endIndex: number = 0;


	cache: any = {}
	lastMeasureIndex: number = -1

	estimatedItemSize: number = 30;


	state: IState = {
		list: getList(),
		interval: 2,
		offset: 10,
		visibleList: [],

		// 新增
		startIndex: 0,
	};
	constructor(props) {
		super(props);
		this.wrapper = createRef();
		this.listContainer = createRef();
	}


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
		console.error('val', val)
		return this.itemHeight + val % 10;
	};

	getLastMeasuredSizeAndOffset = () => {
		return this.lastMeasureIndex >= 0 ? this.cache[this.lastMeasureIndex] : {
			size: 0,
			offset: 0
		}
	}

	/**
	 * 计算内容的高度
	 * 
	 * 优化 contentHeight 的计算
	 * 1、为还没计算高度的元素进行一个高度预估
	 * 2、contentHeight = 缓存过的列表项的高度和 + 未缓存过的列表项的数量 * estimatedItemSize
	 */
	calcContentHeight = () => {
		const { list } = this.state;
		const len = list.length;

		if (this.lastMeasureIndex >= 0) {
			const lastMeasuredItemSizeAndOffset = this.getLastMeasuredSizeAndOffset();
			return lastMeasuredItemSizeAndOffset.offset + lastMeasuredItemSizeAndOffset.size + (len - 1 - this.lastMeasureIndex) * this.estimatedItemSize;
		}

		return len * this.estimatedItemSize;
	};

	/**
	 * 计算可视区域 item 开始和结束的索引
	 * @param scrollTop 
	 */
	calIndex = (scrollTop = 0) => {
		const { list } = this.state;
		let total = 0;

		for (let i = 0, len = list.length; i < len; i++) {
			total += this.calcItemSizeAndOffset(i).size;

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

		// 如果上次的索引大于当前的索引，证明当前的索引已经被缓存了，可以直接获取数据，不需要再计算了
		if (this.lastMeasureIndex >= index) {
			return this.cache[index];
		}


		let offset = 0;

		// 已存在缓存数据
		if (this.lastMeasureIndex >= 0) {
			const lastMeasuredData = this.cache[this.lastMeasureIndex];

			if (lastMeasuredData) {
				offset = lastMeasuredData.offset + lastMeasuredData.size
			}
		}

		for (let i = this.lastMeasureIndex + 1; i <= index; i++) {
			const size = this.getItemSize(list[i].value);

			this.cache[i] = {
				size, 
				offset
			}
			
			offset += size;
		}

		if (index > this.lastMeasureIndex) {
			this.lastMeasureIndex = index;
		}

		return this.cache[index];
	};

	async componentDidMount() {
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
