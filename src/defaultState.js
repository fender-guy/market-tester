// @flow
import { fromJS } from 'immutable';
import type { ChartSettings } from './types';
import {
  getHigh,
  getLow,
  getYScale,
  getXScale,
  getYScaleInv
} from './utils/marketSpecs';
import { makeRandomMarket } from './marketMaker/makeRandomMarket';

const width = 1024;
const height = 800;
const marginLeft = 20;
const marginRight = 50;
const marginTop = 20;
const marginBottom = 20;
const innerHeight = height - (marginTop + marginBottom);
const innerWidth = width - (marginLeft + marginRight);
const innerTop = marginTop;
const innerBottom = innerTop + innerHeight;
const innerLeft = marginLeft;
const innerRight = innerLeft + innerWidth;

const market = makeRandomMarket(100);
const marketHigh: number = getHigh(market);
const marketLow: number = getLow(market);

//TODO: make scale functions in selectors
const yScale: number => number = getYScale(marketLow, marketHigh, innerHeight);
const yScaleInv: number => number = getYScaleInv(
  marketLow,
  marketHigh,
  innerHeight
);
const xScale: number => number = getXScale(market, innerLeft, innerWidth, 0.3);

const chartSettings: ChartSettings = {
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  innerHeight,
  innerWidth,
  innerTop,
  innerBottom,
  innerLeft,
  innerRight
};

const marketInfo = {
  market,
  marketHigh,
  marketLow,
  yScale,
  yScaleInv
};

export default fromJS({
  chartSettings,
  marketInfo
});
