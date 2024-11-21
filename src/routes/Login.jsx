import { useForm } from "react-hook-form";
import { UseAuth } from "../context/authContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";

function Login() {
  const { isAuthenticated, signin, error, isLoading } = UseAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="border-2 bg-blue-200 m-auto w-[400px] rounded-3xl shadow-lg shadow-primary">
        <div className="bg-primary px-7 py-2 rounded-t-3xl flex justify-between">
          <div>
            <h2 className="text-white text-xl ">Bienvenido a</h2>
            <img src="luna5.png" className=" w-[150px]" alt="Luna Logo" />

          </div>
          <img
            src="IconoLunaFinal.png"
            className=" mt-1 w-[80px]"
            alt="IGJ Logo"
          />
        </div>
        {/* Mostrar error si existe */}
        {error && (
          <div className=" text-red-800 font-bold p-1 px-5 mb-2">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto px-8 p-4 ">
          <div className="mb-4">
            <input
              placeholder="Usuario"
              type="text"
              {...register("nombre", {
                required: "El nombre de usuario es requerido",
              })}
              className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4 relative">
            <input
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"} // Alterna entre 'text' y 'password'
              {...register("contraseña", {
                required: "La contraseña es requerida",
              })}
              className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
              {/* Cambia el ícono */}
            </button>
            {errors.contraseña && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contraseña.message}
              </p>
            )}
          </div>

          {/* Botón de Login */}

          {isLoading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
