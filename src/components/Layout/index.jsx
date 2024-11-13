import { Navigate, Outlet as Page } from "react-router-dom";
import { UseAuth } from "../../context/authContext";
import { useEffect } from "react";
import Aside from "../Aside";

function Layout() {
  // const { isAuthenticated } = UseAuth();

  // useEffect(() => {
  //   if (!isAuthenticated) Navigate("/");
  // }, [isAuthenticated]);

  return (
    <div className="grow flex relative">
      <Page />
      <Aside />
    </div>
  );
}

export default Layout;
