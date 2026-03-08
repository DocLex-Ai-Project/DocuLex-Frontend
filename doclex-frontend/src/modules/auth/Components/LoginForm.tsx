import {
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { AuthResponse } from "../../../types/Main.interface";

// interface LoginState {
//   email: string;
//   password: string;
// }



const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleSubmit =async (e:any) => {
     setLoading(true);
     console.log()
    e.preventDefault();
    const payload={
        email,
        password
    }
   try{
    const response= await axios.post<AuthResponse>(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,payload);
     console.log("This is response",response);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("RefreshToken",response.data.refreshToken);


     if(response.status===200){
       if (response.data.user.role === "LAWYER") {
        localStorage.setItem("firstName",response.data.user.firstName);
        localStorage.setItem("LastName",response.data.user.lastName);
      navigate("/lawyer");
    } else {
         localStorage.setItem("firstName",response.data.user.firstName);
        localStorage.setItem("LastName",response.data.user.lastName);
      navigate("/user");
    }
}

  

   }
   catch(err){
    console.log('This is err',err);
   }
   finally{
    setLoading(false);
   }

   

    console.log({ email, password });

    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backdropFilter: "blur(10px)",
      }}
    >
      <Stack spacing={3}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s ease",

              "& fieldset": {
                borderColor: "rgba(0,0,0,0.08)",
              },

              "&:hover fieldset": {
                borderColor: "#6366f1",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#6366f1",
                boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
              },
            },
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s ease",

              "& fieldset": {
                borderColor: "rgba(0,0,0,0.08)",
              },

              "&:hover fieldset": {
                borderColor: "#6366f1",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#6366f1",
                boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: "#6366f1" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          variant="caption"
          textAlign="right"
          sx={{ color: "text.secondary" }}
        >
          <Link underline="hover" href="#">
            Forgot password?
          </Link>
        </Typography>

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

            background:
              "linear-gradient(135deg,#6366f1 0%, #4f46e5 100%)",

            boxShadow: "0 10px 30px rgba(99,102,241,0.35)",

            transition: "all 0.25s ease",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 15px 40px rgba(99,102,241,0.45)",
              background:
                "linear-gradient(135deg,#4f46e5 0%, #4338ca 100%)",
            },
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;