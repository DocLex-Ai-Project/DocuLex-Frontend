import { Box, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "radial-gradient(circle at 20% 20%, #6366f1 0%, transparent 30%), radial-gradient(circle at 80% 80%, #a5b4fc 0%, transparent 30%), #f8fafc",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 10,
        }}
      >
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            letterSpacing: -1,
            mb: 2,
          }}
        >
          DocLex
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            maxWidth: 420,
            mb: 5,
          }}
        >
          AI-powered legal document drafting and verification platform for
          smarter agreements.
        </Typography>

        {/* Floating features */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[
            "AI Document Generator",
            "Smart Agreement Analysis",
            "Lawyer Review Workflow",
            "Secure Document Processing",
          ].map((feature, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                width: "fit-content",
                px: 2.5,
                py: 1.2,
                borderRadius: 5,
                background: "white",
                fontSize: 14,
                fontWeight: 500,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.05)",
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                "@keyframes float": {
                  "0%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-8px)" },
                  "100%": { transform: "translateY(0px)" },
                },
              }}
            >
              {feature}
            </Paper>
          ))}
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthLayout;