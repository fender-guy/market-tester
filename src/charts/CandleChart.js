// @flow
import React from 'react';
import './candleChart.css';
import { makeRandomMarket } from '../marketMaker/makeRandomMarket';
import { scaleLinear, scaleBand } from 'd3-scale';

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

  const market = makeRandomMarket(10);

  const high = market.reduce(
    (acc, obj) => Math.max(obj.high, acc),
    market[0].high
  );

  const low = market.reduce(
    (acc, obj) => Math.min(obj.low, acc),
    market[0].low
  );

  const yScale = scaleLinear()
    .domain([low, high])
    .range([height - marginBottom, 0]);

  const xScale = scaleBand()
    .domain(market)
    .range([0 + marginLeft, width - marginRight])
    .padding(0.05);

  console.log('market: ', market);
  console.log('market: ', high);
  console.log('market: ', low);
  console.log('yScale: ', yScale);
  console.log('xScale: ', xScale);

  return (
    <svg width={width} height={height} className="candle-chart">
      <line
        className="left-axis-line"
        x1={marginLeft}
        x2={marginLeft}
        y1={marginLeft}
        y2={height - marginBottom}
      />
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
