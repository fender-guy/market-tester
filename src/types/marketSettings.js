// @flow
export type MarketSettings = {
  market: Array<{
    high: number,
    low: number,
    open: number,
    close: number
  }>,
  marketHigh: number,
  marketLow: number
};
