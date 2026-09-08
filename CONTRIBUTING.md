# Hướng dẫn đóng góp

Cảm ơn bạn đã tham gia viết Cẩm nang. Tài liệu này dành cho đồng tác giả và reviewer.

## Quy trình chuẩn (cowriter qua Pull Request)

1. Mở trang chương cần sửa trên [ai-yte.vn](https://ai-yte.vn).
2. Bấm nút **Chỉnh sửa trên GitHub** ở đầu trang. GitHub sẽ tự tạo một branch mới trên bản fork của bạn.
3. Sửa nội dung Markdown. Giữ nguyên frontmatter trừ khi bạn đổi trạng thái.
4. Commit và mở Pull Request về branch `main`.
5. Vercel tự động tạo một **preview URL** cho PR — dán link vào phần mô tả PR để reviewer đọc trực tiếp.
6. Ít nhất 1 reviewer approve. Với chương thuộc domain lâm sàng, cần thêm 1 chuyên gia lâm sàng approve.
7. Merge → deploy tự động lên ai-yte.vn.

## Trạng thái chương

Trong frontmatter, trường `status` là một trong ba giá trị:

- `draft` — bản khung, đang viết
- `review` — đã đủ nội dung, chờ phản biện
- `final` — đã phản biện, có thể trích dẫn

Dashboard ở `/dashboard` tự cập nhật theo trạng thái này.

## Quy ước viết

- Tiếng Việt, giọng cẩm nang thực hành — không hàn lâm, không marketing.
- Case của tác giả để trong blockquote `>`.
- Số liệu phải có nguồn. Nguồn để trong ngoặc vuông ngay sau câu, không dồn cuối chương.
- Không đưa số liệu bệnh nhân định danh vào bất cứ đâu trong repo (kể cả Lab).
- Ảnh minh họa để trong `public/images/ch{NN}/` và nhúng bằng đường dẫn tuyệt đối `/images/ch{NN}/ten-anh.png`.

## Sửa Lab

Mỗi Lab cần có:
- Mô tả nhiệm vụ ngắn gọn
- Input mẫu và output kỳ vọng
- Rubric chấm (nếu chấm bằng LLM-as-judge, ghi rõ prompt)
- Điều kiện đạt / không đạt

## Comment và review

- Comment inline trên Pull Request — không comment trong file Markdown.
- Track thay đổi qua Git commit history — không dùng `~~strikethrough~~` trong nội dung final.

## Cần trợ giúp

Liên hệ maintainer trong [MAINTAINERS.md](./MAINTAINERS.md).
