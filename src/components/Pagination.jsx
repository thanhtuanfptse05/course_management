import React from 'react';
import { Pagination as RBPagination } from 'react-bootstrap';

function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    const pageItems = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let page = startPage; page <= endPage; page += 1) {
        pageItems.push(
            <RBPagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange?.(page)}
            >
                {page}
            </RBPagination.Item>
        );
    }

    return (
        <RBPagination className="justify-content-center flex-wrap">
            <RBPagination.First disabled={currentPage === 1} onClick={() => onPageChange?.(1)} />
            <RBPagination.Prev disabled={currentPage === 1} onClick={() => onPageChange?.(currentPage - 1)} />
            {pageItems}
            <RBPagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange?.(currentPage + 1)} />
            <RBPagination.Last disabled={currentPage === totalPages} onClick={() => onPageChange?.(totalPages)} />
        </RBPagination>
    );
}

export default Pagination;
