// \u0110\u1ecbnh ngh\u0129a Lab \u2014 c\u00e2u h\u1ecfi + rubric cho m\u1ed7i ch\u01b0\u01a1ng.
// Th\u00eam Lab m\u1edbi b\u1eb1ng c\u00e1ch push v\u00e0o array n\u00e0y.

export type Lab = {
  id: string;
  chapter: string;
  title: string;
  intro: string;
  question: string;
  rubric: string;
  minLength: number;
  suggestedTimeMin: number;
};

export const LABS: Lab[] = [
  {
    id: "lab-01",
    chapter: "01-hau-covid",
    title: "Lab 1 \u2014 B\u00e0i h\u1ecdc t\u1eeb COVID cho AI y t\u1ebf Vi\u1ec7t Nam 2026",
    intro:
      "B\u00e0i lab \u0111\u1ea7u ti\u00ean c\u1ee7a c\u1ea9m nang y\u00eau c\u1ea7u b\u1ea1n suy ng\u1eabm v\u00e0 vi\u1ebft ng\u1eafn m\u1ed9t \u0111o\u1ea1n v\u0103n. Kh\u00f4ng c\u00f3 \u0111\u00e1p \u00e1n \u0111\u00fang tuy\u1ec7t \u0111\u1ed1i \u2014 AI s\u1ebd ch\u1ea5m theo rubric r\u00f5 r\u00e0ng v\u00e0 g\u1ee3i \u00fd c\u1ea3i thi\u1ec7n. \u0110i\u1ec3m \u0111\u01b0\u1ee3c l\u01b0u l\u1ea1i \u0111\u1ec3 theo d\u00f5i ti\u1ebfn \u0111\u1ed9 c\u1ee7a b\u1ea1n xuy\u00ean su\u1ed1t 17 ch\u01b0\u01a1ng.",
    question:
      "Trong b\u1ed1n b\u00e0i h\u1ecdc t\u1eeb giai \u0111o\u1ea1n COVID (d\u1eef li\u1ec7u ph\u00e2n m\u1ea3nh, qu\u1ea3n tr\u1ecb l\u1ecfng, ng\u01b0\u1eddi d\u00f9ng s\u1eb5n s\u00e0ng, m\u00e3 ngu\u1ed3n m\u1edf l\u00e0 chi\u1ebfn l\u01b0\u1ee3c), b\u00e0i h\u1ecdc n\u00e0o theo b\u1ea1n c\u00f2n gi\u00e1 tr\u1ecb nh\u1ea5t \u0111\u1ebfn 2026 v\u00e0 t\u1ea1i sao? Vi\u1ebft \u0111o\u1ea1n v\u0103n 150\u2013250 t\u1eeb, d\u1eabn \u00edt nh\u1ea5t m\u1ed9t v\u00ed d\u1ee5 c\u1ee5 th\u1ec3 (t\u1eeb ch\u00ednh ch\u01b0\u01a1ng 01 ho\u1eb7c t\u1eeb kinh nghi\u1ec7m c\u1ee7a b\u1ea1n).",
    rubric: `
- **L\u1eadp lu\u1eadn**: Ch\u1ecdn ra b\u00e0i h\u1ecdc c\u1ee5 th\u1ec3 v\u00e0 gi\u1ea3i th\u00edch v\u00ec sao n\u00f3 c\u00f2n gi\u00e1 tr\u1ecb \u0111\u1ebfn 2026. Kh\u00f4ng ch\u1ec9 li\u1ec7t k\u00ea.
- **B\u1eb1ng ch\u1ee9ng**: D\u1eabn \u00edt nh\u1ea5t 1 v\u00ed d\u1ee5 c\u1ee5 th\u1ec3 (DrAid, VinDr-CXR, Bluezone, ho\u1eb7c kinh nghi\u1ec7m ri\u00eang). V\u00ed d\u1ee5 ph\u1ea3i li\u00ean quan tr\u1ef1c ti\u1ebfp t\u1edbi b\u00e0i h\u1ecdc \u0111\u00e3 ch\u1ecdn.
- **Li\u00ean h\u1ec7 2026**: N\u00eau \u0111\u01b0\u1ee3c v\u00ec sao b\u00e0i h\u1ecdc c\u00f2n gi\u00e1 tr\u1ecb \u1edf b\u1ed1i c\u1ea3nh AI sinh t\u1ea1o hi\u1ec7n t\u1ea1i (LLM, RAG, agentic AI, v.v.).
- **V\u0103n phong**: R\u00f5 r\u00e0ng, m\u1ea1ch l\u1ea1c, kh\u00f4ng l\u1eb7p, kh\u00f4ng lan man, \u0111\u1ee7 150\u2013250 t\u1eeb.
- **T\u01b0 duy \u0111\u1ed9c l\u1eadp**: C\u00f3 g\u00f3c nh\u00ecn ri\u00eang, kh\u00f4ng ch\u1ec9 t\u00f3m t\u1eaft l\u1ea1i n\u1ed9i dung ch\u01b0\u01a1ng.

**Grade 5**: \u0110\u1ea1t 5/5 ti\u00eau ch\u00ed, c\u00f3 nh\u1eadn \u0111\u1ecbnh s\u1eafc s\u1ea3o.
**Grade 4**: \u0110\u1ea1t 4/5, c\u00f3 chi\u1ec1u s\u00e2u nh\u01b0ng thi\u1ebfu m\u1ed9t \u00fd.
**Grade 3**: \u0110\u1ea1t 3/5, \u0111\u00fang h\u01b0\u1edbng nh\u01b0ng thi\u1ebfu b\u1eb1ng ch\u1ee9ng ho\u1eb7c li\u00ean h\u1ec7 2026.
**Grade 2**: \u0110\u1ea1t 2/5, l\u1eadp lu\u1eadn y\u1ebfu ho\u1eb7c thi\u1ebfu v\u00ed d\u1ee5.
**Grade 1**: Kh\u00f4ng \u0111\u1ea1t, l\u1ea1c \u0111\u1ec1 ho\u1eb7c qu\u00e1 s\u01a1 s\u00e0i.`,
    minLength: 300,
    suggestedTimeMin: 15,
  },
];

export function getLab(id: string): Lab | undefined {
  return LABS.find((l) => l.id === id);
}

export function getLabsForChapter(chapterSlug: string): Lab[] {
  return LABS.filter((l) => l.chapter === chapterSlug);
}
