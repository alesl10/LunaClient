import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../api/auth.js";
import { getUserDbByName } from "../api/Usuario.js";

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
    function checkLogin() {
      let usuarioGuardado = JSON.parse(sessionStorage.getItem('usuario'));
      if (usuarioGuardado) {
        try {
          setUser(usuarioGuardado);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error al parsear el usuario: ", error);
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
        setIsAuthenticated(true);
        const rspUser = await getUserDbByName(userData.nombre);
        setUser(rspUser.data);
        setIsLoading(false);
        sessionStorage.setItem("usuario", JSON.stringify(rspUser.data));
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
    sessionStorage.removeItem("usuario");
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
