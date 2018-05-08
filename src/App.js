// @flow
import React, { Component } from 'react';
import './App.css';
import { CandleChart } from './charts/CandleChart';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Market Tester</h1>
        </header>
        <CandleChart />
      </div>
    );
  }
}

export default App;
