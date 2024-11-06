import { Outlet as Page } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function Layout() {
  return (
    <main className="relative flex flex-col justify-between h-svh">
      <div className="absolute w-full h-full bg-black/20 -z-10"></div>
      <img
        src="semana_18.jpg"
        alt=""
        className="absolute w-full h-full -z-20"
      />
      <Header />
      <div className=" grow ">
        <Page />
      </div>
      <Footer />
    </main>
  );
}

export default Layout;
