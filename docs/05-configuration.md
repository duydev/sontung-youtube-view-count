## Cấu hình `.env`

### Biến môi trường đề xuất

- `VITE_YT_VIDEO_URL`: URL video YouTube (ví dụ mẫu: `https://www.youtube.com/watch?v=jpYRA5xvNiY`)
- (Tuỳ chọn) `VITE_YT_REFRESH_MS`: chu kỳ refresh (ms), ví dụ `30000`

Nếu triển khai **không có backend** mà gọi YouTube Data API trực tiếp từ frontend (không khuyến nghị về bảo mật):
- `VITE_YT_API_KEY`: API key (sẽ bị lộ trên client)

Nếu triển khai **có backend** (khuyến nghị):
- Frontend không cần API key.
- Backend dùng `YOUTUBE_API_KEY` (không có tiền tố `VITE_`) để không bị bundle vào client.

### Ví dụ `.env` (frontend)

```bash
VITE_YT_VIDEO_URL=https://www.youtube.com/watch?v=jpYRA5xvNiY
VITE_YT_REFRESH_MS=30000
```

### `.env.example`
Dự án có sẵn file mẫu tại `web/.env.example`. Bạn nên copy sang `web/.env` và chỉnh giá trị.

### LocalStorage
- Milestones được lưu trong LocalStorage theo key `yt:viewMilestones:v2`.

### Quy tắc của Vite
- Chỉ biến bắt đầu bằng `VITE_` mới được expose cho frontend.
