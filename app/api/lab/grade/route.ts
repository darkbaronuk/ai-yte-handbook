// API route ch\u1ea5m \u0111i\u1ec3m b\u00e0i Lab b\u1eb1ng Groq Llama 3.3 70B
// Nh\u1eadn: {chapter, lab_id, question, rubric, answer, learner_email?, learner_name?}
// Tr\u1ea3: {grade: 1-5, score: 0-100, rubric_breakdown, feedback}

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = process.env.CUSTOM_CRED_API_GROQ_COM_URL || "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TOKEN = process.env.CUSTOM_CRED_API_GROQ_COM_TOKEN || "";
const SHEET_WEBHOOK = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK || "";

const MODEL = "openai/gpt-oss-120b";

const SYSTEM_PROMPT = `B\u1ea1n l\u00e0 gi\u1ea3ng vi\u00ean AI y t\u1ebf ch\u1ea5m b\u00e0i cho c\u1ea9m nang "AI trong Y t\u1ebf Vi\u1ec7t Nam". Nhi\u1ec7m v\u1ee5:

1. \u0110\u1ecdc c\u00e2u h\u1ecfi, rubric v\u00e0 c\u00e2u tr\u1ea3 l\u1eddi c\u1ee7a h\u1ecdc vi\u00ean.
2. Ch\u1ea5m \u0111i\u1ec3m theo thang 1\u20135 v\u00e0 c\u1ee5 th\u1ec3 h\u00f3a th\u00e0nh \u0111i\u1ec3m 0\u2013100.
3. Ph\u00e2n t\u00edch t\u1eebng ti\u00eau ch\u00ed rubric — c\u00e1i n\u00e0o \u0111\u1ea1t, c\u00e1i n\u00e0o thi\u1ebfu.
4. G\u1ee3i \u00fd c\u1ee5 th\u1ec3 \u0111\u1ec3 c\u1ea3i thi\u1ec7n — \u0111\u1ecdc gi\u1ecdng th\u00e2n thi\u1ec7n c\u1ee7a m\u1ed9t bs mentor, kh\u00f4ng ph\u1ea3i k\u1ef3 thi.

**Ti\u1ebfng Vi\u1ec7t chuy\u00ean m\u00f4n**, tr\u1ea3 \u0111\u00fang \u0111\u1ecbnh d\u1ea1ng JSON.`;

function buildUserPrompt(question: string, rubric: string, answer: string): string {
  return `# C\u00e2u h\u1ecfi\n${question}\n\n# Rubric ch\u1ea5m \u0111i\u1ec3m 1\u20135\n${rubric}\n\n# C\u00e2u tr\u1ea3 l\u1eddi c\u1ee7a h\u1ecdc vi\u00ean\n${answer}\n\n---\nTr\u1ea3 v\u1ec1 JSON \u0111\u00fang schema sau (kh\u00f4ng th\u00eam text n\u00e0o kh\u00e1c):\n{\n  "grade": <s\u1ed1 nguy\u00ean 1-5>,\n  "score": <0-100>,\n  "rubric_breakdown": {\n    "<ti\u00eau_ch\u00ed_1>": {"\u0111\u1ea1t": <boolean>, "nh\u1eadn_x\u00e9t": "<ng\u1eafn>"},\n    "<ti\u00eau_ch\u00ed_2>": {"\u0111\u1ea1t": <boolean>, "nh\u1eadn_x\u00e9t": "<ng\u1eafn>"}\n  },\n  "feedback": "<\u0111o\u1ea1n v\u0103n 3-5 c\u00e2u ti\u1ebfng Vi\u1ec7t: \u0111i\u1ec3m m\u1ea1nh, \u0111i\u1ec3m y\u1ebfu, h\u01b0\u1edbng c\u1ea3i thi\u1ec7n>"\n}`;
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
  if (!content) throw new Error("Groq tr\u1ea3 v\u1ec1 r\u1ed7ng");

  return JSON.parse(content);
}

async function saveToSheet(row: Record<string, unknown>) {
  if (!SHEET_WEBHOOK) {
    console.warn("[grade] SHEET_WEBHOOK ch\u01b0a c\u1ea5u h\u00ecnh, kh\u00f4ng l\u01b0u record");
    return;
  }
  try {
    await fetch(SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
  } catch (err) {
    console.error("[grade] Kh\u00f4ng ghi \u0111\u01b0\u1ee3c v\u00e0o Sheet:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chapter, lab_id, question, rubric, answer, learner_email, learner_name } = body;

    if (!question || !rubric || !answer) {
      return NextResponse.json({ error: "Thi\u1ebfu question/rubric/answer" }, { status: 400 });
    }

    if (answer.length < 30) {
      return NextResponse.json({ error: "C\u00e2u tr\u1ea3 l\u1eddi qu\u00e1 ng\u1eafn (t\u1ed1i thi\u1ec3u 30 k\u00fd t\u1ef1)" }, { status: 400 });
    }

    const graded = await callGroq(question, rubric, answer);

    // L\u01b0u v\u00e0o Sheet (kh\u00f4ng ch\u1eb7n response n\u1ebfu Sheet fail)
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
