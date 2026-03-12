import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import LoginPage from "../modules/auth/Pages/LoginPage";
import SignupPage from "../modules/auth/Pages/SignupPage";

import AuthLayout from "../layouts/AuthLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import LawyerLayout from "../layouts/LawayerLayout";

import UserDashboard from "../modules/auth/Pages/User/UserDashboard";
import LawyerDashboard from "../modules/auth/Pages/Lawyer/LawayerDashboard";

import CreateDocumentPage from "../modules/documents/pages/CreateDocumentPage";
import DocumentsPage from "../modules/documents/pages/DocumentsPage";
import EditorPage from "../modules/documents/Editorpage";
import SettingsPage from "../modules/documents/pages/SettingPage";

import ProtectedRoute from "./ProtectedRoutes";
import LoadingScreen from "../components/LoadingScreen";
import NotFound from "../components/NotFound";

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <LoadingScreen message="Loading, please wait" animation="default" />
      }
    >
      <Routes>

        {/* AUTH ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role={"USER"}>
              <UserDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />

          {/* Create or Upload */}
          <Route path="create" element={<CreateDocumentPage />} />

          {/* Document center */}
          <Route path="documents" element={<DocumentsPage />} />

          {/* Word editor */}
          <Route path="editor" element={<EditorPage />} />

          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* LAWYER ROUTES */}
        <Route
          path="/lawyer"
          element={
            <ProtectedRoute role={"LAWYER"}>
              <LawyerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LawyerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* GLOBAL 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;