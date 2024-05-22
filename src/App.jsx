import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Order from "./page/Admin/Ecommerce/Order";
import Product from "./page/Admin/Ecommerce/Product";
import AdminPage from "./page/Admin/admin-page";
import Dashboard from "./page/Admin/dashboard";
import Cart from "./page/Custommer/Cart";
import HomePage from "./page/Custommer/Home";
import Layout from "./page/home";
import LoginPage from "./page/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
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
