// 下一輪才接納新批次；詞組與故事的固定對照不重新洗牌。
export const RELEASES = [{ date: '2026-10-24', groups: 40 }];
const serial = date => Math.round(Date.parse(`${date}T12:00:00Z`) / 86400000);
export function curriculumGroup(date) {
  const target = serial(date);
  const first = serial(RELEASES[0].date);
  if (target < first) return ((target - serial('2026-01-01')) % 30 + 30) % 30;
  let start = first;
  while (true) {
    const release = [...RELEASES].reverse().find(r => serial(r.date) <= start);
    if (target < start + release.groups) return (30 + target - start) % release.groups;
    start += release.groups;
  }
}
