// @flow
import React from 'react';
import { connect } from 'react-redux';
import './candleChart.css';
import { makeYScaleInvSelector } from '../ducks/marketInfo';
import { Candles } from './Candle';
import type { CandleChartTypes } from '../types';

const mapState = state => {
  const yScaleInvSelector = makeYScaleInvSelector();

  return {
    width: state.getIn(['chartSettings', 'width']),
    height: state.getIn(['chartSettings', 'height']),
    marginLeft: state.getIn(['chartSettings', 'marginLeft']),
    innerWidth: state.getIn(['chartSettings', 'innerWidth']),
    innerHeight: state.getIn(['chartSettings', 'innerHeight']),
    innerLeft: state.getIn(['chartSettings', 'innerLeft']),
    innerBottom: state.getIn(['chartSettings', 'innerBottom']),
    innerTop: state.getIn(['chartSettings', 'innerTop']),
    yScaleInv: yScaleInvSelector(state)
  };
};

export const CandleChart = (props: CandleChartTypes) => {
  const {
    width,
    height,
    marginLeft,
    innerHeight,
    innerLeft,
    innerWidth,
    innerBottom,
    innerTop,
    yScaleInv
  } = props;

  if (!innerHeight) {
    return null;
  }

  const renderAxisTicks = () => {
    const tickNumber: number = 20;
    let inc = innerHeight / tickNumber;
    let axisTicks = [];

    for (let i: number = innerTop; i <= innerHeight; i = i + inc) {
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
      <Candles />
      <line
        className="bottom-axis-line"
        x1={marginLeft}
        x2={innerWidth}
        y1={innerBottom}
        y2={innerBottom}
      />
    </svg>
  );
};

export default connect(mapState)(CandleChart);
