import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../components/common/NotFound';
import StudentDashboard from '../pages/student/StudentDashboard';
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import EnrolledStudents from '../pages/instructor/EnrolledStudents';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ComponentDemo from '../pages/ComponentDemo';

function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/demo" element={<ComponentDemo />} />

            {/* Student routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />

            {/* Instructor routes */}
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/courses/:courseId/students" element={<EnrolledStudents />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;