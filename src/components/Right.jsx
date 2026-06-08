import React from 'react';

class Right extends React.Component {
    render() {
        return (
            <div className="right-panel bg-light p-3 border rounded text-center">
                <h5>Information</h5>
                <p>Role: Admin</p>
                <button className="btn btn-primary btn-sm mt-2">Settings</button>
            </div>
        );
    }
}

export default Right;
