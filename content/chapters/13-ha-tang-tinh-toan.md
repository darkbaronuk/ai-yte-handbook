---
number: 13
title: "Hạ tầng tính toán — workstation RTX 6000 là điểm ngọt cho bệnh viện Việt Nam"
part: "Phần III — Hạ tầng"
status: draft
domains: ["Technical", "Administration"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Không cần H100 để chạy AI y tế. Workstation RTX 6000 Ada / RTX PRO 6000 Blackwell là giải pháp thực tế cho L2 tại Việt Nam."
---
# Hạ tầng tính toán — workstation RTX 6000 là điểm ngọt cho bệnh viện Việt Nam

## Ba tầng hạ tầng thực tế Việt Nam

- **L1 — Phòng khám / trạm y tế**: Cloud API là chính, server local chỉ mini-PC + NPU
- **L2 — Bệnh viện / Sở Y tế**: workstation RTX 6000 Ada (48GB) hoặc RTX PRO 6000 Blackwell (96GB)
- **L3 — Trung tâm chuỗi bệnh viện / Bộ**: cụm nhiều RTX PRO 6000; H100/H200 nếu nhập được chính hãng

## Vì sao RTX 6000 là điểm ngọt cho L2

- Mua được ở Việt Nam qua kênh phân phối chính hãng
- Không bị export control như H100/H200
- Giá 250–350 triệu VND/máy — trong tầm mua sắm công
- Không cần data center chuyên dụng, chỉ cần phòng máy có UPS và điều hòa tốt
- Chạy được LLM 30B–70B với quantization; đủ cho ambient scribe, chatbot nội bộ, đọc ảnh

## Cấu hình workstation tham khảo

- 1× RTX 6000 Ada 48GB hoặc 1× RTX PRO 6000 Blackwell 96GB
- CPU: Threadripper Pro / Xeon W
- RAM: 128–256GB
- Storage: 4TB NVMe + 20TB HDD
- Mạng: 10GbE
- UPS 3kVA, điều hòa phòng máy
- Chi phí đầu tư: 400–500 triệu VND

## Cloud API cho L1

- OpenAI, Anthropic, Vertex AI, Perplexity Enterprise
- Cost model theo token, dễ dự toán
- Rủi ro dữ liệu ra biên giới — cần DPA và tuân thủ NĐ 13/2023

## Cụm GPU cho L3

- 4–16× RTX PRO 6000 cluster hoặc H100/H200 khi có kênh
- Mạng InfiniBand, storage tốc độ cao
- An ninh vật lý, làm mát dedicated

## Bảng so sánh chi phí

| Tầng | Cấu hình | Đầu tư | Vận hành/tháng | Phù hợp |
|---|---|---|---|---|
| L1 | Cloud API | 0 | 5–20 triệu | Phòng khám nhỏ |
| L2 | 1× RTX 6000 | 400–500 triệu | 3–5 triệu | Bệnh viện tuyến tỉnh/huyện |
| L2+ | 2–4× RTX PRO 6000 | 1,5–3 tỷ | 10–20 triệu | Bệnh viện lớn |
| L3 | 8–16× GPU cluster | 5–20 tỷ | 50–150 triệu | Sở/Bộ, chuỗi bệnh viện |

## Ánh xạ EMRAM

- Hạ tầng của bạn đang ở HIMSS EMRAM Stage mấy?
- Từ Stage 3 lên Stage 4–5 cần gì?

## Case đóng chương

> **Xây workstation RTX 6000 cho MediBot — tổng đầu tư 400 triệu, chạy 70B model, phục vụ 10.000 lượt/ngày** (case của tác giả).

## Lab 13 — Ước tính chi phí hạ tầng LLM cho bệnh viện tỉnh

- Calculator tương tác
- Chọn use case + số user + SLA → xuất BOM và TCO 3 năm
- Chấm: rubric + so với reference solution


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
