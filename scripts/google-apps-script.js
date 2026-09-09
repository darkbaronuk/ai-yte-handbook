/**
 * Google Apps Script — Lab Grading Webhook
 *
 * Cách deploy (1 lần, ~2 phút):
 * 1. Mở https://docs.google.com/spreadsheets/d/1De4XX1b5CTj_XuozcYbnJjG52llvjh8eEdyLYmwmuRk/edit
 * 2. Extensions → Apps Script
 * 3. Dán toàn bộ file này vào Code.gs (thay code mặc định)
 * 4. Nhấn Deploy → New deployment → Type: Web app
 * 5. Execute as: Me | Who has access: Anyone
 * 6. Deploy → Copy URL
 * 7. Dán URL vào Vercel env: GOOGLE_APPS_SCRIPT_WEBHOOK
 */

const SHEET_ID = "1De4XX1b5CTj_XuozcYbnJjG52llvjh8eEdyLYmwmuRk";
const WORKSHEET = "Grades";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(WORKSHEET);

    sheet.appendRow([
      new Date().toISOString(),
      data.learner_email || "",
      data.learner_name || "",
      data.chapter || "",
      data.lab_id || "",
      data.question || "",
      data.answer || "",
      data.grade || "",
      data.score || "",
      JSON.stringify(data.rubric_breakdown || {}),
      data.feedback || "",
      data.model || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, hint: "POST JSON để ghi grading" }))
    .setMimeType(ContentService.MimeType.JSON);
}
