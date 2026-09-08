const DOMAINS = [
  { key: "PC", name: "Patient Care", desc: "Chăm sóc bệnh nhân với AI" },
  { key: "DA", name: "Data", desc: "Dữ liệu y tế và chuẩn hóa" },
  { key: "IN", name: "Informatics", desc: "Tin học y tế và hệ thống" },
  { key: "CO", name: "Communication", desc: "Giao tiếp số trong y tế" },
  { key: "TE", name: "Technical", desc: "Năng lực kỹ thuật AI" },
  { key: "DP", name: "Digital Prof.", desc: "Y đức số và tuân thủ" },
  { key: "AD", name: "Administration", desc: "Quản trị và điều hành số" },
];

const GRADES = [
  { g: 1, name: "Foundation", desc: "Novice — biết khái niệm" },
  { g: 2, name: "Practitioner", desc: "Advanced Beginner — có hướng dẫn" },
  { g: 3, name: "Competent", desc: "Làm việc độc lập" },
  { g: 4, name: "Proficient", desc: "Hiểu sâu, thích ứng" },
  { g: 5, name: "Expert", desc: "Dẫn dắt, đóng góp mới" },
];

const MILLER = [
  { name: "Knows", desc: "MCQ", weight: 1 },
  { name: "Knows How", desc: "Case study có đáp án", weight: 2 },
  { name: "Shows How", desc: "Sandbox thực hành", weight: 3 },
  { name: "Does", desc: "Báo cáo triển khai thực tế", weight: 5 },
];

export default function MaTran() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-2">Ma trận năng lực</h1>
      <p className="text-slate-600 mb-10 max-w-3xl">
        Toàn bộ hệ thống grade và Lab của cẩm nang bám theo khung này:{" "}
        <b>7 Domain × 5 Grade × 4 tầng Miller</b>, có kiểm chứng qua các khung
        quốc tế WHO 2026, Miller 1990, Benner/TIGER, HIMSS EMRAM.
      </p>

      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">
          Trục ngang — 7 Domain (WHO Digital Health Competency 2026)
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {DOMAINS.map((d) => (
            <div
              key={d.key}
              className="border border-slate-200 rounded p-4 bg-white"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs bg-accent text-white px-2 py-0.5 rounded">
                  {d.key}
                </span>
                <span className="font-serif font-semibold">{d.name}</span>
              </div>
              <div className="text-sm text-slate-600 mt-1">{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">
          Trục dọc — 5 Grade (Dreyfus / TIGER)
        </h2>
        <div className="overflow-hidden border border-slate-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3">Grade</th>
                <th className="text-left px-4 py-3">Tên chuẩn</th>
                <th className="text-left px-4 py-3">Mô tả</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {GRADES.map((g) => (
                <tr key={g.g}>
                  <td className="px-4 py-3 font-mono font-bold">{g.g}</td>
                  <td className="px-4 py-3 font-medium">{g.name}</td>
                  <td className="px-4 py-3 text-slate-600">{g.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">
          Tầng Miller — cách chấm ở mỗi tầng
        </h2>
        <div className="overflow-hidden border border-slate-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3">Tầng</th>
                <th className="text-left px-4 py-3">Cách đánh giá</th>
                <th className="text-left px-4 py-3">Trọng số</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MILLER.map((m) => (
                <tr key={m.name}>
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-slate-600">{m.desc}</td>
                  <td className="px-4 py-3 font-mono">×{m.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-4">
          Chứng chỉ — yêu cầu từng Grade
        </h2>
        <div className="space-y-3">
          {[
            {
              g: 1,
              title: "Foundation",
              req: "Pre-test ≥ 60%; hoàn thành ≥ 3 lab Knows/Knows How; post-test ≥ 60%.",
            },
            {
              g: 2,
              title: "Practitioner",
              req: "≥ 6 lab (có ≥ 2 Shows How); post-test ≥ 65%; learning gain ≥ 15%.",
            },
            {
              g: 3,
              title: "Competent",
              req: "≥ 10 lab (có ≥ 3 Shows How); post-test ≥ 75%; learning gain ≥ 20%; 1 mô tả case ứng dụng.",
            },
            {
              g: 4,
              title: "Proficient",
              req: "≥ 14 lab (có ≥ 2 tầng Does); post-test ≥ 85%; learning gain ≥ 30%; 1 case triển khai được kiểm chứng.",
            },
            {
              g: 5,
              title: "Expert",
              req: "17/17 lab; post-test ≥ 90%; learning gain ≥ 35%; 1 dự án triển khai + contribution back cho cộng đồng.",
            },
          ].map((r) => (
            <div
              key={r.g}
              className="border border-slate-200 rounded p-4 bg-white flex gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent text-white font-serif font-bold text-2xl flex items-center justify-center flex-shrink-0">
                {r.g}
              </div>
              <div>
                <div className="font-serif font-semibold text-lg">
                  Grade {r.g} — {r.title}
                </div>
                <div className="text-slate-600 text-sm mt-1">{r.req}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-4">
          Chứng chỉ có hạn 2 năm; sau đó cần recertify để giữ Grade.
        </p>
      </section>
    </div>
  );
}
