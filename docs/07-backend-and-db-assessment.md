## Đánh giá: có cần backend và DB không?

### Kết luận nhanh (cho MVP)
- **Backend**: *không bắt buộc*, nhưng **khuyến nghị** nếu bạn muốn bảo mật API key và kiểm soát quota.
- **Database**: **không cần** cho mục tiêu “chỉ hiển thị view/like hiện tại”.

### Khi nào KHÔNG cần backend?
Bạn chỉ cần:
- Nhúng video.
- Hiển thị UI đẹp.
- Chấp nhận rằng:
  - hoặc không có view/like (chỉ embed),
  - hoặc gọi YouTube Data API trực tiếp từ frontend và **chấp nhận lộ key** (rủi ro).

### Khi nào NÊN có backend?
Nếu bạn muốn:
- **Giữ bí mật API key** (không lộ ra client).
- Cache để giảm quota, tránh rate limit.
- Thống nhất response format cho UI.
- Có chỗ để đặt rate limit / chống abuse.

Gợi ý triển khai backend nhẹ:
- Serverless function (Vercel/Netlify/Cloudflare) hoặc Node/Express đơn giản.
- 1 endpoint: `/api/video-stats?videoId=...`
- Cache in-memory hoặc edge cache 30–60 giây.

### Khi nào cần DB?
Chỉ nên thêm DB nếu có nhu cầu dữ liệu lịch sử, ví dụ:
- Biểu đồ views/likes theo giờ/ngày.
- So sánh tăng trưởng giữa các mốc.
- Tự động ghi snapshot định kỳ (cron) và hiển thị timeline.

Nếu có DB, schema tối thiểu (gợi ý):
- `video_stats_snapshots(video_id, captured_at, view_count, like_count, source)`

### Trade-offs chính
- Không backend: đơn giản, rẻ, nhưng bảo mật key/quota kém.
- Có backend không DB: cân bằng tốt cho landing page public.
- Có backend + DB: phù hợp khi muốn analytics/lịch sử, nhưng tăng độ phức tạp vận hành.
