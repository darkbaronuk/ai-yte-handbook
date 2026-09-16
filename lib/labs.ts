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
      "Bốn tình huống dưới đây rút từ thực tế bệnh viện Việt Nam trong hai năm 2025–2026. Mỗi case đan xen an toàn lâm sàng, bảo mật dữ liệu và tuân thủ pháp luật. **Chọn ít nhất một case phản ánh đúng bối cảnh của bạn nhất và trả lời đủ năm câu hỏi.** AI sẽ chấm tự động theo rubric 5 tiêu chí và lưu điểm vào sổ grading.\n\n**PHƯƠNG PHÁP LÀM BÀI 5 BƯỚC**\n\n**Bước 1 — Tra khung pháp lý (5–8 phút, dùng [Perplexity](https://www.perplexity.ai))**. Mở Perplexity, hỏi lần lượt: 'Điều 26 Luật 91/2025/QH15 quy định gì về dữ liệu sức khỏe?'; 'Điều 22 Luật 91/2025 về chuyển dữ liệu xuyên biên giới?'; 'Điều 45 khoản 5 Luật KCB 15/2023 về bí mật hồ sơ bệnh án?'; 'Luật 134/2025 phân loại rủi ro hệ thống AI thế nào?'. Perplexity trả về trích dẫn có link — copy đúng số điều/số khoản/tên luật, không paraphrase.\n\n**Bước 2 — Phân tích an toàn lâm sàng (5 phút, dùng [ChatGPT](https://chat.openai.com))**. Prompt mẫu: 'Trong tình huống [tóm tắt case 2–3 câu, KHÔNG dán thông tin định danh bệnh nhân], hãy phân tích: (a) bệnh nhân đối diện nguy cơ y khoa cụ thể gì; (b) AI đã mắc loại lỗi nào (ảo giác / thiên lệch / automation bias / sai ngữ cảnh / lạc hậu dữ liệu); (c) tại sao lỗi đó nguy hiểm với ca này. Trả lời bằng tiếng Việt chuyên môn y khoa, có căn cứ.' Đọc kỹ output, đối chiếu với kiến thức lâm sàng của bạn — không chép nguyên.\n\n**Bước 3 — Xác định đường đi của dữ liệu (5 phút, tự phân tích + Perplexity)**. Vẽ ra giấy hoặc trong đầu: dữ liệu bệnh nhân xuất phát từ đâu (HIS, PACS, bệnh án giấy), đi qua tay ai (điều dưỡng, bác sĩ, USB), đến đâu (server ChatGPT ở nước ngoài, trường đại học, chatbot bệnh viện). Với mỗi chặng, tự hỏi: có căn cứ pháp lý không? Có ẩn danh không? Có hợp đồng xử lý không? Có chuyển xuyên biên giới không?\n\n**Bước 4 — Viết biện pháp xử trí (10 phút, dùng [Gemini](https://gemini.google.com))**. Prompt mẫu: 'Với sự cố [tóm tắt case], liệt kê biện pháp xử trí theo hai mốc thời gian: (a) trong 24 giờ tới, ai làm gì, báo cho ai; (b) trong 30 ngày, ba biện pháp cụ thể bao phủ kỹ thuật + quy trình + đào tạo. Yêu cầu: mỗi biện pháp phải có tên người/vai trò chịu trách nhiệm, mốc thời gian rõ ràng. Không dùng cụm chung chung như \"nâng cao nhận thức\".' Gemini viết tiếng Việt hành chính khá tốt cho phần này.\n\n**Bước 5 — Tổng hợp và trình bày (10 phút, tự làm)**. Ghép 4 mảnh trên thành bài viết theo đúng 5 mục: An toàn lâm sàng → Bảo mật/dữ liệu → Pháp lý (≥3 trích dẫn điều luật cụ thể) → Xử trí 24h+30 ngày → Chuỗi báo cáo. Viết văn xuôi, không gạch đầu dòng. Dán vào ô nộp bài dưới. AI chấm sẽ trả kết quả trong 20–40 giây kèm gợi ý cải thiện cụ thể.\n\n**Lưu ý an toàn khi dùng AI công cộng ở bước 2–4**: KHÔNG dán thông tin định danh bệnh nhân thật (tên, mã bệnh án, số CCCD, số BHYT, ảnh, ngày sinh đầy đủ). Chỉ dùng dữ kiện mô tả — 'nữ 72 tuổi, suy thận nhẹ, dùng vancomycin' là đủ để AI phân tích.",
    question:
      "Chọn ít nhất MỘT trong bốn case dưới đây và trả lời đầy đủ 5 câu theo phương pháp 5 bước ở trên.\n\n═══ CASE 1 — Điều dưỡng hỏi ChatGPT về liều thuốc ═══\n\nĐiều dưỡng M tại khoa Hồi sức tích cực của bệnh viện tuyến tỉnh. Một bệnh nhân nữ 72 tuổi, 48 kg, creatinine 1,8 mg/dL được bác sĩ chỉ định vancomycin 1 g mỗi 12 giờ. Cuối ca trực, điều dưỡng thấy hơi nghi ngờ, paste vào ChatGPT bản miễn phí: \"Bệnh nhân nữ 72 tuổi, 48 kg, creatinine 1,8 mg/dL, dose vancomycin 1 g/12h có sao không?\". AI trả lời chắc chắn: \"Liều này an toàn cho bệnh nhân lớn tuổi, không cần điều chỉnh\". Điều dưỡng tiếp tục tiêm.\n\n*Gợi ý riêng case 1: tra thêm chuẩn tính liều vancomycin theo Cockcroft-Gault, khái niệm nồng độ đáy (trough). Về pháp lý, chú ý cả Điều 26 Luật 91/2025 (dữ liệu sức khỏe nhạy cảm) và Điều 22 (chuyển xuyên biên giới sang OpenAI Mỹ).*\n\n═══ CASE 2 — Bác sĩ tin AI đọc CT 'bình thường' ═══\n\nBệnh viện tuyến trung ương đang triển khai AI hỗ trợ đọc CT. Bác sĩ chẩn đoán hình ảnh X (5 năm kinh nghiệm) đọc phim CT ngực của một nam 58 tuổi, tiền sử hút thuốc 40 gói-năm, đi khám vì ho kéo dài. AI trả về \"không phát hiện bất thường\" với độ tự tin 94%. Bác sĩ X liếc qua phim, đồng ý, ký kết quả. Ba tháng sau, bệnh nhân quay lại vì khó thở, phát hiện ung thư phổi giai đoạn IIIB. Đọc lại CT cũ, có nốt 12 mm ở thùy trên bên trái mà cả AI lẫn bác sĩ đều bỏ sót.\n\n*Gợi ý riêng case 2: kiểu lỗi chính là automation bias — tra khái niệm này trên Perplexity. Về pháp lý, đây không phải sự cố bảo mật mà là sự cố y khoa; trách nhiệm chuyên môn cuối vẫn thuộc bác sĩ theo Luật KCB 15/2023, nhưng bệnh viện với tư cách deployer cũng liên đới theo Luật 134/2025.*\n\n═══ CASE 3 — Khoa huấn luyện mô hình AI da liễu ═══\n\nKhoa Da liễu một bệnh viện đa khoa xuất 2.000 hồ sơ bệnh nhân (ảnh lâm sàng, chẩn đoán, phác đồ) từ HIS nội bộ hợp tác với nhóm nghiên cứu ở trường đại học huấn luyện mô hình nhận diện tổn thương da. Việc che tên làm qua loa — xóa họ tên nhưng giữ mã bệnh án, ngày sinh chi tiết, trường hợp bệnh, ảnh khuôn mặt. Không xin đồng ý từng bệnh nhân vì 'dữ liệu cũ', không có hợp đồng xử lý dữ liệu với trường đại học, không làm đánh giá tác động. Phòng CNTT chỉ cấp USB copy dữ liệu cho trưởng khoa.\n\n*Gợi ý riêng case 3: đây là case vi phạm nặng nhất — tra thêm khái niệm k-anonymity, DPIA (đánh giá tác động bảo vệ dữ liệu), 'bên xử lý' vs 'bên kiểm soát' dữ liệu. Về pháp lý, ít nhất phải trích Điều 26, 30, 37 Luật 91/2025 và Điều 8 về mức phạt.*\n\n═══ CASE 4 — Chatbot bệnh viện khuyên ngưng thuốc chống đông ═══\n\nBệnh viện có chatbot trên website trả lời câu hỏi bệnh nhân bằng tiếng Việt. Một bệnh nhân đã đặt stent mạch vành, đang dùng aspirin + clopidogrel, hỏi chatbot: \"Tôi bị răng đau sắp nhổ, có cần ngưng thuốc chống đông không?\". Chatbot trả lời: \"Có, bạn nên ngưng aspirin và clopidogrel 5–7 ngày trước khi nhổ răng để tránh chảy máu\". Bệnh nhân làm theo, 3 ngày sau nhập cấp cứu vì nhồi máu cơ tim cấp, huyết khối trong stent.\n\n*Gợi ý riêng case 4: tra khuyến cáo của American Dental Association và AHA/ACC về DAPT trước thủ thuật nha khoa. Đây là chatbot ra quyết định tự động không có bác sĩ duyệt → nhóm rủi ro cao theo Luật 134/2025 → vi phạm nghĩa vụ giám sát của con người.*\n\n═══ NĂM CÂU HỎI PHẢI TRẢ LỜI ═══\n\n1. **An toàn lâm sàng**: Bệnh nhân bị nguy cơ gì? AI đã sai ở điểm nào (phân loại rủi ro, kiểu lỗi — ảo giác/thiên lệch/automation bias/sai ngữ cảnh)?\n2. **Bảo mật/dữ liệu**: Dữ liệu bệnh nhân đã đi đâu? Vi phạm nguyên tắc nào (ẩn danh, chuyển xuyên biên giới, mục đích, đồng ý)?\n3. **Pháp lý**: Trích tối thiểu 3 điều luật cụ thể (số điều, số khoản, số luật). Ai phải chịu — cá nhân, cơ sở y tế, nhà cung cấp AI?\n4. **Xử trí tại chỗ**: Trong 24 giờ, làm gì ngay? Trong 30 ngày, ba biện pháp cụ thể (kỹ thuật + quy trình + đào tạo)?\n5. **Ai báo cáo cho ai**: Chuỗi báo cáo cụ thể từ người phát hiện đến cơ quan quản lý nhà nước (nếu cần).\n\nYêu cầu: case 1 viết 400–600 từ; case 2–4 viết 500–700 từ. Tối thiểu 3 trích dẫn điều luật cụ thể. Văn xuôi liền mạch, không gạch đầu dòng.",
    rubric: `
- **An toàn lâm sàng**: Nhận diện đúng loại lỗi của AI (ảo giác, thiên lệch, automation bias, sai ngữ cảnh, lạc hậu dữ liệu) và nguy cơ cụ thể với bệnh nhân. Không nhầm lẫn kiểu lỗi.
- **Bảo mật & dữ liệu**: Phân tích đường đi của dữ liệu, nguyên tắc vi phạm (tối thiểu hóa, mục đích, đồng ý, chuyển xuyên biên giới, ẩn danh). Hiểu ẩn danh ≠ che tên.
- **Trích dẫn pháp lý**: Tối thiểu 3 điều luật cụ thể, số điều/số khoản/số luật rõ ràng. Ưu tiên: Điều 4/8/22/26/30/37 Luật 91/2025; Điều 10/45/69 Luật KCB 15/2023; Luật 134/2025; Nghị định 102/2025.
- **Xử trí thực tế**: Biện pháp 24 giờ và 30 ngày phải cụ thể (\"làm gì, ai làm, khi nào\"), bao phủ kỹ thuật + quy trình + đào tạo. Không chấp nhận \"nâng cao nhận thức\" chung chung.
- **Chuỗi báo cáo**: Chỉ rõ ai báo cho ai, mốc thời gian (Điều 23 Luật 91/2025 yêu cầu thông báo vi phạm trong 72 giờ). Có vai trò DPO, CNTT, Ban giám đốc, Sở Y tế khi cần.

**Grade 5**: Đạt 5/5, phân tích sắc bén, biện pháp áp dụng được ngay tại đơn vị.
**Grade 4**: Đạt 4/5, phân tích đúng nhưng biện pháp chưa đủ cụ thể.
**Grade 3**: Đạt 3/5, xác định được điểm chính nhưng thiếu chiều sâu pháp lý.
**Grade 2**: Đạt 2/5, có ý thức đúng nhưng không trích dẫn được điều luật cụ thể.
**Grade 1**: Không đạt, chỉ nói chung chung, không cơ sở pháp lý.`,
    minLength: 400,
    suggestedTimeMin: 35,
    tools: [
      {
        name: "Perplexity (Auto)",
        url: "https://www.perplexity.ai",
        note: "Bước 1: tra điều luật, kiểu lỗi AI. Miễn phí, có trích dẫn nguồn — copy đúng số điều/số luật.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Bước 2: phân tích an toàn lâm sàng. KHÔNG dán thông tin định danh bệnh nhân thật — chính bài học của chương.",
        free: true,
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com",
        note: "Bước 4: viết biện pháp xử trí. Miễn phí với tài khoản Google. Viết tiếng Việt hành chính tốt.",
        free: true,
      },
      {
        name: "Luật 91/2025/QH15 (BVDLCN)",
        url: "https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx",
        note: "Đọc Điều 4, 8, 22, 26, 30, 37 để tra chính xác.",
        free: true,
      },
      {
        name: "Luật 134/2025/QH15 (AI)",
        url: "https://vanban.chinhphu.vn/?pageid=27160&docid=216334",
        note: "Hiệu lực 1/3/2026. Đọc Điều 4 (nguyên tắc con người trong vòng lặp), Điều 13 (phân loại rủi ro).",
        free: true,
      },
      {
        name: "Nghị định 102/2025/NĐ-CP (dữ liệu y tế)",
        url: "https://vanban.chinhphu.vn/?pageid=27160&docid=213607",
        note: "Quản lý dữ liệu y tế, CSDL quốc gia. Hiệu lực 1/7/2025.",
        free: true,
      },
      {
        name: "Luật Khám chữa bệnh 15/2023",
        url: "https://xaydungchinhsach.chinhphu.vn/toan-van-luat-15-2023-qh15-kham-benh-chua-benh-119231127164453959.htm",
        note: "Đọc Điều 10, 45 khoản 5, 69 về bảo mật bệnh án và trách nhiệm chuyên môn.",
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
