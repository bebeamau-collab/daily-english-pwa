import { MATILDA_ASSETS } from './matilda-assets.js?v=21';
import { VOICE_ASSETS } from './voice-assets.js?v=22';
import { TEACHER_ASSETS } from './teacher-assets.js?v=23';
const VOICE_HINTS = {
  female: [
    "samantha", "ava", "allison", "susan", "zoe", "victoria",
    "jenny", "zira", "aria", "joanna", "salli", "ivy", "kimberly", "kendra"
  ],
  male: [
    "alex", "aaron", "fred", "tom", "ralph", "guy",
    "david", "mark", "matthew", "joey", "justin", "kevin"
  ]
};

export const AUDIO_VOICES = {
  female: { id: "matilda", label: "ElevenLabs 女聲", description: "Matilda。只有已錄製的單字、例句與文章會顯示播放按鈕。", fallbackGender: "female" },
  male: { id: "qwen-ryan", legacyId: "michael", label: "Qwen 男聲", description: "Ryan 男聲。例句與文章採用英文老師的朗讀語氣，發音清晰，語速平穩。", fallbackGender: "male" },
  slow: { id: "qwen-serena", legacyId: "jasper", label: "Qwen 慢速女聲", description: "Serena 女聲，音檔已預先降為 0.9 倍，適合跟讀。", fallbackGender: "female" },
  chatterbox: { id: "chatterbox", legacyId: "bella", label: "Chatterbox 女聲", description: "單獨選用 Chatterbox 女聲。新音檔未備妥時沿用既有女聲。", fallbackGender: "female" }
};

// MP3 在產生時已調整語速；瀏覽器維持原速播放，避免即時降速造成破音。
export const AUDIO_PLAYBACK_RATE = 1;
export const AUDIO_GAIN = 1.55;
export const DEVICE_SPEECH_RATE = 0.86;

export function configureAudioElement(audio) {
  audio.defaultPlaybackRate = AUDIO_PLAYBACK_RATE;
  audio.playbackRate = AUDIO_PLAYBACK_RATE;
  audio.volume = 1;
  audio.preservesPitch = true;
  if ("webkitPreservesPitch" in audio) audio.webkitPreservesPitch = true;
  return audio;
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

export function isAmericanVoice(voice) {
  return /^en[-_]us$/i.test(voice?.lang || "");
}

export function pickAmericanVoice(voices, gender = "female") {
  const list = Array.isArray(voices) ? voices : [];
  const american = list.filter(isAmericanVoice);
  const fallbackGender = AUDIO_VOICES[gender]?.fallbackGender || "female";
  const hints = VOICE_HINTS[fallbackGender];
  const matchingGender = american.find((voice) => {
    const description = `${normalize(voice.name)} ${normalize(voice.voiceURI)}`;
    return hints.some((hint) => description.includes(hint));
  });
  return matchingGender
    || american.find((voice) => voice.default)
    || american[0]
    || list.find((voice) => /^en[-_]/i.test(voice?.lang || ""))
    || null;
}

export function voicePitch(gender) {
  return 1;
}

function getVoiceFile(file, gender) {
  const key = Object.hasOwn(AUDIO_VOICES, gender) ? gender : "female";
  const voice = AUDIO_VOICES[key];
  if (key === "female") return MATILDA_ASSETS.has(file) ? `./audio/matilda/${file}` : null;
  if (key === "male" && TEACHER_ASSETS.has(file)) return `./audio/qwen-teacher/${file}`;
  if (VOICE_ASSETS[voice.id].has(file)) return `./audio/${voice.id}/${file}`;
  return `./audio/${voice.legacyId}/${file}`;
}

export function getAudioPath(audioId, kind, gender = "female") {
  const safeId = String(audioId || "").replace(/[^0-9]/g, "");
  const validKinds = new Set(["word", "example-1", "example-2"]);
  if (!safeId || !validKinds.has(kind)) return null;
  return getVoiceFile(`${safeId}-${kind}.mp3`, gender);
}

export function getStoryAudioPath(storyId, gender = "female") {
  return /^\d{2,}$/.test(storyId || "") ? getVoiceFile(`stories/${storyId}.mp3`, gender) : null;
}
