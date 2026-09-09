// API route chấm điểm bài Lab bằng Groq GPT-OSS 120B
// Nhận: {chapter, lab_id, question, rubric, answer, learner_email?, learner_name?}
// Trả: {grade: 1-5, score: 0-100, rubric_breakdown, feedback}

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL =
  process.env.CUSTOM_CRED_API_GROQ_COM_URL || "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TOKEN = process.env.CUSTOM_CRED_API_GROQ_COM_TOKEN || "";
const SHEET_WEBHOOK = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK || "";

const MODEL = "openai/gpt-oss-120b";

const SYSTEM_PROMPT = `Bạn là giảng viên AI y tế chấm bài cho cẩm nang "AI trong Y tế Việt Nam". Nhiệm vụ:

1. Đọc câu hỏi, rubric và câu trả lời của học viên.
2. Chấm điểm theo thang 1–5 và cụ thể hóa thành điểm 0–100.
3. Phân tích từng tiêu chí rubric — cái nào đạt, cái nào thiếu.
4. Gợi ý cụ thể để cải thiện — đọc giọng thân thiện của một bs mentor, không phải kỳ thi.

**Tiếng Việt chuyên môn**, trả đúng định dạng JSON.`;

function buildUserPrompt(question: string, rubric: string, answer: string): string {
  return `# Câu hỏi
${question}

# Rubric chấm điểm 1–5
${rubric}

# Câu trả lời của học viên
${answer}

---
Trả về JSON đúng schema sau (không thêm text nào khác):
{
  "grade": <số nguyên 1-5>,
  "score": <0-100>,
  "rubric_breakdown": {
    "<tiêu_chí_1>": {"đạt": <boolean>, "nhận_xét": "<ngắn>"},
    "<tiêu_chí_2>": {"đạt": <boolean>, "nhận_xét": "<ngắn>"}
  },
  "feedback": "<đoạn văn 3-5 câu tiếng Việt: điểm mạnh, điểm yếu, hướng cải thiện>"
}`;
}

async function callGroq(question: string, rubric: string, answer: string) {
  if (!GROQ_TOKEN) throw new Error("GROQ_TOKEN not configured");

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(question, rubric, answer) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 1500,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error ${res.status}: ${errText}`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("Groq trả về rỗng");

  return JSON.parse(content);
}

async function saveToSheet(row: Record<string, unknown>) {
  if (!SHEET_WEBHOOK) {
    console.warn("[grade] SHEET_WEBHOOK chưa cấu hình, không lưu record");
    return;
  }
  try {
    // Apps Script quirk: gửi text/plain để tránh CORS preflight + redirect mất POST body
    await fetch(SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(row),
      redirect: "follow",
    });
  } catch (err) {
    console.error("[grade] Không ghi được vào Sheet:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chapter, lab_id, question, rubric, answer, learner_email, learner_name } = body;

    if (!question || !rubric || !answer) {
      return NextResponse.json({ error: "Thiếu question/rubric/answer" }, { status: 400 });
    }

    if (answer.length < 30) {
      return NextResponse.json(
        { error: "Câu trả lời quá ngắn (tối thiểu 30 ký tự)" },
        { status: 400 }
      );
    }

    const graded = await callGroq(question, rubric, answer);

    // Lưu vào Sheet (không chặn response nếu Sheet fail)
    saveToSheet({
      chapter,
      lab_id,
      question,
      answer,
      learner_email,
      learner_name,
      grade: graded.grade,
      score: graded.score,
      rubric_breakdown: graded.rubric_breakdown,
      feedback: graded.feedback,
      model: MODEL,
    });

    return NextResponse.json(graded);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
