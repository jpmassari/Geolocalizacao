import { useReducer } from 'react';

export const defaultState = {
  packages: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'load-packages': return { ...state, packages: action.payload };
  };
};

export const useStatusReducer = () => {
  const [{
    packages,
  }, dispatch ] = useReducer(reducer, defaultState);

  return {
    dispatch,
    packages,
  };
};
