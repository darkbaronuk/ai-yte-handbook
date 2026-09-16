// Định nghĩa Lab — câu hỏi + rubric cho mỗi chương.
// Thêm Lab mới bằng cách push vào array này.

export type LabTool = {
  name: string;
  url: string;
  note: string;
  free: boolean;
};

export type Lab = {
  id: string;
  chapter: string;
  title: string;
  intro: string;
  question: string;
  rubric: string;
  minLength: number;
  suggestedTimeMin: number;
  tools?: LabTool[];
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
    tools: [
      {
        name: "Perplexity (Auto)",
        url: "https://www.perplexity.ai",
        note: "Miễn phí. Tắt đăng nhập cũng dùng được. Tìm nhanh tư liệu về DrAid, VinDr, Bluezone để lấy ví dụ.",
        free: true,
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com",
        note: "Miễn phí với tài khoản Google. Viết đoạn văn bằng tiếng Việt tốt.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Cần đăng nhập. Phù hợp để draft nhanh, kiểm tra câu chữ.",
        free: true,
      },
    ],
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
    tools: [
      {
        name: "Perplexity Pro (Academic mode)",
        url: "https://www.perplexity.ai",
        note: "Có mode 'Academic' tra cứu peer-reviewed. Miễn phí 5 lượt/ngày không đăng nhập.",
        free: true,
      },
      {
        name: "OpenEvidence",
        url: "https://www.openevidence.com",
        note: "Miễn phí cho bác sĩ đăng ký. Grounding vào PubMed, NEJM, Lancet. Rất tốt cho ca lâm sàng.",
        free: true,
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com",
        note: "Dùng để viết prompt mẫu và quy trình. Tiếng Việt tốt.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Dùng để kiểm tra chéo, so sánh với Gemini.",
        free: true,
      },
    ],
  },
  {
    id: "lab-03",
    chapter: "03-buoc-ngoat-chinh-sach",
    title: "Lab 3 — Đọc Luật AI 134/2025 và phân tích tác động",
    intro:
      "Luật AI 134/2025/QH15 có hiệu lực 1/1/2026 và đặt nhiều yêu cầu mới cho AI y tế. Trong lab này, bạn đọc một điều luật cụ thể và phân tích tác động lên một ứng dụng AI y tế bạn quan tâm — vậy bạn thực sự hiểu luật và không chỉ trích dẫn sáo rỗng.",
    question:
      "Chọn 1 ứng dụng AI y tế cụ thể (ví dụ: chatbot tư vấn sức khỏe cộng đồng, AI đọc phim X-quang, trợ lý ảo cho bác sĩ, hay AI sàng lọc lao tại trạm y tế). Truy cập bản toàn văn Luật AI 134/2025/QH15, chọn ra 2 điều luật liên quan trực tiếp đến ứng dụng đó. Với mỗi điều luật: (1) tóm tắt nội dung bắng 2-3 câu; (2) xác định 2 tác động cụ thể lên thiết kế, vận hành hoặc chi phí của ứng dụng; (3) đề xuất 1 hành động cụ thể bạn hoặc tổ chức cần làm để tuân thủ. Viết 300-500 từ.",
    rubric: `
- **Đúng điều luật**: Chọn được 2 điều thực sự liên quan (không phải trích dẫn cho có), trích đúng số điều và tên.
- **Tóm tắt chính xác**: Không bóp méo nội dung, giữ nguyên tính pháp lý (thuật ngữ "bắt buộc", "khuyến nghị", "quyền", "nghĩa vụ").
- **Tác động thực tế**: Phải nêu tác động cụ thể (ví dụ: "cần thêm màn hiển thị 'bạn đang tương tác với AI'" chứ không phải "cần minh bạch hơn").
- **Hành động khả thi**: Đề xuất làm được trong 3-6 tháng, không chung chung như "nâng cao nhận thức".
- **Tư duy độc lập**: Không chỉ tóm tắt luật, có góc nhìn của người triển khai.

**Grade 5**: Đạt 5/5, phân tích dùng được ngay vào tài liệu tuân thủ của tổ chức.
**Grade 4**: Đạt 4/5, hiểu luật nhưng thiếu 1 tác động hoặc hành động.
**Grade 3**: Đạt 3/5, đúng hướng nhưng tác động chung chung.
**Grade 2**: Đạt 2/5, chọn sai điều luật hoặc tóm tắt lệch.
**Grade 1**: Không đạt, không thể hiện hiểu văn bản gốc.`,
    minLength: 600,
    suggestedTimeMin: 25,
    tools: [
      {
        name: "Toàn văn Luật AI 134/2025/QH15 (Chính phủ)",
        url: "https://vanban.chinhphu.vn/?pageid=27160&docid=216334&classid=1&typegroupid=3",
        note: "Bản gốc toàn văn đăng trên Cổng Thông tin Chính phủ. Miễn phí.",
        free: true,
      },
      {
        name: "Video \"10 điểm đáng chú ý của Luật AI\" (LuatVietnam)",
        url: "https://www.youtube.com/watch?v=0t10A9w7XWQ",
        note: "Video 15 phút giới thiệu nhanh 10 điểm chính. Xem trước để định hướng.",
        free: true,
      },
      {
        name: "Perplexity (Auto)",
        url: "https://www.perplexity.ai",
        note: "Dùng để tra cứu điều luật, so sánh với luật AI quốc tế (EU AI Act, US AI EO).",
        free: true,
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com",
        note: "Viết bản phân tích, kiểm tra logic lập luận.",
        free: true,
      },
    ],
  },
  {
    id: "lab-14",
    chapter: "14-an-toan-tuan-thu",
    title: "Lab 14 — Bốn tình huống thực tế tại bệnh viện Việt Nam",
    intro:
      "Bốn tình huống dưới đây được rút từ thực tế bệnh viện Việt Nam trong hai năm 2025–2026. Mỗi case đan xen cả an toàn lâm sàng, bảo mật dữ liệu và tuân thủ pháp luật. **Chọn ít nhất một case phản ánh đúng bối cảnh của bạn nhất và trả lời đủ năm câu hỏi**, hoặc làm nhiều case nếu muốn. AI chấm theo rubric pháp lý + an toàn lâm sàng chung.\n\n**Gợi ý làm bài chung**: (a) Với mỗi case, trả lời tuần tự năm câu — an toàn lâm sàng → bảo mật/dữ liệu → pháp lý → cách xử trí tại chỗ → ai báo cáo cho ai. (b) Mở sẵn [Luật 91/2025](https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx), [Luật KCB 15/2023](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-15-2023-qh15-kham-benh-chua-benh-119231127164453959.htm), [NĐ 102/2025](https://vanban.chinhphu.vn/?pageid=27160&docid=213607) trước khi viết. (c) Trích điều luật theo công thức 'Điều X khoản Y Luật Z quy định...'. (d) 'Ai báo cáo cho ai' — ghi rõ chuỗi khoa → trưởng khoa → giám đốc/DPO/CNTT, không chung chung 'báo lãnh đạo'.",
    question:
      "Chọn ít nhất MỘT trong bốn case dưới đây và trả lời đầy đủ 5 câu. Nếu làm nhiều case, tách rõ từng phần.\n\n═══ CASE 1 — Điều dưỡng hỏi ChatGPT về liều thuốc ═══\n\nĐiều dưỡng M tại khoa Hồi sức tích cực của bệnh viện tuyến tỉnh. Một bệnh nhân nữ 72 tuổi được bác sĩ chỉ định vancomycin 1g/12 giờ. Cuối ca trực, điều dưỡng thấy hơi nghi ngờ, bèn paste vào ChatGPT bản miễn phí: \"Bệnh nhân nữ 72 tuổi, 48kg, creatinine 1,8 mg/dL, dose vancomycin 1g/12h có sao không?\". AI trả lời có vẻ chắc chắn: \"Liều này an toàn cho bệnh nhân lớn tuổi, không cần điều chỉnh\". Điều dưỡng tiếp tục tiêm.\n\n═══ CASE 2 — Bác sĩ tin AI đọc CT 'bình thường' ═══\n\nBệnh viện tuyến trung ương đang triển khai AI hỗ trợ đọc CT. Bác sĩ chẩn đoán hình ảnh X (5 năm kinh nghiệm) đọc phim CT ngực của một nam 58 tuổi có tiền sử hút thuốc 40 gói-năm, đi khám vì ho kéo dài. AI trả về \"không phát hiện bất thường\" với độ tự tin 94%. Bác sĩ X liếc qua phim, đồng ý với AI, ký kết quả. Ba tháng sau, bệnh nhân quay lại vì khó thở, phát hiện ung thư phổi giai đoạn IIIB. Đọc lại CT cũ, có nốt 12mm ở thùy trên bên trái mà cả AI lẫn bác sĩ đều bỏ sót.\n\n═══ CASE 3 — Khoa huấn luyện mô hình AI da liễu ═══\n\nKhoa Da liễu một bệnh viện đa khoa xuất 2.000 hồ sơ bệnh nhân (bao gồm ảnh lâm sàng, chẩn đoán, phác đồ) từ HIS nội bộ để hợp tác với một nhóm nghiên cứu ở trường đại học huấn luyện mô hình nhận diện tổn thương da. Việc che tên làm qua — xóa họ tên nhưng giữ mã bệnh án, ngày sinh chi tiết, trường hợp bệnh, ảnh khuôn mặt. Không xin đồng ý từng bệnh nhân vì 'dữ liệu cũ', không có hợp đồng xử lý dữ liệu với trường đại học, không làm đánh giá tác động. Phòng CNTT chỉ cấp USB copy dữ liệu cho trưởng khoa.\n\n═══ CASE 4 — Chatbot bệnh viện khuyên ngưng thuốc chống đông ═══\n\nBệnh viện có chatbot trên website trả lời câu hỏi của bệnh nhân bằng tiếng Việt. Một bệnh nhân đã đặt stent mạch vành, đang dùng aspirin + clopidogrel, hỏi chatbot: \"Tôi bị răng đau sắp nhổ, có cần ngưng thuốc chống đông không?\". Chatbot trả lời: \"Có, bạn nên ngưng aspirin và clopidogrel 5–7 ngày trước khi nhổ răng để tránh chảy máu\". Bệnh nhân làm theo, 3 ngày sau nhập cấp cứu vì nhồi máu cơ tim cấp, huyết khối trong stent.\n\n═══ NĂM CÂU HỎI PHẢI TRẢ LỜI CHO CASE ĐÃ CHỌN ═══\n\n1. **An toàn lâm sàng**: Bệnh nhân bị nguy cơ gì? AI đã sai ở điểm nào (phân loại rủi ro, kiểu lỗi — ảo giác/thiên lệch/automation bias)?\n2. **Bảo mật/dữ liệu**: Dữ liệu bệnh nhân đã đi đâu? Vi phạm nguyên tắc nào (ẩn danh, chuyển xuyên biên giới, mục đích, đồng ý)?\n3. **Pháp lý**: Trích tối thiểu 3 điều luật cụ thể (số điều, số luật) đã vi phạm. Ai phải chịu — cá nhân, cơ sở y tế, nhà cung cấp AI?\n4. **Xử trí tại chỗ**: Trong 24 giờ tới, làm gì ngay? Trong 30 ngày, ba biện pháp ngăn ngừa cụ thể?\n5. **Ai báo cáo cho ai**: Chuỗi báo cáo cụ thể từ người phát hiện đến cơ quan quản lý nhà nước (nếu cần).\n\nYêu cầu độ dài: case 1 viết 400–600 từ; case 2–4 viết 500–700 từ. Có tối thiểu 3 trích dẫn điều luật cụ thể.",
    rubric: `
- **An toàn lâm sàng**: Nhận diện đúng loại lỗi của AI (ảo giác, thiên lệch, automation bias, sai ngữ cảnh, lạc hậu dữ liệu) và nguy cơ cụ thể với bệnh nhân. Không nhầm lẫn kiểu lỗi.
- **Bảo mật & dữ liệu**: Phân tích đường đi của dữ liệu, nguyên tắc vi phạm (tối thiểu hóa, mục đích, đồng ý, chuyển xuyên biên giới, ẩn danh). Hiểu ẩn danh ≠ che tên.
- **Trích dẫn pháp lý**: Tối thiểu 3 điều luật cụ thể, số điều/số khoản/số luật rõ ràng. Ưu tiên: Điều 4/8/22/26/30/37 Luật 91/2025; Điều 10/45/69 Luật KCB 15/2023; các điều liên quan Luật 134/2025; Nghị định 102/2025.
- **Xử trí thực tế**: Biện pháp 24 giờ và 30 ngày phải cụ thể (\"làm gì, ai làm, khi nào\"), bao phủ kỹ thuật + quy trình + đào tạo. Không chấp nhận \"nâng cao nhận thức\" chung chung.
- **Chuỗi báo cáo**: Chỉ rõ ai báo cho ai, mốc thời gian (Điều 23 Luật 91/2025 yêu cầu thông báo vi phạm trong 72 giờ). Có vai trò DPO, CNTT, Ban giám đốc, Sở Y tế khi cần.

**Grade 5**: Đạt 5/5, phân tích sắc bén, biện pháp áp dụng được ngay tại đơn vị.
**Grade 4**: Đạt 4/5, phân tích đúng nhưng biện pháp chưa đủ cụ thể hoặc thiếu một góc.
**Grade 3**: Đạt 3/5, xác định được các điểm chính nhưng thiếu chiều sâu pháp lý hoặc chuỗi báo cáo.
**Grade 2**: Đạt 2/5, có ý thức đúng nhưng không trích dẫn được điều luật cụ thể hoặc lẫn lộn vai trò các bên.
**Grade 1**: Không đạt, chỉ nói chung chung về đạo đức, không cơ sở pháp lý, hoặc lạc đề.`,
    minLength: 400,
    suggestedTimeMin: 35,
    tools: [
      {
        name: "Luật 91/2025/QH15 (BVDLCN)",
        url: "https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx",
        note: "Đọc Điều 4, 8, 22, 26, 30, 37 trước khi làm lab.",
        free: true,
      },
      {
        name: "Nghị định 102/2025/NĐ-CP (dữ liệu y tế)",
        url: "https://vanban.chinhphu.vn/?pageid=27160&docid=213607",
        note: "Quản lý dữ liệu y tế, Cơ sở dữ liệu quốc gia về y tế. Hiệu lực 1/7/2025.",
        free: true,
      },
      {
        name: "Luật Khám chữa bệnh 15/2023",
        url: "https://xaydungchinhsach.chinhphu.vn/toan-van-luat-15-2023-qh15-kham-benh-chua-benh-119231127164453959.htm",
        note: "Đọc Điều 10, 45 khoản 5, 69 về bảo mật bệnh án.",
        free: true,
      },
      {
        name: "Perplexity (Auto)",
        url: "https://www.perplexity.ai",
        note: "Miễn phí. Tra điều luật liên quan, không dán dữ liệu bệnh nhân thật.",
        free: true,
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com",
        note: "Miễn phí với tài khoản Google. Viết báo cáo pháp lý tiếng Việt tốt.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Draft và kiểm tra câu chữ. CHÚ Ý: không dán dữ liệu bệnh nhân thật — chính bài học của chương này.",
        free: true,
      },
    ],
  },
];

export function getLab(id: string): Lab | undefined {
  return LABS.find((l) => l.id === id);
}

export function getLabsForChapter(chapterSlug: string): Lab[] {
  return LABS.filter((l) => l.chapter === chapterSlug);
}
