## PROGRESS

### Feature: Landing page + YouTube MV counters

**Goal**: React + Vite + TypeScript landing page nhúng YouTube MV và hiển thị bộ đếm view/like, đổi video qua `.env`.

### Feature: UX nâng cao cho refresh & counters

**Goal**:
- Hiển thị **progress bar** đếm ngược thời gian tới lần refresh tiếp theo.
- Lưu **danh sách mốc view** (milestones) vào **LocalStorage** và hiển thị trạng thái đạt/chưa đạt.
- Thêm **hiệu ứng xoay số cổ điển** (odometer-like) cho view/like.

### Assumptions
- MVP ưu tiên frontend trước; thống kê view/like sẽ lấy qua YouTube Data API (nếu có API key) hoặc qua backend/proxy (khuyến nghị) ở bước tiếp theo.
- Nếu likeCount không khả dụng, UI vẫn hoạt động và hiển thị fallback.
- Milestones mặc định theo các mốc phổ biến, người dùng có thể thêm/xoá và được lưu local.

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
  - [x] Cập nhật `docs/04-setup-and-run.md` (đường dẫn `web/`)
  - [x] Cập nhật `docs/05-configuration.md` (thêm `.env.example`, keys thực tế)
  - [ ] Cập nhật `docs/03-architecture.md` nếu chọn mode client/proxy
- [ ] **Tooling**
  - [x] ESLint + Prettier + scripts
  - [x] Run lint/format/build

- [ ] **UX nâng cao**
  - [x] Progress bar cho thời gian refresh
  - [x] Milestones view lưu LocalStorage (thêm/xoá + hiển thị đạt/chưa đạt)
  - [x] Hiệu ứng cylinder (3D) cho counters
  - [x] Footer hiển thị credit + version hiện tại
  - [x] Thẻ thông tin nghệ sĩ (nguồn Wikipedia)
  - [x] Tối ưu responsive UI/UX (mobile/tablet/desktop)

### Notes
- Repo root không rỗng (đã có `docs/`), nên Vite app sẽ đặt trong `web/` để tránh xung đột.
- Milestones được lưu theo key `yt:viewMilestones:v2` trong LocalStorage (có migration từ `v1`).
