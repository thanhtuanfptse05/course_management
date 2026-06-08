// [AI Generated Code - Prompt: "Khôi phục App.jsx về giao diện cơ bản tích hợp Header, Footer, Sidebar cho admin và định tuyến AppRoutes"]
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <div className="app-container d-flex flex-column min-vh-100">
                <main className="flex-grow-1 d-flex flex-column">
                    <AppRoutes />
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
