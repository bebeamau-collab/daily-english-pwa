import test from "node:test";
import assert from "node:assert/strict";
import {
  REVIEW_INTERVALS,
  addDays,
  answerReview,
  calculateStreak,
  completeToday,
  createInitialState,
  getDailyWords,
  getDueWords,
  normalizeState
} from "../core.js";
import { WORDS } from "../words.js";

test("字庫完整且每日洗牌在一輪內不重複", () => {
  assert.ok(WORDS.length >= 300);
  const seen = new Set();
  for (let offset = 0; offset < Math.floor(WORDS.length / 10); offset += 1) {
    const date = addDays("2026-01-01", offset);
    const first = getDailyWords(WORDS, date);
    const second = getDailyWords(WORDS, date);
    assert.deepEqual(first.map((item) => item.word), second.map((item) => item.word));
    first.forEach((item) => {
      assert.equal(seen.has(item.word), false, `${item.word} 在輪完字庫前重複`);
      seen.add(item.word);
    });
  }
  assert.equal(seen.size, 300);
});

test("每筆資料都有必要欄位且例句含粗體單字", () => {
  const topics = new Set();
  WORDS.forEach((item) => {
    ["word", "partOfSpeech", "zh", "example", "exampleZh", "topic", "level"].forEach((key) => {
      assert.ok(item[key], `${item.word || "未知"} 缺少 ${key}`);
    });
    assert.match(item.example, /<strong>.+<\/strong>/);
    topics.add(item.topic);
  });
  assert.equal(topics.size, 12);
  assert.ok(WORDS.some((item) => item.level === "口語"));
});

test("完成今日學習會保存紀錄並安排明天複習", () => {
  const today = "2026-07-23";
  const daily = WORDS.slice(0, 10);
  const state = completeToday(createInitialState(), daily, today);
  assert.deepEqual(state.completedDates, [today]);
  assert.equal(Object.keys(state.learned).length, 10);
  assert.equal(state.reviews[daily[0].word].dueDate, "2026-07-24");
  assert.equal(getDueWords(state, WORDS, today).length, 0);
  assert.equal(getDueWords(state, WORDS, "2026-07-24").length, 10);
});

test("記得會依 1/3/7/14/30 天前進，最終精通", () => {
  const word = WORDS[0].word;
  let state = completeToday(createInitialState(), [WORDS[0]], "2026-07-01");
  let today = "2026-07-02";
  for (let stage = 1; stage < REVIEW_INTERVALS.length; stage += 1) {
    state = answerReview(state, word, true, today);
    assert.equal(state.reviews[word].stage, stage);
    assert.equal(state.reviews[word].dueDate, addDays(today, REVIEW_INTERVALS[stage]));
    today = state.reviews[word].dueDate;
  }
  state = answerReview(state, word, true, today);
  assert.equal(state.reviews[word].status, "mastered");
  assert.equal(state.reviews[word].dueDate, null);
});

test("忘記會重設並安排明天", () => {
  const word = WORDS[0].word;
  let state = completeToday(createInitialState(), [WORDS[0]], "2026-07-01");
  state = answerReview(state, word, true, "2026-07-02");
  state = answerReview(state, word, false, "2026-07-05");
  assert.equal(state.reviews[word].stage, 0);
  assert.equal(state.reviews[word].dueDate, "2026-07-06");
});

test("localStorage JSON 往返可持久化，streak 中斷歸零", () => {
  const state = completeToday(createInitialState(), WORDS.slice(0, 10), "2026-07-23");
  const restored = normalizeState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(restored, state);
  assert.equal(calculateStreak(["2026-07-20", "2026-07-21", "2026-07-22"], "2026-07-23"), 3);
  assert.equal(calculateStreak(["2026-07-20"], "2026-07-23"), 0);
  assert.equal(calculateStreak(["2026-07-21", "2026-07-22", "2026-07-23"], "2026-07-23"), 3);
});
