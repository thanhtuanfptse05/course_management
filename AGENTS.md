# AGENTS.md — Project Context for AI Agents
# Version: 1.0 | Updated: 2026-05-27 | Project: Project Course Management (FER202 - Group 03)

## 1. PROJECT OVERVIEW
Name: Phần mềm quản lý khóa học (Project Course Management - PCMG03)
Type: Single Page Application (SPA) Web App
Domain: Education / Course Management System
Stage: Development (Giai đoạn 1: Tuần 2 - React Setup & UI Structure)

## 2. TECH STACK (STRICT — do not deviate)
Backend: JSON-Server (REST API giả lập trên file db.json)
Frontend: ReactJS (khởi tạo bằng Create React App)
Routing: React Router DOM v6
Database: db.json (Mock database)
State Management: Redux Toolkit HOẶC Context API (tùy thuộc module)
Auth: LocalStorage / SessionStorage (Mock Authentication)
HTTP Client: Axios
Styling: React-Bootstrap / Bootstrap 5

## 3. ARCHITECTURE PRINCIPLES
- Follow Component-based Architecture chia nhỏ UI thành các phần tái sử dụng.
- API style: RESTful API (Fetch/Axios gọi đến localhost:3000 của JSON-Server).
- 100% Functional Components kết hợp React Hooks (useState, useEffect, useReducer).
- Role-based UI: Phân tách rõ luồng hiển thị cho 3 đối tượng (Admin, Instructor, Student).
- Controlled Forms: Quản lý state của form bằng React thay vì thao tác DOM trực tiếp.

## 4. FILE NAMING & STRUCTURE
Components/Pages: PascalCase (e.g., CourseCard.jsx, StudentDashboard.jsx)
Utilities/Hooks: camelCase (e.g., useFetch.js, formatCurrency.js)
CSS/Style files: Kebab-case hoặc camelCase (e.g., course-style.css)
DB tables (trong db.json): snake_case hoặc camelCase (e.g., course_categories, enrollments)

## 5. FORBIDDEN PATTERNS
- NEVER use React Class Components (chỉ sử dụng Functional Components).
- NEVER use direct DOM manipulation (không dùng document.getElementById, phải dùng Refs hoặc State).
- NEVER implement complex backend JWT auth (Stick to FER202 scope: Mock auth with LocalStorage).
- NEVER skip error handling or loading states khi gọi API (Axios).
- NEVER hide AI Usage (Tất cả code do AI sinh ra phải được minh bạch để chấm điểm CLO9).

## 6. DEFINITION OF DONE (per task)
- [ ] Functional Component uses Hooks correctly without breaking Hook rules.
- [ ] UI is Responsive and uses React-Bootstrap grid/components.
- [ ] Routing (if applicable) uses <Link> or useNavigate without page reload.
- [ ] Loading and Error states handled during API integration.
- [ ] AI prompt and outputs recorded for transparency documentation.

## 7. GIT CONVENTIONS
Branch: feat/[feature-name] | fix/[bug-name] | ui/[component-name]
Commit: [type]: [scope] - [description]
Example: feat(auth): implement mock login with LocalStorage for Admin role

## 8. CURRENT SPRINT CONTEXT
Sprint: Tuần 2 (Theo Lộ trình Project ReactJS)
Focus: Thiết lập dự án React, cài đặt React-Router, React-Bootstrap, tạo Layout tĩnh (Header, Footer) và phác thảo khung db.json.
Active specs: Khởi tạo SPA Foundation.