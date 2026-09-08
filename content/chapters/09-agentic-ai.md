---
number: 9
title: "Agentic AI — làn sóng 2025–2026"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Technical", "Administration"]
miller: "Shows How → Does"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Chương gánh của cẩm nang. Từ chatbot trả lời sang agent làm việc: 8 use case ưu tiên cho y tế Việt Nam."
---
# Agentic AI — làn sóng 2025–2026

## Định nghĩa Agentic AI

- LLM + tool calling + memory + planning + guardrail
- Khác gì AGI, khác gì Narrow AI
- Khung kiến trúc: react loop, MCP, function calling

## 8 use case ưu tiên cho y tế Việt Nam

1. Tự động hóa BHYT / giám định
2. Prior authorization
3. Điều phối lịch hẹn liên khoa
4. Hậu kiểm hồ sơ EMR
5. Trợ lý nghiên cứu lâm sàng
6. Agent giáo dục sức khỏe cá nhân hóa
7. Agent theo dõi bệnh mạn tính
8. Agent quản lý dược lâm sàng

## Framework và công cụ

- LangGraph, OpenAI Agents SDK, MCP servers
- Framework nội địa và tự viết
- Guardrails: input filter, output filter, tool sandboxing

## Kiến trúc production cho y tế

- Human-in-the-loop tại các điểm quyết định
- Audit log toàn bộ hành động của agent
- Fallback khi tool gọi thất bại
- Đánh giá hiệu năng: task success rate, thời gian, chi phí token

## Case đóng chương

> **Kiến trúc Agentic AI mà MediBot chuyển sang** (case của tác giả) — từ chatbot RAG đơn giản thành agent đa bước gọi tool, có memory người dùng.

## Lab 9 — Xây Agentic AI cho quy trình BHYT

- Trên sandbox low-code, ghép các tool: FHIR reader, ICD-10 coder, policy checker, denial handler
- Test end-to-end với 10 hồ sơ giả lập
- Chấm: test suite tự động + rubric kiến trúc


## Ghi chú của biên tập

- Chương này là bản khung. Đồng tác giả bổ sung: số liệu cập nhật, case chi tiết, hình minh họa, rubric Lab đầy đủ.
- Trước khi chuyển sang trạng thái `review`, đảm bảo mỗi mục có ít nhất 1 nguồn trích dẫn.
