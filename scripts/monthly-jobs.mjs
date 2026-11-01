import {OCTOBER_WORDS,OCTOBER_STORIES} from '../monthly-2026-10.js';
import {NOVEMBER_WORDS,NOVEMBER_STORIES} from '../monthly-2026-11.js';
const batches = {
  '2026-10': [OCTOBER_WORDS,OCTOBER_STORIES],
  '2026-11': [NOVEMBER_WORDS,NOVEMBER_STORIES]
};
const batchArg = process.argv.indexOf('--batch');
const batch = batchArg < 0 ? Object.keys(batches).at(-1) : process.argv[batchArg+1];
if (!batches[batch]) throw new Error(`Unknown monthly batch: ${batch}`);
const [words,stories] = batches[batch];
const strip=text=>text.replace(/<[^>]*>/g,'');
console.log(JSON.stringify([
  ...words.flatMap(w=>[['word',w.word],['example-1',strip(w.example)],['example-2',strip(w.example2)]].map(([kind,text])=>({file:`${w.audioId}-${kind}.mp3`,text}))),
  ...stories.map(s=>({file:`stories/${s.id}.mp3`,text:`${s.title}. ${s.englishParagraphs.join(' ')}`}))
]));
