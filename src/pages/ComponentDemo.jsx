import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AppNavbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import CustomModal from '../components/CustomModal';
import FormField from '../components/Form';
import Pagination from '../components/Pagination';

const allProducts = [
    {
        id: 1,
        title: 'React Fundamentals',
        description: 'Build reusable UI with React components and hooks.',
        category: 'Web Development',
        image: 'https://via.placeholder.com/500x300?text=React',
    },
    {
        id: 2,
        title: 'JavaScript Essentials',
        description: 'Master vanilla JavaScript and modern ES6+ patterns.',
        category: 'Programming',
        image: 'https://via.placeholder.com/500x300?text=JavaScript',
    },
    {
        id: 3,
        title: 'UI/UX Design Basics',
        description: 'Learn design principles for responsive interfaces.',
        category: 'Design',
        image: 'https://via.placeholder.com/500x300?text=UI/UX',
    },
    {
        id: 4,
        title: 'Bootstrap Layouts',
        description: 'Create responsive pages with Bootstrap grid and utilities.',
        category: 'Frontend',
        image: 'https://via.placeholder.com/500x300?text=Bootstrap',
    },
    {
        id: 5,
        title: 'React Router',
        description: 'Build single-page applications with route navigation.',
        category: 'Routing',
        image: 'https://via.placeholder.com/500x300?text=Router',
    },
    {
        id: 6,
        title: 'Project Management',
        description: 'Organize feature work with reusable components.',
        category: 'Planning',
        image: 'https://via.placeholder.com/500x300?text=Planning',
    },
];

const sidebarMenu = [
    { title: 'Dashboard', path: '/student/dashboard', icon: '📊' },
    { title: 'Products', path: '/demo', icon: '📦' },
    { title: 'Categories', path: '/categories', icon: '🗂️' },
    { title: 'Orders', path: '/orders', icon: '🧾' },
    { title: 'Users', path: '/users', icon: '👥' },
    { title: 'Settings', path: '/settings', icon: '⚙️' },
];

function ComponentDemo() {
    const [keyword, setKeyword] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
    });

    const productsPerPage = 2; // Giảm xuống 2 để hiển thị nhiều trang hơn cho Demo
    const filteredProducts = useMemo(
        () =>
            allProducts.filter((product) =>
                product.title.toLowerCase().includes(keyword.toLowerCase()) ||
                product.category.toLowerCase().includes(keyword.toLowerCase())
            ),
        [keyword]
    );

    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
    const visibleProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleViewDetail = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Header />
            <AppNavbar />
            <Container className="py-4">
                <Row className="gx-4">
                    <Col lg={3} className="mb-4">
                        <Sidebar menuItems={sidebarMenu} />
                    </Col>
                    <Col lg={9}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <h2>Week 3 Component Demo</h2>
                                <p className="text-muted">
                                    Reusable Navbar, Sidebar, search flow, product cards, modal, form fields and pagination.
                                </p>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <h5 className="mb-3">Search & products</h5>
                                <SearchBar keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
                                <ProductList products={visibleProducts} onViewDetail={handleViewDetail} />
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={pageCount}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </Card.Body>
                        </Card>

                        <Row className="gx-4">
                            <Col md={6} className="mb-4">
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h5 className="mb-3">Quick form preview</h5>
                                        <FormField
                                            type="text"
                                            name="title"
                                            label="Course Title"
                                            placeholder="Enter a course name"
                                            value={formData.title}
                                            onChange={handleFieldChange}
                                            required
                                            validationMessage={formData.title === '' ? 'Title is required' : ''}
                                        />
                                        <FormField
                                            type="select"
                                            name="category"
                                            label="Category"
                                            value={formData.category}
                                            onChange={handleFieldChange}
                                            options={[
                                                { value: 'web', label: 'Web Development' },
                                                { value: 'design', label: 'Design' },
                                                { value: 'marketing', label: 'Marketing' },
                                            ]}
                                            required
                                            validationMessage={formData.category === '' ? 'Please choose a category' : ''}
                                        />
                                        <FormField
                                            type="textarea"
                                            name="description"
                                            label="Description"
                                            placeholder="Enter a short summary"
                                            value={formData.description}
                                            onChange={handleFieldChange}
                                            rows={3}
                                        />
                                        <Button variant="success" disabled>
                                            Save draft
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6} className="mb-4">
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h5 className="mb-3">Modal preview</h5>
                                        <p className="text-muted">
                                            Modal opens with product details and configurable confirm/cancel action.
                                        </p>
                                        <Button variant="outline-primary" onClick={() => handleViewDetail(allProducts[0])}>
                                            Open modal
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <CustomModal
                show={showModal}
                title={selectedProduct?.title || 'Product detail'}
                body={
                    <>
                        <p>{selectedProduct?.description}</p>
                        <p className="mb-0">
                            <strong>Category:</strong> {selectedProduct?.category}
                        </p>
                    </>
                }
                onConfirm={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                confirmText="Close"
                cancelText="Dismiss"
            />

            <Footer />
        </>
    );
}

export default ComponentDemo;
