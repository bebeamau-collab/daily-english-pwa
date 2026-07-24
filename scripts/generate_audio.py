#!/usr/bin/env python3
"""Generate static Kokoro MP3 files for every word and its two examples."""

from __future__ import annotations

import argparse
import re
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KPipeline


ROOT = Path(__file__).resolve().parents[1]
VOICE_IDS = {
    "bella": "af_bella",
    "michael": "am_michael",
}


def extract_block(path: Path, variable: str) -> str:
    text = path.read_text(encoding="utf-8")
    match = re.search(rf"const {variable} = `\n(.*?)\n`;", text, re.S)
    if not match:
        raise RuntimeError(f"找不到 {variable}: {path}")
    return match.group(1)


def load_entries() -> list[dict[str, str]]:
    second_examples = {}
    for line in extract_block(ROOT / "second-examples.js", "RAW_SECOND_EXAMPLES").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        word, example, _ = line.split("|", 2)
        second_examples[word] = example

    entries = []
    for line in extract_block(ROOT / "words.js", "RAW_WORDS").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        word, _, _, example, _, _ = line.split("|", 5)
        entries.append({
            "word": word,
            "example-1": example,
            "example-2": second_examples[word],
        })
    return entries


def generate_one(pipeline: KPipeline, voice: str, text: str, output: Path) -> None:
    chunks = [audio for _, _, audio in pipeline(text, voice=voice, speed=1)]
    if not chunks:
        raise RuntimeError(f"無法產生音訊：{text}")
    audio = np.concatenate(chunks)
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav") as wav:
        sf.write(wav.name, audio, 24000)
        subprocess.run(
            [
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-i", wav.name, "-ar", "24000", "-ac", "1",
                "-codec:a", "libmp3lame", "-b:a", "48k", str(output),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--voice", choices=VOICE_IDS, required=True)
    args = parser.parse_args()

    entries = load_entries()
    output_dir = ROOT / "audio" / args.voice
    pipeline = KPipeline(lang_code="a")

    for index, entry in enumerate(entries, start=1):
        audio_id = f"{index:03d}"
        for kind, text in entry.items():
            output = output_dir / f"{audio_id}-{kind}.mp3"
            if output.exists() and output.stat().st_size > 1000:
                continue
            print(f"[{args.voice}] {audio_id} {kind}: {text}", flush=True)
            generate_one(pipeline, VOICE_IDS[args.voice], text, output)

    expected = len(entries) * 3
    actual = len(list(output_dir.glob("*.mp3")))
    if actual != expected:
        raise RuntimeError(f"{args.voice} 音檔數量錯誤：{actual}/{expected}")
    print(f"{args.voice} 完成：{actual} 個 MP3")


if __name__ == "__main__":
    main()
