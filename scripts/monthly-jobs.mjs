import {OCTOBER_WORDS,OCTOBER_STORIES} from '../monthly-2026-10.js';
const strip=text=>text.replace(/<[^>]*>/g,'');
console.log(JSON.stringify([
  ...OCTOBER_WORDS.flatMap(w=>[['word',w.word],['example-1',strip(w.example)],['example-2',strip(w.example2)]].map(([kind,text])=>({file:`${w.audioId}-${kind}.mp3`,text}))),
  ...OCTOBER_STORIES.map(s=>({file:`stories/${s.id}.mp3`,text:`${s.title}. ${s.englishParagraphs.join(' ')}`}))
]));
