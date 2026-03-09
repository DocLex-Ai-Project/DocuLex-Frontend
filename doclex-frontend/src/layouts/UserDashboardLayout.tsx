import { Outlet } from "react-router-dom";
import UserSidebar from "../components/navigation/User/UserSidebar";
import UserNavbar from "../components/navigation/User/ UserNavbar";

const UserDashboardLayout = () => {
  return (
    // Parent container: exactly the size of the screen, no scrolling on the body
    <div className="flex w-screen h-screen bg-slate-50  overflow-hidden">
      
      {/* 1. Sidebar - It acts as a solid physical block on desktop */}
      <UserSidebar />

      {/* 2. Main Content Wrapper - Takes exactly the remaining space */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        
        {/* Navbar sits at the top */}
        <UserNavbar />
        
        {/* Scrollable Content Area for your pages */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>

      </div>
      
    </div>
  );
};

export default UserDashboardLayout;