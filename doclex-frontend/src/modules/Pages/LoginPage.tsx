import { Box, Typography, Divider, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../auth/Components/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        animation: "fadeIn 0.6s ease",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 1,
          background: "linear-gradient(90deg,#4f46e5,#6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Welcome back
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        Sign in to continue using DocLex
      </Typography>

      <LoginForm />

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="body2"
        textAlign="center"
        sx={{ color: "text.secondary" }}
      >
        Don’t have an account?{" "}
        <Link
          component={RouterLink}
          to="/signup"
          underline="hover"
          sx={{ fontWeight: 600 }}
        >
          Create account
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;