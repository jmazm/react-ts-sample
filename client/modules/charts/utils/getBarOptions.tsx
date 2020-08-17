import { BarThemeColor, Theme, BaseThemeColor } from '@modules/charts/constants/theme';
import echarts from 'echarts/lib/echarts';

import { BarProps } from '@modules/charts/types';

export function getBarOptions(data: BarProps) {
  const { seriesData, xAxisData, extraEchartOpt, theme = Theme.green, username } = data;
  
  

	const newData = Object.assign(
		{},
		{
			grid: {
				right: 16,
				left: 16,
				top: 58,
				bottom: 30
			},
			tooltip: {
				trigger: 'none'
			},

			xAxis: [
				{
					type: 'category',
					axisLine: { show: false },
					axisTick: { show: false },
          // data: xAxisData,
          data: xAxisData,
					axisLabel: {
						margin: 10,
						interval: 0,
						color: '#999999',
						textStyle: {
							fontSize: 12
						}
					}
				}
			],
			yAxis: [ { show: false } ],
			series: [
				{
					type: 'bar',
					data: setSeriesData(seriesData, theme),
					barWidth: 26,
					barMinHeight: 2,
					label: {
						show: true,
						fontSize: 13,
						position: 'top',
					
						formatter: function (params) {
							const { value, active } = params.data
							let name = username;

							if (name.length > 5) {
								name = `${name.slice(0, 5)}...`
							}

							return [
								active ? `{name|${name}}` : '',
								active ? '{hr|}' : '',
								`{cupNum|${value}人}`
							].join('\n')
						},
						rich: {
							name: {
								color: '#FFFFFF',
								align: 'center',
								fontSize: 12,
								backgroundColor: BaseThemeColor[theme],
								borderRadius: 4,
								padding: 6,
							},
							cupNum: {
								align: 'center',
								color: '#666666',
							},
							hr: {
								height: 6
							}
						}
					}
				}
			]
		},
		extraEchartOpt
	);

	return newData;
}

function setSeriesData(data, theme = Theme.green) {
	if (!data) {
		return [];
	}

	return data.map((item) => {
		const { name, value, active } = item;
		let itemStyle: any = {
			barBorderRadius: [ 13, 13, 0, 0 ]
		};

		if (active) {
			itemStyle = {
				...itemStyle,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: BarThemeColor[`${theme}0`] },
					{ offset: 1, color: BarThemeColor[`${theme}1`] }
				])
			};

		
		} else {
			itemStyle = {
				...itemStyle,
				color: BarThemeColor[`${theme}Default`]
			};
		}

		return {
			name,
			value,
			itemStyle,
			active
		};
	});
}
