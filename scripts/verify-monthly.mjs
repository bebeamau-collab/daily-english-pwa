import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {OCTOBER_WORDS,OCTOBER_STORIES} from '../monthly-2026-10.js';
import {getAudioPath,getStoryAudioPath} from '../speech.js';
const files=new Set();
for(const voice of ['female','male','slow']){
 for(const w of OCTOBER_WORDS)for(const kind of ['word','example-1','example-2'])files.add(getAudioPath(w.audioId,kind,voice));
 for(const s of OCTOBER_STORIES)files.add(getStoryAudioPath(s.id,voice));
}
let bytes=0;
for(const file of files){
 const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_type','-of','json',file],{encoding:'utf8'}));
 if(!info.streams.some(s=>s.codec_type==='audio')||Number(info.format.duration)<=0)throw new Error('Invalid '+file);
 execFileSync('ffmpeg',['-v','error','-i',file,'-f','null','-'],{stdio:'pipe'});
 bytes+=fs.statSync(file).size;
}
let preserved=0;
for(const line of execFileSync('git',['ls-tree','-r','1824fd0','audio'],{encoding:'utf8'}).trim().split('\n')){
 const [,hash,file]=line.match(/^\d+ blob ([0-9a-f]+)\t(.+)$/)||[];
 if(!file)continue;
 const buffer=fs.readFileSync(file);
 const actual=crypto.createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');
 if(actual!==hash)throw new Error('Original audio changed: '+file);
 preserved++;
}
console.log(JSON.stringify({newAudioValidated:files.size,completeDecode:true,newBytes:bytes,originalAudioPreserved:preserved}));
