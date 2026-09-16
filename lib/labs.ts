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
    title: "Lab 14 — Ba tình huống tuân thủ AI y tế",
    intro:
      "Chương 14 đưa ra khung pháp lý, ma trận tự kiểm 10 câu và bảy nguyên tắc thực hành khi dùng AI trong y tế. Lab này đưa bạn qua ba tình huống ở ba tầng khác nhau — cá nhân nhân viên y tế, bệnh viện triển khai hệ thống, và doanh nghiệp phát triển công nghệ. **Chọn một trong ba case và làm sâu**, hoặc trả lời cả ba nếu bạn muốn thử toàn bộ. AI sẽ chấm theo rubric chung.\n\n**Gợi ý làm bài chung**: (a) Trước khi viết, mở sẵn hai tab — [Luật 91/2025](https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx) và [Luật KCB 15/2023](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-15-2023-qh15-kham-benh-chua-benh-119231127164453959.htm). (b) Với mỗi vi phạm, viết theo công thức 'Điều X khoản Y Luật Z quy định [nội dung], hành vi [mô tả] vi phạm vì [lý do]'. (c) Biện pháp phải trả lời được câu 'ngày mai làm gì' — cụ thể, có người chịu trách nhiệm, có mốc thời gian.",
    question:
      "Chọn ít nhất MỘT trong ba case dưới đây và trả lời đầy đủ. Nếu làm cả ba, tách rõ ba phần trong bài viết.\n\n═══ CASE 1 — Cá nhân nhân viên y tế (300–500 từ) ═══\n\nBác sĩ A tại khoa Nội của bệnh viện tuyến tỉnh dán nguyên đoạn bệnh án của bệnh nhân N.V.T (65 tuổi, CCCD 03xx, chẩn đoán COPD giai đoạn 3, đợt cấp) vào bản miễn phí của ChatGPT để hỏi phác đồ điều trị. Output được bác sĩ dùng làm cơ sở thảo luận trong buổi giao ban. Bệnh nhân không biết.\n\nTrả lời: (1) Bác sĩ A đã vi phạm những điều luật cụ thể nào? Trích số điều, số luật. (2) Bệnh viện có trách nhiệm liên đới không, căn cứ vào điều nào? (3) Đề xuất ba biện pháp cụ thể (kỹ thuật + quy trình + đào tạo) để đơn vị bạn ngăn ngừa tình huống tương tự trong 30 ngày tới.\n\n**Gợi ý case 1**: Đọc kỹ Điều 26 (dữ liệu sức khỏe), Điều 30 (xử lý bằng AI), Điều 37 (nghĩa vụ bên kiểm soát) của Luật 91/2025 và Điều 45 khoản 5 Luật KCB. Về biện pháp, tham khảo cách các bệnh viện lớn đã làm — chặn URL LLM công cộng ở tầng proxy, ban hành quy chế nội bộ về dùng AI, tổ chức workshop phi danh hóa.\n\n═══ CASE 2 — Bệnh viện triển khai hệ thống AI (400–600 từ) ═══\n\nBệnh viện B (tuyến trung ương, 1200 giường) đang triển khai một hệ thống CDSS phân tầng nguy cơ tim mạch do một công ty Việt Nam phát triển. Hệ thống đọc dữ liệu từ EMR của bệnh viện, chạy mô hình trên máy chủ đặt tại AWS Singapore, và trả về khuyến nghị cho bác sĩ. Ban giám đốc muốn triển khai chính thức trong 3 tháng tới. Bạn là Trưởng phòng CNTT.\n\nTrả lời: (1) Hệ thống này thuộc mức rủi ro nào theo Luật 134/2025, và căn cứ ở đâu? (2) Liệt kê tối thiểu năm nghĩa vụ tuân thủ mà bệnh viện phải hoàn tất trước khi go-live (dữ liệu, hợp đồng, kỹ thuật, con người, quy trình). (3) Vấn đề chuyển dữ liệu xuyên biên giới (AWS Singapore) phải xử lý thế nào? Trích Điều 22 Luật 91/2025.\n\n**Gợi ý case 2**: Bắt đầu bằng câu hỏi 'CDSS có ảnh hưởng đến quyết định lâm sàng không?' — có, nên là rủi ro cao. Từ đó lần ra các nghĩa vụ tương ứng: hồ sơ kỹ thuật, đánh giá tác động, giám sát của con người, ghi log kiểm toán. Về xuyên biên giới, cần đánh giá tác động chuyển dữ liệu (DTIA) và có căn cứ pháp lý — hoặc thương lượng đưa máy chủ về Việt Nam. Xem thêm ma trận 10 câu tự kiểm ở cuối chương.\n\n═══ CASE 3 — Doanh nghiệp phát triển AI y tế (400–600 từ) ═══\n\nCông ty C là startup Việt Nam phát triển chatbot y tế cộng đồng dùng RAG trên tài liệu Bộ Y tế và các hướng dẫn lâm sàng của các bệnh viện đối tác. Công ty muốn thu thập câu hỏi và câu trả lời của người dùng để cải thiện mô hình, và có kế hoạch bán quyền truy cập cho các bệnh viện. Bạn là cố vấn pháp lý.\n\nTrả lời: (1) Việc dùng câu hỏi người dùng để huấn luyện lại mô hình có được phép không? Điều kiện gì? Trích điều luật. (2) Với các tài liệu lâm sàng của bệnh viện đối tác, hợp đồng phải có tối thiểu những điều khoản gì? (3) Nếu chatbot đưa ra khuyến nghị sai gây hậu quả cho bệnh nhân, ai chịu trách nhiệm — startup, bệnh viện tích hợp chatbot, hay người dùng cuối? Phân tích ba khả năng.\n\n**Gợi ý case 3**: Về (1), quan trọng là loại dữ liệu — nếu câu hỏi có PII sức khỏe thì là dữ liệu nhạy cảm, cần đồng ý riêng cho mục đích huấn luyện AI (Điều 26 Luật 91/2025). Về (2), tối thiểu phải có DPA theo Điều 37, ghi rõ mục đích, phạm vi, thời hạn, quyền của chủ thể dữ liệu, cơ chế thông báo vi phạm. Về (3), phân định trách nhiệm dựa trên vai trò — bên kiểm soát dữ liệu, bên xử lý, người triển khai cuối; kết hợp Điều 8 Luật 91/2025 và các quy định về trách nhiệm dân sự.",
    rubric: `
- **Xác định vi phạm/nghĩa vụ**: Chỉ ra chính xác các điều luật cụ thể (số điều, số khoản, số luật). Ở case 1 tối thiểu 3 điều; case 2 và 3 tối thiểu 4 điều/khoản. Không suy diễn, không trích dẫn chung chung.
- **Phân tích trách nhiệm và rủi ro**: Phân biệt rõ vai trò các bên (cá nhân — tổ chức, bên kiểm soát — bên xử lý, nhà phát triển — nhà triển khai). Nêu được hình phạt hoặc rủi ro pháp lý cụ thể theo Điều 8 Luật 91/2025 khi phù hợp.
- **Biện pháp/nghĩa vụ cụ thể**: Đề xuất phải cụ thể ('làm gì, ai làm, khi nào'), bao phủ nhiều mảng khác nhau (kỹ thuật + quy trình + đào tạo + hợp đồng). Không chấp nhận đề xuất kiểu 'nâng cao nhận thức' chung chung.
- **Trích dẫn**: Tối thiểu 3 trích dẫn điều luật cụ thể trong bài. Ưu tiên các điều 4, 8, 22, 26, 30, 37 Luật 91/2025; Điều 10, 45, 69 Luật KCB 15/2023; các điều liên quan Luật 134/2025.
- **Văn phong**: Súc tích, đúng phong cách báo cáo pháp lý hoặc báo cáo nội bộ chuyên nghiệp. Không cảm xúc, không đạo lý hóa. Trình bày rõ theo cấu trúc câu hỏi.

**Grade 5**: Đạt 5/5, phân tích sắc bén, có góc nhìn thực tiễn, biện pháp/nghĩa vụ áp dụng được ngay tại đơn vị.
**Grade 4**: Đạt 4/5, phân tích đúng nhưng biện pháp chưa đủ cụ thể hoặc thiếu một khía cạnh.
**Grade 3**: Đạt 3/5, xác định được các điểm chính nhưng thiếu chiều sâu phân tích hoặc trích dẫn.
**Grade 2**: Đạt 2/5, có ý thức pháp lý nhưng không trích dẫn được điều luật cụ thể hoặc lẫn lộn vai trò các bên.
**Grade 1**: Không đạt, chỉ nói chung chung về đạo đức, không có cơ sở pháp lý, hoặc lạc đề.`,
    minLength: 600,
    suggestedTimeMin: 35,
    tools: [
      {
        name: "Luật 91/2025/QH15 (bản EN có VN)",
        url: "https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx",
        note: "Bản toàn văn Luật Bảo vệ dữ liệu cá nhân. Đọc Điều 4, 8, 26, 30, 37 trước khi làm lab.",
        free: true,
      },
      {
        name: "Luật Khám chữa bệnh 15/2023",
        url: "https://xaydungchinhsach.chinhphu.vn/toan-van-luat-15-2023-qh15-kham-benh-chua-benh-119231127164453959.htm",
        note: "Toàn văn Luật KCB. Đọc Điều 10, 45 khoản 5, 69 về bảo mật bệnh án.",
        free: true,
      },
      {
        name: "Perplexity (Auto)",
        url: "https://www.perplexity.ai",
        note: "Miễn phí. Dùng để tra điều luật liên quan, không dán dữ liệu bệnh nhân thật.",
        free: true,
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com",
        note: "Miễn phí với tài khoản Google. Viết báo cáo phân tích pháp lý bằng tiếng Việt tốt.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Draft và kiểm tra câu chữ. CHÚ Ý: không dán dữ liệu bệnh nhân thật vào — chính bài học của chương này.",
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
