import { Routes, Route } from "react-router-dom";

import LoginPage from "../modules/auth/Pages/LoginPage";
import SignupPage from "../modules/auth/Pages/SignupPage";
// import CommonOutlet from "../components/ CommonOutlet";
import { Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../layouts/AuthLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import UserDashboard from "../modules/auth/Pages/User/UserDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import NotFound from "../components/NotFound";
import LawayerLayout from "../layouts/LawayerLayout";
import LawyerDashboard from "../modules/auth/Pages/Lawyer/LawayerDashboard";

const AppRoutes = () => {
    return (
        <>

            <Suspense
                fallback={
                    <LoadingScreen
                        message="Loading,please Wait"
                        animation="default" />
                }
            >
                <Routes>

                    {/* Auth Pages */}
                    <Route element={<AuthLayout />}>

                        <Route path="/" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />

                    </Route>

                    {/* User Protected Route */}
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <UserDashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<UserDashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                     <Route
                        path="/lawyer"
                        element={
                            <ProtectedRoute>
                            <LawayerLayout/>
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<LawyerDashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />

                </Routes>

            </Suspense>

        </>
    )
};

export default AppRoutes;