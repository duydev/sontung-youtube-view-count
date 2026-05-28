## PROGRESS

### Feature: Landing page + YouTube MV counters

**Goal**: React + Vite + TypeScript landing page nhúng YouTube MV và hiển thị bộ đếm view/like, đổi video qua `.env`.

### Assumptions
- MVP ưu tiên frontend trước; thống kê view/like sẽ lấy qua YouTube Data API (nếu có API key) hoặc qua backend/proxy (khuyến nghị) ở bước tiếp theo.
- Nếu likeCount không khả dụng, UI vẫn hoạt động và hiển thị fallback.

### Task breakdown

- [ ] **Project scaffold**
  - [x] Tạo app React Vite TS trong `web/`
  - [x] Thêm `.gitignore` và `.env.example`
- [ ] **YouTube config**
  - [x] `VITE_YT_VIDEO_URL`
  - [x] `VITE_YT_REFRESH_MS`
  - [x] (Optional) `VITE_YT_API_KEY` nếu gọi API trực tiếp từ client
- [ ] **UI/UX**
  - [x] Layout landing (hero, embed, stats cards)
  - [x] Responsive + accessible basics
  - [x] Loading/error/stale states
- [ ] **Stats fetching**
  - [x] Parse `videoId` từ URL
  - [x] Hook polling + keep last good values
  - [ ] Adapter: proxy (server) (phase 2)
- [ ] **Docs alignment**
  - [ ] Cập nhật `docs/04-setup-and-run.md` (đường dẫn `web/`)
  - [ ] Cập nhật `docs/05-configuration.md` (thêm `.env.example`, keys thực tế)
  - [ ] Cập nhật `docs/03-architecture.md` nếu chọn mode client/proxy
- [ ] **Tooling**
  - [ ] ESLint + Prettier + scripts
  - [ ] Run lint/format/build

### Notes
- Repo root không rỗng (đã có `docs/`), nên Vite app sẽ đặt trong `web/` để tránh xung đột.
