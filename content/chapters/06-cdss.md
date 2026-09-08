---
number: 6
title: "AI hỗ trợ ra quyết định lâm sàng (CDSS) — Case Leira của AstraZeneca × AI4Life"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Patient Care"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "CDSS là điểm chạm gần bác sĩ nhất. Chương lấy case chính là Leira do AstraZeneca và AI4Life phát triển."
---
# AI hỗ trợ ra quyết định lâm sàng (CDSS) — Case Leira của AstraZeneca × AI4Life

## CDSS làm được gì hôm nay

- Cảnh báo tương tác thuốc, gợi ý phác đồ, sàng lọc sepsis, dự báo tái nhập viện
- Kiến trúc: rule-based vs ML vs LLM-based CDSS
- Bài toán alert fatigue và cách thiết kế thông báo có ý nghĩa

## Case chính: Leira (AstraZeneca × AI4Life)

> **Leira CDSS** — hệ thống hỗ trợ quyết định lâm sàng cho bệnh không lây do AstraZeneca và AI4Life phối hợp phát triển, triển khai tại Việt Nam.

- Kiến trúc mô hình và tích hợp với EMR
- Tập trung bệnh mạn tính: tăng huyết áp, đái tháo đường, tim mạch
- Bài học triển khai đa trung tâm

## Case song song: FaCare trial

> **FaCare hypertension–diabetes trial** (case của tác giả) — thử nghiệm CDSS cho tuyến cơ sở.

## Hướng dẫn triển khai

- **L0** — bác sĩ dùng CDSS SaaS cho vài use case
- **L1** — phòng khám tích hợp CDSS với hệ thống kê đơn
- **L2** — bệnh viện triển khai CDSS đa module
- **L3** — Sở Y tế deploy CDSS cho mạng lưới

## Rủi ro và tuân thủ

- Trách nhiệm pháp lý khi CDSS đưa gợi ý sai
- Yêu cầu human-in-the-loop tuyệt đối
- Cập nhật hướng dẫn khi guideline thay đổi

## Lab 6 — Xây CDSS rule cho tăng huyết áp

- Kéo-thả decision tree trên sandbox
- Test với 20 case Việt Nam theo Hướng dẫn chẩn đoán và điều trị của Bộ Y tế
- Chấm: test suite tự động


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
