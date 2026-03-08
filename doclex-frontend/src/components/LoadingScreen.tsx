import React from "react";
import AuthAnimation from "./assets/gifs/authentication.gif";

const LoadingScreen: React.FC<{ message: string; animation?: string }> = ({
  message,
  animation,
}) => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        {animation == "default" && (
          <div className="animate-spin rounded-full border-t-4 border-primary border-8 w-24 h-24"></div>
        )}
        {animation == "authentication" && (
          <img width={200} src={AuthAnimation} alt="authentication" />
        )}
        <p className="text-xl text-center font-semibold text-gray-800">
          {message}
        </p>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 ">This may take a few moments</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
