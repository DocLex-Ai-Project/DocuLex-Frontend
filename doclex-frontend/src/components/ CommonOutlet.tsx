import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const CommonOutlet = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default CommonOutlet;