import React from "react";
import { AppProviders } from "./context/GlobalProvider";
import AppRoutes from "./routes/AppRoutes";

const App = () => {



//   useEffect(() => {
//   const verifyUser = async () => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) return;

//     try {
//       const response = await axiosInstance.get("/api/auth/me");

//       const role = response.data.user.role;

//       localStorage.setItem("role", role);

//       if (role === "LAWYER") {
//         navigate("/lawyer");
//       } else {
//         navigate("/user");
//       }

//     } catch (error) {
//       // token invalid or expired
//       localStorage.clear();
//       navigate("/");
//     }
//   };

//   verifyUser();
// }, []);
  return (
    // <AppProviders>
      <AppRoutes />
    // </AppProviders>
  );
};

export default App;