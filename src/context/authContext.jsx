import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "../api/auth.js";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    checkLogin();
  }, []);

  const signin = async (user) => {
    try {
      // console.log(user);
      const rsp = await login(user.nombre, user.contraseña);
      if (rsp.data.isSuccess == true) {
        setUser(user);
        const { token } = Cookies.get();
        if (!token) Cookies.set("token", JSON.stringify(user));
        setIsAuthenticated(true);
      } else {
        setError(rsp.data.message);
        setTimeout(() => {
          setError();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

const logout = async () => {
  Cookies.remove('token');
  setIsAuthenticated(false);
  setUser(null);
}


  const checkLogin = async () => {
    try {
      const token = Cookies.get("token");

      if (token) setIsAuthenticated(true);
      else setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    signin,
    error,
    isAuthenticated,
    checkLogin,
    logout, 
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
