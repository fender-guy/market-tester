// @flow
import { fromJS } from 'immutable';
import type { ChartSettings, MarketSettings } from './types';
import { getHigh, getLow } from './utils/marketSpecs';
import { makeRandomMarket } from './marketMaker/makeRandomMarket';

const width = 924;
const height = 700;
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
const marketHigh = getHigh(market);
const marketLow = getLow(market);

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

const marketInfo: MarketSettings = {
  market,
  marketHigh,
  marketLow
};

export default fromJS({
  chartSettings,
  marketInfo
});
