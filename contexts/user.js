import { createContext, useEffect, useState } from "react";
import { getJwt, removeJwt, setJwt } from "utilities/jwt";

const defaultState = {
  loggedIn: false,
  email: "",
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultState);

  useEffect(() => {
    const currentJwt = getJwt() || {};

    const currentUser = {
      ...defaultState,
      ...currentJwt,
    };

    setUser(currentUser);
  }, []);

  const login = (jwt) => {
    setJwt(jwt);

    setUser({
      ...defaultState,
      ...jwt,
    });
  };

  const logout = () => {
    removeJwt();
    setUser(defaultState);
  };

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
