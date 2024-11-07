import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/authContext.jsx";

//Routes
import Login from "./routes/Login.jsx";
import Layout from "./components/Layout/index.jsx";
import BusquedaTramite from "./routes/BusquedaTramite.jsx";
import BusquedaSociedad from "./routes/busquedaSociedades.jsx";

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
        path: "/busquedasociedades",
        element: <BusquedaSociedad />,
      },
      {
        path: "/BusquedaTramite",
        element: <BusquedaTramite />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
