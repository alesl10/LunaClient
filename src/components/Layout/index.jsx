import { Outlet as Page} from "react-router-dom";

function Layout() {

  return (
    <div className="grow relative">
      <Page />
    </div>
  );
}

export default Layout;
