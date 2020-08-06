import { LineThemeColor, Theme, BaseThemeColor, VerticalLineColor } from './theme';
import get from 'lodash/get';
import { LineProps, TimeType } from '@/pages/Echarts/types';

export default function getLineOptions(data: LineProps): any {
	const {
		seriesData,
		xAxisData,
		extraEchartOpt = null,
		theme = Theme.green,
		axisLabelInterval = 0,
		chosenTimeType
	} = data;

	const max = getMax(seriesData);
	const latestDate = getLatestMaxDate(max, seriesData);

	return Object.assign(
		{},
		{
			grid: {
				left: 30,
				right: 30,
				top: 40,
				bottom: 0,
				containLabel: true,
			},
			xAxis: {
				axisLine: { show: false },
				axisTick: { show: false },
				type: 'category',
				boundaryGap: false,
				data: xAxisData,
				axisLabel: {
					color: '#AAAAAA',
					interval: axisLabelInterval,
					triggerEvent: false,
					fontSize: 11
				},
				axisPointer: {
					show: true,
					value: latestDate,
					snap: true,
					lineStyle: {
						color: VerticalLineColor[theme],
						width: 1
					},
					label: {
						show: false
					},
					status: true,
					triggerTooltip: false,
					triggerOn: 'none'
				}
			},
			yAxis: {
				show: true,
				splitNumber: 5,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						type: 'solid',
						color: '#FAFAFA'
					}
				}
			},
			series: [
				{
					type: 'line',
					showAllSymbol: true,
					symbol: 'circle',
					symbolSize: 1,
					itemStyle: {
						color: '#ffffff',
						borderWidth: 1,
						borderColor: LineThemeColor[`${theme}Default`]
					},
					lineStyle: {
						normal: {
							color: LineThemeColor[`${theme}Default`],
							width: 2
						}
					},
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: getAreaColorStops(theme)
						},
						opacity: 0.3
					},
					data: setSeriesData({ seriesData, theme, timeType: chosenTimeType, max, latestDate })
				}
			]
		},
		extraEchartOpt
	);
}

function setSeriesData({ seriesData, theme, timeType, max, latestDate }) {
	if (seriesData.length === 0) {
		return [];
	}

	let label: any = {
		backgroundColor: BaseThemeColor[theme],
		textStyle: {
			color: '#FFFFFF'
		},
		borderRadius: 4,
		padding: 6,
		position: 'top',
		distance: 8,
		formatter: function(params) {
			let str = ``;

			if (timeType === TimeType.week) {
				str = `奖杯 +${get(params, 'data.value', 0)}`;
			} else if (timeType === TimeType.month) {
				str = `${params.name.replace('/', '-')} 奖杯 +${get(params, 'data.value', 0)}`;
			}

			return str;
		}
	};

	return seriesData.map((item) => {
		if (!item) {
			return item;
		}

		const { value, name } = item;

		label = {
			...label,
			show: value === max && latestDate === name
		};

		const day = latestDate.split('/')[1];

		if (timeType === TimeType.month && day > 28) {
			label = {
				...label,
				position: [-80, -28],
				distance: 0,
			}
		}

		if (timeType === TimeType.month && day < 4) {
			label = {
				...label,
				position: [-1, -28],
				distance: 0,
			}
		}

		return {
			value,
			name,
			label
		};
	});
}

function getAreaColorStops(theme = Theme.green) {
	return [
		{
			offset: 0,
			color: LineThemeColor[`${theme}0`] // 0% 处的颜色
		},
		{
			offset: 1,
			color: LineThemeColor[`${theme}1`] // 100% 处的颜色
		}
	];
}

function getMax(data) {
	let tmp = data.map((item) => (item ? item.value : 0));

	return tmp.length > 0 ? Math.max(...tmp) : 0;
}

function getLatestMaxDate(max, data) {
	const filterData = data.filter((item) => item && item.value === max);

	if (filterData[0]) {
		return filterData[0].name;
	}

	return '';
}
