import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "./page/Admin/admin-page";
import Dashboard from "./page/Admin/dashboard";
import Cart from "./page/Custommer/Cart";
import HomePage from "./page/Custommer/Home";

import NewAccount from "./page/Admin/Account/NewAccount";
import ViewAccount from "./page/Admin/Account/ViewAccount";
import NewCollection from "./page/Admin/Collection/NewCollection";
import ViewCollection from "./page/Admin/Collection/ViewCollection";
import AllOrder from "./page/Admin/Order/All order";
import Invoice from "./page/Admin/Order/Invoice";
import NewProduct from "./page/Admin/Product/NewProduct";
import ViewProduct from "./page/Admin/Product/ViewProduct";
import NewOrder from "./page/Staff/New-Order";
import ViewOrder from "./page/Staff/Order";
import ViewProductS from "./page/Staff/Product";
import ViewUser from "./page/Staff/View-User";
import Warranty from "./page/Staff/Warranty";
import StaffPage from "./page/Staff/staff-page";
import Layout from "./page/layout";
import LoginPage from "./page/login";

import NhanCauHon from "./page/Custommer/NhanCauHon";
import ProductDetails from "./page/Custommer/ProductDetails";

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
      {
        path: "/nhan-cau-hon",
        element: <NhanCauHon />,
      },
      {
        path: "/product-details",
        element: <ProductDetails />,
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
        path: "/admin-page",
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "don-hang/all",
        element: <AllOrder />,
      },
      {
        path: "don-hang/hoa-don",
        element: <Invoice />,
      },
      {
        path: "san-pham/xem-tat-ca-san-pham",
        element: <ViewProduct />,
      },
      {
        path: "san-pham/tao-san-pham",
        element: <NewProduct />,
      },
      {
        path: "tai-khoan/xem-tat-ca-tai-khoan",
        element: <ViewAccount />,
      },
      {
        path: "tai-khoan/tao-tai-khoan",
        element: <NewAccount />,
      },
      {
        path: "bo-suu-tap/xem-tat-ca-bo-suu-tap",
        element: <ViewCollection />,
      },
      {
        path: "bo-suu-tap/tao-bo-suu-tap",
        element: <NewCollection />,
      },
    ],
  },
  {
    path: "/staff-page",
    element: <StaffPage />,
    children: [
      {
        path: "/staff-page",
        element: <NewOrder />,
      },
      {
        path: "/staff-page/don-hang-moi",
        element: <NewOrder />,
      },
      {
        path: "/staff-page/don-hang",
        element: <ViewOrder />,
      },
      {
        path: "/staff-page/tai-khoan",
        element: <ViewUser />,
      },
      {
        path: "/staff-page/san-pham",
        element: <ViewProductS />,
      },
      {
        path: "/staff-page/bao-hanh",
        element: <Warranty />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
