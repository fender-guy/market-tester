//@flow
import { scaleLinear, scaleBand } from 'd3-scale';

type Market = Array<{
  high: number,
  low: number,
  open: number,
  close: number
}>;

export const getHigh = (market: Market): number =>
  market.reduce((acc, obj) => Math.max(obj.high, acc), market[0].high);

export const getLow = (market: Market): number =>
  market.reduce((acc, obj) => Math.min(obj.low, acc), market[0].low);

export const getYScale = (
  domainLow: number,
  domainHigh: number,
  rangeStart: number
): (number => number) =>
  scaleLinear()
    .domain([domainLow, domainHigh])
    .range([rangeStart, 0]);

export const getXScale = (
  market: Market,
  rangeStart: number,
  rangeStop: number,
  padding: number
): (number => number) =>
  scaleBand()
    .domain(market.map((d, i) => i))
    .range([rangeStart, rangeStop])
    .padding(padding);

export const getYScaleInv = (
  rangeLow: number,
  rangeHigh: number,
  height: number
): (number => number) =>
  scaleLinear()
    .domain([0, height])
    .range([rangeHigh, rangeLow]);
