// [AI Generated Code - Prompt: "Cấu hình router bảo vệ ProtectedRoute cho các trang dashboard của Admin, Instructor, Student trong AppRoutes, hỗ trợ chi tiết khóa học và hồ sơ học viên"]

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CourseDetail from '../pages/CourseDetail';
import NotFound from '../components/common/NotFound';
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentProfile from '../pages/student/StudentProfile';
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import EnrolledStudents from '../pages/instructor/EnrolledStudents';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageCourses from '../pages/admin/ManageCourses';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageEnrollments from '../pages/admin/ManageEnrollments';
import ComponentDemo from '../pages/ComponentDemo';
import ProtectedRoute from '../components/common/ProtectedRoute';

function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
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
            <Route 
                path="/student/profile" 
                element={
                    <ProtectedRoute allowedRoles={['student']}>
                        <StudentProfile />
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
            <Route 
                path="/instructor/courses" 
                element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                        <InstructorDashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/instructor/courses/:courseId/students" 
                element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                        <EnrolledStudents />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/instructor/students" 
                element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                        <EnrolledStudents />
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
            <Route 
                path="/admin/courses" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ManageCourses />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/admin/categories" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ManageCategories />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/admin/users" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ManageUsers />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/admin/enrollments" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ManageEnrollments />
                    </ProtectedRoute>
                } 
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;