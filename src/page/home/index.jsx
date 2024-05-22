import { Outlet } from "react-router-dom";
import Header from "../../components/header";

function HomePage() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default HomePage;
