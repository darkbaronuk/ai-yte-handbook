---
number: 8
title: "AI trong quản trị bệnh viện và ambient scribe"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Administration", "Communication"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Ambient scribe và tự động hóa hành chính là quick win cho bệnh viện Việt Nam — giảm gánh nặng hồ sơ, tăng thời gian cho bệnh nhân."
---
# AI trong quản trị bệnh viện và ambient scribe

## Quick win hành chính trước lâm sàng

- Ambient scribe (ghi âm khám → SOAP note tự động)
- Tự động hóa coding ICD-10, hồ sơ, biên bản
- Tối ưu lịch mổ, quản lý giường, dự báo nhu cầu

## Case quốc tế và Việt Nam

- Abridge, Nuance DAX, Suki — case tiêu chuẩn Bắc Mỹ
- Ambient scribe tiếng Việt tại một bệnh viện tuyến trung ương: giảm 40% thời gian làm hồ sơ

## Hướng dẫn triển khai

- **L0** — bác sĩ dùng ambient scribe cá nhân trên điện thoại
- **L1** — phòng khám tích hợp scribe với hệ thống kê đơn
- **L2** — khoa triển khai đa bác sĩ, workflow chuẩn
- **L3** — bệnh viện triển khai toàn viện, tích hợp EMR và coding

## Rủi ro và tuân thủ

- Ghi âm khám bệnh: cần consent theo NĐ 13/2023
- Lưu trữ audio: yêu cầu ẩn danh sau khi transcribe
- Bác sĩ ký duyệt SOAP note trước khi lưu chính thức

## Case đóng chương

> **Ambient scribe tại một bệnh viện tuyến trung ương** — giảm 40% thời gian làm hồ sơ, tăng thời gian tương tác với bệnh nhân.

## Lab 8 — Ambient scribe tiếng Việt

- Nghe 5 audio khám bệnh mẫu (đã ẩn danh)
- Sinh SOAP note, chỉnh sửa, submit
- Chấm: ROUGE + rubric lâm sàng + LLM-as-judge


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
