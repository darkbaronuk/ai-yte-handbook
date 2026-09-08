import { REPO_URL } from "@/lib/chapters";

export default function DongGop() {
  return (
    <div className="prose prose-slate max-w-3xl">
      <h1>Trở thành đồng tác giả</h1>
      <p>
        Cẩm nang được viết mở, cộng tác qua GitHub. Mỗi chương là một file
        Markdown; mọi thay đổi đi qua Pull Request để có review và lịch sử.
      </p>

      <h2>Ba vai trò</h2>
      <ul>
        <li>
          <b>Author</b> — chịu trách nhiệm nội dung 1 hoặc nhiều chương. Đặt tên
          mình vào <code>owners:</code> ở đầu file chương.
        </li>
        <li>
          <b>Coordinator</b> — review PR, merge, quản lý lịch. Có quyền write
          trên repo.
        </li>
        <li>
          <b>Reviewer</b> — chuyên gia mời để đọc và bình luận. Không cần quyền
          write, có thể comment trên PR hoặc mở Issue.
        </li>
      </ul>

      <h2>Quy trình sửa một chương</h2>
      <ol>
        <li>Vào chương muốn sửa từ mục lục.</li>
        <li>
          Bấm nút <b>✏️ Sửa chương này trên GitHub</b>. GitHub tự tạo branch
          mới.
        </li>
        <li>Chỉnh sửa Markdown ngay trên web GitHub, viết mô tả thay đổi.</li>
        <li>
          Bấm <b>Propose changes</b> → GitHub tạo Pull Request.
        </li>
        <li>
          Vercel tự tạo <b>preview URL</b> cho PR đó, bạn xem trực tiếp bản
          render trước khi merge.
        </li>
        <li>Coordinator review, comment theo dòng, merge khi ổn.</li>
      </ol>

      <h2>Frontmatter mỗi chương</h2>
      <p>
        Đầu file chương có khối YAML điều khiển hiển thị. Đây là ví dụ:
      </p>
      <pre>
        <code>{`---
number: 4
title: "Nền tảng AI đa nhiệm"
part: "Phần II — Hiện trạng"
status: draft         # draft | review | final
domains: ["Technical", "Communication"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-09-09"
summary: "Cửa vào cho L0/L1..."
---`}</code>
      </pre>
      <p>
        Chỉ cần đổi <code>status:</code> thành <code>review</code> hoặc{" "}
        <code>final</code> là dashboard tiến độ tự cập nhật.
      </p>

      <h2>Quy ước viết</h2>
      <ul>
        <li>Tiếng Việt, giọng thực hành, tránh học thuật khô.</li>
        <li>
          Mỗi chương có 5 phần cố định: Định nghĩa · Hiện trạng · Case · Hướng
          dẫn L0–L3 · Rủi ro/Tuân thủ. Cuối chương có mô tả Lab.
        </li>
        <li>
          Trích dẫn nguồn bằng Markdown link:{" "}
          <code>[Tên nguồn](https://...)</code>.
        </li>
        <li>Case của tác giả đặt trong blockquote để phân biệt.</li>
        <li>
          Bảng dùng Markdown table thường. Sơ đồ phức tạp có thể vẽ Mermaid ở
          giai đoạn sau.
        </li>
      </ul>

      <h2>Cần hỗ trợ?</h2>
      <p>
        Mở Issue tại{" "}
        <a href={`${REPO_URL}/issues/new`}>{REPO_URL}/issues/new</a> hoặc liên
        hệ coordinator qua email trong file <code>MAINTAINERS.md</code>.
      </p>
    </div>
  );
}
