// @flow
import React from 'react';
import { connect } from 'react-redux';
import './candleChart.css';

const mapState = state => ({
  width: state.getIn(['chartSettings', 'width']),
  height: state.getIn(['chartSettings', 'height']),
  marginTop: state.getIn(['chartSettings', 'marginTop']),
  marginLeft: state.getIn(['chartSettings', 'marginLeft']),
  innerWidth: state.getIn(['chartSettings', 'innerWidth']),
  innerHeight: state.getIn(['chartSettings', 'innerHeight']),
  innerLeft: state.getIn(['chartSettings', 'innerLeft']),
  innerBottom: state.getIn(['chartSettings', 'innerBottom']),
  innerTop: state.getIn(['chartSettings', 'innerTop']),
  market: state.getIn(['marketInfo', 'market']),
  marketHigh: state.getIn(['marketHighInfo', 'marketHigh']),
  marketLow: state.getIn(['marketLowInfo', 'marketLow']),
  yScale: state.getIn(['yScaleInfo', 'yScale']),
  yScaleInv: state.getIn(['yScaleInvInfo', 'yScaleInv']),
  xScale: state.getIn(['xScaleInfo', 'xScale'])
});

export const CandleChart = connect(mapState)(props => {
  const {
    width,
    height,
    marginLeft,
    marginTop,
    innerHeight,
    innerLeft,
    innerWidth,
    innerBottom,
    innerTop,
    market,
    marketHigh,
    marketLow,
    yScale,
    yScaleInv,
    xScale
  } = props;

  const renderAxisTicks = () => {
    const tickNumber: number = 20;
    let inc = innerHeight / tickNumber;
    let axisTicks = [];

    for (let i = innerTop; i <= innerHeight; i = i + inc) {
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
