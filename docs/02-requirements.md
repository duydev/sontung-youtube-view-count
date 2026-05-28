## Yêu cầu

### Yêu cầu chức năng (FR)
- **FR1**: Hiển thị video YouTube nhúng (embedded player) từ một URL cấu hình.
- **FR2**: Hiển thị **lượt xem (viewCount)** của video.
- **FR3**: Hiển thị **lượt thích (likeCount)** của video.
- **FR4**: Tự động làm mới số liệu theo chu kỳ (ví dụ 15–60 giây) và có trạng thái loading/failed.
- **FR5**: Cho phép thay đổi video mục tiêu qua `.env` (không cần sửa code).

### Yêu cầu phi chức năng (NFR)
- **NFR1 (Hiệu năng)**: TTI tốt trên mobile; hạn chế tài nguyên nặng, lazy-load các phần không thiết yếu.
- **NFR2 (Độ tin cậy)**: Khi API lỗi/quota hết, UI vẫn hiển thị video và fallback số liệu (giữ số cũ + thông báo).
- **NFR3 (Bảo mật)**: Không để lộ bí mật (API key) nếu dùng YouTube Data API.
- **NFR4 (Tuân thủ)**: Tôn trọng Terms của YouTube API; không scrape HTML watch page.
- **NFR5 (Khả năng vận hành)**: Cấu hình rõ ràng, dễ deploy; có logging tối thiểu nếu có backend.

### Ràng buộc kỹ thuật
- Frontend: **React + Vite + TypeScript**.
- Nhúng video: iFrame/YouTube embed.
- Nguồn view/like: **YouTube Data API v3** (khuyến nghị).

### Giả định
- Video là public và cho phép embed.
- Like count có thể bị ẩn/không khả dụng trong một số trường hợp; UI cần xử lý trường hợp không có dữ liệu.
