import jwt from "jsonwebtoken";
import { createContext, useEffect, useState } from "react";
import { getJwt, removeJwt, setJwt } from "utilities/jwt";
import useRedirect from "hooks/useRedirect";

const defaultState = {
  loggedIn: false,
  email: "",
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultState);

  useEffect(() => {
    const jwtString = getJwt() || {};
    const token = jwt.decode(jwtString);

    const currentUser = {
      ...defaultState,
      ...token,
      loggedIn: !!token,
    };

    setUser(currentUser);
  }, []);

  const login = (jwtString) => {
    const token = jwt.decode(jwtString);

    setJwt(jwtString);

    setUser({
      ...defaultState,
      ...token,
      loggedIn: true,
    });

    useRedirect("/");
  };

  const logout = () => {
    removeJwt();
    setUser(defaultState);
    useRedirect("/");
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
