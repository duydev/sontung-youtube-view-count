## Kiến trúc tổng quan

### Phương án dữ liệu cho bộ đếm

**A) Frontend gọi trực tiếp YouTube Data API**
- Pro: đơn giản, không cần backend.
- Con: API key **lộ** trong client; dễ bị lạm dụng, khó kiểm soát quota.

**B) Backend/proxy (khuyến nghị nếu cần bảo mật key)**
- Frontend gọi endpoint của bạn (ví dụ `/api/youtube/video-stats`).
- Backend giữ API key, gọi YouTube Data API, trả về `viewCount`, `likeCount`.
- Có thể cache 30–60s để giảm quota.

### Có cần DB không?
- MVP chỉ hiển thị realtime: **không cần DB**.
- Nếu muốn biểu đồ theo thời gian, lịch sử, leaderboard theo ngày/giờ: cân nhắc DB (xem `docs/07-backend-and-db-assessment.md`).

### Luồng dữ liệu (khuyến nghị B)
1. UI đọc `VITE_YT_VIDEO_URL` (hoặc `VITE_YT_VIDEO_ID`) từ `.env`.
2. UI nhúng video qua embed URL.
3. UI gọi `/api/video-stats?videoId=...` theo chu kỳ (hoặc gọi thẳng YouTube Data API nếu client-only).
4. Backend gọi YouTube Data API `videos.list(part=statistics)`.
5. Backend cache response ngắn hạn và trả cho UI.

### Thành phần
- **Web app (React/Vite/TS)**: UI + polling + render embed.
- **API layer (optional)**: proxy + cache + rate limit.

### Triển khai (Vercel)
- Dự án deploy trên Vercel; cấu hình nằm ở `vercel.json`.
- Frontend nằm trong `web/`.
- Khi deploy monorepo, Vercel nên để **Root Directory = repo root**.
