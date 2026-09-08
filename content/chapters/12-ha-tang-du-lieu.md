---
number: 12
title: "Hạ tầng dữ liệu — điều kiện tiên quyết"
part: "Phần III — Hạ tầng"
status: draft
domains: ["Data", "Informatics"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Không có dữ liệu chuẩn thì AI không chạy được. Chương này về HL7 FHIR R4, data lake y tế, tích hợp VNeID."
---
# Hạ tầng dữ liệu — điều kiện tiên quyết

## Data-ready trước AI-ready

- Vì sao dữ liệu là điểm chết của 80% dự án AI y tế
- Chuẩn hóa HL7 FHIR R4 theo Quyết định 1551 và Thông tư 13/2025
- Master data management: ICD-10, SNOMED, LOINC bản Việt hóa

## Kiến trúc data lake y tế

- Bronze / silver / gold: raw → cleaned → business-ready
- Storage: object storage vs data warehouse
- Catalog và data governance

## Liên thông ba tuyến

- Trạm — huyện — tỉnh — trung ương
- Tích hợp VNeID và Sổ sức khỏe điện tử
- Chiến dịch 90 ngày làm sạch dữ liệu của Bộ Y tế 2026

## Hướng dẫn triển khai

- **L0** — bác sĩ dùng dữ liệu đã chuẩn hóa
- **L1** — phòng khám export FHIR đúng chuẩn
- **L2** — bệnh viện xây data lake nội bộ
- **L3** — Sở/Bộ triển khai kiến trúc dữ liệu liên thông

## Case đóng chương

> **Chiến dịch 90 ngày làm sạch dữ liệu của Bộ Y tế 2026** — bài học chuẩn hóa 12 cơ sở dữ liệu chuyên ngành.

## Lab 12 — Chuẩn hóa hồ sơ sang HL7 FHIR

- Editor JSON có validator
- Chuyển 5 bệnh án nội bộ sang FHIR R4 hợp lệ
- Chấm: validator tự động


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
