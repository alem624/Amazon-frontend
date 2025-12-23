import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../Utility/Reducer";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
