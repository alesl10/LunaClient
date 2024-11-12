import { useForm } from "react-hook-form";
import  {UseAuth}  from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

function Login() {
  const { isAuthenticated, signin } = UseAuth();
  const navigate = useNavigate();
  
  // Chequea si esta logueado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated, navigate]);
  
  
  // config formulario  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="max-w-md m-auto my-10">
      <h2 className="text-blue-700 font-bold text-2xl mb-2">Login</h2>

      <div className="border-2 border-[#f9b000] bg-blue-200 p-10 rounded-lg">
        {/* Mostrar error si existe */}
        {/* {error && <div className="bg-red-600 text-white p-2 mb-4">{error}</div>} */}

        <form onSubmit={onSubmit}>
          {/* Campo de nombre de usuario */}
          <input
            placeholder="Usuario"
            type="text"
            {...register("nombre", {
              required: "El nombre de usuario es requerido",
            })}
            className="w-full px-4 py-2 mb-2 bg-blue-500 text-yellow-300 rounded-md"
          />
          {errors.nombre && (
            <p className="text-red-500">{errors.nombre.message}</p>
          )}

          {/* Campo de contraseña */}
          <input
            placeholder="Contraseña"
            type="password"
            {...register("contraseña", {
              required: "La contraseña es requerida",
            })}
            className="w-full px-4 py-2 mb-2 bg-blue-500 text-yellow-300 rounded-md"
          />
          {errors.contraseña && (
            <p className="text-red-500">{errors.contraseña.message}</p>
          )}

          {/* Botón de Login */}
          <button className="px-4 font-semibold bg-blue-500 text-yellow-300 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
