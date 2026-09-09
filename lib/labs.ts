// Định nghĩa Lab — câu hỏi + rubric cho mỗi chương.
// Thêm Lab mới bằng cách push vào array này.

export type Lab = {
  id: string;
  chapter: string;
  title: string;
  intro: string;
  question: string;
  rubric: string;
  minLength: number;
  suggestedTimeMin: number;
};

export const LABS: Lab[] = [
  {
    id: "lab-01",
    chapter: "01-hau-covid",
    title: "Lab 1 — Bài học từ COVID cho AI y tế Việt Nam 2026",
    intro:
      "Bài lab đầu tiên của cẩm nang yêu cầu bạn suy ngẫm và viết ngắn một đoạn văn. Không có đáp án đúng tuyệt đối — AI sẽ chấm theo rubric rõ ràng và gợi ý cải thiện. Điểm được lưu lại để theo dõi tiến độ của bạn xuyên suốt 17 chương.",
    question:
      "Trong bốn bài học từ giai đoạn COVID (dữ liệu phân mảnh, quản trị lỏng, người dùng sẵn sàng, mã nguồn mở là chiến lược), bài học nào theo bạn còn giá trị nhất đến 2026 và tại sao? Viết đoạn văn 150–250 từ, dẫn ít nhất một ví dụ cụ thể (từ chính chương 01 hoặc từ kinh nghiệm của bạn).",
    rubric: `
- **Lập luận**: Chọn ra bài học cụ thể và giải thích vì sao nó còn giá trị đến 2026. Không chỉ liệt kê.
- **Bằng chứng**: Dẫn ít nhất 1 ví dụ cụ thể (DrAid, VinDr-CXR, Bluezone, hoặc kinh nghiệm riêng). Ví dụ phải liên quan trực tiếp tới bài học đã chọn.
- **Liên hệ 2026**: Nêu được vì sao bài học còn giá trị ở bối cảnh AI sinh tạo hiện tại (LLM, RAG, agentic AI, v.v.).
- **Văn phong**: Rõ ràng, mạch lạc, không lặp, không lan man, đủ 150–250 từ.
- **Tư duy độc lập**: Có góc nhìn riêng, không chỉ tóm tắt lại nội dung chương.

**Grade 5**: Đạt 5/5 tiêu chí, có nhận định sắc sảo.
**Grade 4**: Đạt 4/5, có chiều sâu nhưng thiếu một ý.
**Grade 3**: Đạt 3/5, đúng hướng nhưng thiếu bằng chứng hoặc liên hệ 2026.
**Grade 2**: Đạt 2/5, lập luận yếu hoặc thiếu ví dụ.
**Grade 1**: Không đạt, lạc đề hoặc quá sơ sài.`,
    minLength: 300,
    suggestedTimeMin: 15,
  },
  {
    id: "lab-02",
    chapter: "02-ai-sinh-tao",
    title: "Lab 2 — Thiết kế quy trình dùng AI sinh tạo cho một ca khó",
    intro:
      "Chương 02 phân tích ba làn sóng AI sinh tạo và bốn giới hạn của nó. Trong lab này, bạn đảo ngược vấn đề: thiết kế một quy trình cụ thể để dùng AI sinh tạo giúp tra cứu một ca khó tại đơn vị của bạn — có tính đến 3 nguyên tắc (grounding trước, cite hoặc bỏ, hai lần đọc).",
    question:
      "Chọn 1 ca lâm sàng khó bạn đã gặp hoặc giả định (ví dụ: bệnh nhân ung thư phổi EGFR+ kháng thuốc đích thế hệ 3, hoặc tiểu đường type 2 không đáp ứng GLP-1). Thiết kế quy trình 4–6 bước sử dụng AI sinh tạo để hỗ trợ quyết định cho ca này. Quy trình phải nêu rõ: (1) công cụ gì cho bước nào và vì sao chọn công cụ đó; (2) câu prompt mẫu bạn sẽ dùng; (3) bước nào bắt buộc phải có cite nguồn gốc; (4) bước kiểm tra chéo và quyết định cuối. Viết 250–400 từ.",
    rubric: `
- **Tính cụ thể**: Ca lâm sàng rõ ràng, có đủ thông tin để hiểu vấn đề cần tra. Không chung chung.
- **Chọn công cụ có lý**: Nêu rõ vì sao chọn công cụ nào cho bước nào (ví dụ LeapSpace cho tra RCT, ChatGPT cho viết tóm tắt, guideline BYT cho đối chiếu). Thể hiện hiểu điểm mạnh yếu của từng công cụ.
- **Prompt chất lượng**: Câu prompt mẫu có bối cảnh + câu hỏi cụ thể + ràng buộc cần thiết. Không phải câu hỏi trống.
- **Grounding & cite**: Chỉ rõ bước nào bắt buộc có cite nguồn, bước nào chấp nhận không cite. Thể hiện nguyên tắc "cite hoặc bỏ".
- **Kiểm tra chéo**: Có bước xác minh output trước khi đặt vào bệnh án/hội chẩn. Không "tin AI mù quáng".

**Grade 5**: Đạt 5/5, quy trình dùng được ngay tại đơn vị.
**Grade 4**: Đạt 4/5, hiểu nguyên tắc nhưng thiếu 1 bước.
**Grade 3**: Đạt 3/5, đúng hướng nhưng prompt/công cụ chung chung.
**Grade 2**: Đạt 2/5, thiếu grounding hoặc kiểm tra chéo.
**Grade 1**: Không đạt, không thể hiện nguyên tắc của chương.`,
    minLength: 500,
    suggestedTimeMin: 20,
  },
];

export function getLab(id: string): Lab | undefined {
  return LABS.find((l) => l.id === id);
}

export function getLabsForChapter(chapterSlug: string): Lab[] {
  return LABS.filter((l) => l.chapter === chapterSlug);
}
