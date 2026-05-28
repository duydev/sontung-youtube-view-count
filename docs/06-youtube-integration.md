## Tích hợp YouTube: lấy view/like

### Vì sao cần YouTube Data API?
Nhúng video (embed) chỉ giúp phát video. Trang watch HTML không có API công khai ổn định để lấy view/like. Cách chuẩn là dùng **YouTube Data API v3**.

### Endpoint cần dùng (khuyến nghị)
- `videos.list` với `part=statistics`
- Input: `id=<VIDEO_ID>`
- Output: `statistics.viewCount`, `statistics.likeCount` (có thể thiếu/ẩn tuỳ video/chính sách)

### Cách lấy `VIDEO_ID`
Từ URL dạng `https://www.youtube.com/watch?v=jpYRA5xvNiY` thì `VIDEO_ID = jpYRA5xvNiY`.

### Lưu ý quan trọng
- **Quota**: YouTube API có giới hạn quota; nên cache và refresh theo chu kỳ hợp lý (30–60s).
- **Bảo mật key**: Nếu gọi trực tiếp từ frontend, API key sẽ bị lộ. Nếu trang public và cần an toàn quota, nên dùng backend/proxy.
- **Fallback**: Khi API fail/quota hết, UI nên:
  - hiển thị số gần nhất (stale),
  - thông báo “đang cập nhật”/“tạm thời không lấy được dữ liệu”.

### Ghi chú triển khai hiện tại
- UI hiện hỗ trợ **client-only** bằng `VITE_YT_API_KEY` (không khuyến nghị cho production public).
- Khuyến nghị tiếp theo: thêm backend/proxy để giữ `YOUTUBE_API_KEY` server-side.

### Chiến lược refresh gợi ý
- Poll mỗi 30–60 giây.
- Backend cache 30–60 giây để giảm API calls nếu có nhiều người truy cập cùng lúc.
