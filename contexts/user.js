import { createContext, useState } from "react";

const defaultState = {
  loggedIn: false,
  name: "",
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultState);

  const login = (name) =>
    setUser({
      loggedIn: true,
      name,
    });

  const logout = () => setUser(defaultState);

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
