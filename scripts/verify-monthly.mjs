import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
import {WORDS} from '../words.js';
import {STORIES} from '../story.js';
import {getAudioPath,getStoryAudioPath} from '../speech.js';
const option = (name, fallback) => process.argv.includes(name) ? process.argv[process.argv.indexOf(name)+1] : fallback;
const batch = option('--batch','2026-11');
const baseline = option('--baseline','346ba46');
const words = WORDS.filter(w=>w.batch===batch);
const stories = STORIES.filter(s=>s.batch===batch);
if(words.length!==100 || stories.length!==10)throw new Error('Unknown or incomplete batch');
const files=new Set();
for(const voice of ['female','male','slow']){
 for(const w of words)for(const kind of ['word','example-1','example-2'])files.add(getAudioPath(w.audioId,kind,voice));
 for(const s of stories)files.add(getStoryAudioPath(s.id,voice));
}
let bytes=0;
for(const file of files){
 const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_type','-of','json',file],{encoding:'utf8'}));
 if(!info.streams.some(s=>s.codec_type==='audio')||Number(info.format.duration)<=0)throw new Error('Invalid '+file);
 const decoded=spawnSync('ffmpeg',['-v','info','-i',file,'-af','volumedetect','-f','null','-'],{encoding:'utf8'});
 const peak=decoded.stderr?.match(/max_volume: ([-\d.]+) dB/);
 if(decoded.status!==0||!peak||Number(peak[1]) < -65)throw new Error('Decode failed or silent audio: '+file);
 bytes+=fs.statSync(file).size;
}
let preserved=0;
for(const line of execFileSync('git',['ls-tree','-r',baseline,'audio'],{encoding:'utf8'}).trim().split('\n')){
 const [,hash,file]=line.match(/^\d+ blob ([0-9a-f]+)\t(.+)$/)||[];
 if(!file)continue;
 const buffer=fs.readFileSync(file);
 const actual=crypto.createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');
 if(actual!==hash)throw new Error('Original audio changed: '+file);
 preserved++;
}
console.log(JSON.stringify({batch,baseline,newAudioValidated:files.size,completeDecode:true,nonSilent:true,newBytes:bytes,originalAudioPreserved:preserved}));
