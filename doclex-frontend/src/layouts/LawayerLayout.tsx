import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import UserSidebar from "../components/navigation/User/UserSidebar";


import { lightTheme, darkTheme } from "../index.mui";
import UserNavbar from "../components/navigation/User/ UserNavbar";
import LawayerSidebar from "../components/navigation/User/Lawayer/LawayerSidebar";

const LawayerLayout = () => {
  const theme = localStorage.getItem("theme") || "light";

  const style = {
    backgroundColor: theme === "light" ? "#F9FAFB" : "#1c1c1c",
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="flex w-full min-h-screen">

        {/* Sidebar */}
        <div className="flex flex-col flex-grow min-h-screen overflow-x-auto">
          <UserNavbar />
    

        {/* Main Content */}
          <main className="flex-grow p-6  relative">
   
          <Outlet />
     
         
        </main>
      
        </div>
    </div>
      
    </ThemeProvider>
  );
};

export default LawayerLayout;