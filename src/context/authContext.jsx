import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { login, loginUserOracle } from "../api/auth.js";
import { getUserDbByName } from "../api/Usuario.js";
import { useNavigate } from "react-router-dom";

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
  const [userOracle, setUserOracle] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // check token
  useEffect(() => {
    async function checkLogin() {
      let usuarioGuardado = JSON.parse(sessionStorage.getItem("usuario"));
      if (usuarioGuardado) {
        try {
          setUser(usuarioGuardado);
          const rspUserOracle = await loginUserOracle(
            usuarioGuardado.usuario.userName
          );
          setUserOracle(rspUserOracle.data);
          setIsAuthenticated(true);
          if (location.pathname === "/" || location.pathname === "/login") {
            navigate("/home");
          }
        } catch (error) {
          console.error("Error al parsear el usuario: ", error);
        }
      } else {
        navigate("/");
      }
    }
    checkLogin();
  }, []);

  const signin = async (userData) => {
    setIsLoading(true);
    try {
      const response = await login(userData.nombre, userData.contraseña);
      // console.log(response.data)
      if (response.data.isSuccess == true) {
        setIsAuthenticated(true);
        const rspUser = await getUserDbByName(userData.nombre);
        // console.log(rspUser)
        setUser(rspUser.data);
        const rspUserOracle = await loginUserOracle(
          rspUser.data.usuario.userName
        );
        console.log(rspUserOracle.data)
        setUserOracle(rspUserOracle);
        setIsLoading(false);
        sessionStorage.setItem("usuario", JSON.stringify(rspUser.data));
      } else {
        setError(response.data.message);
        setIsLoading(false);
        // console.log(error);
        setTimeout(() => {
          setError();
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);

      const errorMessage = error.response
        ? error.response.data.message
        : "Hubo un problema con la conexión al servidor";
      setError(errorMessage);
      console.error(error);
      setTimeout(() => {
        setError();
      }, 3000);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("usuario");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signin, logout, error, isLoading, userOracle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
