import { Navigate, Outlet } from "react-router-dom";

interface Props {
  role?: string;
}

const ProtectedRoute = ({ role }: Props) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;