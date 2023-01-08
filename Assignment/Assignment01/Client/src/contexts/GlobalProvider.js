import { useContext } from "react";
import GlobalContext from "./GlobalContext";
import React from "react";

const GlobalProvider = (props) => {
  const globalContext = useContext(GlobalContext);
  return (
    <GlobalContext.Provider value={globalContext}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
