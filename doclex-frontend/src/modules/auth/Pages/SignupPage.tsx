import { Paper, Typography } from "@mui/material";

const SignupPage = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 400,
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" mb={3} fontWeight={600}>
        Sign Up
      </Typography>

      Signup Form
    </Paper>
  );
};

export default SignupPage;