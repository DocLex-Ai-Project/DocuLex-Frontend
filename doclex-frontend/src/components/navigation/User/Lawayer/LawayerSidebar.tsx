import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Bot,
  Scale,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const sidebarWidth = 260;
const collapsedWidth = 72;

export default function LawayerSidebar() {

const [collapsed,setCollapsed] = useState(false);

const handleLogout = () => {
localStorage.clear();
window.location.href = "/";
};

const navItems = [
{
label:"Dashboard",
icon:<LayoutDashboard size={20}/>,
path:"/lawyer"
},
{
label:"Review Requests",
icon:<Bot size={20}/>,
path:"/lawyer/review-requests"
},
{
label:"Cases",
icon:<Scale size={20}/>,
path:"/lawyer/cases"
},
// {
// label:"Documents",
// icon:<FileText size={20}/>,
// path:"/lawyer/documents"
// },
// {
// label:"Settings",
// icon:<Settings size={20}/>,
// path:"/lawyer/settings"
// }
];

return (

<div
className="h-screen border-r border-gray-200 bg-white flex flex-col transition-all duration-300"
style={{width: collapsed ? collapsedWidth : sidebarWidth}}
>

{/* Logo */}

<div className="flex items-center justify-between p-4">

<h1 className="font-bold text-lg">
{collapsed ? "DL" : "DocLex"}
</h1>

<button
onClick={()=>setCollapsed(!collapsed)}
className="p-1 rounded hover:bg-gray-100"
>

{collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}

</button>

</div>

{/* Navigation */}

<nav className="flex flex-col gap-1 px-2 flex-grow">

{navItems.map((item)=>(

<NavLink
key={item.path}
to={item.path}
className={({isActive})=>
`flex items-center gap-3 p-3 rounded-lg transition
${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
`
}
>

<div>{item.icon}</div>

{!collapsed && <span>{item.label}</span>}

</NavLink>

))}

</nav>

{/* Logout */}

<div className="p-2 border-t border-gray-200">

<button
onClick={handleLogout}
className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-500"
>

<LogOut size={20}/>

{!collapsed && "Logout"}

</button>

</div>

</div>

);

}