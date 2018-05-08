import ReactDOM from 'react-dom';
import { CandleChart } from './CandleChart';
import React from 'react';
import { mount } from 'enzyme';

const props = {
  width: 1024,
  height: 800,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  marginBottom: 50
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CandleChart />, div);
});

it('renderes an svg with specified width and height', () => {
  const wrapper = mount(<CandleChart {...props} />);
  const chart = wrapper.render();
  expect(chart[0].attribs.width).toEqual(props.width.toString());
  expect(chart[0].attribs.height).toEqual(props.height.toString());
});

it('renders a left axis with proper dimensions', () => {
  const wrapper = mount(<CandleChart {...props} />);
  const chart = wrapper.render();
  const line = chart[0].children[0];
  expect(line.attribs.class).toEqual('left-axis-line');
  expect(line.attribs.x1).toEqual(props.marginLeft.toString());
  expect(line.attribs.x2).toEqual(props.marginLeft.toString());
  expect(line.attribs.y1).toEqual(props.marginLeft.toString());
  expect(line.attribs.y2).toEqual(
    (props.height - props.marginBottom).toString()
  );
});

it('renders a right axis with proper dimensions', () => {
  const wrapper = mount(<CandleChart {...props} />);
  const chart = wrapper.render();
  const line = chart[0].children[1];
  expect(line.attribs.class).toEqual('bottom-axis-line');
  expect(line.attribs.x1).toEqual(props.marginLeft.toString());
  expect(line.attribs.x2).toEqual((props.width - props.marginRight).toString());
  expect(line.attribs.y1).toEqual(
    (props.height - props.marginBottom).toString()
  );
  expect(line.attribs.y2).toEqual(
    (props.height - props.marginBottom).toString()
  );
});
