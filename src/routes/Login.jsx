import { useForm } from "react-hook-form";
import { UseAuth } from "../context/authContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "flowbite-react";

function Login() {
  const { isAuthenticated, signin } = UseAuth();
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
      <div className="border-2 border-[#f9b000] bg-blue-200 m-auto p-5 w-[500px] rounded-md shadow-md">
        <h2 className="text-blue-700 font-bold text-2xl mb-2">Login</h2>
        {/* Mostrar error si existe */}
        {/* {error && <div className="bg-red-600 text-white p-2 mb-4">{error}</div>} */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto p-4 "
        >
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
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
