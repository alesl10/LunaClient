import { Outlet as Page } from "react-router-dom";
import { useState } from "react";
import Aside from "../Aside";
import { FaArrowCircleRight } from "react-icons/fa";


function Layout() {
  const [viewAside, setViewAside] = useState(true);

  // const { isAuthenticated } = UseAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) navigate("/");
  // }, [isAuthenticated]);

  return (
    <div className="grow flex relative">
      <Page />
        <FaArrowCircleRight
          onClick={() => setViewAside(!viewAside)}
          className={`absolute right-3 my-2 size-8 rotate-180 cursor-pointer ${viewAside ? 'hidden' : ""} transition-all `}
        />
        <Aside viewAside={viewAside} setViewAside={setViewAside}/>
    </div>
  );
}

export default Layout;
