import React from 'react';

class Left extends React.Component {
    render() {
        return (
            <div className="left-sidebar bg-light p-3 border rounded">
                <h5>Left Sidebar</h5>
                <ul>
                    <li><a href="#admin/enrollments">Manage Enrollments</a></li>
                    <li><a href="#admin/courses">Manage Courses</a></li>
                </ul>
            </div>
        );
    }
}

export default Left;
