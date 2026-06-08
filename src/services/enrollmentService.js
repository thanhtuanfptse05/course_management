// [AI Generated Code - Prompt: "enrollmentService lấy học viên đăng ký theo khóa học"]
import api from './api';

// Lấy tất cả enrollments theo courseId
export const getEnrollmentsByCourse = (courseId) =>
    api.get(`/enrollments?courseId=${courseId}`).then(res => res.data);

// Lấy thông tin học viên (join users) theo courseId
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

// Đếm số học viên (approved) theo courseId
export const countApprovedStudents = (courseId) =>
    api.get(`/enrollments?courseId=${courseId}&status=approved`)
        .then(res => res.data.length);
