// Lộ trình học tập theo 6 vai trò — lớp e-learning trên cẩm nang.
// Slug chương lấy đúng từ content/chapters/*.md (xem lib/chapters.ts).

export type Role = {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  chapters: string[]; // slug theo thứ tự học gợi ý
  accent: string; // màu riêng của vai trò
};

export const ROLES: Role[] = [
  {
    id: "bac-si",
    name: "Bác sĩ lâm sàng",
    icon: "🩺",
    tagline: "Dùng AI hỗ trợ chẩn đoán, quyết định lâm sàng và giảm gánh nặng hồ sơ.",
    chapters: [
      "04-nen-tang-ai-da-nhiem",
      "05-ai-chan-doan-hinh-anh",
      "06-cdss",
      "08-quan-tri-benh-vien",
      "09-agentic-ai",
      "07-cham-soc-ban-dau",
      "14-an-toan-tuan-thu",
    ],
    accent: "#0f766e",
  },
  {
    id: "dieu-duong",
    name: "Điều dưỡng",
    icon: "💉",
    tagline: "AI trong chăm sóc ban đầu, theo dõi người bệnh và công việc điều dưỡng.",
    chapters: [
      "04-nen-tang-ai-da-nhiem",
      "07-cham-soc-ban-dau",
      "08-quan-tri-benh-vien",
      "06-cdss",
      "14-an-toan-tuan-thu",
    ],
    accent: "#2563eb",
  },
  {
    id: "giam-doc",
    name: "Giám đốc bệnh viện",
    icon: "🏥",
    tagline: "Ra quyết định đầu tư AI: hạ tầng, quản trị, tuân thủ và hiệu quả.",
    chapters: [
      "04-nen-tang-ai-da-nhiem",
      "08-quan-tri-benh-vien",
      "12-ha-tang-du-lieu",
      "13-ha-tang-tinh-toan",
      "09-agentic-ai",
      "14-an-toan-tuan-thu",
    ],
    accent: "#7c3aed",
  },
  {
    id: "chinh-sach",
    name: "Cán bộ chính sách",
    icon: "📋",
    tagline: "Khung chính sách, y tế dự phòng và quản trị AI ở tầm hệ thống.",
    chapters: [
      "01-hau-covid",
      "04-nen-tang-ai-da-nhiem",
      "10-y-te-du-phong",
      "14-an-toan-tuan-thu",
      "12-ha-tang-du-lieu",
    ],
    accent: "#b45309",
  },
  {
    id: "ky-su",
    name: "Kỹ sư HealthTech",
    icon: "💻",
    tagline: "Kiến trúc agent, hạ tầng dữ liệu và triển khai AI trong y tế.",
    chapters: [
      "04-nen-tang-ai-da-nhiem",
      "09-agentic-ai",
      "12-ha-tang-du-lieu",
      "13-ha-tang-tinh-toan",
      "11-nghien-cuu-y-sinh",
      "14-an-toan-tuan-thu",
    ],
    accent: "#0e7490",
  },
  {
    id: "nghien-cuu",
    name: "Nhà nghiên cứu",
    icon: "🔬",
    tagline: "AI cho nghiên cứu y sinh, dịch tễ và chân trời công nghệ.",
    chapters: [
      "04-nen-tang-ai-da-nhiem",
      "11-nghien-cuu-y-sinh",
      "10-y-te-du-phong",
      "09-agentic-ai",
      "15-agi-frontier-ai",
      "14-an-toan-tuan-thu",
    ],
    accent: "#be123c",
  },
];

export function getRole(id: string): Role | undefined {
  return ROLES.find((r) => r.id === id);
}

/** Ước tính thời gian đọc (phút) từ số từ — tốc độ 200 từ/phút. */
export function readingMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 200));
}

/** Đếm từ trong markdown thô (bỏ frontmatter và các block code). */
export function countWords(md: string): number {
  const noFrontmatter = md.replace(/^---[\s\S]*?---\n/, "");
  const noCode = noFrontmatter.replace(/```[\s\S]*?```/g, " ");
  const words = noCode.replace(/[#>*`\[\](){}|_-]/g, " ").split(/\s+/);
  return words.filter(Boolean).length;
}
