# Quy chuẩn Giao diện - UI/UX Rule (PCMG03 - Course Management)
**Màu chủ đạo**: Xanh biển & Trắng (Ocean Blue & White)
**Mục tiêu**: Đồng bộ phong cách, đảm bảo giao diện hiện đại, trực quan, dễ sử dụng cho cả 3 phân quyền (Admin, Instructor, Student) bằng React-Bootstrap & Bootstrap 5.

---

## 1. Hệ thống Màu sắc (Color Palette)
Hệ màu được thiết kế hài hòa dựa trên sự tương phản giữa các sắc thái xanh biển (Ocean Blue) và nền trắng tuyết (Ice White), đảm bảo độ tương phản (WCAG AA) và tính thẩm mỹ cao.

### 1.1. Bảng màu chính (Primary Colors)
| Vai trò | Mã Màu HEX | Minh họa / Tên gọi | Ứng dụng chính |
| :--- | :--- | :--- | :--- |
| **Primary Blue** | `#0f52ba` | Sapphire Blue (Xanh biển đậm) | Brand màu chủ đạo, Button chính, Active states, Link quan trọng. |
| **Secondary Blue**| `#3b82f6` | Sky Blue (Xanh da trời) | Các nút phụ, hover states, các thành phần tương tác thứ cấp. |
| **Light Blue Accent**| `#e0f2fe` | Ice Blue (Xanh nhạt dịu) | Nền cho Alert, Badge, Active Sidebar Item, Header của bảng. |
| **Pure White** | `#ffffff` | Trắng tinh khôi | Nền của Card, Modal, Input, Table body. |
| **Light Gray BG** | `#f8fafc` | Slate Light (Trắng xám) | Nền chính của toàn bộ trang (Page Background). |
| **Dark Navy** | `#0f172a` | Deep Charcoal Navy (Xanh đen) | Màu chữ chính (Heading, Body Text), Sidebar menu text, Footer. |

### 1.2. Màu Trạng thái (System Status Colors)
*   **Success (Thành công):** `#10b981` (Emerald Green) - Dùng cho thông báo thành công, badge "Hoàn thành", nút xác nhận hoàn tất.
*   **Warning (Cảnh báo):** `#f59e0b` (Amber Yellow) - Dùng cho badge "Chờ duyệt", thông báo lưu ý.
*   **Danger (Lỗi/Xóa):** `#ef4444` (Coral Red) - Dùng cho nút Xóa, hủy bỏ, thông báo lỗi.
*   **Info (Thông tin):** `#06b6d4` (Cyan) - Dùng cho badge mô tả hoặc tin nhắn hướng dẫn.

---

## 2. Typography (Font chữ & Phân cấp)
Dự án sử dụng Google Font **Inter** hoặc **Outfit** để đem lại trải nghiệm đọc chuyên nghiệp, hiện đại.

*   **Font-family chính**: `'Inter', system-ui, -apple-system, sans-serif`
*   **Phân cấp cỡ chữ (Font-size & Weight)**:
    *   `h1` / `Page Title`: `2.25rem` (36px) | Bold (`700`) - Sử dụng duy nhất 1 lần trên 1 trang làm tiêu đề chính.
    *   `h2` / `Section Title`: `1.75rem` (28px) | Semi-Bold (`600`) - Tiêu đề các khối nội dung lớn.
    *   `h3` / `Card Title`: `1.25rem` (20px) | Medium (`500`) - Tiêu đề các khóa học, sản phẩm.
    *   `body` / `Text`: `1rem` (16px) | Regular (`400`) - Nội dung văn bản chung. Màu chữ mặc định: `#334155` (Slate 700).
    *   `small` / `Caption`: `0.875rem` (14px) | Regular (`400`) - Chú thích, thông tin tác giả, số lượng học sinh.

---

## 3. Quy chuẩn Layout & Grid (Bootstrap 5 Grid System)
Bắt buộc sử dụng hệ thống Grid có sẵn của React-Bootstrap để đảm bảo responsive mượt mà trên Mobile, Tablet và Desktop.

*   **Container**: Luôn bọc nội dung trang trong `<Container className="py-4">`.
*   **Row & Col**:
    *   Bố cục Layout 2 cột (Dashboard / Danh sách khóa học có Sidebar):
        ```jsx
        <Row className="gx-4">
            <Col lg={3} md={4} className="mb-4">
                {/* Sidebar hoặc Bộ lọc Filter */}
            </Col>
            <Col lg={9} md={8}>
                {/* Nội dung chính / Bảng danh sách */}
            </Col>
        </Row>
        ```
    *   Bố cục Grid danh sách khóa học (Card Grid):
        ```jsx
        <Row xs={1} sm={2} md={3} className="g-4">
            {courses.map(course => (
                <Col key={course.id}>
                    <CourseCard course={course} />
                </Col>
            ))}
        </Row>
        ```

---

## 4. Thiết kế Chi tiết cấu trúc Component (Xanh - Trắng)

### 4.1. Header / Navigation Bar (Thanh điều hướng)
*   **Màu sắc**: Nền màu trắng tinh (`#ffffff`), viền dưới mỏng màu xanh nhạt (`border-bottom: 2px solid #e0f2fe`).
*   **Brand Logo**: Màu xanh chủ đạo (`#0f52ba`), font-weight Bold.
*   **Menu Items**: Chữ màu `#334155` (Slate 700). Khi hover hoặc active: chuyển sang màu `#0f52ba` và có hiệu ứng underline nhẹ.
*   **Nút Đăng nhập/Đăng ký**:
    *   Đăng nhập: Button outline xanh (`variant="outline-primary"`).
    *   Đăng ký: Button nền xanh đậm (`variant="primary"`).

### 4.2. Cards (Thẻ Khóa học)
*   **Nền (Background)**: `#ffffff`.
*   **Borders & Radius**: `border: 1px solid #e2e8f0`, góc bo tròn `border-radius: 12px` (tương đương `rounded-3` trong Bootstrap).
*   **Hiệu ứng Hover (Micro-animation)**: Cực kỳ quan trọng để tăng độ cao cấp cho UI.
    ```css
    .course-card {
        transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .course-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(15, 82, 186, 0.08); /* Shadow màu xanh biển nhạt */
    }
    ```

### 4.3. Buttons (Nút bấm)
*   **Primary Button (`variant="primary"`)**: Nền màu Sapphire Blue (`#0f52ba`), chữ trắng. Không đổ bóng viền đen mặc định của Bootstrap, thay bằng shadow xanh mỏng.
*   **Secondary/Outline Button (`variant="outline-primary"`)**: Viền màu `#0f52ba`, chữ `#0f52ba`. Hover chuyển nền xanh chủ đạo, chữ trắng.
*   **Hiệu ứng tương tác**: Khi click (`:active`), nút thu nhỏ nhẹ (`scale(0.98)`) để mang lại cảm giác phản hồi thực tế.

### 4.4. Sidebar Menu (Thanh Menu bên cạnh)
*   **Nền (Background)**: `#ffffff` hoặc xanh nhạt dịu `#f0f7ff`.
*   **Active State**: Item đang chọn phải được tô nền xanh nhạt (`#e0f2fe`), chữ màu Sapphire Blue (`#0f52ba`), có vạch đứng 3px màu Sapphire Blue ở rìa trái/phải để biểu thị tiêu điểm.
*   **Hover State**: Chuyển sang nền nhạt `#f1f5f9` (Slate 100), chữ đổi màu xanh nhẹ `#3b82f6`.

### 4.5. Forms & Inputs (Trường dữ liệu)
*   **Nền Input**: `#ffffff`, viền `#cbd5e1`.
*   **Focus State**: Khi trỏ chuột vào input, viền đổi thành màu xanh sáng `#3b82f6` và đổ bóng nhạt màu xanh:
    ```css
    .form-control:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.15);
    }
    ```
*   **Validation**:
    *   Khi có lỗi: Input viền đỏ nhạt, text cảnh báo lỗi hiển thị ngay dưới dạng màu đỏ.
    *   Loading: Bắt buộc hiện icon Spinner quay tròn (`<Spinner animation="border" size="sm" />`) cạnh text của Button khi submit form.

### 4.6. Table (Bảng dữ liệu - Admin/Instructor)
*   **Header Bảng**: Tô màu xanh biển nhạt (`#e0f2fe`), chữ in hoa, màu xanh navy `#0f172a`.
*   **Rows**: Dùng kiểu striped table nhạt (`hover striped` của Bootstrap), các đường viền giữa các dòng mỏng màu `#f1f5f9`.
*   **Phân trang (Pagination)**: Dùng các button có nút bấm màu xanh, bo tròn nhẹ góc, nút hiện tại active có nền `#0f52ba`.

---

## 5. Mẫu Code CSS tùy chỉnh (`src/index.css`)
Thêm các đoạn mã CSS tùy chỉnh sau để hiện thực hóa quy chuẩn Xanh - Trắng:

```css
/* Custom variables for Blue and White theme */
:root {
  --primary-blue: #0f52ba;
  --secondary-blue: #3b82f6;
  --light-blue: #e0f2fe;
  --bg-light: #f8fafc;
  --text-navy: #0f172a;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
}

body {
  background-color: var(--bg-light) !important;
  color: var(--text-navy) !important;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Custom Primary Button override */
.btn-primary {
  background-color: var(--primary-blue) !important;
  border-color: var(--primary-blue) !important;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #0d47a1 !important;
  border-color: #0d47a1 !important;
  box-shadow: 0 4px 12px rgba(15, 82, 186, 0.2) !important;
}

/* Cards Hover Animation */
.premium-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color) !important;
  border-radius: 12px !important;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(15, 82, 186, 0.06) !important;
}

/* Sidebar Active Item styling */
.custom-sidebar .list-group-item.active {
  background-color: var(--light-blue) !important;
  color: var(--primary-blue) !important;
  border-left: 4px solid var(--primary-blue) !important;
  border-color: transparent var(--border-color) transparent transparent;
  font-weight: 600;
}
```

---

## 6. Minh chứng sử dụng AI (Transparency CLO9)
Mỗi component hoặc logic UI được chỉnh sửa hoặc tạo mới bởi AI cần được khai báo comment rõ ràng ở dòng đầu tiên của file:
```javascript
// [AI Generated Code - Prompt: "Cấu hình màu sắc Xanh biển - Trắng và hiệu ứng hover cho Card"]
```
Điều này đảm bảo tính minh bạch học thuật theo đúng tiêu chí môn học FER202.
