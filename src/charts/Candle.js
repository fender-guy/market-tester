import './candleChart.css';

import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { makeYScaleSelector, makeXScaleSelector } from '../ducks/marketInfo';

const mapState = state => {
  const yScaleSelector = makeYScaleSelector();
  const xScaleSelector = makeXScaleSelector();

  return {
    market: state.getIn(['marketInfo', 'market']),
    yScale: yScaleSelector(state),
    xScale: xScaleSelector(state)
  };
};

export const Candles = connect(mapState)(props => {
  const { market, yScale, xScale } = props;

  return market.map((candle, inc) => {
    const { open, close, high, low } = candle.toJS();
    const upDown = open > close ? 'down' : 'up';
    const bodyClasses = classnames('candle-body', upDown);
    const wickClasses = classnames('candle-wick', upDown);

    return [
      <line
        className={wickClasses}
        x1={xScale(inc) + xScale.bandwidth() / 2}
        x2={xScale(inc) + xScale.bandwidth() / 2}
        y1={yScale(high)}
        y2={yScale(low)}
        key={'candle-line' + inc}
      />,
      <rect
        className={bodyClasses}
        x={xScale(inc)}
        y={yScale(Math.max(open, close))}
        width={xScale.bandwidth()}
        height={yScale(Math.min(open, close)) - yScale(Math.max(open, close))}
        key={'candle' + inc}
      />
    ];
  });
});
