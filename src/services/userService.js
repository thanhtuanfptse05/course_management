// [AI Generated Code - Prompt: "Tạo User service hỗ trợ lấy danh sách người dùng và thay đổi trạng thái isActive (Khóa/Mở khóa)"]
import api from './api';

const userService = {
    getAll: async () => {
        const response = await api.get('/users');
        return response.data;
    },
    
    getById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    
    toggleActive: async (id, isActive) => {
        const response = await api.patch(`/users/${id}`, { isActive });
        return response.data;
    },
    
    delete: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    }
};

export default userService;
