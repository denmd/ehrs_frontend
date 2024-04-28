// StateContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Define initial state and reducer function
export const initialState = {
  showMetaMaskMessage: true
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHOW_METAMASK_MESSAGE':
      return {
        ...state,
        showMetaMaskMessage: action.payload
      };
    default:
      return state;
  }
};

// Create context
const StateContext = createContext();

// Define StateProvider component
export const StateProvider = ({ children }) => {
  // Use reducer with initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Define custom hook for accessing state and dispatch
export const useStateValue = () => useContext(StateContext);
