// [AI Generated Code - Prompt: "Thiết kế Phân trang Pagination sử dụng React-Bootstrap"]
import React from 'react';
import { Pagination as RBPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <RBPagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </RBPagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <RBPagination>
        <RBPagination.Prev 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)} 
        />
        {items}
        <RBPagination.Next 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)} 
        />
      </RBPagination>
    </div>
  );
};

export default Pagination;
