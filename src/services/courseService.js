// [AI Generated Code - Prompt: "Tạo Course service lấy danh sách tất cả các khóa học bằng Axios"]
import api from './api';

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
