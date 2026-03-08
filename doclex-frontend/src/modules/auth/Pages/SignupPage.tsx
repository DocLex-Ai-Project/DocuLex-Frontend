import { Box, Typography, Divider, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SignupForm from "../Components/SignupForm";

const SignupPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        animation: "fadeIn 0.6s ease",

        "@keyframes fadeIn": {
          from: {
            opacity: 0,
            transform: "translateY(10px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      {/* Heading */}
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
        Create account
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 4 }}
      >
        Start using DocLex AI to generate and review legal documents.
      </Typography>

      {/* Signup Form */}
      <SignupForm />

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* Login Link */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ color: "text.secondary" }}
      >
        Already have an account?{" "}
        <Link
          component={RouterLink}
          to=""
          underline="hover"
          sx={{ fontWeight: 600 }}
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupPage;