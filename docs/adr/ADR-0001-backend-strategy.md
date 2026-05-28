## ADR-0001: Chiến lược backend cho YouTube stats

### Trạng thái
Proposed

### Bối cảnh
Landing page cần hiển thị `viewCount` và `likeCount` của một YouTube video. Cách chuẩn là dùng YouTube Data API v3. Nếu gọi từ frontend thì API key bị lộ và khó kiểm soát quota.

### Quyết định
Chọn **backend/proxy nhẹ + cache ngắn hạn** để:
- giữ API key ở server,
- giảm số lần gọi YouTube API nhờ cache,
- chuẩn hoá response cho frontend.

Database **không** đưa vào MVP.

### Hệ quả
- Frontend đơn giản hơn (chỉ gọi endpoint của mình).
- Cần deploy thêm một thành phần backend (serverless hoặc service nhỏ).
- Phải thiết kế cache TTL (ví dụ 30–60s) để cân bằng “fresh” vs quota.

### Phương án thay thế đã cân nhắc
- **Client-only + API key trong `.env`**: đơn giản nhưng key bị lộ; rủi ro abuse/quota.
- **Không lấy stats, chỉ embed**: mất tính năng chính (bộ đếm).
