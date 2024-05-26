import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/Foster";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default Layout;
