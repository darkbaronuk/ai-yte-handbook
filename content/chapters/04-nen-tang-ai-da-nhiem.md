---
number: 4
title: "Nền tảng AI đa nhiệm: trợ lý số cho mọi nhân viên y tế"
part: "Phần II — Hiện trạng"
status: draft
domains: ["Technical", "Communication"]
miller: "Knows How → Shows How"
owners: ["Tú"]
updated: "2026-10-05"
summary: "Chương hook cho L0/L1. Bản đồ Perplexity, ChatGPT, Claude, Gemini, Copilot, Grok và cách chọn combo phù hợp công việc y tế."
---

# Chương 4. Nền tảng AI đa nhiệm: trợ lý số cho mọi nhân viên y tế

## Mở đầu: câu hỏi của người bận rộn

Hãy bắt đầu bằng một buổi chiều rất quen thuộc. Bác sĩ Lan, nội khoa một bệnh viện tuyến tỉnh, vừa khám xong buổi sáng với hơn bốn mươi bệnh nhân. Trên bàn chị là ba việc đang chờ: một báo cáo tổng kết quý cho Sở Y tế hạn nộp cuối tuần, một bài trình bày cho buổi sinh hoạt khoa học của bệnh viện vào thứ Sáu, và một chồng y văn tiếng Anh cần đọc để cập nhật phác đồ điều trị tăng huyết áp. Chị nghe nói "AI giúp được hết", mở điện thoại thấy hàng chục cái tên: ChatGPT, Claude, Gemini, Copilot, Perplexity, Grok... Mỗi người đồng nghiệp lại khen một thứ khác nhau. Chị thử một cái, hỏi vài câu, nhận được câu trả lời nghe rất trôi chảy — nhưng khi đem đối chiếu với guideline thì có chỗ không khớp. Chị tắt máy, quay lại làm thủ công.

Câu chuyện này không phải về việc AI kém. Nó là về việc **thiếu một lớp nền**: hiểu các nền tảng AI đa nhiệm là gì, mỗi loại mạnh ở đâu, và dùng chúng thế nào cho đúng việc, đúng giới hạn, trong bối cảnh y tế Việt Nam.

Đó chính là câu hỏi trung tâm của chương này: **với công việc cụ thể của mình, tôi nên chọn (các) trợ lý AI nào, dùng chúng làm gì, và đâu là ranh giới không được vượt qua?** Đọc xong chương, bạn sẽ:

- Phân biệt được trợ lý AI đa nhiệm với các công cụ AI chuyên dụng (sẽ gặp ở các chương sau);
- Hiểu 6 nhóm nền tảng phổ biến và 10 tiêu chí chọn lựa phù hợp công việc y tế;
- Có trong tay cách làm cụ thể cho 6 vai trò: bác sĩ lâm sàng, điều dưỡng/kỹ thuật viên, cán bộ y tế công cộng, cán bộ chính sách, nghiên cứu sinh/nhà nghiên cứu và kỹ sư HealthTech;
- Nắm rõ các giới hạn bắt buộc: dữ liệu bệnh nhân, kiểm chứng nguồn, ghi nhãn nội dung AI tạo ra theo pháp luật Việt Nam.

Chương này là "chương hook" cho người mới (L0/L1): đọc xong là dùng được ngay trong tuần, không cần biết lập trình.

## 1. Khái niệm: AI đa nhiệm là gì, khác gì AI chuyên dụng

### 1.1. Từ chatbot đến tác nhân AI

Hầu hết chúng ta lần đầu gặp AI qua một khung chat: gõ câu hỏi, nhận câu trả lời bằng văn bản. Đó là **chatbot** — mô hình trả lời dựa trên những gì đã học và (đôi khi) những gì tra cứu được.

{t:agent}Tác nhân AI{/t} (AI agent) là bước tiếp theo: thay vì chỉ trả lời, nó **thực hiện chuỗi hành động** để hoàn thành một việc. Ba dạng agent mà nhân viên y tế sẽ gặp ngày càng nhiều:

- **Deep Research (nghiên cứu sâu):** bạn giao một câu hỏi lớn ("tổng quan các guideline điều trị đái tháo đường type 2 cập nhật 2024–2026"), agent tự tìm kiếm hàng chục nguồn, đọc, đối chiếu và trả về một báo cáo dài có trích dẫn. Khác với câu trả lời chat thông thường ở chỗ: có quy trình tìm kiếm rõ ràng, có nguồn để bạn kiểm tra lại.
- **Browser use (điều khiển trình duyệt):** agent tự mở trang web, bấm nút, điền form, tải tài liệu — như một trợ lý ngồi trước máy tính hộ bạn. Hữu ích khi cần thu thập thông tin từ nhiều trang web công khai.
- **Computer use (điều khiển máy tính):** agent thao tác trực tiếp trên máy tính (mở ứng dụng, xử lý file). Mạnh nhưng cũng là dạng rủi ro nhất, vì nó có thể bấm nhầm, xóa nhầm.

Điểm mấu chốt cần nhớ: **chatbot trả lời, agent làm việc**. Càng "làm việc" nhiều, bạn càng phải giới hạn quyền của nó — nguyên tắc này sẽ quay lại ở phần rủi ro.

### 1.2. AI đa nhiệm và AI chuyên dụng: hai tầng khác nhau

{t:multi-modal}Đa phương thức{/t} ở đây được dùng theo nghĩa rộng của cuốn cẩm nang này: các nền tảng AI **đa nhiệm** (general-purpose) — một công cụ làm được nhiều việc: soạn văn bản, dịch thuật, đọc tài liệu, phân tích bảng số liệu, tạo slide, tra cứu web. ChatGPT, Claude, Gemini, Copilot, Perplexity đều thuộc nhóm này.

Ngược lại, **AI chuyên dụng** là công cụ làm một việc trong y tế: đọc ảnh X-quang (chương 5), hỗ trợ quyết định lâm sàng (chương 6), robot phẫu thuật (chương 16)... Hai tầng này bổ sung cho nhau, không thay thế nhau. Một bác sĩ có thể dùng trợ lý đa nhiệm để soạn báo cáo **và** dùng AI chuyên dụng để đọc ảnh — mỗi thứ đúng chỗ của nó.

Vì sao chương này đặt ở Phần II (Hiện trạng) và đi trước các chương chuyên dụng? Vì trợ lý đa nhiệm là **lớp nền ai cũng chạm tới đầu tiên**: rẻ hoặc miễn phí, không cần cài đặt phức tạp, và là nơi hầu hết sai lầm về dữ liệu, nguồn tin xảy ra. Nắm chắc lớp nền thì các chương sau mới an toàn.

### 1.3. Bốn thuật ngữ dùng suốt chương

- {t:llm}Mô hình ngôn ngữ lớn{/t} (LLM): "bộ não" đứng sau các trợ lý — mô hình học từ lượng văn bản khổng lồ để hiểu và sinh ngôn ngữ. ChatGPT chạy trên GPT, Claude chạy trên Claude, Gemini chạy trên Gemini.
- {t:prompt}Câu lệnh dẫn{/t} (prompt): câu chữ bạn đưa cho AI. Chất lượng đầu ra phụ thuộc rất lớn vào chất lượng prompt — chương này sẽ cho bạn các mẫu prompt dùng được ngay.
- {t:hallucination}Thông tin bịa đặt{/t} (ảo giác): AI có thể viết ra những điều nghe rất thuyết phục nhưng sai sự thật — tên thuốc, liều dùng, số điều luật không tồn tại. Đây là rủi ro số một trong y tế, và là lý do mọi nội dung AI tạo ra đều phải kiểm chứng.
- {t:context-window}Cửa sổ ngữ cảnh{/t}: lượng văn bản AI "nhớ" được trong một cuộc trò chuyện. Tài liệu dài hơn cửa sổ này sẽ bị cắt bớt — vì vậy khi yêu cầu AI đọc tài liệu dày, hãy chia nhỏ hoặc hỏi theo từng phần.

## 2. Bản đồ 6 nhóm nền tảng (tình hình đến 10/2026)

> **Lưu ý về tính thời điểm:** thị trường AI thay đổi theo tháng: tên gói, tính năng và giá có thể khác khi bạn đọc. Cách dùng đúng của phần này là nắm **nhóm năng lực** (làm được gì), rồi kiểm tra lại tên sản phẩm và giá tại thời điểm mua. Đừng học thuộc danh sách sản phẩm.

### Nhóm 1. Perplexity — mạnh về tra cứu có nguồn

Điểm phân biệt lớn nhất của Perplexity là **mọi câu trả lời đều gắn nguồn trích dẫn** ngay dưới từng đoạn. Với nhân viên y tế, đây là tính năng đáng tiền nhất: bạn có thể bấm vào nguồn để kiểm tra xem AI có diễn giải đúng guideline hay không, thay vì tin mù mờ. Bản Pro có chế độ Deep Research (báo cáo dài) và trình duyệt Comet hỗ trợ agent duyệt web.

**Dùng khi:** tra cứu nhanh một vấn đề lâm sàng/hành chính và cần đối chiếu nguồn ngay; tổng hợp tài liệu trước khi viết báo cáo.

### Nhóm 2. ChatGPT (OpenAI) — hệ sinh thái rộng nhất

ChatGPT có các gói Plus/Pro, chế độ Deep Research, agent Operator (tự thao tác trình duyệt) và Projects (không gian làm việc lưu tài liệu, hướng dẫn riêng cho từng dự án). Điểm mạnh là hệ sinh thái: nhiều người dùng nhất nên dễ tìm hướng dẫn, dễ hỏi đồng nghiệp.

**Dùng khi:** cần một trợ lý "cân mọi việc" — soạn thảo, dịch thuật, lên ý tưởng, xử lý bảng biểu — và muốn tận dụng cộng đồng người dùng đông đảo.

### Nhóm 3. Claude (Anthropic) — mạnh về văn bản dài và tiếng Việt

Claude nổi tiếng về xử lý văn bản dài, văn phong mạch lạc và (theo trải nghiệm của nhiều người dùng Việt Nam) chất lượng tiếng Việt tự nhiên, ít "dịch máy". Có bản Pro/Max, công cụ lập trình Claude Code và API Computer Use cho tác vụ agent.

**Dùng khi:** soạn báo cáo dài, biên tập văn bản hành chính, dịch y văn, những việc đòi hỏi văn phong tiếng Việt chuẩn.

### Nhóm 4. Gemini (Google) — gắn với hệ sinh thái Google

Lợi thế của Gemini là nằm ngay trong môi trường nhiều người đã dùng: Gmail, Google Docs, Google Drive, và công cụ NotebookLM (đọc một bộ tài liệu bạn tải lên rồi trả lời **chỉ dựa trên bộ tài liệu đó** — rất hợp để ôn guideline hoặc tổng hợp tài liệu nội bộ).

**Dùng khi:** công việc của bạn đã nằm trong Google Workspace; cần một "gia sư" đọc đúng bộ tài liệu bạn đưa (NotebookLM).

### Nhóm 5. Microsoft Copilot — cho đơn vị dùng Microsoft 365

Copilot tích hợp vào Word, Excel, PowerPoint, Outlook, Teams. Nếu bệnh viện/Sở của bạn đã dùng Microsoft 365 bản quyền, đây thường là lựa chọn ít rào cản nhất về mặt thủ tục và quản trị.

**Dùng khi:** đơn vị đã có Microsoft 365; cần AI ngay trong Word/Excel/PowerPoint hằng ngày; ưu tiên quản trị tập trung.

### Nhóm 6. Grok / Manus / DeepSeek / Qwen / Kimi — nhóm bổ sung

Các nền tảng này cạnh tranh bằng giá thấp, một số mã nguồn mở (có thể tự triển khai nội bộ — xem chương 13 về hạ tầng tính toán). Chất lượng tiếng Việt và độ ổn định khác nhau giữa các mô hình, nên **luôn thử với việc thật của mình trước khi đưa vào quy trình**.

**Dùng khi:** ngân sách hạn chế, cần thử nghiệm, hoặc đơn vị có năng lực kỹ thuật muốn tự chủ hạ tầng.

## 3. Mười tiêu chí chọn nền tảng cho công việc y tế

Đừng chọn theo "ai cũng dùng". Hãy chấm điểm theo 10 tiêu chí dưới đây, ưu tiên 3 tiêu chí đầu vì chúng quyết định độ an toàn:

| # | Tiêu chí | Vì sao quan trọng trong y tế |
|---|----------|------------------------------|
| 1 | Chất lượng tiếng Việt, nhất là thuật ngữ lâm sàng | Thuật ngữ dịch sai ("liều duy trì" thành "liều tấn công") có thể gây hậu quả nghiêm trọng. Hãy thử với 5–10 câu hỏi chuyên môn của chính bạn trước khi tin. |
| 2 | Truy cập web thời gian thực + trích dẫn nguồn | Y văn và văn bản pháp luật cập nhật liên tục; câu trả lời không nguồn, không ngày tháng thì chưa dùng được cho công việc chính thức. |
| 3 | Giá và **tuân thủ dữ liệu** | Dữ liệu của bạn đi đâu, lưu ở đâu, có dùng để huấn luyện tiếp không? Đọc kỹ chính sách của gói bạn mua — bản miễn phí và bản trả phí thường khác nhau ở điểm này. |
| 4 | Deep Research (báo cáo dài có nguồn) | Cần khi làm tổng quan tài liệu, rà soát guideline, chuẩn bị bài giảng — những việc trước đây tốn nhiều ngày. |
| 5 | Đọc tài liệu (PDF, DOCX, ảnh) | Đọc guideline PDF, chụp ảnh tài liệu giấy để trích xuất chữ. Kiểm tra giới hạn dung lượng và số trang mỗi lần tải lên. |
| 6 | Phân tích dữ liệu (Excel, CSV) | Tổng hợp số liệu báo cáo dịch, vẽ biểu đồ nhanh. **Chỉ dùng số liệu đã khử định danh** (xem phần 6). |
| 7 | Sinh hình / slide | Minh họa bài giảng, poster hội nghị. Nhớ ghi nhãn nội dung do AI tạo ra (xem phần 6). |
| 8 | Browser agent / Computer use | Tự thu thập thông tin từ nhiều trang web. Chỉ dùng trên môi trường thử nghiệm, không cấp quyền thao tác trên hệ thống thật (EMR, HIS). |
| 9 | Cron / tác vụ định kỳ | Ví dụ: mỗi sáng thứ Hai tóm tắt tin y tế mới. Tiện nhưng phải kiểm tra lại kết quả — tác vụ chạy tự động càng cần giám sát. |
| 10 | Kết nối apps (Gmail, Drive, Notion, Slack...) | Giúp AI làm việc với tài liệu sẵn có của bạn. Mỗi kết nối là một cánh cửa dữ liệu — chỉ kết nối những gì thật sự cần. |

> **Ô nhấn mạnh — quy tắc 3 câu hỏi trước khi chọn:** (1) Việc quan trọng nhất tôi cần nó làm là gì? (2) Dữ liệu tôi đưa vào có nhạy cảm không, và nhà cung cấp cam kết gì? (3) Tôi kiểm chứng đầu ra bằng cách nào? Trả lời được 3 câu này thì chọn nền tảng nào cũng ít sai.

## 4. Hướng dẫn vận dụng cho 6 vai trò

Nguyên tắc chung: **mô tả việc → chọn năng lực → chọn nền tảng → kiểm chứng**. Đừng làm ngược (chọn nền tảng trước rồi tìm việc cho nó). Dưới đây là gợi ý cho từng vai trò; bạn hoàn toàn có thể trộn các cách làm.

### 4.1. Bác sĩ lâm sàng

**Việc điển hình:** tóm tắt guideline dài thành 1 trang để dán ở phòng khám; tra cứu tương tác thuốc nhanh; soạn giấy ra viện, giấy chuyển tuyến; dịch tóm tắt y văn tiếng Anh.

**Cách làm gợi ý:**
1. Tải guideline PDF lên, yêu cầu: "Tóm tắt thành 1 trang A4 gồm: chỉ định, chống chỉ định, liều khởi đầu và liều duy trì, theo dõi. Giữ nguyên tên thuốc tiếng Anh, ghi rõ trang nguồn của từng mục."
2. Với tra cứu thuốc: luôn yêu cầu AI **trích nguồn** (tờ hướng dẫn sử dụng, guideline) và **tự bạn đối chiếu** trước khi áp dụng cho người bệnh cụ thể.
3. Giấy ra viện/giấy chuyển tuyến: dùng AI soạn khung và diễn đạt, nhưng chẩn đoán, thuốc và hẹn tái khám phải do bạn điền và ký.

**Mẫu prompt dùng được ngay:** *"Bạn là trợ lý soạn thảo y khoa. Dựa ONLY trên tài liệu tôi tải lên, tóm tắt [tên guideline] thành bảng 2 cột: Khuyến cáo | Mức bằng chứng. Không thêm kiến thức ngoài tài liệu. Cuối bảng liệt kê những điểm tài liệu không đề cập."*

### 4.2. Điều dưỡng / kỹ thuật viên

**Việc điển hình:** viết bàn giao ca ngắn gọn, đầy đủ; ôn quy trình kỹ thuật trước khi thực hiện; soạn tờ hướng dẫn giáo dục sức khỏe cho người bệnh.

**Cách làm gợi ý:**
1. Bàn giao ca: đọc to các ý chính cho AI ghi lại thành mẫu SBAR (Tình huống – Bối cảnh – Đánh giá – Đề xuất), rồi bạn sửa lại trước khi bàn giao chính thức.
2. Ôn quy trình: "Liệt kê các bước chuẩn bị dụng cụ cho [thủ thuật], đánh dấu bước nào dễ sai nhất theo kinh nghiệm thường gặp" — rồi đối chiếu với quy trình của khoa.
3. Giáo dục sức khỏe: yêu cầu viết ở trình độ lớp 6, câu ngắn, có phần "khi nào cần quay lại bệnh viện ngay".

### 4.3. Cán bộ y tế công cộng

**Việc điển hình:** tổng hợp báo cáo dịch bệnh định kỳ; dịch tài liệu WHO/CDC; phân tích nhanh số liệu giám sát từ file Excel.

**Cách làm gợi ý:**
1. Báo cáo dịch: đưa số liệu đã khử định danh, yêu cầu AI tính tỷ lệ, vẽ biểu đồ xu hướng và **viết phần nhận xét dưới dạng "câu hỏi cần kiểm chứng thêm"** thay vì kết luận chắc nịch.
2. Dịch tài liệu: dịch xong yêu cầu AI lập bảng thuật ngữ Anh–Việt đã dùng, để cả nhóm thống nhất.
3. Luôn ghi rõ trong báo cáo phần nào do AI hỗ trợ tổng hợp và đã được ai kiểm tra.

### 4.4. Cán bộ chính sách, quản lý

**Việc điển hình:** rà soát văn bản quy phạm còn hiệu lực; đối chiếu quy định giữa các văn bản; dự thảo tờ trình, công văn.

**Cách làm gợi ý:**
1. Rà soát văn bản: "Liệt kê các văn bản còn hiệu lực điều chỉnh [lĩnh vực], kèm số hiệu, ngày ban hành, ngày hiệu lực. Với văn bản tôi chưa chắc, ghi 'cần kiểm chứng' thay vì đoán." Sau đó đối chiếu với Cổng văn bản QPPL hoặc Thư viện pháp luật.
2. Đối chiếu quy định: yêu cầu AI lập bảng so sánh 2–3 văn bản theo các hàng: chủ thể áp dụng, điều kiện, ngoại lệ, thời hạn hiệu lực.
3. Dự thảo tờ trình: AI soạn khung và văn phong hành chính; **căn cứ pháp lý và số liệu do bạn điền và chịu trách nhiệm**.

### 4.5. Nghiên cứu sinh / nhà nghiên cứu

**Việc điển hình:** tổng quan tài liệu (systematic review bước đầu), viết bản thảo, dịch và biên tập bài báo.

**Cách làm gợi ý:**
1. Dùng Deep Research để quét tài liệu, nhưng **tự đọc toàn văn** các bài then chốt — AI tóm tắt có thể bỏ sót chi tiết phương pháp quyết định chất lượng bằng chứng.
2. Viết bản thảo: dùng AI để dàn ý và diễn đạt lại đoạn văn của chính bạn; không để AI "sáng tác" kết quả nghiên cứu.
3. Kiểm tra đạo văn và trích dẫn: mọi trích dẫn AI đưa ra phải được mở bản gốc để xác minh — {t:hallucination}thông tin bịa đặt{/t} về tài liệu tham khảo là lỗi phổ biến và nguy hiểm nhất với người làm khoa học.

### 4.6. Kỹ sư HealthTech

**Việc điển hình:** viết code, review kiến trúc, sinh test, đọc tài liệu kỹ thuật.

**Cách làm gợi ý:**
1. Dùng AI để sinh khung code và test, nhưng review từng dòng trước khi merge — đặc biệt với code xử lý dữ liệu sức khỏe.
2. Khi hỏi về kiến trúc tuân thủ (ví dụ {t:fhir}FHIR{/t}, bảo mật), yêu cầu AI trích dẫn điều khoản cụ thể của chuẩn, rồi mở tài liệu gốc đối chiếu.
3. Không dán khóa API, chuỗi kết nối cơ sở dữ liệu, hoặc dữ liệu thật vào khung chat công cộng.

## 5. Combo khuyến nghị theo ngân sách

Bảng dưới là gợi ý khởi điểm, giá tham khảo thời điểm 10/2026 (khoảng 500–600 nghìn đồng cho một gói Pro quốc tế ~20 USD/tháng). **Kiểm tra lại giá và chính sách dữ liệu khi mua**, vì cả hai đều thay đổi.

| Combo | Chi phí/tháng (tham khảo) | Phù hợp cho |
|---|---|---|
| Miễn phí (bản free của 2–3 nền tảng) | 0 | Sinh viên, dùng thử, việc không nhạy cảm |
| 1 gói Pro | 500–600k | Cá nhân dùng chính cho công việc hằng ngày |
| 2 gói Pro (ví dụ Perplexity + Claude/ChatGPT) | 1–1,2 triệu | Bác sĩ, NCS, cán bộ cần cả tra cứu có nguồn và soạn thảo dài |
| Full stack 3–4 nền tảng | 2–3 triệu | Người xây sản phẩm, làm nội dung chuyên sâu |
| Enterprise + M365 Copilot | tùy quy mô | Bệnh viện, Sở Y tế (quản trị tập trung, hợp đồng DPA) |

**Lời khuyên thực tế:** bắt đầu từ miễn phí trong 2 tuần với đúng 3 việc thật của bạn, chấm điểm theo 10 tiêu chí ở phần 3, rồi mới mua. Đừng mua vì "nghe nói tốt" — mua vì nó đã chứng minh được với việc của bạn.

## 6. Giới hạn và rủi ro: năm lằn ranh đỏ

Phần này không phải để dọa bạn bỏ AI. Ngược lại, biết rõ ranh giới thì mới dám dùng mạnh trong phần việc được phép. Có năm lằn ranh:

### 6.1. Dữ liệu bệnh nhân: nguyên tắc "không nhập, không dán, không tải lên"

**Quy tắc:** không nhập thông tin định danh người bệnh (họ tên, ngày sinh, địa chỉ, số hồ sơ, hình ảnh nhận diện được...) vào các nền tảng AI công cộng quốc tế, trừ khi đơn vị bạn đã ký thỏa thuận bảo vệ dữ liệu (DPA) với nhà cung cấp và có đánh giá tuân thủ pháp luật về {t:pdpd}bảo vệ dữ liệu cá nhân{/t} hiện hành.

Vì sao? Dữ liệu bạn dán vào khung chat có thể được lưu trên máy chủ nước ngoài, dùng để cải thiện mô hình, hoặc lộ qua các kênh bạn không kiểm soát. Một báo cáo ca bệnh "đã xóa tên" nhưng còn tuổi + nghề nghiệp + địa phương + chẩn đoán hiếm **vẫn có thể nhận diện lại được** — đừng tự tin thái quá vào việc xóa tên.

**Làm thay được gì:** dùng số liệu tổng hợp, đã khử định danh; dùng ca mô phỏng để luyện tập; nếu đơn vị triển khai AI nội bộ (xem chương 13), tuân thủ quy chế dữ liệu của đơn vị.

### 6.2. Tin giả do AI bịa: kiểm chứng, nhất là thuốc và liều

{t:hallucination}Thông tin bịa đặt{/t} của AI nghe rất thuyết phục — đó mới là chỗ nguy hiểm. Trong y tế, ba nơi bắt buộc kiểm chứng 100%:

1. **Tên thuốc, liều dùng, chống chỉ định, tương tác** — đối chiếu tờ hướng dẫn sử dụng hoặc guideline gốc.
2. **Số hiệu văn bản pháp luật, điều/khoản** — mở văn bản gốc trên nguồn chính thức.
3. **Trích dẫn tài liệu tham khảo** — mở bản gốc, vì AI có thể bịa ra bài báo không tồn tại với tên tác giả rất thật.

Thói quen nên có: với mỗi nội dung quan trọng, hỏi AI "nguồn của thông tin này là gì, độ tin cậy ra sao, và có gì bạn chưa chắc?" — rồi tự kiểm tra.

### 6.3. Agent tự thao tác: giới hạn quyền, không chạm hệ thống thật

Browser agent và computer use agent càng mạnh càng cần "xích" ngắn:

- Chỉ chạy agent trên **môi trường thử nghiệm**, tài khoản thử nghiệm, dữ liệu giả lập.
- **Không bao giờ** cấp cho agent quyền thao tác trên {t:emr}bệnh án điện tử{/t} (EMR), HIS, LIS thật, tài khoản ngân hàng, email công việc thật.
- Với tác vụ định kỳ (cron): định kỳ xem lại nhật ký hoạt động của nó — agent chạy tự động mà sai thì sai đều đặn mỗi ngày.

### 6.4. Ghi nhãn nội dung do AI tạo ra: nghĩa vụ pháp lý tại Việt Nam

{t:luatai}Luật Trí tuệ nhân tạo số 134/2025/QH15{/t} (Quốc hội thông qua ngày 10/12/2025, hiệu lực từ 01/03/2026) yêu cầu tính minh bạch: hệ thống AI tương tác trực tiếp với con người phải được thiết kế để người dùng biết mình đang làm việc với máy; nội dung âm thanh, hình ảnh, video do AI tạo ra phải có dấu hiệu nhận biết theo quy định của Chính phủ.

Vận dụng thực tế cho nhân viên y tế:

- Slide, poster, video giáo dục sức khỏe có hình/tiếng AI tạo ra: **ghi rõ "nội dung có sử dụng AI"**.
- Bài viết, báo cáo có AI hỗ trợ soạn thảo: ghi nhận trong phần phương pháp hoặc lời cảm ơn, theo quy định của đơn vị/tạp chí.
- Tuyệt đối không dùng AI tạo hình ảnh giả mạo người thật, sự kiện có thật để lừa dối — đây là hành vi bị nghiêm cấm.

### 6.5. Con người quyết định cuối cùng

AI hỗ trợ **chuẩn bị** quyết định, không thay thế người ra quyết định — nhất là quyết định lâm sàng (chẩn đoán, chỉ định điều trị, kê đơn). Mọi sản phẩm AI tạo ra phục vụ công việc chuyên môn đều cần một người có chuyên môn kiểm tra, ký duyệt và chịu trách nhiệm. Nguyên tắc này áp dụng cho cả bài nộp ở Lab: AI có thể hỗ trợ, nhưng người học tự kiểm chứng và chịu trách nhiệm về bài của mình.

> **Ô nhấn mạnh — checklist 1 phút trước khi dùng AI cho việc quan trọng:** ☐ Dữ liệu đưa vào có định danh ai không? ☐ Đầu ra đã được đối chiếu với nguồn gốc chưa? ☐ Có cần ghi nhãn "có sử dụng AI" không? ☐ Ai là người ký duyệt cuối cùng? Đủ 4 dấu tick mới dùng.

## 7. Case: hai giờ và một báo cáo 5 trang

> **Tình huống mô phỏng tổng hợp** — các nhân vật, số liệu và diễn biến dưới đây do tác giả dựng để minh họa cách làm, không phản ánh một người bệnh hay cơ sở cụ thể nào.

Bác sĩ Lan (nhân vật ở phần mở đầu) quyết định thử một cách có phương pháp. Chị chọn combo Perplexity + Claude theo bảng ở phần 5, dành 15 phút đầu chỉ để làm quen bằng 3 câu hỏi thử về chuyên môn của mình và đối chiếu đáp án với guideline — cả hai nền tảng đều qua được bài kiểm tra nhỏ này.

**Giờ thứ nhất — thu thập (Perplexity, Deep Research):** chị giao đề bài "tổng quan các khuyến cáo mới nhất về quản lý tăng huyết áp ở tuyến cơ sở, ưu tiên tài liệu WHO và Bộ Y tế Việt Nam". Chị nhận về một bản tổng hợp có trích dẫn từng đoạn. Chị mở 5 nguồn quan trọng nhất để đọc lướt và đánh dấu 2 điểm AI diễn giải chưa sát — ghi chú lại để tự viết.

**Giờ thứ hai — soạn thảo (Claude):** chị tải bản tổng hợp lên, yêu cầu dàn ý báo cáo 5 trang theo mẫu của Sở: đặt vấn đề, thực trạng, giải pháp, kiến nghị. Chị viết phần "thực trạng" bằng số liệu thật của trạm mình (số liệu tổng hợp, không có thông tin định danh), để AI hỗ trợ diễn đạt và vẽ 2 biểu đồ. Phần kiến nghị chị tự viết hoàn toàn.

**Kết quả:** bản thảo 5 trang hoàn thành trong 2 giờ thay vì 2 ngày như mọi khi. Nhưng điểm đáng nói nhất không phải tốc độ — mà là 3 việc chị **không** để AI làm: không dán số liệu có định danh, không tin 2 điểm AI diễn giải sai (đã tự sửa), và ký tên chịu trách nhiệm với tư cách người kiểm tra cuối cùng.

Bài học rút ra cho người mới: **quy trình 3 bước — kiểm tra năng lực trước (15 phút), thu thập có nguồn, soạn thảo có kiểm soát** — áp dụng được cho hầu hết công việc văn phòng y tế, không riêng gì viết báo cáo.

## 8. Lab 4 — Chọn và làm chủ trợ lý AI của bạn

> **Trạng thái:** đề cương Lab (chưa phải bản triển khai đầy đủ). Các rubric và luồng chấm dưới đây là thiết kế để tác giả duyệt, sẽ được cụ thể hóa khi lên nền tảng học liệu.

### 8.1. Mục tiêu

Sau Lab, người học thể hiện được 3 kỹ năng ở mức "Shows How":

1. Chọn được (các) nền tảng AI phù hợp với một nhiệm vụ y tế cụ thể và giải thích được lý do chọn theo 10 tiêu chí (phần 3).
2. Sử dụng AI để hoàn thành một sản phẩm viết, có kiểm chứng nguồn và ghi nhận phần AI hỗ trợ.
3. Tuân thủ các giới hạn an toàn: không nhập dữ liệu định danh, ghi nhãn nội dung AI tạo ra.

### 8.2. Đề bài và đầu vào

**Nhiệm vụ chung:** hoàn thành một **báo cáo ngắn** với chủ đề *"Ứng dụng AI trong quản lý tăng huyết áp ở tuyến cơ sở"* — đúng loại việc mà nhân viên y tế tuyến xã/huyện có thể làm ngay tuần này.

**Dữ kiện cho sẵn (mô phỏng):** một bộ số liệu tổng hợp giả lập về 200 người bệnh tăng huyết áp tại một trạm y tế xã (tuổi trung bình, tỷ lệ kiểm soát huyết áp, tỷ lệ tái khám đúng hẹn) — **không phải dữ liệu thật**, chỉ dùng để luyện phân tích. Thiếu thông tin nào, ghi rõ "chưa có dữ kiện" và đề xuất cách thu thập, không tự bịa thêm.

**Bốn mức nhiệm vụ (chọn 1 mức phù hợp với mình):**

| Mức | Nhiệm vụ | Thời lượng ước tính |
|---|---|---|
| L0 — Làm quen | Dùng 1 nền tảng miễn phí trả lời 3 câu hỏi: (1) mục tiêu điều trị tăng huyết áp theo guideline hiện hành là gì, (2) vai trò của tuyến cơ sở, (3) AI có thể hỗ trợ khâu nào. Liệt kê nguồn của từng câu trả lời. | 15 phút |
| L1 — Khung báo cáo | Dùng AI lập dàn ý báo cáo 5 mục + viết nháp 1 mục "đặt vấn đề" (khoảng 300 chữ), có ghi nguồn. | 30 phút |
| L2 — Báo cáo hoàn chỉnh | Hoàn thành báo cáo ~1.200 chữ gồm: đặt vấn đề, phân tích bộ số liệu mô phỏng, 3 đề xuất ứng dụng AI khả thi ở tuyến cơ sở, giới hạn và kiểm chứng. Tự đánh giá bằng checklist phần 6 trước khi nộp. | 60 phút |
| L3 — Báo cáo + kế hoạch | Như L2, cộng thêm kế hoạch triển khai 1 đề xuất tại đơn vị mình (ai làm, làm gì, kiểm chứng thế nào, dừng khi nào) + 1 đoạn phản biện: "đề xuất này có thể sai ở đâu". | 90 phút |

### 8.3. Công cụ và nguồn gợi ý

- **Công cụ:** bất kỳ nền tảng nào ở phần 2 (khuyến nghị bắt đầu với bản miễn phí). Dùng ở bước: tra cứu (Deep Research/Perplexity) → dàn ý và soạn thảo (Claude/ChatGPT) → kiểm tra văn phong.
- **Nguồn đối chiếu bắt buộc:** ít nhất 1 guideline hoặc văn bản chính thức (ví dụ tài liệu của WHO, Bộ Y tế) mà bạn tự mở đọc, không chỉ đọc qua AI tóm tắt.
- **Prompt gợi ý:** *"Dựa trên các nguồn [liệt kê], hãy lập dàn ý báo cáo gồm 5 mục. Với mỗi mục, ghi 2–3 ý chính và nguồn tương ứng. Đánh dấu những ý bạn chưa chắc chắn."*

> ⚠️ **CẢNH BÁO AN TOÀN — đọc trước khi làm bài:** **TUYỆT ĐỐI KHÔNG nhập thông tin định danh người bệnh thật** (họ tên, ngày sinh, địa chỉ, số hồ sơ, ảnh nhận diện được) vào bất kỳ công cụ AI công cộng nào trong quá trình làm Lab. Chỉ dùng bộ số liệu mô phỏng được cung cấp. Vi phạm nguyên tắc này = bài không đạt, không cần chấm tiếp.

### 8.4. Sản phẩm nộp

Tùy mức đã chọn: câu trả lời 3 câu hỏi (L0), dàn ý + 1 mục nháp (L1), báo cáo ~1.200 chữ (L2), báo cáo + kế hoạch + phản biện (L3). Mọi mức đều phải kèm:

1. Tên (các) nền tảng đã dùng và lý do chọn (1–2 câu).
2. Danh sách nguồn đã tự kiểm chứng (ít nhất 1 nguồn gốc).
3. Dòng ghi nhận: "Phần nào của bài có sự hỗ trợ của AI".

Định dạng: văn bản tiếng Việt, có tiêu đề mục rõ ràng. Không yêu cầu đồ họa phức tạp.

### 8.5. Rubric chấm (thang 1–5 cho mỗi tiêu chí)

| Tiêu chí | 1 — Chưa đạt | 3 — Đạt | 5 — Xuất sắc |
|---|---|---|---|
| Hiểu đúng yêu cầu | Lạc đề hoặc thiếu hẳn một phần bắt buộc | Đủ các phần, đúng chủ đề | Đúng và sâu: thấy được vấn đề thật của tuyến cơ sở |
| Lập luận và phân tích | Liệt kê ý rời rạc, không có mạch | Có mạch lập luận, số liệu được dùng đúng chỗ | Phân tích sắc: chỉ ra được cái được/cái chưa của từng đề xuất |
| Dùng AI đúng cách | Phó mặc cho AI, không kiểm chứng | Có kiểm chứng ít nhất 1 nguồn gốc, ghi nhận phần AI hỗ trợ | Kiểm chứng đa nguồn, phát hiện và sửa được chỗ AI sai |
| An toàn và tuân thủ | Nhập dữ liệu nhạy cảm hoặc không ghi nhãn AI | Tuân thủ cảnh báo an toàn, có ghi nhãn | Chủ động nêu giới hạn và điều kiện áp dụng của chính bài mình |
| Trình bày và hành động | Khó đọc, không có kết luận hành động | Rõ ràng, có đề xuất cụ thể | Đề xuất khả thi, có người chịu trách nhiệm và điểm dừng rõ ràng |

**Điều kiện đạt:** không vi phạm cảnh báo an toàn; mọi tiêu chí ≥ 3; tổng ≥ 15/25. **Chưa đạt:** học viên nhận phản hồi theo từng tiêu chí và được nộp lại 1 lần.

**Cách chấm:** rubric công khai trên + {t:llm-as-judge}AI chấm theo rubric{/t} (LLM-as-judge) để phản hồi nhanh; với L2/L3 có thêm **peer review** (đánh giá chéo giữa học viên). Điểm Lab chỉ phản ánh một bài tập — **không quy đổi thành mức trưởng thành hay chứng nhận năng lực** của cá nhân hay đơn vị.

### 8.6. Kiểm chứng và những điều không được làm

- Không dùng dữ liệu bệnh nhân thật dưới mọi hình thức (kể cả "đã xóa tên").
- Không giao AI quyết định lâm sàng: bài này không phải chỉ định điều trị hay kê đơn.
- Thiếu dữ kiện thì ghi "chưa rõ" và đề xuất cách xác minh — không tự kết luận.
- Không nộp nguyên văn đầu ra AI: phải đối chiếu, phân tích và tự hoàn thiện.
- Phản hồi của AI (kể cả AI chấm bài) phục vụ học tập, không phải kết luận pháp lý hay chứng nhận triển khai an toàn.

## 9. Nguồn và đọc thêm

**Văn bản pháp luật Việt Nam:**
- Quốc hội (2025), *Luật Trí tuệ nhân tạo số 134/2025/QH15* (thông qua ngày 10/12/2025, hiệu lực từ 01/03/2026) — quy định về tính minh bạch của hệ thống AI và dấu hiệu nhận biết nội dung do AI tạo ra.

**Khuyến nghị quốc tế (tham khảo, không phải nghĩa vụ pháp lý tại Việt Nam):**
- WHO (2021), *Ethics and governance of artificial intelligence for health* — khung đạo đức và quản trị AI trong y tế.
- WHO (2024), *Ethics and governance of artificial intelligence for health: Guidance on large multi-modal models* — hướng dẫn về mô hình đa phương thức lớn trong y tế.
- UNESCO (2021), *Recommendation on the Ethics of Artificial Intelligence* — khuyến nghị về đạo đức AI.

> Lưu ý phân biệt: các tài liệu WHO/UNESCO là khuyến nghị quốc tế để tham khảo; chỉ văn bản pháp luật Việt Nam mới là nghĩa vụ pháp lý áp dụng tại Việt Nam.

**Đọc thêm trong cẩm nang:** chương 13 (Hạ tầng tính toán — khi muốn tự chủ mô hình), chương 14 (An toàn, tuân thủ — khung quản trị đầy đủ).

---

> **Trạng thái bản thảo:** đây là bản nháp do AI soạn theo "Quy chuẩn biên tập chương và Lab" ngày 04/10/2026, **chưa qua tác giả duyệt**. Không phát hành dưới tên chủ biên. Các số liệu giá, tên gói sản phẩm mang tính thời điểm (10/2026) và cần kiểm tra lại khi xuất bản.
