import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { getYScale, getXScale, getYScaleInv } from '../utils/marketSpecs';
import { makeRandomMarket } from '../marketMaker/makeRandomMarket';
import { getHigh, getLow } from '../utils/marketSpecs';

const GENERATENEWMARKET = 'market-maker/marketInfo/GENERATENEW';

export default (state = Immutable.fromJS({}), action) => {
  const { type, candleNums } = action;

  switch (type) {
    case GENERATENEWMARKET:
      // Is a black box.
      // If the market maker is passed in then it's easier to test.
      const newMarket = makeRandomMarket(candleNums);
      state = state.set('market', Immutable.fromJS(newMarket));
      state = state.set('marketHigh', getHigh(newMarket));
      state = state.set('marketLow', getLow(newMarket));
      return state;
    default:
      return state;
  }
};

export const generateNewMarket = (num = 100) => ({
  type: GENERATENEWMARKET,
  candleNums: num
});

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
