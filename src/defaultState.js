// @flow
import { fromJS } from 'immutable';

type chartSettings = {
  width?: number,
  height?: number,
  marginLeft?: number,
  marginRight?: number,
  marginTop?: number,
  marginBottom?: number,
  innerHeight?: number,
  innerWidth?: number,
  innerTop?: number,
  innerBottom?: number,
  innerLeft?: number,
  innerRight?: number
};

const width = 1024;
const height = 800;
const marginLeft = 20;
const marginRight = 50;
const marginTop = 20;
const marginBottom = 20;
const innerHeight = height - (marginTop + marginBottom);
const innerWidth = width - (marginLeft + marginRight);
const innerTop = marginTop;
const innerBottom = innerTop + innerHeight;
const innerLeft = marginLeft;
const innerRight = innerLeft + innerWidth;

export default fromJS({
  chartSettings: {
    width,
    height,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    innerHeight,
    innerWidth,
    innerTop,
    innerBottom,
    innerLeft,
    innerRight
  }
});
