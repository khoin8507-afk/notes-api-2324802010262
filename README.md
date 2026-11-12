# Thực hành điện toán đám mây — Notes API

**Nguyễn Nguyên Khôi** · MSSV **2324802010262** · Lớp **D23CNTT03**

## Bài 1 — Hello Cloud API

Ngày thực hiện 05/11/2026. API Node.js và Express chạy trên GitHub Codespaces. Endpoint `GET /` trả lời chào và thông tin môi trường. Đã kiểm tra truy cập qua mạng 4G và chuyển cổng về Private sau khi thử.

[Báo cáo Bài 1](https://khoin8507-afk.github.io/notes-api-2324802010262/)

## Bài 2 — Docker, GHCR và CloudSim Plus

Ngày thực hiện 12/11/2026. Đóng gói API Bài 1 bằng Docker và chạy hai bản sao. Container `notes2` được giới hạn **0.5 CPU và 128 MiB RAM**. Image `ghcr.io/khoin8507-afk/notes-api:1.0` được phát hành cho `linux/amd64` và đã kéo lại thành công sau khi đăng xuất GHCR.

Đã chạy bốn kịch bản CloudSim Plus. Lần 2 với TimeShared ghi nhận 4/8 cloudlet hoàn thành. Phép thử bổ sung với SpaceShared hoàn thành 8/8 ở 40.3 giây mô phỏng.

### Liên kết nộp Bài 2

- [Package GHCR — notes-api:1.0](https://github.com/users/khoin8507-afk/packages/container/package/notes-api)
- [Dockerfile trên GitHub](https://github.com/khoin8507-afk/notes-api-2324802010262/blob/main/Dockerfile)
- [Báo cáo Bài 2 — hai bảng kết quả, ảnh và câu hỏi phản biện](https://khoin8507-afk.github.io/notes-api-2324802010262/bai-2.html)

## Chạy API

Dùng Node.js 22 và npm.

```bash
npm ci
npm start
```

Gọi `GET http://localhost:3000/`. Có thể đổi cổng bằng biến môi trường `PORT`.
