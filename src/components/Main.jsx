import React from 'react';

class Main extends React.Component {
    render() {
        return (
            <div className="main-content bg-white p-3 border rounded shadow-sm">
                <h3>Main Content Area</h3>
                <p>Welcome to the dashboard. Here you can manage your tasks.</p>
                {/* Future content like ManageEnrollments or StudentDashboard will be injected or routed here */}
            </div>
        );
    }
}

export default Main;
