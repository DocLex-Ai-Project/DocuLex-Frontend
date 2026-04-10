import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import LawayerSidebar from "../components/navigation/User/Lawayer/LawayerSidebar";
import UserNavbar from "../components/navigation/User/ UserNavbar";

import { lightTheme, darkTheme } from "../index.mui";
import Chatbot from "../components/Chatbot/Chatbot";

const LawayerLayout = () => {

const theme = localStorage.getItem("theme") || "light";

const style = {
backgroundColor: theme === "light" ? "#F9FAFB" : "#1c1c1c"
};

return (

<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>

<div className="flex min-h-screen" style={style}>

{/* Sidebar */}
<LawayerSidebar />

{/* Content */}
<div className="flex flex-col flex-grow">

{/* Navbar */}
<UserNavbar />

{/* Page Content */}
<main className="flex-grow p-6 overflow-y-auto">

<Suspense
fallback={
<LoadingScreen
message="Loading..."
animation="default"
/>
}
>
<Outlet />
</Suspense>

</main>
<Chatbot />
</div>

</div>

</ThemeProvider>

);

};

export default LawayerLayout;