/* eslint-disable react/prop-types */
// src/components/ProtectedRoute/ProtectedRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../redux/features/counterSlice";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = useSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!user || !allowedRoles.includes(user.role[0].authority)) {
    return <Navigate to="/404" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
