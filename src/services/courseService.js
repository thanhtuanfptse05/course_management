// [AI Generated Code - Prompt: "courseService CRUD API dùng Axios cho JSON-Server"]
import api from './api';

// Lấy tất cả khóa học
export const getAllCourses = () => api.get('/courses').then(res => res.data);

// Lấy khóa học theo instructorId
export const getCoursesByInstructor = (instructorId) =>
    api.get(`/courses?instructorId=${instructorId}`).then(res => res.data);

// Thêm khóa học mới
export const createCourse = (data) =>
    api.post('/courses', data).then(res => res.data);

// Cập nhật khóa học
export const updateCourse = (id, data) =>
    api.put(`/courses/${id}`, data).then(res => res.data);

// Xóa khóa học
export const deleteCourse = (id) =>
    api.delete(`/courses/${id}`).then(res => res.data);

// Bật/Tắt trạng thái khóa học
export const toggleCourseStatus = (id, currentStatus) =>
    api.patch(`/courses/${id}`, {
        status: currentStatus === 'active' ? 'inactive' : 'active',
    }).then(res => res.data);
