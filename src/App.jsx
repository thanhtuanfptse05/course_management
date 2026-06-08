// [AI Generated Code - Prompt: "Cấu hình App component bọc bởi AuthProvider và BrowserRouter để sử dụng AppRoutes và CSS style mới"]

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-container d-flex flex-column min-vh-100">
                    <main className="flex-grow-1 d-flex flex-column">
                        <AppRoutes />
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;