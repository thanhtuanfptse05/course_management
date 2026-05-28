# CONTEXT.md — Project Memory (PCMG03 - Course Management)
# Đọc file AGENTS.md trước để hiểu full project context

## MANUAL MEMORY (human-maintained)

### Architecture Decisions (ADR)
# ADR-001: Dùng JSON-Server & db.json làm Backend thay vì xây dựng Node.js thật. Lý do: Giới hạn môn học FER202 chỉ focus 70% vào Frontend, 30% mock API.
# ADR-002: Chọn LocalStorage/SessionStorage cho Auth thay vì JWT chuẩn. Lý do: JSON-Server không hỗ trợ verify JWT hoàn chỉnh. Cần ưu tiên làm Role-based routing (Admin/Instructor/Student) trên Frontend.
# ADR-003: Chọn React-Bootstrap làm UI Framework thay vì TailwindCSS. Lý do: Tuân thủ đúng Syllabus (Slot 4, 5, 7) và đảm bảo có điểm phần vận dụng thư viện Bootstrap.
# ADR-004: 100% Functional Components kết hợp Hooks. Tuyệt đối KHÔNG dùng Class Components (Deprecated trong môn học).

### Lessons Learned (từ incidents và code review)
# LESSON-001: Chuyển trang trong React Router KHÔNG dùng thẻ <a> vì sẽ làm reload trang (mất state). Bắt buộc phải dùng component <Link> hoặc <NavLink>.
# LESSON-002: JSON-Server chạy mặc định ở port 3000. Phải đổi port của React App sang 3001 (thêm PORT=3001 vào package.json) để tránh xung đột cổng.
# LESSON-003: AI sinh code thường quên ghi lại câu lệnh (Prompt). Luôn phải comment Prompt vào file text hoặc doc để nộp minh chứng minh bạch AI (chấm điểm CLO9).

### Current Sprint Notes
# Sprint hiện tại: Tuần 2 - React Setup & UI Structure.
# Trọng tâm: Khởi tạo React App, cài React-Router & React-Bootstrap, tạo Layout tĩnh (Header, Footer), cấu hình các Route cơ bản.
# Blocked: Đang chờ chốt cấu trúc Relationship giữa các bảng (Courses và Enrollments) trong file `db.json`.
# Next: Implement State cục bộ (useState) cho Form Đăng nhập và Form Tạo Khóa học (Tuần 3-4).

## PATTERNS TO FOLLOW
# Component Pattern: src/components/[ComponentName]/[ComponentName].jsx (Viết hoa chữ cái đầu).
# Page Pattern: src/pages/[Role]/[PageName].jsx (Tách rõ thư mục theo Role: /Admin, /Student, /Instructor).
# Routing Pattern: Gom toàn bộ Route khai báo tập trung tại src/App.js. Các route yêu cầu quyền phải được bọc trong <ProtectedRoute>.
# Styling Pattern: Ưu tiên dùng các component của React-Bootstrap (ví dụ: <Container>, <Row>, <Col>, <Card>). Hạn chế viết file CSS thuần trừ khi thực sự cần custom UI.
# Data Fetching: Mọi API call dùng Axios phải được bọc trong thẻ try-catch để handle lỗi server, luôn có state `loading` và `error`.

## AUTO MEMORY (Agent appends here)
# [AI Agents sẽ tự động thêm các ghi chú, logs hoặc error fixes vào đây khi làm việc]