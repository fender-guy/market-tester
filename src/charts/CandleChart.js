// @flow
import React from 'react';
import { connect } from 'react-redux';
import './candleChart.css';
import { makeRandomMarket } from '../marketMaker/makeRandomMarket';
import {
  getHigh,
  getLow,
  getYScale,
  getXScale,
  getYScaleInv
} from './chartUtils/marketSpecs';

const mapState = state => ({
  width: state.getIn(['chartSettings', 'width']),
  height: state.getIn(['chartSettings', 'height']),
  marginTop: state.getIn(['chartSettings', 'marginTop']),
  marginRight: state.getIn(['chartSettings', 'marginRight']),
  marginBottom: state.getIn(['chartSettings', 'marginBottom']),
  marginLeft: state.getIn(['chartSettings', 'marginLeft']),
  innerWidth: state.getIn(['chartSettings', 'innerWidth']),
  innerHeight: state.getIn(['chartSettings', 'innerHeight']),
  innerLeft: state.getIn(['chartSettings', 'innerLeft']),
  innerWidth: state.getIn(['chartSettings', 'innerWidth']),
  innerBottom: state.getIn(['chartSettings', 'innerBottom'])
});

export const CandleChart = connect(mapState)(props => {
  const {
    width,
    height,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    innerHeight,
    innerLeft,
    innerWidth,
    innerBottom
  } = props;

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
    innerLeft,
    innerWidth,
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
          x1={innerLeft}
          x2={innerWidth}
          y1={i}
          y2={i}
          key={'tick-' + i}
        />
      );
      axisTicks.push(
        <text
          className="tick-price"
          x={innerWidth + 4}
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
        y2={innerBottom}
      />
      {renderAxisTicks()}
      {renderCandles()}
      <line
        className="bottom-axis-line"
        x1={marginLeft}
        x2={innerWidth}
        y1={innerBottom}
        y2={innerBottom}
      />
    </svg>
  );
});
