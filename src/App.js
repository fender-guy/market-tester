// @flow
import React, { Component } from 'react';
import './App.css';
import CandleChart from './charts/CandleChart';
import TopMenuBar from './topMenuBar';

type Props = {};

export class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Forex Market Generator</h1>
        </header>
        <div className="app-container">
          <TopMenuBar />
          <CandleChart />
        </div>
      </div>
    );
  }
}

export default App;
