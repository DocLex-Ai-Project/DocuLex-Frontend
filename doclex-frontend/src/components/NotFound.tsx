import { Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

import NotFoundImg from "./assets/gifs/NotFound/jack-in-the-box.gif";

const NotFound = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <img src={NotFoundImg} alt="Not Found" className="h-50 w-auto" />
      <Typography
        variant="h2"
        className="text-5xl font-bold text-gray-300"
        sx={{ mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h5" className="text-xl text-gray-400" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.back()}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
