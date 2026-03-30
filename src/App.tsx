import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout } from "./components/AppLayout";

import Login from "./pages/Login";


import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import POS from "./pages/POS";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};


const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />


            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute>
                <AppLayout>
                  <Products />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/customers" element={
              <ProtectedRoute>
                <AppLayout>
                  <Customers />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/suppliers" element={
              <ProtectedRoute>
                <AppLayout>
                  <Suppliers />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <AppLayout>
                  <Users />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <AppLayout>
                  <Reports />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/pos" element={
              <ProtectedRoute>
                <AppLayout>
                  <POS />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

