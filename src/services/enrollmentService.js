// [AI Generated Code - Prompt: "Tạo Enrollment service lấy thông tin đăng ký lớp học bằng Axios nối với json-server, tương thích các hàm xuất lẻ"]
import api from './api';

export const getEnrollmentsByCourse = (courseId) =>
    api.get(`/enrollments?courseId=${courseId}`).then(res => res.data);

export const getStudentsByCourse = async (courseId) => {
    const [enrollments, users] = await Promise.all([
        api.get(`/enrollments?courseId=${courseId}`).then(res => res.data),
        api.get('/users?role=student').then(res => res.data),
    ]);

    return enrollments.map(enrollment => {
        const student = users.find(u => u.id === enrollment.studentId);
        return {
            enrollmentId: enrollment.id,
            enrollmentStatus: enrollment.status,
            studentId: enrollment.studentId,
            studentName: student?.name || 'Không xác định',
            studentEmail: student?.email || '—',
        };
    });
};

export const countApprovedStudents = (courseId) =>
    api.get(`/enrollments?courseId=${courseId}&status=approved`)
        .then(res => res.data.length);

const enrollmentService = {
    getAll: async () => {
        const response = await api.get('/enrollments');
        return response.data;
    },
    
    getById: async (id) => {
        const response = await api.get(`/enrollments/${id}`);
        return response.data;
    }
};

export default enrollmentService;
