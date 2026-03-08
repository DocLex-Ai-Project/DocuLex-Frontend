import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import UserSidebar from "../components/navigation/User/UserSidebar";


import { lightTheme, darkTheme } from "../index.mui";
import UserNavbar from "../components/navigation/User/ UserNavbar";

const UserDashboardLayout = () => {
  const theme = localStorage.getItem("theme") || "light";

  const style = {
    backgroundColor: theme === "light" ? "#F9FAFB" : "#1c1c1c",
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="flex w-full min-h-screen">

        {/* Sidebar */}
        <div className="hidden md:block w-[260px]">
          <UserSidebar />
        </div>

        {/* Main Content */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={style}
        >

          {/* Navbar */}
          <UserNavbar />

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Suspense
              fallback={
                <LoadingScreen message="Loading..." animation="default" />
              }
            >
              <Outlet />
            </Suspense>
          </div>

        </div>

      </div>
    </ThemeProvider>
  );
};

export default UserDashboardLayout;