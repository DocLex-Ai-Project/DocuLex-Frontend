import {  Routes, Route } from "react-router-dom";

import LoginPage from "../modules/auth/Pages/LoginPage";
import SignupPage from "../modules/auth/Pages/SignupPage";
// import CommonOutlet from "../components/ CommonOutlet";
import { Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../layouts/AuthLayout";

const AppRoutes = () => {
  return (
<>

<Suspense
fallback={
    <LoadingScreen 
    message="Loading,please Wait"
    animation="default"/>
}
>
      <Routes>

        <Route path="" element={<AuthLayout />}>

          <Route path="" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage />} />

        </Route>

      </Routes>

      </Suspense>

   </>
  )
};

export default AppRoutes;