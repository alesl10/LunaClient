import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from 'js-cookie'

//Routes
import Login from "./routes/Login.jsx";
import Layout from "./components/Layout/index.jsx";
import BusquedaTramite from "./routes/BusquedaTramite.jsx";
import BusquedaSociedad from "./routes/busquedaSociedades.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {
  const token = Cookies.get("token");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          element: <ProtectedRoute isLogin={token} />,
          children: [
           
            {
              path: "/busquedasociedades",
              element: <BusquedaSociedad />,
            },
            {
              path: "/BusquedaTramites",
              element: <BusquedaTramite />,
            },
            {
              path: "/BusquedaTramites/:correlativo",
              element: <BusquedaTramite />,
            },
          ],
        },
      ],
    },
    {
        path:'*',
        element: <div className="text-center text-5xl">404</div>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
