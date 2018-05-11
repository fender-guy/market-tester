// @flow
import React from 'react';
import './candleChart.css';
import { makeRandomMarket } from '../marketMaker/makeRandomMarket';
import {
  getHigh,
  getLow,
  getYScale,
  getXScale
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
    marginLeft = 10,
    marginRight = 10,
    marginTop = 10,
    marginBottom = 50
  } = props;

  const innerHeight: number = height - (marginTop + marginBottom);
  const market = makeRandomMarket(10);
  const marketHigh: number = getHigh(market);
  const marketLow: number = getLow(market);
  const yScale: () => number = getYScale(
    marketLow,
    marketHigh,
    height - marginBottom
  );
  const xScale: () => number = getXScale(
    market,
    0 + marginLeft,
    width - marginRight,
    0.05
  );

  const renderAxisTicks = () => {
    const tickNumber: number = 20;
    let inc = innerHeight / tickNumber;
    let axisTicks = [];

    for (let i = 0 + marginTop; i <= innerHeight; i = i + inc) {
      // let classes = classNames({tick : true},
      // {top : (i === 0)},
      // {bottom : (i === this.props.height)});
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
      // axisTicks.push(
      // <text
      // className="tick-price"
      // x={this.props.width + 4}
      // y={i + 4}
      // key={'tick-price-' + i}>
      // {this.props.chartType === 'ticks' ? this.props.yScaleInv(i).toFixed(5) : this.props.yScaleInv(i).toFixed(4)}
      // </text>
      // );
    }
    // console.log('axisTicks: ', axisTicks);
    return axisTicks;
  };

  // console.log('market: ', market);
  // console.log('market: ', marketHigh);
  // console.log('market: ', marketLow);
  // console.log('yScale: ', yScale);
  // console.log('xScale: ', xScale);

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
