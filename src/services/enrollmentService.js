// [AI Generated Code - Prompt: "Tạo Enrollment service lấy thông tin đăng ký lớp học bằng Axios"]
import api from './api';

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
