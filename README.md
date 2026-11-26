# Thực hành điện toán đám mây — Notes API

**Nguyễn Nguyên Khôi** · MSSV **2324802010262** · Lớp **D23CNTT03**

## Bài 1 — Hello Cloud API

Ngày thực hiện 05/11/2026. API Node.js và Express chạy trên GitHub Codespaces. Endpoint `GET /` trả lời chào và thông tin môi trường. Đã thử truy cập từ điện thoại qua 4G và chuyển cổng về Private sau khi kiểm tra.

[Báo cáo Bài 1](https://khoin8507-afk.github.io/notes-api-2324802010262/)

## Bài 2 — Docker, GHCR và CloudSim Plus

Ngày thực hiện 12/11/2026. Đã đóng gói API bằng Docker và chạy hai bản sao. Container `notes2` được giới hạn **0.5 CPU và 128 MiB RAM**. Image `ghcr.io/khoin8507-afk/notes-api:1.0` được phát hành cho `linux/amd64` và tải lại thành công sau khi đăng xuất GHCR.

Đã chạy bốn kịch bản CloudSim Plus. Lần 2 dùng TimeShared hoàn thành 4/8 cloudlet. Phép thử bổ sung dùng SpaceShared hoàn thành 8/8 cloudlet trong 40.3 giây mô phỏng.

- [Package GHCR](https://github.com/users/khoin8507-afk/packages/container/package/notes-api)
- [Dockerfile](https://github.com/khoin8507-afk/notes-api-2324802010262/blob/main/Dockerfile)
- [Báo cáo Bài 2](https://khoin8507-afk.github.io/notes-api-2324802010262/bai-2.html)

## Bài 3 — MongoDB Atlas và Supabase Storage

Ngày thực hiện 19/11/2026. API `/notes` hỗ trợ CRUD và lọc theo tag. Ghi chú được lưu trong MongoDB Atlas. Tệp đính kèm được lưu trong Supabase Storage và mở được qua `attachmentUrl`. Đã kiểm tra các mã HTTP `200`, `201`, `204`, `400` và `404` đúng tình huống.

Sau khi chèn 2.000 ghi chú mẫu, phép đo với tag `docker` cho thấy quét toàn bộ kiểm tra **2.001 tài liệu**, còn chỉ mục `tags_1` kiểm tra **571 tài liệu**. Số tài liệu được kiểm tra khi quét toàn bộ gấp **3,50 lần**. Cả hai trả 571 kết quả và ghi nhận 1 ms trong lần đo.

[Báo cáo Bài 3, gồm ảnh explain.js và sơ đồ Atlas–HDFS](https://khoin8507-afk.github.io/notes-api-2324802010262/bai-3.html)


## Bài 4 — Bảo mật ứng dụng đám mây

- Quản lý bí mật bằng GitHub Codespaces Secrets.
- Bật Secret Protection, Push Protection và Dependabot.
- Xác thực JWT với thời hạn 1 giờ, băm mật khẩu bằng bcrypt.
- Phân quyền truy cập ghi chú theo chủ sở hữu.
- Tích hợp Helmet, chống NoSQL Injection và Rate Limit.
- Kiểm thử xác thực và phân quyền đạt 10/10 trường hợp.
- Rate Limit chặn yêu cầu từ lần đăng nhập thứ 21.
- npm audit: 0 vulnerabilities.
- Trivy: so sánh Docker image Alpine và Full.

| Base Image | Kích thước (MB) | HIGH | CRITICAL |
|---|---:|---:|---:|
| node:22-alpine | 288.81 | 10 | 0 |
| node:22 | 1673.65 | 479 | 20 |

Alpine giảm 82,74% kích thước và 98,00% số phát hiện
lỗ hổng HIGH/CRITICAL so với Full.

**Báo cáo:** [Bài 4 — Bảo mật ứng dụng đám mây](https://khoin8507-afk.github.io/notes-api-2324802010262/bai-4.html)


