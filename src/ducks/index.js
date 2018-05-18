import { combineReducers } from 'redux-immutable';
import marketInfo from './marketInfo';
import chartSettings from './chartSettings';

export default combineReducers({
  chartSettings,
  marketInfo
});
