import test from 'node:test';
import assert from 'node:assert/strict';
import { WORDS } from '../words.js';
import { STORIES, createDailyStory } from '../story.js';
import { addDays, getDailyWords } from '../core.js';
import { execFileSync } from 'node:child_process';

test('11月增量100詞與10篇故事，保留舊ID及本輪教材', () => {
  assert.equal(WORDS.length, 500);
  assert.equal(STORIES.length, 50);
  assert.equal(new Set(WORDS.map(w => w.word.toLowerCase())).size, 500);
  const added = WORDS.filter(w => w.batch === '2026-11');
  assert.equal(added.length, 100);
  assert.equal(added[0].audioId, '401');
  assert.equal(added[99].audioId, '500');
  assert.deepEqual(getDailyWords(WORDS, '2026-11-01').map(w => w.audioId), ['381','382','383','384','385','386','387','388','389','390']);
  for (const w of added) {
    assert.match(w.phonetic, /^\/.+\/$/);
    for (const [en, zh] of [[w.example,w.exampleZh],[w.example2,w.exampleZh2]]) {
      assert.ok(en.toLowerCase().includes(`<strong>${w.word.toLowerCase()}</strong>`));
      assert.ok(zh);
    }
    assert.notEqual(w.example,w.example2);
  }
  const seen = new Set();
  for (let offset = 0; offset < 50; offset++) {
    const day = addDays('2026-12-03',offset);
    const daily = getDailyWords(WORDS,day);
    const story = createDailyStory(daily,day);
    assert.equal(daily.length,10);
    for (const w of daily) {
      assert.ok(!seen.has(w.audioId)); seen.add(w.audioId);
      assert.ok(story.englishParagraphs.join(' ').toLowerCase().includes(w.word.toLowerCase()));
    }
  }
  assert.equal(seen.size,500);
  assert.equal(createDailyStory(getDailyWords(WORDS,'2026-12-13'),'2026-12-13').id,'41');
  for (const story of STORIES.filter(s => s.batch === '2026-11')) {
    assert.equal(story.englishParagraphs.length,3);
    assert.equal(story.chineseParagraphs.length,3);
    const text = story.englishParagraphs.join(' ');
    const count = (text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[]).length;
    assert.ok(count >= 150 && count <= 220, `${story.id}: ${count} words`);
    for (const id of story.wordIds) {
      const word = WORDS.find(w=>w.audioId===id).word;
      assert.ok(text.toLowerCase().includes(word));
      assert.ok(story.chineseParagraphs.join(' ').includes(word));
    }
  }
});

test('批次產音只匯出指定月份，不把舊內容送去重製', () => {
  const jobs = JSON.parse(execFileSync(process.execPath,['scripts/monthly-jobs.mjs','--batch','2026-11'],{encoding:'utf8'}));
  assert.equal(jobs.length,310);
  assert.equal(jobs[0].file,'401-word.mp3');
  assert.equal(jobs.at(-1).file,'stories/50.mp3');
  assert.ok(jobs.every(j=>j.text && !/<\/?strong>/.test(j.text)));
  const old = JSON.parse(execFileSync(process.execPath,['scripts/monthly-jobs.mjs','--batch','2026-10'],{encoding:'utf8'}));
  assert.equal(old.length,310);
  assert.equal(old[0].file,'301-word.mp3');
  assert.throws(()=>execFileSync(process.execPath,['scripts/monthly-jobs.mjs','--batch','2026-12'],{stdio:'pipe'}));
});
