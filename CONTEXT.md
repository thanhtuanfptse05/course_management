# CONTEXT.md — Project Memory (PCMG03 - Course Management)
# Đọc file AGENTS.md trước để hiểu full project context

## MANUAL MEMORY (human-maintained)

### Architecture Decisions (ADR)
*   **ADR-001: Backend Mocking**: Dùng JSON-Server & `db.json` làm REST API backend giả lập thay vì xây dựng Node.js thật. Lý do: Giới hạn môn học FER202 tập trung 70% vào Frontend (React) và 30% mock dữ liệu API.
*   **ADR-002: Authentication & Authorization**: Chọn LocalStorage/SessionStorage làm Mock Auth thay vì JWT chuẩn (JSON-Server không hỗ trợ JWT hoàn chỉnh). Tập trung chính vào phân quyền hiển thị (Role-based UI) và bảo vệ định tuyến (Route Guarding) bằng component `<ProtectedRoute>`.
*   **ADR-003: UI & Styling Framework**: Chọn React-Bootstrap / Bootstrap 5 làm UI Framework chính thay vì TailwindCSS để tuân thủ Syllabus môn học (Slot 4, 5, 7) và ăn trọn điểm vận dụng thư viện Bootstrap.
*   **ADR-004: React Standard Code**: Sử dụng 100% Functional Components kết hợp Hooks. Tuyệt đối KHÔNG dùng Class Components (đã deprecated trong giáo trình).
*   **ADR-005: Theme Giao diện**: Áp dụng hệ thống màu chủ đạo Xanh biển & Trắng (Ocean Blue & White) theo quy chuẩn quy định chi tiết trong [ui-rule.md](file:///d:/wd%20c%20sang%20d/Documents/Document%20learn/K%E1%BB%B3%205/FER202/Courser%20Management/course_management/ui-rule.md).

### Lessons Learned (từ các vấn đề đã gặp)
*   **LESSON-001: Routing Link**: Khi chuyển trang trong React Router, bắt buộc dùng component `<Link>` hoặc `<NavLink>` từ `react-router-dom`. Tuyệt đối KHÔNG dùng thẻ `<a>` thuần vì sẽ gây reload lại trang và mất state hiện tại của ứng dụng.
*   **LESSON-002: Port Conflict**: JSON-Server chạy mặc định ở port `3000`. Phải đổi port của React App sang `3001` (bằng cách đặt biến môi trường `PORT=3001` trong tệp cấu hình khởi chạy hoặc `package.json`) để tránh xung đột cổng.
*   **LESSON-003: Academic Transparency**: Mọi code do AI sinh ra phải chứa comment ở đầu file mô tả Prompt đã dùng để đảm bảo tính minh bạch học thuật (CLO9).

### Current Sprint Notes (Tuần 2 - React Setup & UI Structure)
*   **Trọng tâm hiện tại**:
    *   Khởi tạo dự án ReactJS.
    *   Cài đặt `react-router-dom` v6 và `react-bootstrap` / `bootstrap`.
    *   Tạo Layout tĩnh chung (Header, Footer, Navbar, Sidebar).
    *   Cấu hình các Route cơ bản và định hướng thư mục cho 3 role (Admin, Student, Instructor).
*   **Trạng thái Blocked**: Không (Đã chốt cấu trúc cơ sở dữ liệu `db.json`).
*   **Next Steps (Tuần 3-4)**:
    *   Hiện thực hóa logic Đăng ký / Đăng nhập (Mock Auth lưu thông tin user đăng nhập vào LocalStorage).
    *   Tạo Component `<ProtectedRoute>` kiểm tra quyền truy cập.
    *   Kết nối API (Axios) để thực hiện CRUD khóa học và CRUD danh mục từ JSON-Server.

---

## PROJECT SCOPE & DATA SCHEMA

### 1. Cấu trúc Database (`src/data/db.json`)
Cơ sở dữ liệu dạng JSON được thiết kế chuẩn hóa quan hệ giữa các thực thể:
*   **`users`**: Quản lý tài khoản người dùng (`id`, `name`, `email`, `password`, `role`: admin / instructor / student).
*   **`categories`**: Quản lý danh mục khóa học (`id`, `name`).
*   **`courses`**: Quản lý khóa học (`id`, `title`, `description`, `categoryId` -> tham chiếu `categories.id`, `instructorId` -> tham chiếu `users.id` của Instructor, `price`, `status`: active / inactive).
*   **`enrollments`**: Quản lý đăng ký học (`id`, `studentId` -> tham chiếu `users.id` của Student, `courseId` -> tham chiếu `courses.id`, `status`: approved / pending / rejected).

### 2. Yêu cầu tính năng theo Vai trò (Role-based Features)
*   **Khách vãng lai (Guest)**:
    *   Trang chủ (`Home.jsx`): Xem danh sách khóa học nổi bật, tìm kiếm khóa học theo tiêu đề/danh mục.
    *   Đăng ký / Đăng nhập (`Register.jsx`, `Login.jsx`): Tạo tài khoản mới hoặc đăng nhập vào hệ thống.
*   **Học viên (Student)**:
    *   `StudentDashboard.jsx`: Quản lý các khóa học đã đăng ký, hiển thị trạng thái phê duyệt (approved/pending/rejected).
    *   Đăng ký khóa học mới: Chọn khóa học từ trang chủ/tìm kiếm và nhấn đăng ký (tạo bản ghi trong `enrollments` ở trạng thái `pending`).
    *   `StudentProfile.jsx`: Xem và cập nhật thông tin cá nhân.
*   **Giảng viên (Instructor)**:
    *   `InstructorDashboard.jsx`: Xem danh sách các khóa học mình giảng dạy. Tạo mới khóa học (`CourseForm`), chỉnh sửa thông tin khóa học.
    *   `EnrolledStudents.jsx`: Xem danh sách học viên đăng ký các khóa học của mình, theo dõi tiến độ.
*   **Quản trị viên (Admin)**:
    *   `AdminDashboard.jsx`: Báo cáo thống kê tổng số lượng (khóa học, học viên, giảng viên, doanh thu).
    *   `ManageCategories.jsx`: CRUD danh mục khóa học.
    *   `ManageCourses.jsx`: Quản lý toàn bộ khóa học (phê duyệt hiển thị, sửa, xóa).
    *   `ManageUsers.jsx`: CRUD tài khoản người dùng (Giảng viên, Học viên, Admin phụ).
    *   `ManageEnrollments.jsx`: Phê duyệt hoặc Từ chối yêu cầu đăng ký học của học viên.

---

## PATTERNS TO FOLLOW

*   **Component Pattern**: Khai báo tại `src/components/[ComponentName]/[ComponentName].jsx` hoặc `src/components/[ComponentName].jsx`. Viết hoa chữ cái đầu.
*   **Page Pattern**: Tách biệt rõ ràng theo vai trò tại `src/pages/[Role]/[PageName].jsx` (Ví dụ: `src/pages/admin/ManageCourses.jsx`).
*   **Routing Pattern**: Định nghĩa route tập trung tại `src/routes/AppRoutes.jsx`. Các route bảo mật được bao bọc bởi:
    ```jsx
    <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
        </ProtectedRoute>
    } />
    ```
*   **Styling Pattern**: Sử dụng triệt để các component lưới và UI của React-Bootstrap (`<Container>`, `<Row>`, `<Col>`, `<Card>`, `<Button>`). Kết hợp chỉnh sửa kiểu dáng (như hiệu ứng hover, màu chủ đạo) thông qua file CSS tùy biến [ui-rule.md](file:///d:/wd%20c%20sang%20d/Documents/Document%20learn/K%E1%BB%B3%205/FER202/Courser Management/course_management/ui-rule.md) được khai báo tại `src/index.css`.
*   **Data Fetching Pattern**: Mọi API gọi đến JSON-Server cần bọc trong khối `try-catch`, quản lý các trạng thái `loading` và `error` trên UI để cải thiện UX:
    ```javascript
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    ```

---

## AUTO MEMORY (Agent appends here)
*   **[2026-06-08]**: Đã hoàn thành cấu hình màu sắc giao diện chính Xanh biển - Trắng và các hiệu ứng tương tác tại `ui-rule.md`.
*   **[2026-06-08]**: Đã cập nhật `CONTEXT.md` đồng bộ hóa sơ đồ quan hệ database `db.json`, vai trò người dùng và kế hoạch triển khai của Sprint Tuần 2.