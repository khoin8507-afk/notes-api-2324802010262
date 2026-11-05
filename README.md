# Bài 1 — Hello Cloud API

- Họ tên: Nguyễn Nguyên khôi
- MSSV: 2324802010262
- Lớp: D23CNTT03
- Ngày thực hiện: 05/11/2026

## Giới thiệu

API Hello Cloud sử dụng Node.js và Express, chạy trong GitHub
Codespaces. Trang báo cáo tĩnh được xuất bản bằng GitHub Pages.

## Liên kết

- Repo: https://github.com/khoin8507-afk/notes-api-2324802010262
- Báo cáo: https://khoin8507-afk.github.io/notes-api-2324802010262/

## Chạy ứng dụng

Yêu cầu Node.js 22 và npm.

```bash
npm ci
npm start
```

Ứng dụng chạy tại cổng 3000 hoặc cổng được cấu hình qua biến PORT.

## Endpoint

GET / trả JSON gồm:

- message
- host
- platform
- cpus
- memoryGB
- uptimeSec
- time

## Cấu trúc

- src/app.js: ứng dụng Express và endpoint.
- src/server.js: khởi động máy chủ.
- docs/index.html: trang báo cáo.
- docs/images/: ảnh minh chứng.
- .devcontainer/devcontainer.json: cấu hình Codespaces.

## Kết quả

- API trả JSON trên trình duyệt máy tính.
- Điện thoại truy cập được qua mạng 4G.
- Cổng 3000 đã chuyển lại Private sau khi thử.
- Billing tại thời điểm chụp ghi nhận 0.32 giờ máy 2-core,
  tương đương khoảng 0.64 core-giờ; số tiền tính phí $0.

## Sự cố và cách xử lý

Lần tạo đầu gặp lỗi cài Docker/Moby trên Debian trixie.
Đã thêm "moby": false trong Docker feature và rebuild thành công.

## Lưu ý

API chỉ hoạt động khi Codespace và tiến trình Node.js đang chạy.
GitHub Pages phục vụ trang báo cáo tĩnh và không chạy Express.

Chưa thực hiện đối chiếu host sau một ngày.