// @flow
import React from 'react';
import './candleChart.css';
import { makeRandomMarket } from '../marketMaker/makeRandomMarket';
import {
  getHigh,
  getLow,
  getYScale,
  getXScale,
  getYScaleInv
} from './chartUtils/marketSpecs';

type Props = {
  width?: number,
  height?: number,
  marginLeft?: number,
  marginRight?: number,
  marginTop?: number,
  marginBottom?: number
};

export const CandleChart = (props: Props) => {
  const {
    width = 1024,
    height = 800,
    marginLeft = 20,
    marginRight = 50,
    marginTop = 20,
    marginBottom = 20
  } = props;

  const innerHeight: number = height - (marginTop + marginBottom);
  const market = makeRandomMarket(100);
  const marketHigh: number = getHigh(market);
  const marketLow: number = getLow(market);
  const yScale: number => number = getYScale(
    marketLow,
    marketHigh,
    innerHeight
  );
  const yScaleInv: number => number = getYScaleInv(
    marketLow,
    marketHigh,
    innerHeight
  );
  const xScale: number => number = getXScale(
    market,
    0 + marginLeft,
    width - marginRight,
    0.3
  );

  const renderAxisTicks = () => {
    const tickNumber: number = 20;
    let inc = innerHeight / tickNumber;
    let axisTicks = [];

    for (let i = 0 + marginTop; i <= innerHeight; i = i + inc) {
      axisTicks.push(
        <line
          className="ticks"
          x1={0 + marginLeft}
          x2={width - marginRight}
          y1={i}
          y2={i}
          key={'tick-' + i}
        />
      );
      axisTicks.push(
        <text
          className="tick-price"
          x={width - marginRight + 4}
          y={i + 4}
          key={'tick-price' + i}
        >
          {yScaleInv(i).toFixed(4)}
        </text>
      );
    }
    return axisTicks;
  };

  const renderCandles = () => {
    return market.map((candle, inc) => {
      return (
        <rect
          className={'candle'}
          x={xScale(inc)}
          y={yScale(Math.max(candle.open, candle.close))}
          width={xScale.bandwidth()}
          height={
            yScale(Math.min(candle.open, candle.close)) -
            yScale(Math.max(candle.open, candle.close))
          }
          key={'candle' + inc}
        />
      );
    });
  };

  return (
    <svg width={width} height={height} className="candle-chart">
      <line
        className="left-axis-line"
        x1={marginLeft}
        x2={marginLeft}
        y1={marginLeft}
        y2={height - marginBottom}
      />
      {renderAxisTicks()}
      {renderCandles()}
      <line
        className="bottom-axis-line"
        x1={marginLeft}
        x2={width - marginRight}
        y1={height - marginBottom}
        y2={height - marginBottom}
      />
    </svg>
  );
};
