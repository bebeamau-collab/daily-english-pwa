import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { getAudioPath } from '../speech.js';

test('已更新舊詞的女聲單字及兩例句使用 Matilda，保留其他聲線和原 Bella 檔案', () => {
  for (const id of ['001', '002', '003', '004', '006', '007', '008', '013', '016', '022', '024', '026']) {
    for (const kind of ['word', 'example-1', 'example-2']) {
      const file = `${id}-${kind}.mp3`;
      for (const [voice, folder] of [['female', 'matilda'], ['male', 'michael'], ['slow', 'jasper']]) {
        const audio = getAudioPath(id, kind, voice);
        assert.equal(audio, `./audio/${folder}/${file}`);
        assert.ok(existsSync(new URL(audio, new URL('../', import.meta.url))));
      }
      assert.ok(existsSync(new URL(`../audio/bella/${file}`, import.meta.url)));
    }
  }
});
