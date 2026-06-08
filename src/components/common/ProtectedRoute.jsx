// [AI Generated Code - Prompt: "Tạo ProtectedRoute kiểm tra đăng nhập và phân quyền truy cập route dựa trên vai trò (admin/instructor/student)"]

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If authenticated but unauthorized role, redirect to their default dashboard
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'instructor':
        return <Navigate to="/instructor/dashboard" replace />;
      case 'student':
      default:
        return <Navigate to="/student/dashboard" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
