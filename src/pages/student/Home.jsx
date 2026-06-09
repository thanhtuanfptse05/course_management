// [AI Generated Code - Prompt: "Home: Thiết kế thanh Tìm kiếm (Search Bar), Dropdown Filter, hiển thị lưới CourseList"]
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import CourseList from '../../components/shared/CourseList';
import Pagination from '../../components/Pagination';
import { mockDb } from '../../data/mockDb';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Chỉ hiển thị các khóa học đã được duyệt (Approved)
    const approvedCourses = mockDb.courses.filter(c => c.status === 'Approved');
    setCourses(approvedCourses);
    setCategories(mockDb.categories);
  }, []);

  // Filter
  const filteredCourses = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory ? course.categoryId.toString() === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="py-4">
      <div className="mb-5 text-center">
        <h1 className="fw-bold text-navy mb-3">Khám phá các khóa học hàng đầu</h1>
        <p className="text-muted fs-5">Học hỏi từ các chuyên gia và nâng cao kỹ năng của bạn ngay hôm nay.</p>
      </div>

      <SearchBar 
        categories={categories} 
        onSearch={setSearchTerm} 
        onCategoryChange={setSelectedCategory} 
      />

      <div className="mt-5">
        <h4 className="fw-bold text-navy mb-4">Khóa học nổi bật</h4>
        <CourseList courses={currentCourses} />
        
        {filteredCourses.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>
    </Container>
  );
};

export default Home;
