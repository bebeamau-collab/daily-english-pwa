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
import { PHONETICS } from "../phonetics.js";
import { SECOND_EXAMPLES } from "../second-examples.js";
import { AUDIO_VOICES, getAudioPath, pickAmericanVoice, voicePitch } from "../speech.js";

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
    ["word", "partOfSpeech", "zh", "phonetic", "example", "exampleZh", "example2", "exampleZh2", "topic", "level", "audioId"].forEach((key) => {
      assert.ok(item[key], `${item.word || "未知"} 缺少 ${key}`);
    });
    assert.match(item.example, /<strong>.+<\/strong>/);
    assert.match(item.example2, /<strong>.+<\/strong>/);
    assert.notEqual(item.example2, item.example);
    topics.add(item.topic);
  });
  assert.equal(topics.size, 12);
  assert.ok(WORDS.some((item) => item.level === "口語"));
  assert.equal(Object.keys(PHONETICS).length, 300);
  assert.equal(Object.keys(SECOND_EXAMPLES).length, 300);
  assert.ok(WORDS.every((item) => /^\/.+\/$/.test(item.phonetic)));
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
  assert.equal(restored.voiceGender, "female");
  assert.equal(calculateStreak(["2026-07-20", "2026-07-21", "2026-07-22"], "2026-07-23"), 3);
  assert.equal(calculateStreak(["2026-07-20"], "2026-07-23"), 0);
  assert.equal(calculateStreak(["2026-07-21", "2026-07-22", "2026-07-23"], "2026-07-23"), 3);
});

test("自然美式語音使用 Bella 與 Michael，裝置語音只作備用", () => {
  const voices = [
    { name: "Samantha", voiceURI: "com.apple.speech.synthesis.voice.samantha", lang: "en-US", default: true },
    { name: "Alex", voiceURI: "com.apple.speech.synthesis.voice.alex", lang: "en-US", default: false },
    { name: "Ting-Ting", voiceURI: "com.apple.speech.synthesis.voice.tingting", lang: "zh-TW", default: false }
  ];
  assert.equal(pickAmericanVoice(voices, "female").name, "Samantha");
  assert.equal(pickAmericanVoice(voices, "male").name, "Alex");
  assert.equal(pickAmericanVoice([{ name: "US Voice", lang: "en-US", default: true }], "male").name, "US Voice");
  assert.equal(AUDIO_VOICES.female.id, "bella");
  assert.equal(AUDIO_VOICES.male.id, "michael");
  assert.equal(voicePitch("male"), 1);
  assert.equal(voicePitch("female"), 1);
  assert.equal(getAudioPath("006", "word", "female"), "./audio/bella/006-word.mp3");
  assert.equal(getAudioPath("006", "example-2", "male"), "./audio/michael/006-example-2.mp3");
  assert.equal(getAudioPath("006", "unknown", "male"), null);
});
