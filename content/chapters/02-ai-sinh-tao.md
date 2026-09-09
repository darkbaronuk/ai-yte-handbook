---
number: 2
title: 'AI sinh tạo: từ đồ chơi văn phòng đến trợ lý lâm sàng có kiểm chứng'
part: Phần I — Nền tảng và bước ngoặt
status: draft
domains:
  - Foundation & Generative AI
  - Clinical Decision Support
  - Research & Evidence Synthesis
miller: Knows how → Shows how
owners:
  - Nguyễn Hữu Tú
updated: 2026-09-09
summary: Từ ChatGPT tháng 11/2022 đến các thế hệ mô hình lập luận và ambient scribe hiện nay, AI sinh tạo đã chuyển từ demo văn phòng thành công cụ giảm gánh nặng ghi chép và trợ lý y văn có dẫn nguồn tại nhiều hệ thống y tế trên thế giới. Chương này phân tích ba làn sóng, ba lớp kỹ thuật quyết định chất lượng output, bốn giới hạn cố hữu, và bốn case triển khai thực đã công bố kết quả đo lường được.
---

> **Điểm neo của chương**
> >
> AI sinh tạo hiện tại không thay thế bác sĩ, nhưng đã có bằng chứng công bố cho
> thấy nó giảm được thời gian ghi chép lâm sàng 14–27% và giảm burnout ở một số
> hệ thống y tế lớn. Điều phân biệt cơ sở triển khai thành công không phải "có
> AI hay không", mà là \*\*có quy trình đo lường, kiểm chứng và thẩm định output
> hay không\*\*.

## Bốn năm, ba làn sóng

Cuối tháng 11/2022, khi OpenAI mở ChatGPT miễn phí cho công chúng, ít ai trong
ngành y tế Việt Nam tin rằng một chatbot văn phòng có thể liên quan gì đến bàn
hội chẩn. Đến hôm nay, tháng 9/2026, chính chatbot đó và các thế hệ kế thừa đã
trở thành lớp trung gian giữa bác sĩ và biển thông tin y khoa — một lớp có thể
sai, nhưng khi dùng đúng lại tiết kiệm được thời gian đo đếm được.

Bốn năm ngắn ngủi đã đi qua ba làn sóng khá rõ. Làn sóng thứ nhất (2022–2023) là
{t:generative-ai}AI sinh tạo{/t} thuần văn bản: GPT-3.5 rồi GPT-4, Claude 1–2,
LLaMA 1. Người dùng ngạc nhiên vì mô hình có thể viết mail, tóm tắt bài báo, sinh
code. Trong y tế, các bác sĩ thử hỏi triệu chứng rồi bật cười vì mô hình
{t:hallucination}bịa đặt liều lượng{/t} với văn phong tự tin đáng sợ.

Làn sóng thứ hai (2023–2025) là **đa phương thức và grounding**. GPT-4V, Claude 3
Opus, Gemini 1.5 đọc được ảnh X-quang. Cửa sổ ngữ cảnh nhảy từ 8K lên 200K, rồi 1M
token. Kỹ thuật {t:rag}RAG (Retrieval-Augmented Generation){/t} trở thành chuẩn
công nghiệp để giảm ảo giác: thay vì mô hình sinh từ trí nhớ, nó tra cứu tài liệu
thật rồi trả lời có dẫn nguồn. Cùng thời gian này, Elsevier đưa ra
[ScienceDirect AI (3/2025)](https://www.elsevier.com/about/press-releases/elsevier-launches-sciencedirect-ai-to-transform-research-with-rapid-mission)
với cam kết tiết kiệm khoảng 50% thời gian đọc y văn, và Nabla, Nuance, Ambience
bắt đầu bán ambient scribe cho các hệ thống bệnh viện lớn ở Mỹ.

Làn sóng thứ ba (2025–2026) là \*\*mô hình lập luận và ambient scribe trưởng
thành\*\*. OpenAI o3/o4, Anthropic Claude 4 Sonnet Thinking, DeepSeek R1 tích hợp
{t:chain-of-thought}suy luận chuỗi{/t} vào kiến trúc. Elsevier tung
[LeapSpace (11/2025 preview, 21/1/2026 GA)](https://www.elsevier.com/about/press-releases/leapspace-goes-live-the-research-grade-ai-assisted-workspace)
với hơn 20 triệu bài full-text peer-reviewed và cơ chế Trust Cards. Song song,
tại châu Á, [SingHealth triển khai Note Buddy (18/9/2024)](https://www.singhealth.com.sg/news/innovation/singhealth-implements-note-buddy-a-microsoft-ai-documentation-system-to-transform-clinical-documentation-and-enhance-quality-of-doctor-patient-interactions),
Bộ Y tế Việt Nam ra mắt [mạng lưới V-RHAIN (14/1/2026)](https://www.vietnam.vn/en/bo-y-te-khoi-dong-mang-luoi-ai-y-te-muc-tieu-dua-tri-tue-nhan-tao-ve-hon-3-300-tram-y-te)
với mục tiêu đưa AI xuống 3.321 trạm y tế xã, phường trong năm 2026.

```metrics
[
  {"value":"20M+","label":"Bài full-text peer-reviewed trên LeapSpace","hint":"Elsevier 01/2026"},
  {"value":"400+","label":"Tổ chức y tế Mỹ dùng DAX Copilot","hint":"Microsoft 09/2024"},
  {"value":"3.321","label":"Trạm y tế xã/phường VN mục tiêu 2026","hint":"V-RHAIN"},
  {"value":"~50%","label":"Thời gian đọc y văn giảm nhờ ScienceDirect AI","hint":"Elsevier 03/2025"}
]
```

## Ba mảnh ghép làm nên một câu trả lời tốt

Để hiểu vì sao AI sinh tạo lúc thì thiên tài, lúc lại bịa đặt trắng trợn, cần
nhìn vào ba mảnh ghép quyết định chất lượng output. Bất kỳ ai muốn dùng AI trong
công việc lâm sàng đều nên nắm được ba lớp này.

Lớp thứ nhất là {t:foundation-model}foundation model{/t} — bộ não gốc, được huấn
luyện tự giám sát trên hàng nghìn tỷ token từ web, sách, code. Đây là nơi mô hình
"biết" ngôn ngữ và một lượng lớn kiến thức chung. Nhược điểm cố hữu: dữ liệu có
điểm cắt (knowledge cutoff), có thể lẫn thông tin sai, và mô hình không phân biệt
được "tôi biết chắc" với "tôi đoán".

Lớp thứ hai là {t:instruction-tuning}instruction tuning{/t} và
{t:rlhf}RLHF (Reinforcement Learning from Human Feedback){/t} — hai bước tinh chỉnh
biến base model thành chatbot dùng được. Instruction tuning dạy mô hình làm theo
yêu cầu; RLHF dùng đánh giá của con người để định hướng phong cách trả lời. Đây là
lý do ChatGPT lịch sự và có ích hơn GPT-3 mặc dù về kiến thức không hơn nhiều.

Lớp thứ ba là **grounding tại thời điểm suy luận** — bao gồm RAG, tra công cụ, và
citation buộc. Đây là lớp quyết định trong y tế: một mô hình có thể sai về kiến
thức nội tại, nhưng nếu được buộc phải trích dẫn nguồn từ một corpus đáng tin cậy,
sai số giảm đi đáng kể. LeapSpace, OpenEvidence, và ambient scribe có tính năng
"Summarized Evidence" đều dựa vào lớp này.

Ba lớp này cùng quyết định chất lượng, nhưng theo hướng khác nhau. Foundation
model tốt cho "biết rộng"; instruction tuning tốt cho "trả lời đúng ý"; grounding
tốt cho "dẫn được nguồn". Một chatbot mạnh về lớp thứ nhất nhưng yếu lớp thứ ba
(ChatGPT phiên bản mặc định) sẽ trôi chảy nhưng khó cite lại; ngược lại, một công
cụ chuyên grounding như OpenEvidence có thể ít "linh hoạt" hơn nhưng cho câu trả
lời dễ thẩm định hơn trong bối cảnh lâm sàng.

## Bốn giới hạn cần biết

```callout kind=warning title="Bốn giới hạn cố hữu của AI sinh tạo trong y tế"
Không thảo luận về giới hạn thì bàn về AI y tế chỉ là hô khẩu hiệu. Bốn giới hạn
dưới đây tồn tại với cả những mô hình mạnh nhất hiện tại và không thể bỏ qua khi
xây quy trình lâm sàng.
```

Giới hạn thứ nhất là **ảo giác không loại trừ được**. Ngay cả khi tăng cường
grounding, mô hình vẫn có thể diễn giải sai nguồn, trộn lẫn hai nghiên cứu, hoặc
tổng hợp một liều dùng không có trong bất kỳ hướng dẫn nào. Nghiên cứu bedside
consultation của Med-PaLM 2 công bố trên [Nature Medicine 2025](https://www.nature.com/articles/s41591-024-03423-7)
cho thấy: với câu hỏi lâm sàng thực tế, chuyên gia thích câu trả lời của Med-PaLM 2
hơn của bác sĩ tổng quát 65% lần, nhưng vẫn thua rõ chuyên gia — chuyên gia được
ưa thích hơn \~60%. Nghĩa là AI đã ngang bác sĩ tổng quát trong ngữ cảnh cụ thể,
nhưng chưa ngang chuyên gia. Bác sĩ phải giữ nguyên tắc: \*\*mọi con số liều/dose
từ AI đều phải kiểm chứng lại với dược thư/hướng dẫn gốc trước khi kê\*\*.

Giới hạn thứ hai là **thiên kiến từ dữ liệu huấn luyện**. Đa số foundation model
huấn luyện chủ yếu trên y văn tiếng Anh, tập trung vào Bắc Mỹ và Tây Âu. Tần suất
bệnh, dịch tễ, phổ đề kháng kháng sinh, kiểu di truyền dân số Việt Nam thường bị
đánh giá dưới hoặc sai. Khuyến cáo: khi hỏi về bệnh có tính đặc thù địa lý (sốt
xuất huyết, gan mật do HBV, viêm não Nhật Bản), luôn đối chiếu với hướng dẫn
quốc gia của Bộ Y tế.

Giới hạn thứ ba là **thiếu context bệnh nhân cụ thể**. AI không nhìn thấy bệnh
nhân, không nghe được nhịp tim, không sờ được bụng. Nó chỉ có văn bản mà bác sĩ
gõ vào. Nếu prompt sơ sài, output cũng sơ sài. Đây là lý do các quy trình sử dụng
AI hiệu quả thường có cấu trúc: bối cảnh + câu hỏi cụ thể + ràng buộc cần thiết.

Giới hạn thứ tư — và quan trọng nhất về pháp lý — là **trách nhiệm khi sai**. Ở
Việt Nam đến tháng 9/2026, chưa có quy định pháp lý cụ thể về trách nhiệm khi AI
đưa ra khuyến nghị dẫn đến tổn hại lâm sàng. V-RHAIN đang đóng vai trò sandbox
thí điểm có kiểm soát; Cục Khoa học Công nghệ Bộ Y tế yêu cầu các đơn vị tham
gia cam kết cung cấp dữ liệu sạch, tham gia Hệ thống Cảnh báo sớm và chịu trách
nhiệm về thuật toán. Trong khoảng trống pháp lý này, \*\*bác sĩ vẫn là người chịu
trách nhiệm cuối cùng\*\*.

## Bốn case triển khai thực, số liệu đã công bố

Thay vì mô tả tiềm năng chung chung, phần này liệt kê bốn triển khai đã có báo
cáo công khai kết quả đo lường được. Mục tiêu không phải quảng bá công cụ, mà để
người đọc có mốc so sánh khi cân nhắc triển khai ở cơ sở của mình.

### 1) Kaiser Permanente & Children's Hospital Los Angeles — Nabla Copilot

Nabla là ambient scribe (trợ lý ghi chép thụ động qua micro) được The Permanente
Medical Group triển khai từ 2023. Trong pilot ban đầu tại Permanente, Dr. Ed Lee
báo cáo **giảm 25–30% thời gian ghi chép mỗi lần khám**, với bác sĩ trung bình
có 20+ ca/ngày, điều này cộng dồn thành "vài giờ mỗi ngày" tiết kiệm được. Trên
cơ sở đó, [Children's Hospital Los Angeles (3/2024)](https://www.hcinnovationgroup.com/analytics-ai/article/53098833/childrens-hospital-los-angeles-to-roll-out-nabla-copilot-ambient-ai-assistant)
pilot với 30 bác sĩ chuyên khoa nhi, rồi mở rộng thêm 27 bác sĩ, sau đó tính đến
việc mở cho cả công tác xã hội và tâm lý viên — những người cũng có "trải nghiệm
tự sự với bệnh nhân". Điểm cần chú ý trong case này là \*\*customization cho nhi
khoa\*\*: template phải điều chỉnh cho well-child exam, xử lý được tình huống hai
phụ huynh, hai trẻ, và một phiên dịch trong cùng một ca; nhu cầu tiếng Tây Ban
Nha lớn ở CHLA cũng phải được hỗ trợ ngay.

### 2) Overlake & Northwestern Medicine — DAX Copilot

Nuance DAX Copilot (nay là Microsoft Dragon Copilot) là ambient scribe tích hợp
sâu với Epic EHR. Theo báo cáo [một năm triển khai của Microsoft (9/2024)](https://blogs.microsoft.com/blog/2024/09/26/a-year-of-dax-copilot-healthcare-innovation-that-refocuses-on-the-clinician-patient-connection/):

- **Northwestern Medicine (Chicago)**: bác sĩ dùng DAX trong ≥50% ca khám, khám
  thêm trung bình **11,3 bệnh nhân/tháng**, giảm **24% thời gian ghi chép** và
  giảm **17% "pajama time"** (thời gian làm việc muộn ban đêm).
- **Overlake Medical Center (Bellevue, WA)**: pilot 30 bác sĩ. **81%** nói DAX
  giảm gánh nặng nhận thức, **77%** nói cải thiện chất lượng tài liệu.
- Tổng cộng hơn **400 tổ chức y tế** Mỹ đã triển khai đến 9/2024, xây trên nền
  Dragon Medical đang được 600.000+ bác sĩ thế giới dùng.

Điểm cần chú ý: các con số này là báo cáo do vendor cung cấp, không có sample
size chi tiết cho Northwestern; nhưng cấu trúc số liệu ("dùng trong X% ca" +
"thời gian giảm Y%") là mô hình đo lường tốt để các cơ sở khác học theo.

### 3) Mass General Brigham, Cleveland Clinic, Intermountain — nghiên cứu JAMA 2025

Đây là bằng chứng học thuật gần nhất. Theo [tổng hợp của American Hospital
Association (14/4/2026)](https://www.aha.org/aha-center-health-innovation-market-scan/2026-04-14-6-health-systems-enhancing-care-delivery-ambient-ai-scribes):

- **Mass General Brigham**: sau 84 ngày dùng ambient documentation, **burnout**
\*\*  prevalence giảm 21,2%\*\* (nghiên cứu JAMA 2025).
- **Emory Healthcare**: tăng **30,7% documentation-related well-being** liên
  quan tới ambient scribe (JAMA 2025).
- **Cleveland Clinic** (dùng AI Scribe của Ambience): giảm **14 phút/ngày** thời
  gian viết và review note trong EHR.
- **Intermountain Health** (dùng Dragon Copilot, 4/2024–12/2025): với bác sĩ đã
  dùng ≥10 encounter, giảm **27% thời gian trong note mỗi cuộc hẹn**.
- **Nghiên cứu JAMA đa trung tâm (5 academic medical center)**: ambient scribe
  giảm **13,4 phút thời gian EHR tổng** và **16,0 phút thời gian ghi chép**,
  liên quan tới **0,49 ca khám thêm/tuần** cho bác sĩ tham gia.

Đây là bộ số liệu có ý nghĩa cho các bệnh viện lớn Việt Nam đang cân nhắc
ambient scribe: mức độ tiết kiệm không "biến hình" như quảng cáo (không phải 90%
mà là 15–27%), nhưng nhất quán qua nhiều trung tâm độc lập và đã được peer
review. Mức tiết kiệm này, khi nhân với hàng trăm bác sĩ, đủ để biện minh cho
đầu tư.

### 4) SingHealth Note Buddy — case châu Á đầu tiên đáng học

Trong khu vực, [SingHealth triển khai Note Buddy (9/2024)](https://www.singhealth.com.sg/news/innovation/singhealth-implements-note-buddy-a-microsoft-ai-documentation-system-to-transform-clinical-documentation-and-enhance-quality-of-doctor-patient-interactions)
— hệ thống ghi chép AI dựa trên nền tảng Synapxe Tandem (Azure OpenAI đóng gói
an toàn nội địa Singapore). Điểm đặc biệt: \*\*hỗ trợ đồng thời tiếng Anh, Quan
thoại, Mã Lai và Tamil\*\*, phản ánh dân số đa ngôn ngữ Singapore. SingHealth đặt
mục tiêu triển khai cho toàn bộ bác sĩ ở tất cả các cơ sở trong cluster đến cuối

2024. Đến nay, đây là ví dụ có công bố sớm nhất ở châu Á về ambient scribe cấp
hệ thống, và mô hình đóng gói qua HealthTech agency là hướng đi đáng để Bộ Y tế
Việt Nam tham khảo cho V-RHAIN.

```timeline
[
  {"year":"03/2023","event":"Nabla pilot đầu tiên tại Permanente: giảm 25–30% giờ chép note","kind":"success"},
  {"year":"03/2024","event":"CHLA rollout Nabla cho nhi khoa","kind":"milestone"},
  {"year":"09/2024","event":"DAX Copilot 1 năm GA: 400+ tổ chức, Overlake 81% giảm cognitive burden","kind":"success"},
  {"year":"09/2024","event":"SingHealth ra mắt Note Buddy (đa ngôn ngữ)","kind":"milestone"},
  {"year":"03/2025","event":"Elsevier ScienceDirect AI: giảm 50% thời gian đọc y văn","kind":"success"},
  {"year":"2025","event":"JAMA nghiên cứu: Mass General giảm 21,2% burnout với ambient scribe","kind":"success"},
  {"year":"01/2026","event":"Elsevier LeapSpace GA; Bộ Y tế VN ra mắt V-RHAIN","kind":"milestone"},
  {"year":"03/2026","event":"Hà Nội pilot AI hình ảnh tại 3 bệnh viện (Đức Giang, Saint Paul, Ung bướu)","kind":"milestone"}
]
```

## Bài học rút ra cho triển khai tại Việt Nam

Bốn case trên đến từ ba châu lục và bốn loại tổ chức khác nhau, nhưng chia sẻ ba
mẫu chung mà bất kỳ cơ sở y tế Việt Nam nào cân nhắc AI sinh tạo cũng nên soi
vào.

**Thứ nhất, ambient scribe cho ghi chép có bằng chứng mạnh hơn chatbot chẩn**
**đoán.** Kết quả JAMA đa trung tâm cho thấy tiết kiệm 13,4–27% thời gian là ổn
định; trong khi các nghiên cứu về AI chẩn đoán như Med-PaLM 2 tuy ấn tượng
benchmark nhưng chưa có triển khai lâm sàng cấp hệ thống với số liệu tương
đương. Nếu tuyến tỉnh Việt Nam bắt đầu, nên bắt đầu ở ghi chép và tổng hợp bệnh
án, không ở khuyến nghị chẩn đoán.

**Thứ hai, đa ngôn ngữ là yêu cầu bắt buộc, không phải "nice to have".** Cả CHLA
(tiếng Tây Ban Nha), SingHealth (4 ngôn ngữ), V-RHAIN (tiếng Việt + tiếng dân
tộc) đều xác định đây là điều kiện tiên quyết. Ambient scribe tiếng Anh thuần
không chạy được ở tuyến xã Việt Nam nếu không có bước localize.

**Thứ ba, tổ chức tiên phong đều đo và công bố.** Northwestern công bố 24% và
11,3 ca/tháng; Mass General công bố 21,2% burnout; Cleveland công bố 14 phút.
Không có tổ chức nào thành công mà giấu số liệu. Đây là điểm Việt Nam còn yếu —
các pilot y tế trong nước hiện chưa có báo cáo hiệu quả lâm sàng công khai
theo chuẩn tương đương. Cải thiện điểm này là điều kiện để V-RHAIN
tránh thành phong trào.

## Ba nguyên tắc dùng AI sinh tạo trong ngày lâm sàng

```callout kind=tip title="Ba nguyên tắc thực hành"
Đúc kết từ bốn case ở trên và khuyến cáo an toàn của V-RHAIN, dùng như checklist
tối thiểu trước khi đưa bất kỳ output AI nào vào quyết định lâm sàng.
```

**Nguyên tắc 1 — Grounding trước.** Với các quyết định có tác động lâm sàng (đổi
phác đồ, chỉ định thuốc mới, cân nhắc phẫu thuật), chỉ dùng công cụ có RAG y
văn: LeapSpace, OpenEvidence, Perplexity Pro với chế độ "Academic". Không dùng
ChatGPT thuần cho các quyết định này.

**Nguyên tắc 2 — Cite hoặc bỏ.** Nếu AI đưa ra khuyến nghị nhưng không dẫn được
nguồn cụ thể có thể tra ra bản gốc, bỏ. Không viết vào bệnh án. Không đưa vào
tổng hợp cho hội chẩn. Đây là nguyên tắc phòng ngừa duy nhất đủ chặt để bảo vệ
bác sĩ khỏi tình huống bị AI "kéo xuống hố" bằng nguồn bịa.

**Nguyên tắc 3 — Hai lần đọc.** Câu trả lời AI luôn đọc hai lần: lần một để hiểu
nội dung, lần hai để tìm chỗ đáng ngờ. Đọc lần hai tốt nhất là sau khi mở nguồn
gốc mà AI trích để so sánh.

<div class="lab-cta"><a href="/lab/lab-02" target="_blank" rel="noopener noreferrer" class="lab-btn">▶ Mở Lab 02 trong tab mới</a><div class="lab-meta">\~15 phút · AI chấm rubric 5 tiêu chí · Ghi tự động vào sổ grading</div></div>

## Tài liệu tham khảo

1. Elsevier. [Elsevier launches ScienceDirect AI to transform research](https://www.elsevier.com/about/press-releases/elsevier-launches-sciencedirect-ai-to-transform-research-with-rapid-mission). 12/3/2025.
2. Elsevier. [LeapSpace goes live: the Research-Grade AI-Assisted Workspace](https://www.elsevier.com/about/press-releases/leapspace-goes-live-the-research-grade-ai-assisted-workspace). 21/1/2026.
3. Raths D. [Children's Hospital Los Angeles to Roll Out Nabla Copilot Ambient AI Assistant](https://www.hcinnovationgroup.com/analytics-ai/article/53098833/childrens-hospital-los-angeles-to-roll-out-nabla-copilot-ambient-ai-assistant). Healthcare Innovation Group, 12/3/2024.
4. Dahdah R. [A year of DAX Copilot: Healthcare innovation that refocuses on the clinician-patient connection](https://blogs.microsoft.com/blog/2024/09/26/a-year-of-dax-copilot-healthcare-innovation-that-refocuses-on-the-clinician-patient-connection/). Microsoft Official Blog, 26/9/2024.
5. American Hospital Association. [6 Health Systems Enhancing Care Delivery with Ambient AI Scribes](https://www.aha.org/aha-center-health-innovation-market-scan/2026-04-14-6-health-systems-enhancing-care-delivery-ambient-ai-scribes). 14/4/2026.
6. SingHealth. [SingHealth implements Note Buddy, a Microsoft AI documentation system](https://www.singhealth.com.sg/news/innovation/singhealth-implements-note-buddy-a-microsoft-ai-documentation-system-to-transform-clinical-documentation-and-enhance-quality-of-doctor-patient-interactions). 18/9/2024.
7. Singhal K, et al. Toward expert-level medical question answering with large language models. [Nature Medicine (2025)](https://www.nature.com/articles/s41591-024-03423-7).
8. Bộ Y tế Việt Nam. [Khởi động mạng lưới V-RHAIN — mục tiêu đưa AI về hơn 3.300 trạm y tế](https://www.vietnam.vn/en/bo-y-te-khoi-dong-mang-luoi-ai-y-te-muc-tieu-dua-tri-tue-nhan-tao-ve-hon-3-300-tram-y-te). 14/1/2026.
9. Vietnam Investment Review. [Hanoi to pilot AI at three hospitals for early cancer and stroke detection](https://vir.com.vn/hanoi-to-pilot-ai-at-three-hospitals-for-early-cancer-and-stroke-detection-148811.html). 19/3/2026.

## Ghi chú biên tập

- Toàn bộ số liệu trong chương là công bố công khai từ nguồn có thể tra. Các
  con số của Northwestern, Overlake, Mass General là báo cáo do tổ chức/vendor
  công bố, đọc kèm ngữ cảnh về sample size như đã ghi.
- Chương không dùng biểu đồ radar "cảm nhận" — tránh cho có mà không kiểm chứng
  được.
- Chương này giả định người đọc đã đọc Chương 01. Nếu chưa, khuyến nghị đọc lại
  phần "bốn bài học từ COVID" để bối cảnh quản trị nhất quán.
