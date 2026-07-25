#!/usr/bin/env python3
"""Generate one complete Kokoro story MP3 for each of the 30 daily stories."""

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


def load_stories() -> list[tuple[str, str]]:
    source = (ROOT / "stories-data.js").read_text(encoding="utf-8")
    raw_match = re.search(r"export const RAW_STORIES = `\n(.*?)\n`;", source, re.S)
    if not raw_match:
        raise RuntimeError("找不到 RAW_STORIES")

    stories = []
    pattern = re.compile(
        r"@@(\d{2})\nTITLE:(.+)\nEN:\n(.*?)\nZH:\n(.*?)(?=\n@@\d{2}\n|\Z)",
        re.S,
    )
    for story_id, title, english, _ in pattern.findall(raw_match.group(1)):
        spoken_text = f"{title.strip()}. {' '.join(english.split())}"
        stories.append((story_id, spoken_text))
    if len(stories) != 30:
        raise RuntimeError(f"故事數量錯誤：{len(stories)}/30")
    return stories


def generate_one(pipeline: KPipeline, voice: str, text: str, output: Path) -> None:
    chunks = [audio for _, _, audio in pipeline(text, voice=voice, speed=1)]
    if not chunks:
        raise RuntimeError(f"無法產生音訊：{text[:80]}")
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

    stories = load_stories()
    output_dir = ROOT / "audio" / args.voice / "stories"
    pipeline = KPipeline(lang_code="a")
    for story_id, text in stories:
        output = output_dir / f"{story_id}.mp3"
        if output.exists() and output.stat().st_size > 1000:
            continue
        print(f"[{args.voice}] story {story_id}", flush=True)
        generate_one(pipeline, VOICE_IDS[args.voice], text, output)

    actual = len(list(output_dir.glob("*.mp3")))
    if actual != 30:
        raise RuntimeError(f"{args.voice} 故事音檔數量錯誤：{actual}/30")
    print(f"{args.voice} 故事完成：{actual} 個 MP3")


if __name__ == "__main__":
    main()
