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
import ViewUser from "./page/Staff/View-User";
import Warranty from "./page/Staff/Warranty";
import StaffPage from "./page/Staff/staff-page";
import Layout from "./page/layout";

import NhanCauHon from "./page/Custommer/NhanCauHon";
import ProductDetails from "./page/Custommer/ProductDetails";
import Payment from "./page/Custommer/Payment";

import OrderCustomer from "./page/Custommer/Order";
import DetailOrder from "./page/Custommer/DetailOrder";

import HuongDan from "./page/Custommer/HuongDanDoNi";
import ViewDiamond from "./page/Admin/Diamond/ViewDiamond";
import NewDiamond from "./page/Admin/Diamond/NewDiamond";
import NhanCuoi from "./page/Custommer/NhanCuoi";
import BoTrangSucCuoi from "./page/Custommer/BoTrangSucCuoi";
import AboutDiamond from "./page/Custommer/AboutDiamond";
import ChinhSachBaoMat from "./page/Custommer/BaoMat";
import ChinhSachDoiTra from "./page/Custommer/ChinhSachDoiTra";

import TrangSucCuoi from "./page/Custommer/TrangSucCuoi";
import TrangSucKimCuong from "./page/Custommer/TrangSucKimCuong";
import NhanKimCuong from "./page/Custommer/NhanKimCuong";
import MatDayChuyenKimCuong from "./page/Custommer/MatDayChuyenKimCuong";
import LacVongTayKimCuong from "./page/Custommer/LVTKimcuong";
import BoSuuTapKimCuong from "./page/Custommer/BSTKimCuong";
import BongTaiKimCuong from "./page/Custommer/BongTaiKimCuong";
import KimCuongVien from "./page/Custommer/KimCuongVien";

import Custommize from "./page/Custommer/Custommize";

import DiamondDetails from "./page/Admin/Diamond/DiamondDetails";
import ProductDetail from "./page/Admin/Product/ProductDetail";
import ForgotPassword from "./page/forgotpassword";
import ViewOrderDetails from "./page/Admin/Order/ViewOrder";
import LienHe from "./page/Custommer/LienHe";
import DiamondDetailss from "./page/Custommer/Diamond Details Cus";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./page/login";
import NotFound from "./page/404";
import ProfileAccount from "./page/Admin/Account/ViewAccountDetail/index";
import AccountDetail from "./page/Custommer/ThongTinTaiKhoan";

import DetailNewOrder from "./page/Staff/New-Order/DetailNewOrder";
import ProductDetailStaff from "./page/Staff/ProductStaff/ProductDetail";
import ViewProductS from "./page/Staff/ProductStaff/allProduct";
import KimCuongVienTest from "./page/Custommer/KimCuongVien copy";

import ViewOrderDetailsStaff from "./page/Staff/Order/ViewOrderDetail";

import DeliveryPage from "./page/Delivery/DeliveryPape";
import NewOrderDelivery from "./page/Delivery/NewOrderDelivery";
import DetailNewOrderDelivery from "./page/Delivery/OrderDetail";
import CapNhatDon from "./page/Delivery/CapNhatDon";
import LichSuGiao from "./page/Delivery/LichSuGiao";

import ViewOrderDetailsCusTom from "./page/Custommer/Order/ViewOrderDetail";

import WarrantyCus from "./page/Custommer/Bao-Hanh";

import ChiTietCapNhat from "./page/Delivery/ChiTietCapNhat";
import KimCuongGIA from "./page/Custommer/KimCuongGIA";
import XemDonDaGiao from "./page/Delivery/XemDonDaGiao";


import DetailNewOrderDelivery1 from "./page/Delivery/ChiTietCapNhat1";


// import PageNewOrder from "./page/Staff/New-Order";

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
        path: "/giay-bao-hanh",
        element: <WarrantyCus />,
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
        path: "/nhan-cuoi",
        element: <NhanCuoi />,
      },
      {
        path: "/bo-trang-suc-cuoi",
        element: <BoTrangSucCuoi />,
      },
      {
        path: "/product-details/:product_id",
        element: <ProductDetails />,
      },
      {
        path: "/diamond-details/:diamondID",
        element: <DiamondDetailss />,
      },
      {
        path: "/thanh-toan/:orderID",
        element: <Payment />,
      },
      {
        path: "/don-hang",
        element: <OrderCustomer />,
      },
      {
        path: "/chi-tiet-don-hang",
        element: <DetailOrder />,
      },
      {
        path: "don-hang/chi-tiet-don-hang/:orderID",
        element: <ViewOrderDetailsCusTom />,
      },
      {
        path: "/tuy-chinh",
        element: <Custommize />,
      },
      {
        path: "/huong-dan-do-ni",
        element: <HuongDan />,
      },
      {
        path: "/gioi-thieu-ve-diamond",
        element: <AboutDiamond />,
      },
      {
        path: "/chinh-sach-bao-mat",
        element: <ChinhSachBaoMat />,
      },
      {
        path: "/chinh-sach-doi-tra",
        element: <ChinhSachDoiTra />,
      },
      {
        path: "/trang-suc-cuoi",
        element: <TrangSucCuoi />,
      },
      {
        path: "/trang-suc-kim-cuong",
        element: <TrangSucKimCuong />,
      },
      {
        path: "/nhan-kim-cuong",
        element: <NhanKimCuong />,
      },
      {
        path: "/mat-day-chuyen-kim-cuong",
        element: <MatDayChuyenKimCuong />,
      },
      {
        path: "/lac-vong-tay-kim-cuong",
        element: <LacVongTayKimCuong />,
      },
      {
        path: "/bo-suu-tap-kim-cuong",
        element: <BoSuuTapKimCuong />,
      },
      {
        path: "/bong-tai-kim-cuong",
        element: <BongTaiKimCuong />,
      },
      {
        path: "/kim-cuong-vien",
        element: <KimCuongVien />,
      },
      {
        path: "/kim-cuong-vien-test",
        element: <KimCuongVienTest />,
      },
      {
        path: "/lien-he",
        element: <LienHe />,
      },
      {
        path: "/thong-tin-chi-tiet",
        element: <AccountDetail />,
      },
      {
        path: "/kim-cuong-gia",
        element: <KimCuongGIA />,
      },
    ],
  },

  {
    path: "/quen-mat-khau",
    element: <ForgotPassword />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/delivery-page",
    element: (
      <ProtectedRoute
        element={<DeliveryPage />}
        allowedRoles={["ROLE_DELIVERY"]}
      />
    ),
    children: [
      {
        path: "/delivery-page",
        element: <NewOrderDelivery />,
      },
      {
        path: "/delivery-page/don-hang-moi",
        element: <NewOrderDelivery />,
      },

      {
        path: "/delivery-page/chi-tiet-don-hang/:orderID",
        element: <DetailNewOrderDelivery />,
      },
      {
        path: "/delivery-page/chi-tiet-don-hang1/:orderID",
        element: <DetailNewOrderDelivery1 />,
      },

      {
        path: "/delivery-page/cap-nhat-don-hang",
        element: <CapNhatDon />,
      },
      {
        path: "/delivery-page/lich-su-giao-hang",
        element: <LichSuGiao />,
      },
      {
        path: "/delivery-page/lich-su-giao-hang/da-giao",
        element: <XemDonDaGiao />,
      },
      {
        path: "/delivery-page/chi-tiet-cap-nhat/:orderID",
        element: <ChiTietCapNhat />,
      },
    ],
  },
  {
    path: "/admin-page",
    element: (
      <ProtectedRoute element={<AdminPage />} allowedRoles={["ROLE_ADMIN"]} />
    ),
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
        path: "don-hang/all/order-detail/:orderID",
        element: <ViewOrderDetails />,
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
        path: "/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/:productID",
        element: <ProductDetail />,
      },
      {
        path: "san-pham/tao-san-pham",
        element: <NewProduct />,
      },
      {
        path: "san-pham/xem-tat-ca-kim-cuong",
        element: <ViewDiamond />,
      },
      {
        path: "/admin-page/san-pham/xem-tat-ca-kim-cuong/daimond-detail/:diamondID",
        element: <DiamondDetails />,
      },
      {
        path: "san-pham/tao-kim-cuong",
        element: <NewDiamond />,
      },
      {
        path: "tai-khoan/xem-tat-ca-tai-khoan",
        element: <ViewAccount />,
      },
      {
        path: "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/:userID",
        element: <ProfileAccount />,
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
    element: (
      <ProtectedRoute element={<StaffPage />} allowedRoles={["ROLE_STAFF"]} />
    ),
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
        path: "/staff-page/don-hang/order-detail/:orderID",
        element: <ViewOrderDetailsStaff />,
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
        path: "/staff-page/xem-san-pham/chi-tiet-san-pham/:productID",
        element: <ProductDetailStaff />,
      },
      {
        path: "/staff-page/bao-hanh",
        element: <Warranty />,
      },
      {
        path: "/staff-page/chi-tiet-don-hang/:orderID",
        element: <DetailNewOrder />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
