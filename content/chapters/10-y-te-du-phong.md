---
number: 10
title: "AI trong y tế dự phòng và dịch tễ"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Data", "Patient Care"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Giám sát dịch, dự báo bùng phát, cảnh báo sớm — chương này dành cho cán bộ y tế công cộng và cục phòng bệnh."
---
# AI trong y tế dự phòng và dịch tễ

## Y tế dự phòng thời AI

- Giám sát dịch dựa trên Big Data, dự báo bùng phát
- Phân tích xu hướng bệnh không lây, chấm điểm rủi ro dân số
- Dashboard điều hành và data storytelling

## Mô hình dự báo dịch

- Time series cổ điển: ARIMA, Prophet
- Machine learning: XGBoost, LSTM
- Foundation models cho time series (Chronos, TimeGPT)
- Kết hợp dữ liệu khí hậu, môi trường, di chuyển

## Hướng dẫn triển khai

- **L0** — cán bộ dùng dashboard sẵn có
- **L1** — trung tâm y tế huyện có dashboard địa phương
- **L2** — CDC tỉnh xây mô hình dự báo cho tỉnh
- **L3** — Cục phòng bệnh xây mô hình quốc gia, kết nối liên tỉnh

## Case đóng chương

> **Mô hình dự báo sốt xuất huyết dựa trên khí hậu + dữ liệu ca** — kết hợp dữ liệu 5 năm của một tỉnh để dự báo 4 tuần tới.

## Lab 10 — Dự báo dịch sốt xuất huyết

- Notebook có sẵn dữ liệu 5 năm của 1 tỉnh
- Xây mô hình time series, đánh giá RMSE
- Viết báo cáo cho lãnh đạo
- Chấm: metric tự động + rubric báo cáo


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
