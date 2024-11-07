import { useForm } from "react-hook-form";
import { AuthContext } from "../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

function Login() {
  const { signin, error, isAuthenticated } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => signin(values));

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/Home");
  // }, [isAuthenticated]);

  return (
    <div className="max-w-md m-auto my-10">
      <h2 className=" text-blue-700 font-bold text-2xl mb-2">Login</h2>

      <div className="border-2 border-[#f9b000] bg-blue-200 p-10 rounded-lg">
        <div className=" bg-red-600 text-white">
          <p>{error}</p>
        </div>

        <form onSubmit={onSubmit}>
          <input
            placeholder="Usuario"
            type="text"
            {...register("nombre", { required: true })}
            className="w-full px-4 py-2 mb-2 bg-blue-500 text-yellow-300 rounded-md"
          />
          {errors.username && <p>username is required</p>}

          <input
            placeholder="contraseña"
            type="password"
            {...register("contraseña", { required: true })}
            className="w-full px-4 py-2 mb-2 bg-blue-500 text-yellow-300 rounded-md"
          />
          {errors.username && <p>username is required</p>}

          <button className=" px-4 font-semibold bg-blue-500 text-yellow-300 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
