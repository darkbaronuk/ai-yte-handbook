// Định nghĩa Lab — câu hỏi + rubric cho mỗi chương.
// Thêm Lab mới bằng cách push vào array này.
import { LAB14 } from "./lab14";

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
    id: "lab-04",
    chapter: "04-nen-tang-ai-da-nhiem",
    title: "Lab 4 — Chọn và làm chủ trợ lý AI của bạn",
    intro:
      "Chương 4 cho bạn bản đồ 6 nhóm nền tảng AI đa nhiệm và 10 tiêu chí chọn lựa. Trong lab này, bạn dùng chính các nền tảng đó để hoàn thành một báo cáo ngắn về ứng dụng AI trong quản lý tăng huyết áp ở tuyến cơ sở — có kiểm chứng nguồn, ghi nhận phần AI hỗ trợ, và tuân thủ tuyệt đối nguyên tắc không nhập dữ liệu định danh người bệnh thật.",
    question:
      "Chọn 1 trong 4 mức và hoàn thành nhiệm vụ tương ứng với chủ đề 'Ứng dụng AI trong quản lý tăng huyết áp ở tuyến cơ sở' (dùng bộ số liệu mô phỏng 200 người bệnh do lab cung cấp — không phải dữ liệu thật):\n\n**L0 — Làm quen (15 phút):** Dùng 1 nền tảng miễn phí trả lời 3 câu hỏi: (1) mục tiêu điều trị tăng huyết áp theo guideline hiện hành là gì, (2) vai trò của tuyến cơ sở, (3) AI có thể hỗ trợ khâu nào. Liệt kê nguồn của từng câu trả lời.\n\n**L1 — Khung báo cáo (30 phút):** Dùng AI lập dàn ý báo cáo 5 mục + viết nháp 1 mục 'đặt vấn đề' (~300 chữ), có ghi nguồn.\n\n**L2 — Báo cáo hoàn chỉnh (60 phút):** Báo cáo ~1.200 chữ gồm: đặt vấn đề, phân tích bộ số liệu mô phỏng, 3 đề xuất ứng dụng AI khả thi ở tuyến cơ sở, giới hạn và kiểm chứng. Tự đánh giá bằng checklist an toàn (chương 4, phần 6) trước khi nộp.\n\n**L3 — Báo cáo + kế hoạch (90 phút):** Như L2, cộng thêm kế hoạch triển khai 1 đề xuất tại đơn vị mình (ai làm, làm gì, kiểm chứng thế nào, dừng khi nào) + 1 đoạn phản biện: 'đề xuất này có thể sai ở đâu'.\n\nMọi mức đều phải kèm: (1) tên nền tảng đã dùng và lý do chọn (1–2 câu, theo 10 tiêu chí); (2) danh sách nguồn đã tự kiểm chứng (ít nhất 1 nguồn gốc); (3) dòng ghi nhận 'Phần nào của bài có sự hỗ trợ của AI'. Thiếu dữ kiện thì ghi 'chưa rõ' và đề xuất cách xác minh — tuyệt đối không bịa thêm, không nhập dữ liệu định danh người bệnh thật vào công cụ AI công cộng.",
    rubric: `
- **Hiểu đúng yêu cầu**: Đúng mức đã chọn, đủ các phần bắt buộc của mức đó. Không lạc đề sang nội dung khác.
- **Lập luận và phân tích**: Có mạch lập luận rõ ràng; số liệu mô phỏng được dùng đúng chỗ, không liệt kê rời rạc.
- **Dùng AI đúng cách**: Nêu được lý do chọn nền tảng theo tiêu chí; có kiểm chứng ít nhất 1 nguồn gốc; ghi nhận phần AI hỗ trợ.
- **An toàn và tuân thủ**: Không nhập dữ liệu định danh; có ghi nhãn nội dung AI tạo ra; nêu được giới hạn của chính bài mình.
- **Trình bày và hành động**: Rõ ràng, có đề xuất cụ thể, khả thi (L2–L3 có người chịu trách nhiệm và điểm dừng).

**Grade 5**: Đạt 5/5 tiêu chí, có nhận định sắc sảo, đề xuất dùng được ngay.
**Grade 4**: Đạt 4/5, có chiều sâu nhưng thiếu một ý.
**Grade 3**: Đạt 3/5, đúng hướng nhưng thiếu bằng chứng kiểm chứng hoặc ghi nhận AI.
**Grade 2**: Đạt 2/5, phó mặc cho AI, thiếu kiểm chứng hoặc sai mức yêu cầu.
**Grade 1**: Không đạt — vi phạm nguyên tắc an toàn dữ liệu, hoặc lạc đề.`,
    minLength: 300,
    suggestedTimeMin: 60,
    tools: [
      {
        name: "Perplexity (miễn phí)",
        url: "https://www.perplexity.ai",
        note: "Mạnh về tra cứu có trích dẫn nguồn. Dùng cho bước thu thập tài liệu và kiểm chứng guideline.",
        free: true,
      },
      {
        name: "Claude (bản miễn phí)",
        url: "https://claude.ai",
        note: "Mạnh về soạn thảo văn bản dài tiếng Việt. Dùng cho bước lập dàn ý và viết báo cáo.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Trợ lý đa năng. Dùng để kiểm tra chéo kết quả với nền tảng khác.",
        free: true,
      },
      {
        name: "Workshop 'Ứng dụng AI cho Nhân viên Y tế' (BS Trương Công Hậu)",
        url: "https://www.youtube.com/watch?v=m7UQsjKj3xE",
        note: "Video tiếng Việt: phân loại công cụ, xử lý hallucination, kỹ thuật prompt cho nhân viên y tế. Xem trước khi làm bài.",
        free: true,
      },
    ],
  },

  {
      id: "lab-05",
      chapter: "05-ai-chan-doan-hinh-anh",
      title: "Lab 5 — Đọc X-quang phổi cùng AI",
      intro:
        "Chương 5 cho bạn kiến trúc PACS+AI và 4 chỉ số đánh giá (sensitivity, specificity, PPV, NPV). Trong lab này, bạn đóng vai bác sĩ đọc phim: dùng AI đọc thử 10 ảnh X-quang phổi mẫu từ bộ dữ liệu công khai VinDr-CXR, xem heatmap, đối chiếu với đáp án chuẩn, và viết báo cáo về 3 ca khó nhất — đúng quy trình 'AI gợi ý, bác sĩ quyết định'.",
      question:
        "Tải 10 ảnh X-quang phổi mẫu từ bộ dữ liệu công khai VinDr-CXR (link trong mục Công cụ). Dùng một công cụ AI đọc ảnh miễn phí (bản demo web của nhà cung cấp, hoặc mô hình mở) để phân tích từng ảnh: ghi lại các bất thường AI phát hiện, điểm số nghi ngờ, và mô tả heatmap. Sau đó đối chiếu với nhãn chuẩn (ground truth) đi kèm bộ dữ liệu.\n\nChọn 3 ca KHÓ nhất (AI sai, AI và bạn bất đồng, hoặc ca ranh giới) và viết báo cáo gồm: (1) mô tả ảnh và phát hiện của AI; (2) đáp án chuẩn và phân tích vì sao AI đúng/sai ở ca này; (3) với mỗi ca, nêu rõ bạn — trong vai trò bác sĩ ký báo cáo — sẽ kết luận gì và quyết định tiếp theo cho người bệnh (theo dõi, chụp thêm, chuyển tuyến); (4) tính sensitivity/specificity của AI trên 10 ca mẫu và nhận xét: với kết quả này, bạn có dám dùng AI này để sàng lọc không, vì sao.\n\nTuyệt đối không dùng ảnh bệnh nhân thật của đơn vị bạn — chỉ dùng ảnh từ bộ dữ liệu công khai đã khử định danh.",
      rubric: `
  - **Hiểu đúng yêu cầu**: Đủ 10 ca được phân tích, đúng 3 ca khó được chọn và báo cáo đầy đủ 4 phần. Không thiếu phần.
  - **Phân tích hình ảnh**: Mô tả phát hiện của AI chính xác (loại bất thường, vị trí, điểm số); phân tích được vì sao AI đúng/sai dựa trên đặc điểm ảnh, không đoán mò.
  - **Tư duy lâm sàng**: Kết luận và quyết định tiếp theo cho từng ca hợp lý, thể hiện rõ vai trò bác sĩ quyết định cuối — không phó mặc cho AI.
  - **Đánh giá định lượng**: Tính đúng sensitivity/specificity trên 10 ca; nhận xét về khả năng dùng sàng lọc có căn cứ vào số liệu, hiểu được đánh đổi giữa hai chỉ số.
  - **An toàn và tuân thủ**: Chỉ dùng dữ liệu công khai; nêu được giới hạn của bài đánh giá mini này (mẫu nhỏ, không thay thế đánh giá lâm sàng đầy đủ).

  **Grade 5**: Đạt 5/5 tiêu chí, phân tích ca khó sắc sảo, kết luận lâm sàng thuyết phục.
  **Grade 4**: Đạt 4/5, phân tích tốt nhưng thiếu sâu ở 1 tiêu chí.
  **Grade 3**: Đạt 3/5, hoàn thành đủ phần nhưng phân tích còn nông hoặc tính sai chỉ số.
  **Grade 2**: Đạt 2/5, thiếu nhiều phần hoặc phó mặc kết luận cho AI.
  **Grade 1**: Không đạt — dùng dữ liệu thật, hoặc không thể hiện hiểu vai trò bác sĩ quyết định.`,
      minLength: 600,
      suggestedTimeMin: 90,
      tools: [
        {
          name: "VinDr-CXR (bộ dữ liệu X-quang ngực mở)",
          url: "https://github.com/vinbigdata-medical/vindr-cxr",
          note: "18.000 ảnh X-quang ngực có gán nhãn của Việt Nam, đã khử định danh. Tải 10 ảnh mẫu kèm nhãn chuẩn.",
          free: true,
        },
        {
          name: "Qure.ai — qXR (bản demo)",
          url: "https://www.qure.ai",
          note: "Đăng ký dùng thử demo đọc X-quang phổi. Chỉ upload ảnh từ bộ dữ liệu công khai.",
          free: true,
        },
        {
          name: "Lunit INSIGHT (thông tin sản phẩm)",
          url: "https://www.lunit.io",
          note: "Tham khảo cách sản phẩm thương mại trình bày heatmap và điểm số để đối chiếu.",
          free: true,
        },
      ],
    },

  {
      id: "lab-06",
      chapter: "06-cdss",
      title: "Lab 6 — Xây CDSS rule cho tăng huyết áp",
      intro:
        "Chương 6 cho bạn 3 kiến trúc CDSS và bài toán alert fatigue. Trong lab này, bạn đóng vai người thiết kế: xây một cây quyết định (decision tree) rule-based hỗ trợ điều trị tăng huyết áp theo hướng dẫn của Bộ Y tế, chạy thử trên sandbox với 20 ca bệnh, và tự đánh giá xem hệ thống của mình có 'đáng dùng' không.",
      question:
        "Xây dựng một CDSS rule-based hỗ trợ điều trị tăng huyết áp cho tuyến cơ sở, gồm tối thiểu 8 luật if-then bao phủ: (1) phân loại mức huyết áp và chẩn đoán; (2) chọn thuốc khởi trị theo bệnh kèm theo (đái tháo đường, bệnh thận mạn, suy tim, người cao tuổi); (3) ngưỡng phối hợp thuốc; (4) ngưỡng chuyển tuyến; (5) lịch tái khám và xét nghiệm theo dõi; (6) ít nhất 2 cảnh báo an toàn (tương tác thuốc, chống chỉ định).\n\nTrình bày dưới dạng decision tree (sơ đồ hoặc bảng luật có đánh số), mỗi luật ghi rõ: điều kiện kích hoạt, hành động gợi ý, nguồn guideline (tên hướng dẫn Bộ Y tế/quốc tế), và mức cảnh báo (ngắt quãng / hiển thị nhẹ — áp dụng bài học alert fatigue từ chương 6).\n\nSau đó TEST hệ thống của bạn với 20 ca bệnh (tự xây dựng 20 ca đa dạng: các mức huyết áp, bệnh kèm theo khác nhau, ít nhất 3 ca 'bẫy' có chống chỉ định hoặc tương tác): với mỗi ca, ghi lại CDSS gợi ý gì, gợi ý đó đúng/sai theo guideline, và bạn — trong vai trò bác sĩ — có làm theo không, vì sao.\n\nKết luận: tính tỷ lệ gợi ý đúng trên 20 ca; nêu 2 điểm yếu nhất của hệ thống bạn vừa xây và cách khắc phục; nêu rõ ai chịu trách nhiệm nếu CDSS gợi ý sai trong thực tế.",
      rubric: `
  - **Hiểu đúng yêu cầu**: Đủ 8 luật bao phủ 6 nhóm nội dung; decision tree trình bày rõ ràng; test đủ 20 ca gồm 3 ca bẫy.
  - **Đúng chuyên môn**: Các luật phù hợp với hướng dẫn điều trị tăng huyết áp (Bộ Y tế/WHO/ISH); phân biệt đúng thuốc ưu tiên theo bệnh kèm theo; cảnh báo an toàn có căn cứ.
  - **Thiết kế chống alert fatigue**: Phân tầng cảnh báo hợp lý (ngắt quãng chỉ cho nguy cơ cao); mỗi luật có nguồn trích dẫn; không lạm dụng cảnh báo.
  - **Tư duy đánh giá**: Test 20 ca trung thực (ghi cả ca sai); tính đúng tỷ lệ; nhận diện được điểm yếu của chính hệ thống mình xây.
  - **Trách nhiệm**: Nêu rõ human-in-the-loop và trách nhiệm pháp lý khi CDSS sai; không phó mặc quyết định cho máy.

  **Grade 5**: Đạt 5/5 tiêu chí, luật chuẩn guideline, test trung thực, phân tích điểm yếu sâu sắc.
  **Grade 4**: Đạt 4/5, tốt nhưng thiếu sâu ở 1 tiêu chí (ví dụ phân tầng cảnh báo chưa rõ).
  **Grade 3**: Đạt 3/5, đủ luật và đủ ca test nhưng có lỗi chuyên môn nhỏ hoặc đánh giá hời hợt.
  **Grade 2**: Đạt 2/5, thiếu nhiều luật hoặc test qua loa, chưa thể hiện tư duy an toàn.
  **Grade 1**: Không đạt — luật sai guideline nghiêm trọng, hoặc cho phép CDSS tự động quyết định thay bác sĩ.`,
      minLength: 600,
      suggestedTimeMin: 90,
      tools: [
        {
          name: "Hướng dẫn chẩn đoán và điều trị tăng huyết áp (Bộ Y tế)",
          url: "https://kcb.vn",
          note: "Cổng thông tin Cục Quản lý Khám chữa bệnh — tra cứu văn bản hướng dẫn chuyên môn còn hiệu lực.",
          free: true,
        },
        {
          name: "Trợ lý AI đa nhiệm (Claude/ChatGPT/Gemini)",
          url: "https://claude.ai",
          note: "Dùng để phác thảo decision tree và sinh 20 ca test — nhưng mọi luật phải được bạn đối chiếu lại với guideline gốc.",
          free: true,
        },
      ],
    },

  {
      id: "lab-07",
      chapter: "07-cham-soc-ban-dau",
      title: "Lab 7 — Thiết kế chatbot tư vấn triệu chứng cho trạm y tế xã",
      intro:
        "Chương 7 cho bạn kiến trúc 3 lớp của chatbot y tế (LLM + RAG + cây phân loại an toàn) và ranh giới đỏ 'chatbot không tự chẩn đoán'. Trong lab này, bạn đóng vai người thiết kế: viết system prompt tiếng Việt cho chatbot trạm y tế xã, test với 30 kịch bản — trong đó có các ca bẫy an toàn — và chứng minh chatbot của bạn không vượt ranh giới.",
      question:
        "Thiết kế system prompt tiếng Việt cho một chatbot tư vấn triệu chứng phục vụ trạm y tế xã, bao gồm: (1) vai trò và phạm vi (tư vấn ban đầu, phân loại mức độ, KHÔNG chẩn đoán, KHÔNG kê đơn); (2) disclaimer bắt buộc hiển thị đầu hội thoại; (3) quy tắc 'cửa thoát khẩn cấp' — danh sách dấu hiệu nguy hiểm phải chuyển cấp cứu ngay; (4) yêu cầu trích nguồn từ tài liệu đã kiểm duyệt (ghi rõ chatbot chỉ được trả lời dựa trên nguồn nào); (5) giọng điệu phù hợp người dân nông thôn, câu ngắn, dễ hiểu; (6) quy tắc khi không chắc chắn (nói 'tôi không chắc' và hướng dẫn gặp nhân viên y tế, thay vì đoán).\n\nSau đó TEST chatbot của bạn (dùng system prompt này với một LLM bất kỳ) trên 30 kịch bản: 10 ca nhẹ (cảm cúm, đau đầu thông thường...), 10 ca trung bình (sốt kéo dài, đau bụng...), 5 ca nặng (đau ngực, khó thở, dấu hiệu đột quỵ...), và 5 ca BẪY AN TOÀN: (a) người dùng ép chatbot chẩn đoán xác định; (b) người dùng xin đơn thuốc cụ thể; (c) triệu chứng mơ hồ có thể là cấp cứu (ví dụ 'hơi mệt' ở người cao tuổi kèm vã mồ hôi); (d) trẻ vị thành niên hỏi về sức khỏe sinh sản; (e) người dùng nói tiếng Việt không chuẩn/dân gian.\n\nVới mỗi kịch bản, ghi lại: chatbot phản hồi gì, có vi phạm ranh giới nào không (chẩn đoán? kê đơn? thiếu disclaimer? bỏ sót dấu hiệu nguy hiểm?), và bạn sửa system prompt thế nào để khắc phục. Kết luận: chatbot của bạn đã sẵn sàng cho người dân dùng chưa, còn thiếu gì.",
      rubric: `
  - **Hiểu đúng yêu cầu**: System prompt đủ 6 thành phần; test đủ 30 kịch bản gồm 5 ca bẫy an toàn; mỗi kịch bản có ghi nhận và phân tích.
  - **An toàn là trên hết**: 5 ca nặng đều được chuyển cấp cứu đúng; 5 ca bẫy đều được xử lý đúng (từ chối chẩn đoán/kê đơn, có disclaimer, nhận diện dấu hiệu nguy hiểm ẩn).
  - **Đúng chuyên môn**: Phân loại 10 ca nhẹ/trung bình hợp lý theo y văn; nguồn trích dẫn rõ ràng; không có nội dung tư vấn sai y khoa.
  - **Thiết kế prompt tốt**: System prompt bằng tiếng Việt rõ ràng, có cấu trúc, bao quát các tình huống; các bản sửa sau test cụ thể và có lý do.
  - **Trung thực và trách nhiệm**: Ghi nhận cả ca chatbot sai/thiếu; kết luận đánh giá mức độ sẵn sàng trung thực, nêu rõ giới hạn và bước tiếp theo trước khi dùng thật.

  **Grade 5**: Đạt 5/5 tiêu chí, xử lý hoàn hảo 5 ca bẫy, system prompt chuyên nghiệp, đánh giá trung thực.
  **Grade 4**: Đạt 4/5, tốt nhưng còn 1 lỗi nhỏ ở ca bẫy hoặc prompt chưa bao quát hết.
  **Grade 3**: Đạt 3/5, đủ thành phần nhưng có 1-2 ca an toàn xử lý chưa đúng hoặc phân loại thiếu chính xác.
  **Grade 2**: Đạt 2/5, chatbot vượt ranh giới (chẩn đoán/kê đơn) ở nhiều ca mà không nhận ra, hoặc thiếu disclaimer.
  **Grade 1**: Không đạt — chatbot chẩn đoán/kê đơn tự do, bỏ sót dấu hiệu nguy hiểm, hoặc không thể hiện hiểu biết về an toàn.`,
      minLength: 800,
      suggestedTimeMin: 120,
      tools: [
        {
          name: "Trợ lý AI đa nhiệm (Claude/ChatGPT/Gemini)",
          url: "https://claude.ai",
          note: "Dán system prompt của bạn vào và test 30 kịch bản. Ghi lại nguyên văn phản hồi để phân tích.",
          free: true,
        },
        {
          name: "Cổng thông tin Cục Quản lý Khám chữa bệnh (Bộ Y tế)",
          url: "https://kcb.vn",
          note: "Tra cứu văn bản hướng dẫn chuyên môn còn hiệu lực làm nguồn kiểm duyệt cho chatbot.",
          free: true,
        },
      ],
    },

  {
    id: "lab-08",
    chapter: "08-quan-tri-benh-vien",
    title: "Lab 8 — Nghe, sinh SOAP note và ký duyệt như bác sĩ",
    intro:
      "Chương 8 cho thấy ambient scribe biến buổi khám thành hồ sơ như thế nào — và vì sao bác sĩ luôn là người ký duyệt cuối cùng. Trong lab này, bạn đóng vai bác sĩ kiểm duyệt: nghe các đoạn audio khám bệnh mẫu (đã ẩn danh, dữ liệu mô phỏng), dùng AI sinh ghi chú SOAP nháp, rồi tự chỉnh sửa và 'ký duyệt' như quy trình thật.",
    question:
      "Hoàn thành 3 bước với 5 đoạn audio khám bệnh mẫu (ẩn danh, mô phỏng) do lab cung cấp:\n\n**Bước 1 — Nghe và ghi nhận (L0):** Nghe 5 đoạn audio, với mỗi đoạn liệt kê 3 thông tin lâm sàng chính bạn nghe được (triệu chứng, dấu hiệu, kế hoạch). Không dùng AI ở bước này — đây là 'đáp án' của chính bạn.\n\n**Bước 2 — Sinh SOAP note bằng AI (L1–L2):** Đưa bản ghi chữ (transcript) của 5 đoạn audio vào một công cụ AI, yêu cầu soạn ghi chú theo mẫu SOAP cho từng ca. So sánh với ghi nhận ở bước 1: đánh dấu những chỗ AI viết đúng, viết thiếu, và viết sai/bịa thêm (nếu có).\n\n**Bước 3 — Ký duyệt (L2–L3):** Chọn 2 ca, hoàn thiện bản SOAP cuối cùng như thể bạn là bác sĩ ký duyệt: sửa mọi lỗi, bổ sung chỗ thiếu, xóa chỗ bịa. Viết thêm 1 đoạn 150–200 từ: trong 5 ca này, lỗi nào của AI là nguy hiểm nhất nếu bạn 'ký mù', và quy trình nào ở đơn vị bạn sẽ ngăn được lỗi đó?\n\nTuyệt đối không dùng dữ liệu bệnh nhân thật trong toàn bộ lab này.",
    rubric: `
  - **Nghe đúng**: Ghi nhận ở bước 1 đầy đủ 3 thông tin/ca, chính xác so với audio mẫu.
  - **So sánh sắc**: Chỉ ra cụ thể chỗ AI đúng/thiếu/sai cho từng ca, có dẫn chứng (trích câu).
  - **Ký duyệt chuẩn**: 2 bản SOAP cuối hoàn chỉnh, không còn lỗi, đúng mẫu SOAP, văn phong hồ sơ.
  - **Tư duy an toàn**: Đoạn phản biện nêu được lỗi nguy hiểm nhất và cơ chế ngăn chặn khả thi ở đơn vị thật.
  - **Trình bày**: Rõ ràng, có cấu trúc, đúng chính tả y khoa.

  **Grade 5**: Đạt 5/5, phát hiện được lỗi bịa đặt tinh vi của AI (nếu có) và đề xuất quy trình ký duyệt dùng được ngay.
  **Grade 4**: Đạt 4/5, so sánh tốt nhưng phản biện chưa sâu.
  **Grade 3**: Đạt 3/5, hoàn thành đủ bước nhưng so sánh chung chung.
  **Grade 2**: Đạt 2/5, thiếu bước hoặc ký duyệt còn lỗi sót.
  **Grade 1**: Không đạt — bỏ qua bước kiểm duyệt hoặc dùng dữ liệu thật.`,
    minLength: 400,
    suggestedTimeMin: 60,
    tools: [
      {
        name: "Claude (bản miễn phí)",
        url: "https://claude.ai",
        note: "Soạn SOAP note từ transcript. Tiếng Việt tốt, văn phong hồ sơ chuẩn.",
        free: true,
      },
      {
        name: "ChatGPT (bản miễn phí)",
        url: "https://chat.openai.com",
        note: "Dùng để kiểm tra chéo: cùng một transcript, so sánh 2 công cụ viết khác nhau thế nào.",
        free: true,
      },
      {
        name: "Perplexity (miễn phí)",
        url: "https://www.perplexity.ai",
        note: "Tra cứu mẫu SOAP chuẩn và quy định ghi chép hồ sơ bệnh án khi cần đối chiếu.",
        free: true,
      },
    ],
  },

  {
    id: "lab-09",
    chapter: "09-agentic-ai",
    title: "Lab 9 — Xây agent kiểm tra hồ sơ BHYT trên sandbox",
    intro:
      "Chương 9 trình bày 8 use case Agentic AI cho y tế Việt Nam — lab này cho bạn tự tay ghép một agent kiểm tra hồ sơ BHYT trên sandbox low-code (không cần lập trình). Bạn sẽ nối các 'công cụ' có sẵn thành một quy trình nhiều bước, chạy thử với 10 hồ sơ giả lập, rồi thiết kế rào chắn và điểm dừng cho người duyệt.",
    question:
      "Hoàn thành 4 nhiệm vụ trên sandbox low-code do lab cung cấp (kéo-thả, không cần code). Toàn bộ dữ liệu là hồ sơ GIẢ LẬP — tuyệt đối không dùng hồ sơ bệnh nhân thật.\n\n**Nhiệm vụ 1 — Ghép tool thành agent (L0–L1):** Nối 4 công cụ có sẵn thành một chuỗi: FHIR reader (đọc hồ sơ) → ICD-10 coder (gợi ý mã bệnh) → policy checker (đối chiếu quy định BHYT) → denial handler (phân loại đạt/cần xem lại/từ chối đề xuất). Vẽ sơ đồ luồng và giải thích mỗi tool nhận đầu vào gì, trả đầu ra gì.\n\n**Nhiệm vụ 2 — Chạy thử 10 hồ sơ (L1–L2):** Cho agent chạy với 10 hồ sơ giả lập. Ghi lại: mấy hồ sơ 'đạt', mấy hồ sơ 'cần xem lại', mấy hồ sơ 'từ chối đề xuất' — và với mỗi hồ sơ có vấn đề, lý do cụ thể agent đưa ra là gì.\n\n**Nhiệm vụ 3 — Bẫy lỗi (L2):** Trong 10 hồ sơ có 2 hồ sơ được cài 'bẫy' (ví dụ: tool đọc sai mã, dữ liệu thiếu trường bắt buộc). Mô tả agent của bạn xử lý 2 ca này ra sao: có phát hiện được không? Nếu agent 'đoán' thay vì báo lỗi, bạn sửa thiết kế thế nào?\n\n**Nhiệm vụ 4 — Thiết kế kiểm soát (L3):** Viết bản thiết kế 300–400 từ cho phiên bản production: (a) human-in-the-loop đặt ở những điểm nào, (b) audit log ghi những gì, (c) fallback khi từng tool thất bại, (d) 3 chỉ số đánh giá (task success rate, thời gian, chi phí token) với ngưỡng đạt.",
    rubric: `
  - **Kiến trúc đúng**: Sơ đồ 4 tool nối đúng thứ tự, đầu vào/đầu ra mỗi tool mô tả chính xác.
  - **Chạy thử thật**: Kết quả 10 hồ sơ được ghi đầy đủ, phân loại có lý do cụ thể, không chung chung.
  - **Bẫy lỗi**: Phát hiện được ít nhất 1/2 bẫy, đề xuất sửa thiết kế khả thi (dừng-báo thay vì đoán).
  - **Kiểm soát production**: Đủ 4 mục (HITL, audit log, fallback, chỉ số + ngưỡng), khả thi với bệnh viện thật.
  - **Trình bày**: Rõ ràng, thuật ngữ chương 9 dùng đúng (tool calling, guardrail, HITL).

  **Grade 5**: Đạt 5/5, phát hiện cả 2 bẫy và bản thiết kế production đủ chi tiết để đội CNTT hiểu được.
  **Grade 4**: Đạt 4/5, phát hiện 1 bẫy, thiết kế tốt nhưng thiếu ngưỡng chỉ số.
  **Grade 3**: Đạt 3/5, chạy đủ 10 hồ sơ nhưng phân tích bẫy lỗi sơ sài.
  **Grade 2**: Đạt 2/5, sơ đồ thiếu tool hoặc kết quả test không đầy đủ.
  **Grade 1**: Không đạt — không phân biệt được agent với chatbot, hoặc dùng dữ liệu thật.`,
    minLength: 500,
    suggestedTimeMin: 75,
    tools: [
      {
        name: "Sandbox low-code của lab",
        url: "/lab/lab-09",
        note: "Môi trường kéo-thả ghép tool + 10 hồ sơ giả lập, do lab cung cấp trong tab lab.",
        free: true,
      },
      {
        name: "Tài liệu MCP (Anthropic)",
        url: "https://modelcontextprotocol.io",
        note: "Hiểu chuẩn kết nối công cụ mà agent dùng — đọc phần giới thiệu là đủ.",
        free: true,
      },
      {
        name: "Tài liệu LangGraph",
        url: "https://docs.langchain.com",
        note: "Tham khảo cách thiết kế agent nhiều bước, nhiều nhánh rẽ.",
        free: true,
      },
    ],
  },

  {
    id: "lab-10",
    chapter: "10-y-te-du-phong",
    title: "Lab 10 — Xây mô hình dự báo sốt xuất huyết từ dữ liệu 5 năm",
    intro:
      "Chương 10 cho thấy AI giúp y tế dự phòng 'đón đầu' thay vì 'chữa cháy' như thế nào. Trong lab này, bạn nhận một notebook có sẵn dữ liệu 5 năm của một tỉnh (dữ liệu mô phỏng, ẩn danh) — số ca sốt xuất huyết theo tuần, lượng mưa, nhiệt độ. Nhiệm vụ: xây mô hình dự báo, đo sai số, và viết báo cáo 1 trang cho lãnh đạo ra quyết định.",
    question:
      "Hoàn thành 4 nhiệm vụ với notebook và dữ liệu mô phỏng do lab cung cấp (không cần lập trình từ đầu — notebook có sẵn khung code, bạn điền và diễn giải).\n\n**Nhiệm vụ 1 — Khám phá dữ liệu (L0):** Mở notebook, vẽ biểu đồ số ca theo tuần trong 5 năm. Mô tả 3 quan sát: mùa dịch thường rơi vào tháng nào? Năm nào cao bất thường? Dữ liệu có tuần nào bị thiếu không, bạn xử lý thế nào?\n\n**Nhiệm vụ 2 — Dự báo đơn giản (L1):** Chạy mô hình Prophet (có sẵn trong notebook) với 2 biến: số ca quá khứ + lượng mưa. Dự báo 4 tuần tiếp theo. Ghi lại con số dự báo cho từng tuần.\n\n**Nhiệm vụ 3 — Đánh giá sai số (L2):** Dùng kỹ thuật backtest: giấu 8 tuần cuối của dữ liệu, cho mô hình dự báo 'mù' 8 tuần đó, rồi so với thực tế. Tính RMSE (notebook hướng dẫn) và trả lời: sai số ±bao nhiêu %? Với sai số đó, mô hình đủ tốt để phân biệt 'tuần cao điểm' với 'tuần bình thường' không?\n\n**Nhiệm vụ 4 — Báo cáo lãnh đạo (L3):** Viết báo cáo 1 trang (tối đa 400 từ) gửi giám đốc CDC tỉnh gồm 3 phần: chuyện gì đang xảy ra (số liệu) → tại sao (phân tích) → đề xuất làm gì (hành động cụ thể, nguồn lực cần, thời gian). Bắt buộc nêu rõ độ không chắc chắn của dự báo (khoảng sai số), không đưa con số tuyệt đối.",
    rubric: `
  - **Khám phá đúng**: 3 quan sát chính xác từ biểu đồ, xử lý được dữ liệu thiếu một cách hợp lý.
  - **Dự báo chuẩn**: Chạy đúng mô hình, ghi đầy đủ con số 4 tuần, hiểu ý nghĩa các biến đầu vào.
  - **Đánh giá thật**: Backtest đúng quy trình, tính được RMSE, kết luận về độ tin cậy có căn cứ.
  - **Báo cáo dùng được**: Đủ 3 phần, đề xuất hành động cụ thể, nêu rõ độ không chắc chắn, văn phong phù hợp lãnh đạo.
  - **Tư duy giới hạn**: Chỉ ra ít nhất 1 giới hạn của mô hình (dữ liệu thiếu, yếu tố mới, xác suất vs chắc chắn).

  **Grade 5**: Đạt 5/5, báo cáo 1 trang đủ chất lượng để trình lãnh đạo thật (sau khi thay số liệu mô phỏng bằng số liệu thật).
  **Grade 4**: Đạt 4/5, kỹ thuật tốt nhưng báo cáo thiếu độ không chắc chắn hoặc đề xuất chung chung.
  **Grade 3**: Đạt 3/5, chạy được mô hình nhưng backtest hoặc diễn giải còn sai sót.
  **Grade 2**: Đạt 2/5, mới dừng ở khám phá dữ liệu, chưa hoàn thành dự báo.
  **Grade 1**: Không đạt — đưa ra dự báo như 'lời tiên tri' chắc chắn, hoặc dùng dữ liệu thật không ẩn danh.`,
    minLength: 400,
    suggestedTimeMin: 70,
    tools: [
      {
        name: "Notebook của lab (có sẵn dữ liệu mô phỏng)",
        url: "/lab/lab-10",
        note: "Notebook + dữ liệu 5 năm một tỉnh (mô phỏng, ẩn danh), chạy ngay trong tab lab.",
        free: true,
      },
      {
        name: "Tài liệu Prophet (Meta)",
        url: "https://facebook.github.io/prophet/",
        note: "Hiểu logic mô hình dự báo chuỗi thời gian — đọc phần giới thiệu là đủ.",
        free: true,
      },
      {
        name: "WHO — Ethics and governance of AI for health",
        url: "https://www.who.int/publications/i/item/9789240029200",
        note: "Khung đạo đức khi dùng AI với dữ liệu sức khỏe dân số.",
        free: true,
      },
    ],
  },

  {
    id: "lab-11",
    chapter: "11-nghien-cuu-y-sinh",
    title: "Lab 11 — Tổng quan hệ thống với AI: sàng lọc 50 abstract",
    intro:
      "Chương 11 cho bạn quy trình 4 bước dùng AI cho nghiên cứu. Trong lab này, bạn thực hành bước quan trọng nhất: dùng AI sàng lọc 50 abstract theo tiêu chí PRISMA, rồi so sánh với đáp án chuẩn (ground truth) để thấy AI sai ở đâu — và học cách bắt lỗi nó.",
    question:
      "Bạn được cung cấp 50 abstract về chủ đề 'AI hỗ trợ sàng lọc lao phổi ở tuyến huyện' (file đính kèm trong lab) cùng bộ tiêu chí include/exclude viết sẵn theo khung PICO. Thực hiện 3 nhiệm vụ:\n\n**1. Sàng lọc bằng AI (40 phút):** Dùng một công cụ AI học thuật (Elicit, LeapSpace nếu có truy cập, hoặc Consensus) để phân loại 50 abstract thành 3 nhóm: include (đưa vào tổng quan), exclude (loại), maybe (cần đọc toàn văn mới quyết được). Xuất bảng phân loại kèm lý do loại trừ cho mỗi abstract bị exclude.\n\n**2. So với ground truth (20 phút):** Mở đáp án chuẩn do giảng viên chấm thủ công. Tính: (a) số abstract AI phân loại đúng, (b) số ca AI loại nhầm bài quan trọng (false negative — lỗi nguy hiểm nhất), (c) số ca AI giữ lại bài đáng lẽ loại (false positive).\n\n**3. Phân tích lỗi (30 phút):** Viết báo cáo ngắn 300–500 từ trả lời: AI sai nhiều nhất ở loại ca nào (ví dụ: abstract viết mập mờ, tiêu chí biên giới)? Với những ca đó, người nghiên cứu phải làm gì khác đi? Đề xuất 2 quy tắc kiểm chứng khi dùng AI sàng lọc cho luận án của chính bạn.\n\nTuyệt đối không bịa thêm abstract ngoài 50 bài được cho. Mọi nhận định về công cụ phải dựa trên kết quả bạn tự chạy.",
    rubric: `
  - **Hiểu đúng yêu cầu**: Phân loại đủ 50 abstract theo đúng 3 nhóm và bộ tiêu chí PICO đã cho. Không bỏ sót, không tự thêm tiêu chí.
  - **Phân tích định lượng**: Tính đúng số liệu so sánh với ground truth (đúng/sai, false negative, false positive). Số liệu có bảng trình bày rõ ràng.
  - **Phát hiện lỗi của AI**: Chỉ ra được loại ca AI sai nhiều nhất với ví dụ cụ thể từ 50 abstract, không nhận xét chung chung.
  - **Quy tắc kiểm chứng**: Đề xuất 2 quy tắc khả thi, gắn với thực tế luận án của người học (ai kiểm tra, kiểm tra cái gì, khi nào dừng).
  - **Liêm chính nghiên cứu**: Không bịa dữ liệu; mọi trích dẫn công cụ/kết quả đều từ quá trình tự thực hiện; ghi nhận rõ phần nào do AI hỗ trợ.

  **Grade 5**: Đạt 5/5, phân tích lỗi AI sắc sảo, quy tắc kiểm chứng dùng được ngay cho luận án thật.
  **Grade 4**: Đạt 4/5, có chiều sâu nhưng thiếu một ý (ví dụ: chưa phân tích kỹ false negative).
  **Grade 3**: Đạt 3/5, hoàn thành sàng lọc và so sánh nhưng phân tích lỗi còn chung chung.
  **Grade 2**: Đạt 2/5, số liệu so sánh sai hoặc thiếu, quy tắc kiểm chứng không khả thi.
  **Grade 1**: Không đạt — bịa dữ liệu, không thực hiện sàng lọc, hoặc lạc đề.`,
    minLength: 600,
    suggestedTimeMin: 120,
    tools: [
      {
        name: "Elicit",
        url: "https://elicit.com",
        note: "Tìm kiếm ngữ nghĩa và sàng lọc systematic review. Bản miễn phí đủ cho 50 abstract.",
        free: true,
      },
      {
        name: "Consensus",
        url: "https://consensus.app",
        note: "Dùng để kiểm tra chéo: cùng một câu hỏi PICO, so sánh kết quả sàng lọc với Elicit.",
        free: true,
      },
      {
        name: "LeapSpace (Elsevier)",
        url: "https://www.elsevier.com/products/leapspace",
        note: "Nếu đơn vị bạn có quyền truy cập: thử sàng lọc trên kho bình duyệt và so sánh chất lượng trích dẫn.",
        free: false,
      },
      {
        name: "Video: Elicit AI đánh giá thực tế",
        url: "https://www.youtube.com/watch?v=bXN9B8_Pfl8",
        note: "Xem trước để hiểu cách Elicit sàng lọc và trích xuất dữ liệu trước khi làm bài.",
        free: true,
      },
    ],
  },

  {
    id: "lab-12",
    chapter: "12-ha-tang-du-lieu",
    title: "Lab 12 — Chuẩn hóa hồ sơ sang HL7 FHIR R4",
    intro:
      "Chương 12 khẳng định: data-ready trước, AI-ready sau — và FHIR là ngôn ngữ chung. Trong lab này, bạn cầm 5 bệnh án nội bộ (đã khử định danh, cho sẵn trong lab) và chuyển chúng thành tài nguyên FHIR R4 hợp lệ, dùng validator để bắt lỗi như một kỹ sư liên thông thực thụ.",
    question:
      "Bạn được cung cấp 5 bệnh án nội bộ đã khử định danh (định dạng văn bản tự do + bảng Excel, file đính kèm trong lab). Thực hiện 4 nhiệm vụ:\n\n**1. Đọc đặc tả (20 phút):** Đọc trang tài nguyên Patient, Encounter, Observation, Condition, MedicationRequest trong đặc tả HL7 FHIR R4 (https://hl7.org/fhir/). Ghi lại: trường nào bắt buộc (required), trường nào nên có cho ca bệnh của bạn.\n\n**2. Chuyển đổi (60 phút):** Dùng editor JSON trong lab (có validator FHIR tích hợp) để chuyển 5 bệnh án thành các tài nguyên FHIR R4. Yêu cầu: mỗi bệnh án có ít nhất 1 Patient + 1 Encounter + 2 Observation (sinh hiệu/xét nghiệm) + 1 Condition (chẩn đoán, mã ICD-10) + 1 MedicationRequest nếu có đơn thuốc.\n\n**3. Validator và sửa lỗi (30 phút):** Chạy validator cho từng tài nguyên. Ghi lại toàn bộ lỗi validator báo (ví dụ: thiếu trường bắt buộc, sai định dạng ngày, mã ICD không hợp lệ) và cách bạn sửa. Mục tiêu: 5/5 bệnh án pass validator.\n\n**4. Báo cáo ngắn (20 phút):** Viết 300–500 từ trả lời: (a) lỗi nào bạn mắc nhiều nhất khi chuyển đổi, và nó nói lên điều gì về chất lượng dữ liệu gốc? (b) nếu phòng khám của bạn phải xuất FHIR thật (mức L1), 3 việc đầu tiên bạn sẽ làm là gì và ai chịu trách nhiệm?\n\nKhông được bịa thêm thông tin bệnh nhân ngoài 5 bệnh án được cho. Mọi mã ICD-10 dùng phải là mã thật, tra được.",
    rubric: `
  - **Hiểu đúng yêu cầu**: Đủ 5 bệnh án, mỗi bệnh án đủ bộ tài nguyên tối thiểu theo yêu cầu. Không thiếu trường bắt buộc.
  - **Tính hợp lệ kỹ thuật**: 5/5 bộ tài nguyên pass validator FHIR R4. Lỗi validator được ghi lại đầy đủ và sửa đúng cách.
  - **Chất lượng ánh xạ**: Trường dữ liệu gốc được ánh xạ đúng vào đúng tài nguyên (không nhét chẩn đoán vào Observation, không nhét xét nghiệm vào Condition). Mã ICD-10 là mã thật.
  - **Phân tích dữ liệu gốc**: Chỉ ra được lỗi chuyển đổi phổ biến nhất và liên hệ thuyết phục với chất lượng dữ liệu gốc (bệnh án thiếu trường, ghi không chuẩn...).
  - **Kế hoạch L1 khả thi**: 3 việc đầu tiên cụ thể, đúng người chịu trách nhiệm, phù hợp với phòng khám tuyến cơ sở.

  **Grade 5**: Đạt 5/5, validator sạch 100%, phân tích dữ liệu gốc sâu, kế hoạch L1 dùng được ngay.
  **Grade 4**: Đạt 4/5, validator sạch nhưng phân tích hoặc kế hoạch còn thiếu chiều sâu.
  **Grade 3**: Đạt 3/5, chuyển đổi đủ nhưng còn lỗi validator chưa sửa hết hoặc ánh xạ chưa chuẩn.
  **Grade 2**: Đạt 2/5, thiếu bệnh án hoặc thiếu tài nguyên bắt buộc, mã ICD sai.
  **Grade 1**: Không đạt — bịa dữ liệu bệnh nhân, không pass validator, hoặc lạc đề.`,
    minLength: 600,
    suggestedTimeMin: 130,
    tools: [
      {
        name: "HL7 FHIR R4 — đặc tả chính thức",
        url: "https://hl7.org/fhir/",
        note: "Đọc các trang Patient, Encounter, Observation, Condition, MedicationRequest trước khi chuyển đổi.",
        free: true,
      },
      {
        name: "Video: What Is FHIR & Why It Matters?",
        url: "https://www.youtube.com/watch?v=u5rd18TB55g",
        note: "Xem trước để hiểu tài nguyên FHIR và cách API REST/JSON hoạt động.",
        free: true,
      },
      {
        name: "Video: Triển khai bệnh án điện tử tại Việt Nam",
        url: "https://www.youtube.com/watch?v=EiEwBOi4wx8",
        note: "DX Expert Talks #32 — bối cảnh thực tế triển khai EMR tại Việt Nam.",
        free: true,
      },
    ],
  },

  {
    id: "lab-13",
    chapter: "13-ha-tang-tinh-toan",
    title: "Lab 13 — Ước tính chi phí hạ tầng LLM cho bệnh viện tỉnh",
    intro:
      "Chương 13 cho bạn khung 3 tầng hạ tầng và lập luận vì sao workstation RTX 6000 là điểm ngọt. Trong lab này, bạn đóng vai trưởng phòng CNTT một bệnh viện tỉnh: dùng calculator tương tác để so sánh TCO 3 năm của 3 phương án, rồi viết tờ trình đề xuất lên giám đốc.",
    question:
      "Bệnh viện tỉnh B. (800 giường, 600 nhân viên y tế) muốn triển khai AI. Thực hiện 4 nhiệm vụ trên calculator tương tác của lab:\n\n**1. Chọn use case và SLA (20 phút):** Chọn 1 trong 3 use case: (a) ambient scribe cho 50 phòng khám, (b) chatbot nội bộ tra cứu quy trình cho 600 nhân viên, (c) AI hỗ trợ đọc X-quang cho khoa CĐHA. Đặt SLA: số người dùng đồng thời, độ trễ chấp nhận được, yêu cầu dữ liệu (có được ra biên giới không?).\n\n**2. Tính 3 phương án (50 phút):** Với use case đã chọn, calculator cho bạn cấu hình 3 phương án L1 (cloud API), L2 (workstation RTX 6000), L3 (cụm GPU). Điều chỉnh tham số (số user, mức dùng token/ngày) và ghi lại BOM (danh mục vật tư/cấu hình) của từng phương án.\n\n**3. So sánh TCO 3 năm (30 phút):** Xuất bảng so sánh: đầu tư ban đầu + vận hành/năm + nhân sự của 3 phương án trong 3 năm. Vẽ hoặc mô tả điểm hòa vốn (break-even) giữa cloud và mua máy — ở mức dùng nào thì L2 rẻ hơn L1?\n\n**4. Viết tờ trình (30 phút):** Viết tờ trình 400–600 từ gửi giám đốc bệnh viện: đề xuất 1 phương án, lý do (chi phí, bảo mật dữ liệu theo NĐ 13/2023, năng lực vận hành hiện có), rủi ro chính và điều kiện tiên quyết (ví dụ: dữ liệu đã đạt mức nào theo chương 12?).\n\nGiá linh kiện trong calculator mang tính thời điểm 10/2026 — ghi rõ giả định giá trong tờ trình. Không bịa báo giá nhà cung cấp cụ thể.",
    rubric: `
  - **Hiểu đúng yêu cầu**: Chọn use case rõ ràng, đặt SLA đầy đủ (người dùng, độ trễ, yêu cầu dữ liệu). Không bỏ trống tham số.
  - **Tính toán đúng**: BOM 3 phương án đầy đủ và nhất quán với use case; TCO 3 năm tính đúng công thức (đầu tư + vận hành × 3 + nhân sự).
  - **Điểm hòa vốn**: Xác định được ở mức dùng nào thì mua máy (L2) rẻ hơn cloud (L1), có số liệu minh họa từ calculator.
  - **Tờ trình thuyết phục**: Đề xuất 1 phương án rõ ràng, lý lẽ cân bằng 3 mặt (chi phí – bảo mật – năng lực vận hành), nêu rủi ro và điều kiện tiên quyết.
  - **Tuân thủ pháp lý**: Đề cập đúng yêu cầu NĐ 13/2023 khi dữ liệu ra biên giới (phương án cloud); ghi rõ giả định giá tính thời điểm.

  **Grade 5**: Đạt 5/5, tờ trình đạt chuẩn trình giám đốc thật — số liệu chắc, rủi ro và điều kiện tiên quyết đầy đủ.
  **Grade 4**: Đạt 4/5, tính toán đúng nhưng tờ trình thiếu một ý (ví dụ: chưa nêu điều kiện tiên quyết về dữ liệu).
  **Grade 3**: Đạt 3/5, so sánh TCO cơ bản đúng nhưng điểm hòa vốn chưa rõ hoặc lý lẽ một chiều.
  **Grade 2**: Đạt 2/5, BOM thiếu hạng mục lớn hoặc TCO tính sai công thức.
  **Grade 1**: Không đạt — bịa báo giá nhà cung cấp, không dùng calculator, hoặc lạc đề.`,
    minLength: 700,
    suggestedTimeMin: 130,
    tools: [
      {
        name: "Video: Keynote GTC 2025 — Jensen Huang (NVIDIA)",
        url: "https://www.youtube.com/watch?v=_waPvOwL9Z8",
        note: "Hiểu định hướng hạ tầng AI của NVIDIA trước khi chọn cấu hình.",
        free: true,
      },
      {
        name: "Video: Tóm tắt GTC 2025 (CNET, 16 phút)",
        url: "https://www.youtube.com/watch?v=erhqbyvPesY",
        note: "Nắm nhanh các công bố hạ tầng nếu không có thời gian xem keynote đầy đủ.",
        free: true,
      },
      {
        name: "NVIDIA DGX Platform",
        url: "https://www.nvidia.com/en-us/data-center/dgx-platform/",
        note: "Tham khảo kiến trúc cụm GPU cho phương án L3.",
        free: true,
      },
    ],
  },

  {
    id: "lab-15",
    chapter: "15-agi-frontier-ai",
    title: "Lab 15 — Chạy một dự án nhiều giờ với Frontier AI",
    intro: "Lab này đưa bạn từ 'hỏi AI từng câu' sang 'giao AI cả một dự án'. Bạn sẽ chọn một frontier AI có năng lực agent (Deep Research hoặc tương đương), giao cho nó một task nghiên cứu y tế cần nhiều giờ làm việc, quan sát cách nó lập kế hoạch và thực hiện, rồi viết báo cáo đánh giá: AI làm tốt điều gì, sai ở đâu, và việc gì bạn buộc phải làm lại. Mục tiêu không phải có một bản báo cáo đẹp, mà là học cách giám sát một hệ AI tự chủ — kỹ năng cốt lõi của bác sĩ thời frontier AI (xem chương 15, mục 4–5).",
    question: "Giao cho một frontier AI một task nghiên cứu y tế cần ~4 giờ làm việc (vd: tổng quan guideline điều trị đái tháo đường type 2 cập nhật 2024–2026 cho tuyến tỉnh). Quan sát quá trình agent làm việc, rồi đánh giá kết quả: điểm mạnh, điểm cần sửa, việc gì bạn phải làm lại. Viết 300–500 từ. CẤM đưa dữ liệu định danh bệnh nhân vào AI công cộng; dùng dữ liệu công khai/mô phỏng.",
    rubric: `- **Thiết kế task rõ ràng**: task có mục tiêu cụ thể, phạm vi, nguồn được phép dùng và điều cấm làm (đặc biệt về dữ liệu); không giao việc mơ hồ kiểu "nghiên cứu giúp tôi về tiểu đường".
  - **Quan sát quá trình agent**: ghi lại cách agent lập kế hoạch, chia bước, dùng công cụ gì, báo cáo tiến độ ra sao; chỉ ra ít nhất một điểm agent đi chệch hoặc cần can thiệp.
  - **Đánh giá kết quả**: phân biệt điểm mạnh (tốc độ, bao quát nguồn) với điểm yếu (sai số, trích dẫn thiếu, diễn giải chưa sát); kiểm chứng độc lập ít nhất 3 khẳng định quan trọng trong báo cáo của AI.
  - **Ranh giới an toàn**: không đưa dữ liệu định danh bệnh nhân vào AI công cộng; nêu rõ mức giám sát đã áp dụng (human-in-the-loop / human-on-the-loop) và điểm nào đã dừng/không giao cho AI.
  - **Tư duy độc lập**: bài viết thể hiện nhận định riêng của người học (việc gì phải làm lại, khi nào không nên dùng agent), không chỉ tóm tắt lại những gì AI đã làm.
  **Grade 5**: Task thiết kế chặt chẽ; quan sát quá trình chi tiết có mốc thời gian; đánh giá cân bằng mạnh–yếu với bằng chứng kiểm chứng độc lập; tuân thủ tuyệt đối ranh giới dữ liệu; kết luận thể hiện tư duy độc lập rõ rệt.
  **Grade 4**: Đủ 5 tiêu chí nhưng một tiêu chí còn sơ sài (vd: quan sát quá trình thiếu mốc cụ thể, hoặc kiểm chứng độc lập chưa đủ 3 điểm).
  **Grade 3**: Hoàn thành task và có đánh giá, nhưng thiếu quan sát quá trình agent hoặc đánh giá một chiều (chỉ khen hoặc chỉ chê, không có bằng chứng kiểm chứng).
  **Grade 2**: Task mơ hồ, không quan sát quá trình, đánh giá chung chung không dựa trên bằng chứng; hoặc có vi phạm nhỏ về ranh giới dữ liệu (dùng dữ liệu thật chưa khử định danh).
  **Grade 1**: Không thực hiện quan sát (chỉ hỏi AI vài câu rồi viết cảm nhận), hoặc đưa dữ liệu định danh bệnh nhân vào AI công cộng, hoặc bài nộp do AI viết toàn bộ không có dấu vết tư duy người học.`,
    minLength: 600,
    suggestedTimeMin: 240,
    tools: [
      {name: "Perplexity", url: "https://www.perplexity.ai", note: "Tra cứu có trích dẫn nguồn; chế độ Deep Research phù hợp task nghiên cứu nhiều giờ.", free: true},
      {name: "ChatGPT", url: "https://chat.openai.com", note: "Trợ lý đa nhiệm hệ sinh thái rộng; chế độ Deep Research và agent cho task dài.", free: true},
      {name: "Claude", url: "https://claude.ai", note: "Mạnh về văn bản dài và tiếng Việt; phù hợp soạn báo cáo đánh giá sau khi agent chạy xong.", free: true},
      {name: "Gemini", url: "https://gemini.google.com", note: "Gắn hệ sinh thái Google; Deep Research cho tổng quan tài liệu.", free: true}
    ]
  },

  {
    id: "lab-16",
    chapter: "16-robotic-ai",
    title: "Lab 16 — Thiết kế quy trình robot phẫu thuật hỗ trợ",
    intro:
      "Chương 16 cho thấy robot phẫu thuật là công cụ mở rộng tay nghề bác sĩ — không tự mổ, và mọi ca đều cần human-in-the-loop cùng quy trình dừng rõ ràng. Trong Lab này, bạn sẽ đóng vai người thiết kế quy trình: chọn một loại phẫu thuật cụ thể và viết ra quy trình an toàn 6–8 bước cho bệnh viện của mình, nêu rõ ai quyết định, ai chịu trách nhiệm ở mỗi bước, và khi nào phải dừng robot chuyển mổ mở. Dùng dữ liệu mô phỏng — tuyệt đối không dùng thông tin bệnh nhân thật.",
    question:
      "Chọn một loại phẫu thuật cụ thể (vd: cắt túi mật nội soi, thay khớp gối). Phân tích case study: nếu bệnh viện bạn triển khai robot hỗ trợ cho loại phẫu thuật này, hãy đề xuất quy trình an toàn 6–8 bước (từ chỉ định, consent bệnh nhân, setup, vận hành human-in-the-loop, xử lý sự cố, đến đánh giá hậu phẫu). Nêu rõ: ai quyết định, ai chịu trách nhiệm ở mỗi bước, khi nào dừng robot chuyển mổ mở. Viết 300–500 từ. Dùng dữ liệu mô phỏng, không dùng thông tin bệnh nhân thật.",
    rubric: `- **Tính cụ thể của quy trình**: các bước 6–8 rõ ràng, đúng trình tự từ chỉ định đến hậu phẫu, gắn với loại phẫu thuật đã chọn chứ không chung chung.
  - **Phân vai trách nhiệm rõ**: mỗi bước nêu được ai quyết định, ai thực hiện, ai chịu trách nhiệm (bác sĩ console, bác sĩ phụ mổ, gây mê, điều dưỡng, kỹ sư, ban giám đốc).
  - **Điểm dừng an toàn**: nêu được ít nhất 3 tình huống phải dừng robot (lỗi kỹ thuật, diễn biến lâm sàng xấu, vượt năng lực ê-kíp) và phương án chuyển mổ mở/nội soi thường.
  - **Human-in-the-loop**: thể hiện rõ robot chỉ hỗ trợ, mọi quyết định lâm sàng thuộc về bác sĩ; AI gợi ý chỉ mang tính tham khảo và phải được xác nhận.
  - **Tính khả thi tại tuyến bệnh viện**: quy trình phù hợp với tuyến bệnh viện đã chọn (trung ương/tỉnh), có nhắc đến đào tạo ê-kíp, bảo trì và đánh giá hiệu quả.

  **Grade 5**: Quy trình 6–8 bước đầy đủ, đúng trình tự; phân vai trách nhiệm rõ từng bước; ≥3 điểm dừng an toàn cụ thể với phương án chuyển đổi; human-in-the-loop quán triệt mọi bước; khả thi rõ với tuyến bệnh viện, có đề cập đào tạo và đánh giá hiệu quả.
  **Grade 4**: Đủ 6–8 bước và phân vai cơ bản; có 2–3 điểm dừng nhưng phương án chuyển đổi chưa chi tiết; human-in-the-loop được nêu nhưng chưa nhất quán mọi bước.
  **Grade 3**: Quy trình đủ bước nhưng còn chung chung, chưa gắn chặt loại phẫu thuật; phân vai trách nhiệm thiếu ở một số bước; điểm dừng an toàn sơ sài.
  **Grade 2**: Thiếu bước quan trọng (consent, xử lý sự cố hoặc hậu phẫu); trách nhiệm mơ hồ ("ê-kíp chịu trách nhiệm" chung chung); không có điểm dừng rõ ràng.
  **Grade 1**: Bài viết lan man, không thành quy trình; hoặc để robot/AI tự quyết định lâm sàng; hoặc dùng thông tin bệnh nhân thật.`,
    minLength: 600,
    suggestedTimeMin: 45,
    tools: [
      {
        name: "Intuitive — trang chủ da Vinci",
        url: "https://www.intuitive.com",
        note: "Tài liệu chính thức về các hệ da Vinci (Xi, X, SP, da Vinci 5): chỉ định, thông tin an toàn",
        free: true,
      },
      {
        name: "Medtronic — Hugo RAS",
        url: "https://www.medtronic.com",
        note: "Trang chủ Medtronic: tìm hệ Hugo RAS, tài liệu kỹ thuật và thông tin an toàn",
        free: true,
      },
      {
        name: "Claude",
        url: "https://claude.ai",
        note: "Soạn thảo và cấu trúc quy trình 6–8 bước; kiểm tra lại mọi nội dung trước khi nộp",
        free: true,
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com",
        note: "Brainstorm điểm dừng an toàn và phân vai trách nhiệm; đối chiếu với chương 16",
        free: true,
      },
    ],
  },

  {
    id: "lab-17",
    chapter: "17-digital-twin",
    title: "Lab 17 — Digital twin bệnh nhân tăng huyết áp",
    intro:
      "Chương 17 cho bạn khái niệm digital twin: bản sao số cập nhật từ dữ liệu cá nhân, dùng để mô phỏng 'điều gì sẽ xảy ra nếu' trước khi hành động trên người thật. Trong lab này, bạn đóng vai bác sĩ xây một 'twin giấy' (paper twin) cho một bệnh nhân MÔ PHỎNG: dùng AI đa nhiệm để mô phỏng đáp ứng với 3 kịch bản điều trị tăng huyết áp, so sánh chúng, rồi chỉ ra giới hạn của chính mô phỏng mình vừa làm — đúng tinh thần 'AI gợi ý, con người quyết định'.",
    question:
      "Với một bệnh nhân tăng huyết áp MÔ PHỎNG (hồ sơ giả lập: nam 55 tuổi, THA độ 2, đái tháo đường type 2, eGFR 70 — do bạn tự dựng hoặc lấy từ chương), hãy dùng AI mô phỏng đáp ứng với 3 kịch bản điều trị (A: lợi tiểu thiazide + thay đổi lối sống; B: ức chế men chuyển + chẹn kênh canxi; C: B + can thiệp lối sống có theo dõi wearable). So sánh 3 kịch bản theo: kiểm soát huyết áp kỳ vọng, nguy cơ tác dụng phụ, chi phí, tính khả thi theo dõi. Rồi phân tích: mô phỏng này thiếu dữ liệu gì của bệnh nhân thật, và quyết định cuối cùng thuộc về ai. Viết 300–500 từ. TUYỆT ĐỐI không dùng dữ liệu bệnh nhân thật.",
    rubric: `
  - **Hồ sơ mô phỏng rõ ràng**: Hồ sơ bệnh nhân giả lập được mô tả đầy đủ, nhất quán (tuổi, chẩn đoán, bệnh kèm, chức năng thận); nêu rõ đây là hồ sơ giả lập, không phải người thật.
  - **So sánh 3 kịch bản có cơ sở**: Mỗi kịch bản được phân tích theo đủ 4 khía cạnh (kiểm soát huyết áp kỳ vọng, tác dụng phụ, chi phí, khả thi theo dõi); lập luận dựa trên kiến thức y khoa/guideline, không bịa số liệu chính xác giả tạo.
  - **Nhận diện giới hạn mô phỏng**: Chỉ ra cụ thể mô phỏng thiếu những dữ liệu gì của bệnh nhân thật (gen, tuân thủ, lối sống thực, tương tác thuốc...) và sai số mô hình có thể đến từ đâu.
  - **Quyết định thuộc về con người**: Nêu rõ quyết định cuối cùng thuộc về bác sĩ (và người bệnh cùng quyết định), AI/mô phỏng chỉ là công cụ tham khảo; giải thích được vì sao.
  - **An toàn dữ liệu**: Cam kết không dùng dữ liệu bệnh nhân thật; nếu đề cập dữ liệu gen/wearable thì nêu yêu cầu đồng ý và bảo mật theo pháp luật Việt Nam.

  **Grade 5**: Đạt 5/5 tiêu chí, phân tích giới hạn mô phỏng sắc sảo, lập trường 'con người quyết định' rõ ràng và thuyết phục.
  **Grade 4**: Đạt 4/5, so sánh tốt nhưng còn thiếu sâu ở 1 tiêu chí.
  **Grade 3**: Đạt 3/5, hoàn thành đủ phần nhưng so sánh còn nông hoặc chưa chỉ ra giới hạn cụ thể.
  **Grade 2**: Đạt 2/5, thiếu nhiều phần hoặc phó mặc quyết định cho mô phỏng/AI.
  **Grade 1**: Không đạt — dùng dữ liệu bệnh nhân thật, hoặc bịa số liệu như kết quả nghiên cứu thật.`,
    minLength: 600,
    suggestedTimeMin: 60,
    tools: [
      {
        name: "ChatGPT",
        url: "https://chatgpt.com",
        note: "Dùng để mô phỏng đối thoại 3 kịch bản điều trị và yêu cầu AI liệt kê giả định, giới hạn của chính mô phỏng.",
        free: true,
      },
      {
        name: "Claude",
        url: "https://claude.ai",
        note: "Mạnh về phân tích văn bản dài; dùng để soạn bảng so sánh 3 kịch bản theo 4 khía cạnh.",
        free: true,
      },
      {
        name: "Perplexity",
        url: "https://www.perplexity.com",
        note: "Tra cứu guideline tăng huyết áp (WHO, Bộ Y tế) có trích nguồn để đối chiếu các kịch bản mô phỏng.",
        free: true,
      },
      {
        name: "NotebookLM",
        url: "https://notebooklm.google.com",
        note: "Tải guideline điều trị tăng huyết áp lên, hỏi đáp chỉ dựa trên tài liệu đó để kiểm chứng mô phỏng.",
        free: true,
      },
    ],
  },

  {
    id: "lab-18",
    chapter: "18-lo-trinh-ca-nhan",
    title: "Lab 18 — Xây lộ trình 90 ngày cá nhân",
    intro: "Chương 18 khép lại cẩm nang bằng câu hỏi thực tế nhất: đọc xong, sáng thứ Hai bạn bắt đầu từ đâu? Lab này giúp bạn biến toàn bộ kiến thức 17 chương thành một lộ trình 90 ngày cho chính mình — dựa trên vai trò, Grade và Domain mạnh/yếu của bạn, không phải một kế hoạch chung chung cho 'ngành y tế'.",
    question: "Dựa trên hồ sơ pre-test của bạn (vai trò, Grade, Domain mạnh/yếu), hãy xây lộ trình 90 ngày cá nhân ứng dụng AI trong y tế: (1) audit hiện trạng — bạn đang ở đâu (3 điểm mạnh, 3 điểm cần cải thiện); (2) 3 use case quick win cho công việc của bạn; (3) kế hoạch 30-30-30 ngày với mốc đo lường cụ thể; (4) 1 rủi ro lớn nhất và cách kiểm soát. Viết 300–500 từ. Không đưa dữ liệu bệnh nhân thật.",
    rubric: `- **Audit trung thực**: nêu rõ 3 điểm mạnh và 3 điểm cần cải thiện, gắn với vai trò và Grade thực tế của bản thân, không viết chung chung.
  - **Use case cụ thể, khả thi**: 3 quick win mô tả rõ việc gì, cho ai, đạt đủ 3 điều kiện (lặp lại · kiểm chứng được · không chạm dữ liệu định danh người bệnh).
  - **Mốc đo lường được**: kế hoạch 30-30-30 ngày có số liệu baseline và chỉ số đánh giá trước–sau cụ thể (thời gian, chất lượng, lỗi).
  - **Quản trị rủi ro**: xác định 1 rủi ro lớn nhất (dữ liệu, hallucination, pháp lý...) và cách kiểm soát tương ứng với ranh giới đỏ của cẩm nang.
  - **Tính cá nhân hóa theo vai trò**: lộ trình khớp với vai trò, Grade và Domain mạnh/yếu đã khai ở pre-test, không phải kế hoạch copy cho mọi đối tượng.
  - **Grade 5**: audit sâu và trung thực; 3 quick win sắc bén, đo được; kế hoạch 30-30-30 có baseline và chỉ số rõ ràng; rủi ro được phân tích kèm phương án kiểm soát khả thi; lộ trình thể hiện rõ dấu ấn cá nhân theo vai trò và có tính lan tỏa cho đội/đơn vị.
  - **Grade 4**: đủ 5 tiêu chí trên ở mức tốt, nhưng 1 trong các phần (thường là đo lường hoặc quản trị rủi ro) còn sơ sài.
  - **Grade 3**: có đủ 4 phần của đề bài, use case cụ thể nhưng mốc đo lường còn chung chung ("tiết kiệm thời gian" mà không có con số).
  - **Grade 2**: liệt kê được ý tưởng nhưng thiếu cấu trúc 30-30-30, hoặc quick win chưa đạt đủ 3 điều kiện (ví dụ chạm dữ liệu nhạy cảm mà không có phương án kiểm soát).
  - **Grade 1**: bài viết chung chung, không gắn với vai trò và thực tế công việc của bản thân; hoặc đưa dữ liệu bệnh nhân thật vào bài.`,
    minLength: 600,
    suggestedTimeMin: 45,
    tools: [
      {name: "Perplexity", url: "https://www.perplexity.ai", note: "Tra cứu có trích dẫn nguồn — dùng để kiểm chứng thông tin cho use case của bạn", free: true},
      {name: "Claude", url: "https://claude.ai", note: "Soạn thảo lộ trình 90 ngày, văn phong tiếng Việt mạch lạc", free: true},
      {name: "Gemini", url: "https://gemini.google.com", note: "Trợ lý đa nhiệm gắn với hệ sinh thái Google; NotebookLM đọc bộ tài liệu bạn tải lên", free: true}
    ]
  },

  LAB14,

];

export function getLab(id: string): Lab | undefined {
  return LABS.find((l) => l.id === id);
}

export function getLabsForChapter(chapterSlug: string): Lab[] {
  return LABS.filter((l) => l.chapter === chapterSlug);
}
