import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role?: "USER" | "LAWYER";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role restriction
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;