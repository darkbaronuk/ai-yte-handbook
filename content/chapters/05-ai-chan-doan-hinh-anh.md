---
number: 5
title: "AI trong chẩn đoán hình ảnh — qXR và Lunit tại Việt Nam"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Patient Care", "Technical"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Điểm nóng ứng dụng AI đầu tiên ở bệnh viện Việt Nam. Chương này lấy case qXR (Qure.ai) và Lunit INSIGHT — case triển khai của tác giả."
---
# AI trong chẩn đoán hình ảnh — qXR và Lunit tại Việt Nam

## Bức tranh AI đọc ảnh y khoa 2026

- X-quang phổi, CT sọ não, mammography, đáy mắt, siêu âm tim
- Kiến trúc PACS + AI: DICOM → mô hình → RIS → bác sĩ đọc
- Đánh giá lâm sàng: sensitivity, specificity, NPV, PPV, AUC — không chỉ accuracy
- Luật AI 134/2025: AI chẩn đoán hình ảnh thuộc "rủi ro cao"

## Case chính: qXR của Qure.ai

> **qXR triển khai tại Việt Nam** (case của tác giả) — AI đọc X-quang phổi sàng lọc lao, COVID, ung thư phổi tại các chương trình y tế cộng đồng.

- Kiến trúc và tích hợp với hệ thống chụp lưu động
- Kết quả pilot ở Việt Nam
- Bài học tích hợp với chương trình sàng lọc quốc gia

## Case song song: Lunit INSIGHT

> **Lunit INSIGHT CXR + MMG triển khai** (case của tác giả) — AI đọc X-quang ngực và mammography, đối tác chiến lược tại Hàn Quốc.

- Điểm mạnh Lunit trong mammography
- Tích hợp với PACS bệnh viện Việt Nam
- So sánh với VinDr-CXR mã nguồn mở

## Hướng dẫn triển khai theo tầng năng lực

- **L0** — bác sĩ dùng demo web-based để trải nghiệm
- **L1** — trạm y tế / xe lưu động dùng qXR cloud + Wi-Fi
- **L2** — bệnh viện tích hợp Lunit / qXR on-premise vào PACS
- **L3** — Sở Y tế deploy AI đọc ảnh cho chương trình sàng lọc toàn tỉnh

## Rủi ro và tuân thủ

- Đăng ký thiết bị y tế loại C/D theo quy định Việt Nam
- Hồ sơ tuân thủ Luật AI 134/2025 cho AI rủi ro cao
- Đánh giá lâm sàng trước khi triển khai rộng
- Xử lý false negative: quy trình second read

## Lab 5 — Đọc X-quang phổi với AI

- Upload 10 DICOM mẫu (VinDr public dataset)
- Xem heatmap của mô hình, đối chiếu với labeled ground truth
- Viết báo cáo giải thích 3 case khó
- Chấm: đối chiếu labels + rubric


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
