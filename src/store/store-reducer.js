import { createContext, useReducer } from "react";

const initialState = {
  isPrepared: true,
  isAdmin: false,
  config: {
    styles: []
  },
}


const reducer = (state, action) => {
    switch (action.type) {
        case "MARKET__STATE_UPDATED":
          return { ...state, isPrepared: action.payload };
        case "ADMIN__STATE_UPDATED":
          return { ...state, isAdmin: action.payload };
        case "CONFIG_UPDATED":
          return { ...state, config: action.payload };
        default:
          return { ...state };
    }
}

export const Store = createContext(initialState);
export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <Store.Provider value={{ state, dispatch }}>
        {props.children}
      </Store.Provider>
    );
};