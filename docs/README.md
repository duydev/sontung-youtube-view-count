## Tài liệu dự án `sontung-youtube-view-count`

Mục tiêu: tạo landing page chào mừng ca sĩ ra mắt MV mới trên YouTube. Trang hiển thị:

- Nhúng video YouTube (embed) để xem trực tiếp.
- Bộ đếm **lượt xem (views)** và **lượt thích (likes)** theo thời gian thực/định kỳ.
- Cho phép thay đổi link video qua cấu hình `.env`.

## Cấu trúc tài liệu

- `docs/01-product-overview.md`: phạm vi sản phẩm, đối tượng sử dụng, success metrics.
- `docs/02-requirements.md`: yêu cầu chức năng/phi chức năng.
- `docs/03-architecture.md`: kiến trúc tổng quan và luồng dữ liệu.
- `docs/04-setup-and-run.md`: cách khởi tạo/chạy local với React + Vite + TypeScript.
- `docs/05-configuration.md`: biến môi trường `.env` và cách đổi video.
- `docs/06-youtube-integration.md`: cách lấy view/like (YouTube Data API), lưu ý quota & bảo mật.
- `docs/07-backend-and-db-assessment.md`: đánh giá cần/không cần backend + DB, khuyến nghị triển khai.
- `docs/08-gitflow.md`: quy trình GitFlow (nhánh, PR, release, hotfix).
- `docs/PROGRESS.md`: theo dõi tiến độ triển khai trong repo.
- `docs/adr/ADR-0001-backend-strategy.md`: quyết định kỹ thuật (ADR) về chiến lược backend.

## Ghi chú nhanh

- Nếu chỉ embed video, **không** lấy được view/like đáng tin cậy từ client thuần (không có API chính thức công khai từ trang watch).
- Cách bền vững là dùng **YouTube Data API v3** để đọc `statistics` (views/likes).
- API key đặt trong frontend sẽ **bị lộ**, nên nên dùng backend/proxy nếu muốn bảo mật key và kiểm soát quota.
