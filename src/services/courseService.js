// [AI Generated Code - Prompt: "Tạo Course service thực hiện CRUD khóa học bằng Axios nối với json-server, tương thích cả các hàm xuất lẻ"]
import api from './api';

export const getAllCourses = () => api.get('/courses').then(res => res.data);

export const getCoursesByInstructor = (instructorId) =>
    api.get(`/courses?instructorId=${instructorId}`).then(res => res.data);

export const createCourse = (data) =>
    api.post('/courses', data).then(res => res.data);

export const updateCourse = (id, data) =>
    api.put(`/courses/${id}`, data).then(res => res.data);

export const deleteCourse = (id) =>
    api.delete(`/courses/${id}`).then(res => res.data);

export const toggleCourseStatus = (id, currentStatus) =>
    api.patch(`/courses/${id}`, {
        status: currentStatus === 'active' ? 'inactive' : 'active',
    }).then(res => res.data);

const courseService = {
    getAll: async () => {
        const response = await api.get('/courses');
        return response.data;
    },
    
    getById: async (id) => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    }
};

export default courseService;
