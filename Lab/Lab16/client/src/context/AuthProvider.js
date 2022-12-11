const { createContext, useState } = require("react");

const initAuthContext = {
  csrfToken: "",
};

const AuthContext = createContext(initAuthContext);

const AuthProvider = (props) => {
  const [csrf, setCsrf] = useState();
  const value = {
    csrfToken: csrf,
    changeCsrf: setCsrf,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider
