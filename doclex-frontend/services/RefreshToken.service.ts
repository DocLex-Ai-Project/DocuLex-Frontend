import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/auth/refresh`,
      { refreshToken }
    );

    const newAccessToken = response.data.accessToken;

    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.log('token is expire try again login in',error)
    localStorage.clear();
    window.location.href = "/";
    return null;
  }
};