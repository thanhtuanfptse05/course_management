import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
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
