// [AI Generated Code - Prompt: "Tạo Axios instance kết nối tới cổng 3000 của JSON-Server cho dự án quản lý khóa học"]
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
