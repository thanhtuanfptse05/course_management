// [AI Generated Code - Prompt: "Cấu hình router bảo vệ ProtectedRoute cho các trang dashboard của Admin, Instructor, Student trong AppRoutes"]

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../components/common/NotFound';
import StudentDashboard from '../pages/student/StudentDashboard';
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ComponentDemo from '../pages/ComponentDemo';
import ProtectedRoute from '../components/common/ProtectedRoute';

function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/demo" element={<ComponentDemo />} />

            {/* Student routes */}
            <Route 
                path="/student/dashboard" 
                element={
                    <ProtectedRoute allowedRoles={['student']}>
                        <StudentDashboard />
                    </ProtectedRoute>
                } 
            />

            {/* Instructor routes */}
            <Route 
                path="/instructor/dashboard" 
                element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                        <InstructorDashboard />
                    </ProtectedRoute>
                } 
            />

            {/* Admin routes */}
            <Route 
                path="/admin/dashboard" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } 
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;