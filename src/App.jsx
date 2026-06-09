// [AI Generated Code - Prompt: "Thiết lập cấu trúc Routing cho App"]
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import Home from './pages/student/Home';
import CourseDetail from './pages/student/CourseDetail';
import StudentProfile from './pages/student/StudentProfile';
import StudentDashboard from './pages/student/StudentDashboard';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import EnrolledStudents from './pages/instructor/EnrolledStudents';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCategories from './pages/admin/ManageCategories';
import ManageCourses from './pages/admin/ManageCourses';
import ManageUsers from './pages/admin/ManageUsers';
import ManageEnrollments from './pages/admin/ManageEnrollments';

function App() {
  return (
    <Routes>
      {/* Public / Student Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {/* Instructor Routes */}
      <Route path="/instructor" element={<DashboardLayout />}>
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="students" element={<EnrolledStudents />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="enrollments" element={<ManageEnrollments />} />
      </Route>
    </Routes>
  );
}

export default App;