export const STORAGE_KEY = "dailyEnglishPwaStateV1";
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30];
export const WORDS_PER_DAY = 10;
export const BASE_SEED = 20260723;
export const STORY_SEED_OFFSET = 6;

export function formatLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function addDays(dateString, days) {
  const date = parseLocalDate(dateString);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

export function dayNumber(dateString) {
  return Math.floor(parseLocalDate(dateString).getTime() / 86400000);
}

export function mulberry32(seed) {
  let value = seed >>> 0;
  return function next() {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle(items, seed) {
  const output = [...items];
  const random = mulberry32(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

export function getDailyWords(words, dateString) {
  const groupsPerCycle = Math.ceil(words.length / WORDS_PER_DAY);
  const index = dayNumber(dateString) - dayNumber("2026-01-01");
  const group = ((index % groupsPerCycle) + groupsPerCycle) % groupsPerCycle;
  const shuffled = seededShuffle(words, BASE_SEED + STORY_SEED_OFFSET);
  return shuffled.slice(group * WORDS_PER_DAY, group * WORDS_PER_DAY + WORDS_PER_DAY);
}

export function createInitialState() {
  return { version: 1, voiceGender: "female", completedDates: [], learned: {}, reviews: {} };
}

export function normalizeState(value) {
  const fallback = createInitialState();
  if (!value || typeof value !== "object") return fallback;
  return {
    version: 1,
    voiceGender: value.voiceGender === "male" ? "male" : "female",
    completedDates: Array.isArray(value.completedDates) ? [...new Set(value.completedDates)].sort() : [],
    learned: value.learned && typeof value.learned === "object" ? value.learned : {},
    reviews: value.reviews && typeof value.reviews === "object" ? value.reviews : {}
  };
}

export function completeToday(state, dailyWords, today) {
  const next = structuredClone(state);
  if (!next.completedDates.includes(today)) next.completedDates.push(today);
  next.completedDates.sort();
  for (const item of dailyWords) {
    if (!next.learned[item.word]) next.learned[item.word] = { firstLearned: today };
    if (!next.reviews[item.word]) {
      next.reviews[item.word] = { stage: 0, dueDate: addDays(today, REVIEW_INTERVALS[0]), status: "reviewing" };
    }
  }
  return next;
}

export function answerReview(state, word, remembered, today) {
  const next = structuredClone(state);
  const review = next.reviews[word];
  if (!review || review.status === "mastered") return next;
  if (!remembered) {
    review.stage = 0;
    review.dueDate = addDays(today, REVIEW_INTERVALS[0]);
    return next;
  }
  if (review.stage >= REVIEW_INTERVALS.length - 1) {
    review.status = "mastered";
    review.dueDate = null;
    return next;
  }
  review.stage += 1;
  review.dueDate = addDays(today, REVIEW_INTERVALS[review.stage]);
  return next;
}

export function getDueWords(state, words, today) {
  const byWord = new Map(words.map((item) => [item.word, item]));
  return Object.entries(state.reviews)
    .filter(([, review]) => review.status === "reviewing" && review.dueDate <= today)
    .sort((a, b) => a[1].dueDate.localeCompare(b[1].dueDate))
    .map(([word]) => byWord.get(word))
    .filter(Boolean);
}

export function calculateStreak(completedDates, today) {
  const dates = [...new Set(completedDates)].sort().reverse();
  if (!dates.length) return 0;
  const latest = dates[0];
  if (latest !== today && latest !== addDays(today, -1)) return 0;
  let streak = 1;
  for (let index = 1; index < dates.length; index += 1) {
    if (dates[index] !== addDays(dates[index - 1], -1)) break;
    streak += 1;
  }
  return streak;
}
