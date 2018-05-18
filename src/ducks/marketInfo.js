import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { getYScale, getXScale, getYScaleInv } from '../utils/marketSpecs';

export default (state = Immutable.fromJS({}), action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};

const getMarketLow = state => state.getIn(['marketInfo', 'marketLow']);
const getMarketHigh = state => state.getIn(['marketInfo', 'marketHigh']);
const getInnerHeight = state => state.getIn(['chartSettings', 'innerHeight']);
const getMarket = state => state.getIn(['marketInfo', 'market']);
const getInnerTop = state => state.getIn(['chartSettings', 'innerTop']);
const getInnerLeft = state => state.getIn(['chartSettings', 'innerLeft']);
const getInnerWidth = state => state.getIn(['chartSettings', 'innerWidth']);

export const makeYScaleSelector = () =>
  createSelector(
    [getMarketLow, getMarketHigh, getInnerTop, getInnerHeight],
    (marketLow, marketHigh, innerTop, innerHeight) =>
      getYScale(marketLow, marketHigh, innerTop, innerHeight)
  );

export const makeYScaleInvSelector = () =>
  createSelector(
    [getMarketLow, getMarketHigh, getInnerTop, getInnerHeight],
    (marketLow, marketHigh, innerTop, innerHeight) =>
      getYScaleInv(marketLow, marketHigh, innerTop, innerHeight)
  );

export const makeXScaleSelector = padding =>
  createSelector(
    [getMarket, getInnerLeft, getInnerWidth],
    (market, innerLeft, innerWidth) =>
      getXScale(market.toJS(), innerLeft, innerWidth, 0.3)
  );
