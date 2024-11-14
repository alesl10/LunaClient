import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../api/auth.js";
import { getUserDbByName } from "../api/Usuario.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth mus be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // check token
  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");
      // console.log(token)
      if (token) {
        setIsAuthenticated(true);
        try {
          const res = await getUserDbByName(token);
          // console.log(res);
          if (res.data) {
            setUser(res.data);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    checkLogin();
  }, []);

  const signin = async (userData) => {
    try {
      setIsLoading(true);
      const response = await login(userData.nombre, userData.contraseña);
      // console.log(response.data)
      if (response.data.isSuccess == true) {
        Cookies.set("token", userData.nombre);
        setIsAuthenticated(true);
        const rspUser = await getUserDbByName(userData.nombre);
        setUser(rspUser.data);
        setIsLoading(false);
      } else {
        setError(response.data.message);
        setIsLoading(false);
        // console.log(error);
        setTimeout(() => {
          setError();
        }, 2000);
      }
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    Navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signin, logout, error, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
