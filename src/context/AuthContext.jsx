import React, { createContext, useState } from "react";
// import authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData.user);
    // localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    // authService.logout().catch(() =>
    //   console.log('Logout Failed')
    // );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
