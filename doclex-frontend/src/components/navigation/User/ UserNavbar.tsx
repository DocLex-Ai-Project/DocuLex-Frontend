import { Box, Typography, Avatar, Stack } from "@mui/material";

export default function UserNavbar() {
    const name=localStorage.getItem('firstName');

return (

<Box
sx={{
height:70,
px:3,
display:"flex",
alignItems:"center",
justifyContent:"space-between",
borderBottom:"1px solid rgba(0,0,0,0.08)"
}}
>

<Typography fontWeight={600}>
User Dashboard
</Typography>

<Stack direction="row" spacing={2} alignItems="center">

<Typography variant="body2">
Welcome <span>{name}</span>
</Typography>

<Avatar />

</Stack>

</Box>

);

}