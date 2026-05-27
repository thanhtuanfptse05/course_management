import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/course/Home";
import Courses from "../pages/course/Courses";
import CourseDetail from "../pages/course/CourseDetail";

import Login from "../pages/auth/Login";

import StudentDashboard from "../pages/student/StudentDashboard";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="courses" element={<Courses />} />

        <Route path="courses/:id" element={<CourseDetail />} />

        <Route path="login" element={<Login />} />

        <Route path="student/dashboard" element={<StudentDashboard />} />

        <Route path="instructor/dashboard" element={<InstructorDashboard />} />

        <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
