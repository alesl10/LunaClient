import { Navigate, Outlet as Page } from "react-router-dom";
import { UseAuth } from "../../context/authContext";
import { useEffect } from "react";

function Layout() {
  // const { isAuthenticated } = UseAuth();

  // useEffect(() => {
  //   if (!isAuthenticated) Navigate("/");
  // }, [isAuthenticated]);

  return (
    <div className="grow relative">
      <Page />
    </div>
  );
}

export default Layout;
