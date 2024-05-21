import HomePage from "./page/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/login";
import AdminPage from "./page/Admin/admin-page";
import Dashboard from "./page/Admin/dashboard";
import Order from "./page/Admin/Ecommerce/Order";
import Product from "./page/Admin/Ecommerce/Product";
import HomeCustommer from "./page/home";
import Cart from "./page/Custommer/Cart";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cart-nghia",
    element: <Cart />,
  },
  {
    path: "/home-page",
    element: <HomeCustommer />,
    children: [
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/admin-page",
    element: <AdminPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "product",
        element: <Product />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
