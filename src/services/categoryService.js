// [AI Generated Code - Prompt: "categoryService lấy danh sách danh mục từ JSON-Server"]
import api from './api';

export const getAllCategories = () =>
    api.get('/categories').then(res => res.data);
