// @flow
const round = (number: number, precision: number) => {
  const shift = (number, precision) => {
    const numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, +precision)), -precision);
};

const getRandomNumber = (high: number, low: number) =>
  round((Math.floor(Math.random() * high) - low) * 0.0001, 4);

const makeCandle = (previousClose: number) => {
  const open = previousClose;
  const close = previousClose + getRandomNumber(201, -100);
  const high =
    close > previousClose
      ? close + getRandomNumber(100, 0)
      : previousClose + getRandomNumber(100, 0);
  const low =
    close < previousClose
      ? close - getRandomNumber(100, 0)
      : previousClose - getRandomNumber(100, 0);

  return {
    open,
    close,
    high,
    low
  };
};

const makeRandomMarket = (tickNum: number) => {
  let ticks = [];
  let previousClose = 1;

  for (let i = 0; i < tickNum; i++) {
    const candle = makeCandle(previousClose);
    ticks.push(candle);
    previousClose = candle.close;
  }

  return ticks;
};

export { makeRandomMarket };
