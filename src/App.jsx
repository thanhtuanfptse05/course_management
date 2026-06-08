import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';

function App() {
    return (
        <div className="container-fluid mt-4">
            {/* Gọi component Content */}
            <Content />
        </div>
    );
}

export default App;