## MV Landing Page

Landing page nhúng MV YouTube và hiển thị bộ đếm view/like, kèm refresh progress, milestones (LocalStorage) và hiệu ứng odometer.

### Live demo

- https://sontung-youtube-view-count.vercel.app/

### Tính năng

- Nhúng video YouTube (privacy-enhanced `youtube-nocookie.com`).
- Hiển thị **views / likes** (client-only qua YouTube Data API v3; lưu ý API key sẽ lộ nếu để ở frontend).
- Refresh progress bar + trạng thái loading/error.
- Mốc view (milestones) lưu LocalStorage, có timestamp khi đạt mốc.
- Footer hiển thị version hiện tại.

### Dev

```bash
npm install
npm run dev
```

### Cấu hình

Copy file mẫu và chỉnh link video/key:

```bash
cd web
copy .env.example .env
```

Xem chi tiết trong `docs/05-configuration.md`.

### Monorepo (super repo)

Repo root là workspace orchestrator:
- `npm run dev` / `npm run build` sẽ chạy app trong `web/`.
- Có thể dùng Turbo: `npx turbo run build` (tuỳ chọn).

