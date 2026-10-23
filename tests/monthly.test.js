import test from 'node:test';
import assert from 'node:assert/strict';
import {WORDS} from '../words.js';
import {getDailyWords,addDays,normalizeState,completeToday,createInitialState} from '../core.js';
import {createDailyStory} from '../story.js';
import {OCTOBER_WORDS,OCTOBER_STORIES} from '../monthly-2026-10.js';
import fs from 'node:fs';
test('100詞永久ID、無重複、兩組例句與十篇故事完整',()=>{
 assert.equal(WORDS.length,400);assert.equal(new Set(WORDS.map(w=>w.word.toLowerCase())).size,400);
 assert.equal(OCTOBER_WORDS.length,100);assert.equal(OCTOBER_STORIES.length,10);
 for(const [i,w]of OCTOBER_WORDS.entries()){
  assert.equal(w.audioId,String(301+i));assert.match(w.phonetic,/^\/.+\/$/);
  assert.match(w.example,/<strong>/);assert.match(w.example2,/<strong>/);assert.notEqual(w.example,w.example2);
 }
 for(const s of OCTOBER_STORIES){
  const en=s.englishParagraphs.join(' ');const zh=s.chineseParagraphs.join(' ');
  assert.ok(en.split(/\s+/).length>=150);assert.equal(s.englishParagraphs.length,3);
  for(const id of s.wordIds){const w=WORDS.find(w=>w.audioId===id);assert.ok(en.toLowerCase().includes(w.word));assert.ok(zh.includes(w.word));}
 }
});
test('所有模組匯入網址均精確預快取，可首次安裝後離線使用',()=>{
 const sw=fs.readFileSync(new URL('../service-worker.js',import.meta.url),'utf8');
 const shell=new Set([...sw.matchAll(/"(\.\/[^"\n]+)"/g)].map(m=>m[1]));
 for(const asset of shell){
  if(!asset.split('?')[0].endsWith('.js'))continue;
  const source=fs.readFileSync(new URL('../'+asset.slice(2).split('?')[0],import.meta.url),'utf8');
  for(const match of source.matchAll(/from\s+["'](\.\/[^"']+)["']/g))assert.ok(shell.has(match[1]),`${asset} 未預快取 ${match[1]}`);
 }
});
test('新增後40天400詞不重複，故事始終對應，歷史教材維持原內容',()=>{
 const seen=new Set();
 for(let i=0;i<40;i++){
  const day=addDays('2026-10-24',i),words=getDailyWords(WORDS,day),story=createDailyStory(words,day);
  assert.equal(words.length,10);
  for(const w of words){assert.ok(!seen.has(w.audioId));seen.add(w.audioId);assert.ok(story.englishParagraphs.join(' ').toLowerCase().includes(w.word.toLowerCase()));}
 }
 assert.equal(seen.size,400);
 assert.deepEqual(getDailyWords(WORDS,'2026-10-23'),getDailyWords(WORDS.slice(0,300),'2026-10-23'));
 assert.deepEqual(getDailyWords(WORDS,'2026-10-24'),getDailyWords(WORDS,'2026-12-03'));
 const old=completeToday(createInitialState(),WORDS.slice(0,10),'2026-10-23');
 assert.deepEqual(normalizeState(JSON.parse(JSON.stringify(old))),old);
});
