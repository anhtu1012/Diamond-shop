import { Outlet } from "react-router-dom";
import Header from "../../components/header";

function HomeCustommer() {
  return (
    <div>
      <Header />
      <Outlet />
      
    </div>
  );
}

export default HomeCustommer;
