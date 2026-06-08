// [AI Generated Code - Prompt: "Tạo Pagination component phân trang dữ liệu dùng React-Bootstrap, căn giữa, hover background xanh chủ đạo"]
import React from 'react';
import { Pagination as RBPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <RBPagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => onPageChange(number)}
                className="mx-1 rounded"
            >
                {number}
            </RBPagination.Item>
        );
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <RBPagination className="premium-pagination">
                <RBPagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="mx-1 rounded"
                />
                {items}
                <RBPagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="mx-1 rounded"
                />
            </RBPagination>
        </div>
    );
}

export default Pagination;
