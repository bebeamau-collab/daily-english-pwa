import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { getAudioPath, getStoryAudioPath } from '../speech.js';
import { MATILDA_ASSETS } from '../matilda-assets.js?v=21';
import { VOICE_ASSETS } from '../voice-assets.js?v=22';
import { TEACHER_ASSETS } from '../teacher-assets.js?v=23';
import { WORDS } from '../words.js';
import { STORIES } from '../story.js';

const root = new URL('../', import.meta.url);

test('ElevenLabs 女聲保留每一段 Matilda，且其他選項可手動獨立切換', () => {
  for (const file of MATILDA_ASSETS) {
    const storyId = file.match(/^stories\/(\d+)\.mp3$/)?.[1];
    const route = storyId
      ? voice => getStoryAudioPath(storyId, voice)
      : voice => {
        const [, id, kind] = file.match(/^(\d+)-(word|example-[12])\.mp3$/);
        return getAudioPath(id, kind, voice);
      };
    assert.equal(route('female'), `./audio/matilda/${file}`);
    assert.ok(existsSync(new URL(route('female'), root)), file);
    assert.match(route('male'), /^\.\/audio\/(qwen-teacher|qwen-ryan|michael)\//);
    assert.match(route('slow'), /^\.\/audio\/(qwen-serena|jasper)\//);
    if (VOICE_ASSETS.chatterbox.has(file)) {
      assert.equal(route('chatterbox'), `./audio/chatterbox/${file}`);
    }
  }
});

test('ElevenLabs 缺檔時無播放路徑，其他聲線仍有對應音檔', () => {
  const profiles = {
    male: ['qwen-ryan', 'michael'],
    slow: ['qwen-serena', 'jasper'],
    chatterbox: ['chatterbox', 'bella']
  };
  const routes = [
    ...WORDS.flatMap(({ audioId }) => ['word', 'example-1', 'example-2'].map(kind => ({
      file: `${audioId}-${kind}.mp3`, route: voice => getAudioPath(audioId, kind, voice)
    }))),
    ...STORIES.map(({ id }) => ({ file: `stories/${id}.mp3`, route: voice => getStoryAudioPath(id, voice) }))
  ];
  const teacherCandidates = new Set(routes.map(({ file }) => file).filter(file => !file.endsWith('-word.mp3')));
  for (const file of TEACHER_ASSETS) assert.ok(teacherCandidates.has(file), file);
  for (const { file, route } of routes) {
    assert.equal(route('female'), MATILDA_ASSETS.has(file) ? `./audio/matilda/${file}` : null, file);
    for (const [voice, [folder, legacy]] of Object.entries(profiles)) {
      let expected = legacy;
      if (voice === 'male' && TEACHER_ASSETS.has(file)) {
        expected = 'qwen-teacher';
      } else if (VOICE_ASSETS[folder].has(file)) expected = folder;
      assert.equal(route(voice), `./audio/${expected}/${file}`);
      assert.ok(existsSync(new URL(route(voice), root)), `${voice} ${file}`);
    }
  }
});
