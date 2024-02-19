import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdminLoggedIn: false,
  user: {},
  login: () => {},
  logout: () => {},
  adminLogin: () => {},
  adminLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const login = (user) => {
    setUser(user.username);
    setIsLoggedIn(true);
    setIsAdminLoggedIn(false);
  };

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
  };
  const adminLogin = () => {
    setIsAdminLoggedIn(true);
    setIsLoggedIn(false);
  };
  const adminLogout = () => {
    setUser({});
    setIsAdminLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: isLoggedIn,
        login,
        logout,
        isAdminLoggedIn: isAdminLoggedIn,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
