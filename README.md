# Cẩm nang AI trong Y tế Việt Nam

Cẩm nang thực hành cho nhân viên y tế, cán bộ chính sách và kỹ sư y tế số Việt Nam. Trang web sống tại [ai-yte.vn](https://ai-yte.vn).

- 18 chương, chia 4 phần: Tiến trình — Hiện trạng — Hạ tầng — Tương lai
- Chấm năng lực theo ma trận WHO 2026 × Miller × Dreyfus (Grade 1–5)
- Mã nguồn mở, cowriter qua Pull Request

## Kiến trúc

- Next.js 14 (App Router) + TypeScript + Tailwind
- Markdown trong `content/chapters/` (frontmatter `number, title, part, status, domains, miller, owners, updated, summary`)
- Render bằng `remark` + `rehype`, mỗi chương có nút *Chỉnh sửa trên GitHub*
- Triển khai trên Vercel, preview tự động cho mỗi Pull Request

## Chạy local

```bash
npm install
npm run dev
```

Truy cập http://localhost:3000

## Cấu trúc thư mục

```
app/                Next.js App Router pages
  page.tsx          Trang chủ
  muc-luc/          Mục lục
  chapters/[slug]/  Trang chương
  dashboard/        Kanban Draft/Review/Final
  ma-tran/          Ma trận năng lực
  dong-gop/         Hướng dẫn đóng góp
content/chapters/   18 file Markdown chương
lib/chapters.ts     Loader Markdown
```

## Quy trình đóng góp

Xem [CONTRIBUTING.md](./CONTRIBUTING.md).

Tóm tắt:
1. Vào chương, bấm *Chỉnh sửa trên GitHub*
2. GitHub tự tạo branch, sửa nội dung Markdown, mở Pull Request
3. Vercel tạo preview URL cho PR
4. Reviewer đọc, comment inline, approve
5. Merge → tự động deploy lên ai-yte.vn

## Bản quyền

Nội dung Creative Commons BY-NC-SA 4.0. Mã nguồn MIT.
