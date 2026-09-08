---
number: 7
title: "AI trong chăm sóc sức khỏe ban đầu và cộng đồng"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Patient Care", "Communication"]
miller: "Shows How → Does"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Từ chatbot triệu chứng đến kiosk sức khỏe, PHR có AI — chương này lấy chuỗi case của tác giả: MediBot, VietPHR, Health Kiosk với FaCare, Corsano pilot."
---
# AI trong chăm sóc sức khỏe ban đầu và cộng đồng

## Chăm sóc ban đầu và AI

- Chatbot tư vấn triệu chứng, sàng lọc bệnh không lây, giáo dục sức khỏe
- Health kiosk, thiết bị đeo, PHR có AI giải thích kết quả
- Đặc thù tuyến xã: kết nối kém, nhân lực hạn chế, đa ngôn ngữ dân tộc

## Case chuỗi của tác giả

> **MediBot** — chatbot y tế thuần Việt, xử lý 10–100 triệu lượt/tháng, đã thử nghiệm 1.172 người dân
> **VietPHR** — nền tảng PHR đang nâng cấp theo Thông tư 13/2025 + HL7 FHIR R4
> **Health Kiosk × FaCare** — kiosk đo lường sức khỏe mở, tích hợp thiết bị Bluetooth
> **Corsano pilot** — thử nghiệm băng đeo theo dõi liên tục

## Hướng dẫn triển khai

- **L0** — bác sĩ trạm dùng chatbot miễn phí + prompt template chuẩn
- **L1** — trạm y tế xã có kiosk và PHR đồng bộ
- **L2** — huyện triển khai mạng lưới kiosk kết nối trung tâm
- **L3** — tỉnh/Bộ Y tế deploy toàn tuyến, tích hợp VNeID

## Rủi ro và tuân thủ

- Chatbot không được tự chẩn đoán — luôn có disclaimer và đề xuất chuyển tuyến
- Dữ liệu PHR tuân thủ NĐ 13/2023 và Luật Dữ liệu
- Đối tượng dễ tổn thương: người già, người ít số hóa

## Lab 7 — Prompt chatbot triệu chứng cho trạm y tế xã

- Thiết kế prompt system tiếng Việt cho chatbot sàng lọc
- Test với 30 kịch bản người dân, bao gồm safety check
- Chấm: LLM-as-judge + safety rubric


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
