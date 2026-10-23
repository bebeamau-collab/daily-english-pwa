"""Only synthesize missing monthly files; never modify existing MP3s."""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path
import numpy as np
import soundfile as sf

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--voice', choices=['bella', 'michael', 'jasper'], required=True)
parser.add_argument('--smoke', action='store_true')
args = parser.parse_args()
jobs = json.loads(subprocess.check_output(['node', str(root / 'scripts/monthly-jobs.mjs')]))
if args.voice == 'bella':
    jobs = [j for j in jobs if not (root / 'audio/matilda' / j['file']).exists()]
jobs = [j for j in jobs if not (root / 'audio' / args.voice / j['file']).exists()]
if not jobs:
    print(f'{args.voice}: no missing files; existing audio preserved')
    raise SystemExit(0)
if args.smoke:
    selected = [next((j for j in jobs if token in j['file']), None) for token in ['-word.', '-example-', 'stories/']]
    jobs = [j for j in selected if j is not None]
if args.voice == 'jasper':
    from kittentts import KittenTTS
    model = KittenTTS('KittenML/kitten-tts-mini-0.8')
    def generate(text):
        return model.generate(text=text, voice='Jasper', speed=0.95, clean_text=True)
else:
    from kokoro import KPipeline
    model = KPipeline(lang_code='a')
    def generate(text):
        return np.concatenate([audio for _, _, audio in model(text, voice={'bella': 'af_bella', 'michael': 'am_michael'}[args.voice], speed=0.95)])
for index, job in enumerate(jobs):
    output = root / 'audio' / args.voice / job['file']
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix='.wav') as wav:
        sf.write(wav.name, generate(job['text']), 24000)
        subprocess.run(['ffmpeg', '-v', 'error', '-n', '-i', wav.name, '-ar', '24000', '-ac', '1', '-b:a', '48k', str(output)], check=True)
    print(f'{args.voice} {index+1}/{len(jobs)} {job["file"]}', flush=True)
