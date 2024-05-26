import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Foster from "../../components/Foster";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Foster/>
    </div>
  );
}

export default Layout;
