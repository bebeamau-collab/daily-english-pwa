#!/usr/bin/env python3
"""Generate Jasper MP3 files with KittenTTS at a native slower speaking rate."""

from __future__ import annotations

import argparse
import re
import subprocess
import tempfile
from pathlib import Path

import soundfile as sf
from kittentts import KittenTTS

ROOT = Path(__file__).resolve().parents[1]


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
        entries.append({"word": word, "example-1": example, "example-2": second_examples[word]})
    return entries


def load_stories() -> list[tuple[str, str]]:
    source = (ROOT / "stories-data.js").read_text(encoding="utf-8")
    raw_match = re.search(r"export const RAW_STORIES = `\n(.*?)\n`;", source, re.S)
    if not raw_match:
        raise RuntimeError("找不到 RAW_STORIES")
    pattern = re.compile(r"@@(\d{2})\nTITLE:([^\n]+)\nEN:\n(.*?)\nZH:\n(.*?)(?=\n@@\d{2}\n|\Z)", re.S)
    stories = [
        (story_id, f"{title.strip()}. {' '.join(english.split())}")
        for story_id, title, english, _ in pattern.findall(raw_match.group(1))
    ]
    if len(stories) != 30:
        raise RuntimeError(f"故事數量錯誤：{len(stories)}/30")
    return stories


def save_mp3(model: KittenTTS, text: str, output: Path, speed: float) -> None:
    audio = model.generate(text=text, voice="Jasper", speed=speed, clean_text=True)
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


def should_generate(output: Path, overwrite: bool) -> bool:
    return overwrite or not output.exists() or output.stat().st_size <= 1000


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--speed", type=float, default=0.95)
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument("--smoke-test", action="store_true", help="只產生短、中、長三筆代表性音檔")
    args = parser.parse_args()

    model = KittenTTS("KittenML/kitten-tts-mini-0.8")
    output_dir = ROOT / "audio" / "jasper"
    entries = load_entries()
    stories = load_stories()

    if args.smoke_test:
        samples = [
            ("short-word.mp3", entries[0]["word"]),
            ("medium-example.mp3", entries[0]["example-2"]),
            ("long-story.mp3", stories[0][1]),
        ]
        smoke_dir = ROOT / ".audio-smoke-test"
        for filename, text in samples:
            print(f"[jasper smoke] {filename}", flush=True)
            save_mp3(model, text, smoke_dir / filename, args.speed)
        print("Jasper 短／中／長測試完成")
        return

    for index, entry in enumerate(entries, start=1):
        audio_id = f"{index:03d}"
        for kind, text in entry.items():
            output = output_dir / f"{audio_id}-{kind}.mp3"
            if not should_generate(output, args.overwrite):
                continue
            print(f"[jasper] {audio_id} {kind}: {text}", flush=True)
            save_mp3(model, text, output, args.speed)

    story_dir = output_dir / "stories"
    for story_id, text in stories:
        output = story_dir / f"{story_id}.mp3"
        if not should_generate(output, args.overwrite):
            continue
        print(f"[jasper] story {story_id}", flush=True)
        save_mp3(model, text, output, args.speed)

    word_audio_count = len(list(output_dir.glob("*.mp3")))
    story_audio_count = len(list(story_dir.glob("*.mp3")))
    if word_audio_count != len(entries) * 3 or story_audio_count != len(stories):
        raise RuntimeError(f"Jasper 音檔數量錯誤：{word_audio_count}/900，{story_audio_count}/30")
    print(f"Jasper 完成：{word_audio_count + story_audio_count} 個 MP3")


if __name__ == "__main__":
    main()
