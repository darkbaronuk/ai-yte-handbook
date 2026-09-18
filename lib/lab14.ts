import type { Lab } from "./labs";

export const LAB14: Lab = {
  id: "lab-14",
  chapter: "14-an-toan-tuan-thu",
  title: "Lab 14 — 06 tình huống mô phỏng về an toàn và tuân thủ",
  intro: `**Các tình huống dưới đây là tình huống mô phỏng tổng hợp từ những dạng rủi ro thường gặp, không phản ánh một người bệnh hoặc cơ sở y tế cụ thể.** Chọn 01 trong 06 tình huống và viết bài phân tích 400–700 từ theo năm câu hỏi.

**CẤM DÁN PHI VÀO PERPLEXITY, GEMINI, CHATGPT HOẶC Ô NỘP BÀI CỦA LAB. CHỈ DÙNG CA MÔ PHỎNG ĐÃ CHO.** Ở đây, PHI được dùng để chỉ thông tin sức khỏe có thể nhận diện người bệnh, trực tiếp hoặc khi kết hợp với dữ liệu khác; không mặc nhiên áp dụng luật HIPAA của Hoa Kỳ tại Việt Nam. Không thay ca mô phỏng bằng bệnh án thật dù đã xóa tên. Bài nộp được gửi đến dịch vụ AI để chấm; kết quả chấm phục vụ học tập, không xác nhận tuân thủ pháp luật hay thay thế đánh giá chuyên môn.

### Cách làm bài

1. **Đọc nguồn gốc:** tra bản tiếng Việt của [Luật 91/2025/QH15](https://mps.gov.vn/chinh-sach-phap-luat/co-so-du-lieu-van-ban/luat-bao-ve-du-lieu-ca-nhan-1753688803). Điều 20 là chuyển dữ liệu xuyên biên giới; Điều 21 là đánh giá tác động xử lý; Điều 22 là cập nhật hồ sơ; Điều 23 quy định thông báo vi phạm với chủ thể, điều kiện và thời hạn tương ứng. Mở văn bản để kiểm chứng, không chỉ chép câu trả lời AI.
2. **Nhận diện rủi ro:** dùng chính dữ kiện mô phỏng; tách an toàn lâm sàng, dữ liệu và tổ chức. Không kết luận đã lộ dữ liệu nếu đề bài chỉ nói cần kiểm tra luồng dữ liệu.
3. **Vẽ đường đi dữ liệu:** xác định nguồn, người truy cập, nơi xử lý và nơi lưu; đánh dấu “chưa rõ” khi thiếu thông tin. Tên gọi “AI nội bộ” không chứng minh dữ liệu không ra ngoài.
4. **Đề xuất xử trí:** ưu tiên an toàn người bệnh, dừng hành vi gây hại, báo đầu mối và bảo toàn bằng chứng; sau đó đề xuất biện pháp phòng ngừa có người phụ trách.
5. **Kiểm chứng trước khi nộp:** phân biệt quy định pháp luật, SOP bệnh viện và khuyến cáo thực hành tốt; nêu điều kiện áp dụng và các thông tin còn thiếu. Có thể tham khảo [OWASP Top 10 bản 2025](https://genai.owasp.org/llm-top-10/), nhưng không gán mọi lỗi của thiết bị y tế cho rủi ro LLM.

Prompt gợi ý, chỉ dùng với ca mô phỏng: “Phân tích tình huống mô phỏng số … trong Lab 14. Tách dữ kiện đã biết và điều chưa rõ; đề xuất biện pháp an toàn. Với nhận định pháp lý, cung cấp nguồn gốc để tôi kiểm chứng; không tự kết luận vi phạm hoặc mức phạt.”`,
  question: `Chọn 01 trong 06 tình huống mô phỏng dưới đây. Không bổ sung thông tin của người bệnh hoặc cơ sở y tế có thật.

TÌNH HUỐNG 1: HỎI CHATBOT VỀ LIỀU THUỐC
Một điều dưỡng nghi ngờ liều thuốc trên y lệnh của người bệnh có suy giảm chức năng thận. Điều dưỡng dán phần bệnh án còn mã người bệnh lên chatbot công cộng, nhận câu trả lời “liều này an toàn” và tiếp tục thực hiện mà không trao đổi với người phụ trách.

TÌNH HUỐNG 2: TIN KẾT QUẢ AI ĐỌC CT
Người bệnh có triệu chứng kéo dài được chụp CT. Bác sĩ ký nhận xét “không phát hiện bất thường” sau khi xem gợi ý AI nhưng chưa đọc đầy đủ phim; lần rà soát sau phát hiện một tổn thương cần được đánh giá tiếp. Chưa có dữ kiện cho thấy ảnh đã bị chuyển khỏi hệ thống được phê duyệt.

TÌNH HUỐNG 3: CHIA SẺ DỮ LIỆU NGHIÊN CỨU
Một khoa gửi bộ hồ sơ và ảnh da liễu cho nhóm nghiên cứu bên ngoài. Tệp đã xóa tên nhưng còn ngày sinh, mã khoa, ngày khám, chẩn đoán bệnh hiếm và một số ảnh nhận diện khuôn mặt; người gửi chưa kiểm tra căn cứ xử lý và quy trình phê duyệt chia sẻ.

TÌNH HUỐNG 4: CHATBOT ĐƯA HƯỚNG DẪN THAY ĐỔI THUỐC
Người bệnh có tiền sử đặt stent mạch vành hỏi chatbot của cơ sở về chuẩn bị làm thủ thuật nha khoa. Chatbot khuyên tự ngừng aspirin và clopidogrel, là thuốc chống kết tập tiểu cầu, mà không chuyển câu hỏi cho người có thẩm quyền chuyên môn duyệt. Người bệnh làm theo và sau đó xuất hiện triệu chứng phải cấp cứu.

TÌNH HUỐNG 5: BỎ QUA CẢNH BÁO TƯƠNG TÁC THUỐC
Một bác sĩ đã quen đóng nhanh các cảnh báo ít phù hợp trong phần mềm bệnh viện. Khi kê thêm amiodarone cho người bệnh đang dùng warfarin, bác sĩ bỏ qua cảnh báo tương tác mà chưa đánh giá và chưa ghi lý do; sau đó xảy ra biến cố chảy máu cần rà soát. Nhật ký cho thấy cảnh báo đã hiển thị; nhà cung cấp đề nghị nhận toàn bộ nhật ký để hỗ trợ điều tra.

TÌNH HUỐNG 6: TIN NHẬN XÉT TỰ ĐỘNG TRÊN ĐIỆN TIM
Người bệnh đến khám vì đau ngực; máy điện tim có AI in nhận xét “không có biến đổi cấp tính”. Bác sĩ dùng nhận xét đó làm căn cứ cho về khi chưa hoàn thành đánh giá theo quy trình; người bệnh quay lại vì tình trạng nặng hơn. Chưa rõ máy có gửi bản ghi kèm định danh đến dịch vụ bên ngoài hay không.

VIẾT 400–700 TỪ, TRẢ LỜI ĐỦ NĂM CÂU HỎI:
1. Rủi ro chính đối với người bệnh và dữ liệu là gì? Điều gì đã được đề bài xác nhận, điều gì cần xác minh thêm?
2. Ai cần tham gia xử lý theo vai trò chuyên môn, quản lý công cụ và bảo vệ dữ liệu? Nêu ít nhất hai căn cứ pháp lý phù hợp, kèm điều/khoản và đường dẫn nguồn gốc; không tự kết luận mức phạt hoặc trách nhiệm khi chưa đủ dữ kiện.
3. Trình bày ba nhóm riêng: Quy định pháp luật; SOP bắt buộc của bệnh viện; Khuyến cáo thực hành tốt. Vì đề bài chưa cung cấp SOP thực tế, phải ghi rõ nội dung SOP là đề xuất để cơ sở ban hành.
4. Cần làm gì ngay và phòng ngừa tái diễn như thế nào? Nêu người phụ trách. Nếu có nghi ngờ sự cố dữ liệu, phân biệt báo nội bộ ngay với nghĩa vụ thông báo theo Điều 23; không mặc định mọi sự cố đều chịu mốc 72 giờ.
5. Chọn một nguyên tắc WHO phù hợp và giải thích. Nếu liên quan LLM/AI tạo sinh, chọn một rủi ro OWASP 2025 và một biện pháp giảm thiểu; nếu không liên quan, giải thích vì sao không áp dụng máy móc.

Không yêu cầu kê đơn, đề xuất liều hoặc thay đổi điều trị cho người bệnh thật. Việc chia nhóm trách nhiệm nhằm lập kế hoạch xử lý, không phải quy kết lỗi cho một cá nhân.`,
  rubric: `Chấm theo 5 tiêu chí dưới đây. Mỗi tiêu chí đạt hoặc chưa đạt, giải thích ngắn và chỉ ra cách cải thiện; không suy diễn sự kiện ngoài đề bài.

- **Nhận diện rủi ro:** Tách rủi ro lâm sàng và dữ liệu; phân biệt sự kiện đã biết với thông tin còn thiếu. Không mặc định ca 2 đã chuyển ảnh ra ngoài hay ca 6 đã gửi dữ liệu lên cloud. Không coi mọi CDSS là AI.
- **Căn cứ pháp lý và phạm vi:** Có ít nhất hai căn cứ liên quan, ghi điều/khoản và nguồn gốc. Luật 91: Điều 20 chuyển xuyên biên giới, Điều 21 đánh giá tác động xử lý, Điều 22 cập nhật hồ sơ. Khoản 3 Điều 30 không quy định nguyên văn mỗi người một tài khoản riêng. Khoản 1 Điều 23: chủ thể và điều kiện tổn hại luật định, trong 72 giờ kể từ phát hiện; bên xử lý báo kịp thời cho bên kiểm soát. Luật AI 134: Điều 9 phân loại rủi ro, Điều 13 đánh giá sự phù hợp hệ rủi ro cao. Không tự xếp mọi công cụ y tế cùng một mức rủi ro. Nếu không mở được nguồn, phải nói chưa kiểm chứng chứ không xác nhận nguồn đúng.
- **Phân biệt ba loại yêu cầu:** Tách luật, SOP và thực hành tốt. Không dùng chung tài khoản là nội dung SOP đề xuất, không trích như nguyên văn khoản 3 Điều 30. Không tuyên bố k-anonymity ≥ 5 là chuẩn bắt buộc phổ quát hoặc tự động bảo đảm tuân thủ tại Việt Nam. SOP chỉ có tính bắt buộc nội bộ sau khi được ban hành đúng thẩm quyền.
- **Xử trí và phòng ngừa:** Ưu tiên an toàn người bệnh; nêu việc làm và người phụ trách; báo nội bộ kịp thời, bảo toàn bằng chứng, đánh giá nghĩa vụ thông báo theo điều kiện. Không khuyên xóa dấu vết, tự thay đổi điều trị hoặc gửi toàn bộ hồ sơ/nhật ký chưa được phê duyệt cho nhà cung cấp.
- **Đạo đức và rủi ro tạo sinh:** Áp dụng phù hợp một nguyên tắc trong sáu nguyên tắc WHO: tự chủ; an sinh, an toàn và lợi ích công; minh bạch, giải thích và dễ hiểu; trách nhiệm và giải trình; bao trùm và công bằng; đáp ứng và bền vững. Bảo vệ nhóm yếu thế thuộc bao trùm/công bằng, không thay nguyên tắc thứ sáu. Liên hệ đúng OWASP 2025 khi liên quan LLM, hoặc giải thích hợp lý việc không áp dụng. Bài 400–700 từ, chỉ dùng ca mô phỏng.

**Grade 5:** Đạt cả 5 tiêu chí.
**Grade 4:** Đạt 4 tiêu chí.
**Grade 3:** Đạt 3 tiêu chí.
**Grade 2:** Đạt 2 tiêu chí.
**Grade 1:** Đạt không quá 1 tiêu chí, lạc đề hoặc quá sơ sài.

Không cho Grade 4–5 nếu bài khuyên thực hiện hành vi nguy hiểm như bỏ giám sát chuyên môn, che giấu sự cố hoặc dùng dữ liệu người bệnh thật trên AI công cộng. Nhận xét chấm là hỗ trợ học tập, không chứng nhận pháp lý, không xác nhận nguồn dẫn mà hệ thống chưa thực sự kiểm tra.`,
  minLength: 1500,
  suggestedTimeMin: 35,
  tools: [
    {
      name: "Perplexity",
      url: "https://www.perplexity.ai",
      note: "Tìm nguồn và mở văn bản gốc để kiểm chứng. Chỉ nhập ca mô phỏng, tuyệt đối không nhập PHI.",
      free: true,
    },
    {
      name: "ChatGPT",
      url: "https://chatgpt.com",
      note: "Gợi ý cấu trúc phân tích ca mô phỏng; không thay đánh giá chuyên môn hoặc pháp lý. Không nhập PHI.",
      free: true,
    },
    {
      name: "Google Gemini",
      url: "https://gemini.google.com",
      note: "Rà logic bài viết dùng dữ kiện mô phỏng. Không tải bệnh án, ảnh hoặc tệp người bệnh thật.",
      free: true,
    },
    {
      name: "Luật 91/2025/QH15: bản tiếng Việt",
      url: "https://mps.gov.vn/chinh-sach-phap-luat/co-so-du-lieu-van-ban/luat-bao-ve-du-lieu-ca-nhan-1753688803",
      note: "Đối chiếu Điều 19–23, 26, 30 và 37 theo vấn đề của tình huống; đọc đủ điều kiện và ngoại lệ.",
      free: true,
    },
    {
      name: "Luật Trí tuệ nhân tạo 134/2025/QH15",
      url: "https://congbao.chinhphu.vn/van-ban/luat-so-134-2025-qh15-468694.htm",
      note: "Điều 4 về nguyên tắc; Điều 9 về phân loại rủi ro; Điều 12–14 về sự cố và hệ rủi ro cao. Đọc cùng hướng dẫn hiện hành trong chương.",
      free: true,
    },
    {
      name: "Nghị định 102/2025/NĐ-CP",
      url: "https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-102-2025-nd-cp-44865/56285.htm",
      note: "Quản lý dữ liệu y tế; Điều 9 về xử lý, Điều 10 về sử dụng và khai thác.",
      free: true,
    },
    {
      name: "Luật Khám bệnh, chữa bệnh 15/2023/QH15",
      url: "https://xaydungchinhsach.chinhphu.vn/toan-van-luat-15-2023-qh15-kham-benh-chua-benh-119231127164453959.htm",
      note: "Đọc Điều 10, khoản 5 Điều 45 và Điều 69 về bí mật thông tin, trách nhiệm và hồ sơ bệnh án.",
      free: true,
    },
    {
      name: "OWASP Top 10 cho LLM: bản 2025",
      url: "https://genai.owasp.org/llm-top-10/",
      note: "Dùng đúng danh mục 2025 và chọn rủi ro thực sự phù hợp với tình huống tạo sinh.",
      free: true,
    },
  ],
};
