import ReactDOM from 'react-dom';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import CandleChart from './CandleChart';
import { store } from '../store';
import { mockStore } from '../defaultState';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <CandleChart />
    </Provider>,
    div
  );
});

describe('chart settings', () => {
  const wrapper = mount(
    <Provider store={store}>
      <CandleChart />
    </Provider>
  );
  const chart = wrapper.render();

  test('renderes an svg with specified width and height', () => {
    expect(chart[0].attribs.width).toEqual(
      mockStore.chartSettings.width.toString()
    );
    expect(chart[0].attribs.height).toEqual(
      mockStore.chartSettings.height.toString()
    );
  });

  test('renders a left axis with proper dimensions', () => {
    const line = chart.find('.left-axis-line')[0];
    expect(line.attribs.class).toEqual('left-axis-line');
    expect(line.attribs.x1).toEqual(
      mockStore.chartSettings.innerLeft.toString()
    );
    expect(line.attribs.x2).toEqual(
      mockStore.chartSettings.innerLeft.toString()
    );
    expect(line.attribs.y1).toEqual(
      mockStore.chartSettings.innerTop.toString()
    );
    expect(line.attribs.y2).toEqual(
      mockStore.chartSettings.innerBottom.toString()
    );
  });

  test('renders a bottom axis with proper dimensions', () => {
    const line = chart.find('.bottom-axis-line')[0];
    expect(line.attribs.class).toEqual('bottom-axis-line');
    expect(line.attribs.x1).toEqual(
      mockStore.chartSettings.innerLeft.toString()
    );
    expect(line.attribs.x2).toEqual(
      mockStore.chartSettings.innerWidth.toString()
    );
    expect(line.attribs.y1).toEqual(
      mockStore.chartSettings.innerBottom.toString()
    );
    expect(line.attribs.y2).toEqual(
      mockStore.chartSettings.innerBottom.toString()
    );
  });
});
