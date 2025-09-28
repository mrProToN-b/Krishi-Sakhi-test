import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import PrivateRoute from "components/PrivateRoute";

// Import pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import Auth from "./pages/Auth";
import FarmerDashboard from "./pages/FarmerDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
// import Chat from './pages/Chat'; // Removed - now using floating chatbot
import Contact from "./pages/Contact";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/chat" element={<Chat />} /> */}{" "}
          {/* Removed - now using floating chatbot */}
          <Route path="/contact" element={<Contact />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard/farmer"
            element={
              <PrivateRoute>
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/business"
            element={
              <PrivateRoute>
                <BusinessDashboard />
              </PrivateRoute>
            }
          />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
