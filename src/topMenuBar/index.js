import './topMenuBar.css';
import { connect } from 'react-redux';
import React from 'react';
import { generateNewMarket } from '../ducks/marketInfo';

export const TopMenuBar = connect(() => ({}), { generateNewMarket })(props => {
  const clickHandler = () => {
    props.generateNewMarket(100);
  };
  return (
    <div className="top-menu-bar">
      <button className="new-market-button" onClick={clickHandler}>
        New Market
      </button>
    </div>
  );
});
