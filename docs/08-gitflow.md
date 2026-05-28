## GitFlow cho dự án

Tài liệu này mô tả GitFlow tối giản, phù hợp dự án landing page.

### Nhánh và mục đích

- **`main`**: luôn ở trạng thái deploy được (production-ready). Mỗi lần release nên có tag.
- **`develop`**: tích hợp các thay đổi đã review; chuẩn bị cho release tiếp theo.
- **`feature/<ten-ngan>`**: phát triển tính năng mới từ `develop`.
- **`release/<version>`**: chốt release (chỉ fix bug, docs, versioning) từ `develop`, sau đó merge về `main` và `develop`.
- **`hotfix/<version>`**: sửa lỗi khẩn cấp từ `main`, sau đó merge về `main` và `develop`.

### Quy tắc làm việc hằng ngày

- **Tạo feature branch**
  - Từ `develop`: `feature/ui-landing`, `feature/youtube-stats`, ...
- **Mở Pull Request**
  - `feature/*` → `develop`
  - PR cần mô tả: Summary, Test plan, ảnh chụp UI (nếu có).
- **Merge strategy (khuyến nghị)**
  - Squash merge cho PR nhỏ để lịch sử gọn (tuỳ đội).
  - Không commit thẳng vào `main`.

### Versioning và release

- **Versioning**: khuyến nghị Semantic Versioning `MAJOR.MINOR.PATCH`
  - PATCH: fix bug, chỉnh UI nhỏ không phá vỡ
  - MINOR: thêm tính năng tương thích ngược (ví dụ thêm animation, thêm cache)
  - MAJOR: thay đổi phá vỡ (ít gặp ở landing page)
- **Quy trình release**
  - Tạo nhánh `release/1.0.0` từ `develop`
  - Chốt thay đổi cuối (bump version nếu có), kiểm tra build
  - Merge `release/1.0.0` → `main`, tag `v1.0.0`
  - Merge `release/1.0.0` → `develop`

### Hotfix

- Tạo `hotfix/1.0.1` từ `main`
- Fix nhanh, kiểm tra
- Merge về `main`, tag `v1.0.1`
- Merge lại về `develop` để không mất fix

### Quy ước commit (gợi ý)

Bạn có thể dùng Conventional Commits để dễ đọc changelog:
- `feat: ...` thêm tính năng
- `fix: ...` sửa lỗi
- `docs: ...` tài liệu
- `chore: ...` việc lặt vặt (config, tooling)
- `refactor: ...` tái cấu trúc không đổi hành vi

### Checklist tối thiểu trước khi merge vào `main`

- `npm run build` pass (nếu đã có frontend)
- Không lộ secrets trong repo (`.env` không commit)
- Docs cập nhật nếu có thay đổi cấu hình/luồng dữ liệu
