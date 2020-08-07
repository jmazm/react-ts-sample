// export enum TrophyDimension {
//   homework = '作业整洁', // 作业整洁
//   thinking = '积极思考', // 积极思考
//   answer = '作答仔细', // 作答仔细
//   performance = '表现优秀', // 表现优秀
//   initivation = '热情主动', // 热情主动
//   listening = '认真听讲' // 认真听讲
// }

import { PieProps } from '@/pages/Echarts/types';

export function getPieOptions(data: PieProps) {
  const { seriesData, extraEchartOpt, totalCupCount } = data

  return Object.assign(
    {},
    {
      title: {
        text: `{name|${totalCupCount}}\n{val|奖杯数}`,
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 22,
              color: '#333333',
              fontWeight: 'normal',
              padding: [1, 0, 0, 0]
            },
            val: {
              color: '#999999',
              fontSize: 10,
              fontWeight: 'normal',
            }
          }

        }
      },
      series: [
        {
          name: '系列名',
          type: 'pie',
          center: ['50%', '50%'], // 饼图的圆心坐标
          radius: [
            `${((72 / 186) * 100).toFixed(0)}%`,
            `${((104 / 186) * 100 + 4).toFixed(0)}%`,
          ], //内外圆圈
          //标签文本
          label: {
            position: 'outside',
            alignTo: 'edge',
            margin: 8,
            color: '#666666',
            fontSize: 13,
            formatter: '{b} {c}',
            distanceToLabelLine: 6
          },
          labelLine: {
            length2: 10,
            lineStyle: {
              color: '#DDDDDD',
            },
          },
          data: setData(seriesData),
          hoverOffset: 4,
          hoverAnimation: false,
          minAngle: 11,
          avoidLabelOverlap: true,
          top: 5
        },
      ],
    },
    extraEchartOpt
  )
}


function setData (data) {
  if (!data) {
    return []
  }

  const len = data.length;

  const newData = data.map((item) => {
    const color = getPieColor(item.name);
    return {
      ...item,
      itemStyle: {
        normal: {
          color,
          borderColor: len === 1 ? color : '#FFFFFF',
          borderWidth: 2
        }
      }
    }
  })

  return newData;
}




function getPieColor (name) {
  return {
    '作业整洁': '#9FE11F',
    '积极思考': '#3ED389',
    '作答仔细': '#71C8FF',
    '表现优秀': '#9EA2FF',
    '热情主动': '#FF767C',
    '认真听讲': '#FFA262'
  }[name];
}
