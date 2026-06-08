// [AI Generated Code - Prompt: "Tạo StatCard component hiển thị thẻ thống kê số lượng học viên, doanh thu... có hover animation cao cấp"]
import React from 'react';
import { Card } from 'react-bootstrap';

function StatCard({ title, value, icon, color = 'primary', subtitle }) {
    // Định nghĩa class màu sắc cho icon background
    const bgMap = {
        primary: 'bg-primary-light text-primary-blue',
        success: 'bg-success-light text-success-green',
        warning: 'bg-warning-light text-warning-yellow',
        danger: 'bg-danger-light text-danger-red',
        info: 'bg-info-light text-cyan-info'
    };

    const bgClass = bgMap[color] || bgMap.primary;

    return (
        <Card className="premium-card border-0 shadow-sm h-100 p-2">
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                    <span className="text-uppercase tracking-wider text-muted fw-bold" style={{ fontSize: '0.75rem' }}>
                        {title}
                    </span>
                    <h3 className="fw-extrabold text-navy my-1" style={{ fontSize: '1.75rem', letterSpacing: '-0.5px' }}>
                        {value}
                    </h3>
                    {subtitle && (
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                            {subtitle}
                        </span>
                    )}
                </div>
                <div className={`d-flex align-items-center justify-content-center rounded-circle stat-icon-container ${bgClass}`} style={{ width: '56px', height: '56px' }}>
                    {icon}
                </div>
            </Card.Body>
        </Card>
    );
}

export default StatCard;
