import Immutable from 'immutable';

export default (state = Immutable.fromJS({}), action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};
