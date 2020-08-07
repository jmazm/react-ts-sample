import { Theme } from '@modules/charts/constants/theme';

export enum TimeType {
  day = 0,
  week = 1,
  month = 2,
  year = 3,
  all = 4
}

interface ChartBaseProps {
  theme?: Theme;
  className?: string
  extraEchartOpt?: any
  disableTouch?: boolean;
}


/**
 * 柱状图
 */
export interface BarProps extends ChartBaseProps {
  seriesData: { name: string; value: number, active: boolean }[]
  xAxisData: string[]
  username: string
}

/**
 * 折线图
 */


export interface LineProps extends ChartBaseProps {
  seriesData: ({ name: string; value: number } | number | null)[]
  xAxisData: string[],
  axisLabelInterval?: number
  chosenTime?: number
  chosenTimeType?: TimeType 
}

/**
 * 饼图
 */
export interface PieProps extends ChartBaseProps {
  seriesData: { name: string; value: number }[],
  totalCupCount: number
}