import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
Drawer,
List,
ListItemButton,
ListItemIcon,
ListItemText,
IconButton,
Box,
Typography,
Divider,
Tooltip,
useTheme,
useMediaQuery
} from "@mui/material";

import {
Dashboard,
Description,
UploadFile,
SmartToy,
RateReview,
FolderShared,
Settings,
Logout,
Menu,
ChevronLeft,
ChevronRight
} from "@mui/icons-material";

const drawerWidth = 260;
const collapsedWidth = 72;

const navItems = [
{ text: "Dashboard", icon: <Dashboard />, path: "/user" },

{ text: "Create Document", icon: <Description />, path: "/user/create" },

{ text: "My Documents", icon: <FolderShared />, path: "/user/documents" },

{ text: "Upload & Scan", icon: <UploadFile />, path: "/user/upload" },

{ text: "AI Review Results", icon: <SmartToy />, path: "/user/ai-review" },

{ text: "Request Lawyer Review", icon: <RateReview />, path: "/user/request-review" },

{ text: "Settings", icon: <Settings />, path: "/user/settings" },

{ text: "Logout", icon: <Logout />, path: "/logout" }
];

export default function UserSidebar() {

const location = useLocation();
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

const [collapsed, setCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);

const handleLogout = () => {
localStorage.clear();
window.location.href = "/";
};

const drawerContent = (

<Box sx={{height:"100%",display:"flex",flexDirection:"column"}}>

{/* Logo */}
<Box
sx={{
p:2,
display:"flex",
alignItems:"center",
justifyContent: collapsed ? "center" : "flex-start"
}}
>

<Typography fontWeight="bold" fontSize={20}>
{collapsed ? "DL" : "DocLex"}
</Typography>

</Box>

<Divider/>

{/* Navigation */}
<List sx={{flex:1}}>

{navItems.map((item)=>{

const isActive = location.pathname === item.path;

return(

<Tooltip
title={collapsed ? item.text : ""}
placement="right"
key={item.text}
>

<ListItemButton
component={Link}
to={item.path}
onClick={item.text==="Logout" ? handleLogout : undefined}
sx={{

mx:1,
my:0.5,
borderRadius:2,

justifyContent: collapsed ? "center" : "flex-start",
px: collapsed ? 2 : 3,

backgroundColor: isActive ? "primary.main" : "transparent",
color: isActive ? "#fff" : "text.primary",

"&:hover":{
backgroundColor: isActive
? "primary.main"
: theme.palette.action.hover
}
}}

>

<ListItemIcon
sx={{
color: isActive ? "#fff" : "inherit",
minWidth: collapsed ? "auto" : 40
}}
>
{item.icon}
</ListItemIcon>

{!collapsed && (
<ListItemText primary={item.text}/>
)}

</ListItemButton>

</Tooltip>

);

})}

</List>

{/* Collapse Toggle */}
{!isMobile && (

<Box
sx={{
display:"flex",
justifyContent:"center",
p:1
}}
>

<IconButton
onClick={()=>setCollapsed(!collapsed)}
>

{collapsed
? <ChevronRight/>
: <ChevronLeft/>
}

</IconButton>

</Box>

)}

</Box>
);

return(

<>

{/* Mobile Menu Button */}
{isMobile && (

<IconButton
onClick={()=>setMobileOpen(true)}
sx={{
top:10,
left:10,
zIndex:0
}}
>
<Menu/>
</IconButton>

)}

{/* Drawer */}
<Drawer

variant={isMobile ? "temporary" : "permanent"}

open={isMobile ? mobileOpen : true}

onClose={()=>setMobileOpen(false)}

sx={{

width: collapsed ? collapsedWidth : drawerWidth,

"& .MuiDrawer-paper":{

width: collapsed ? collapsedWidth : drawerWidth,

transition:"width 0.3s",

overflowX:"hidden",

boxSizing:"border-box",

borderRight:"1px solid rgba(0,0,0,0.08)"
}

}}

>

{drawerContent}

</Drawer>

</>

);

}