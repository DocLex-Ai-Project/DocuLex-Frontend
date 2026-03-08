import {
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const SignupForm = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormValues) => {
    setLoading(true);

    console.log(data);

    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>

        {/* Full Name */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Full name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.6)",
                },
              }}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.6)",
                },
              }}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.6)",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Role */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Account Type"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.6)",
                },
              }}
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="LAWYER">Lawyer</MenuItem>
            </TextField>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            height: 50,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            background: "linear-gradient(135deg,#6366f1,#4f46e5)",
            boxShadow: "0 10px 30px rgba(99,102,241,0.35)",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 15px 40px rgba(99,102,241,0.45)",
              background: "linear-gradient(135deg,#4f46e5,#4338ca)",
            },
          }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>

      </Stack>
    </form>
  );
};

export default SignupForm;