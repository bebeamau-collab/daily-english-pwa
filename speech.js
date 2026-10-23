import { MATILDA_ASSETS } from './matilda-assets.js?v=17';
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
  female: { id: "bella", label: "自然女聲", description: "原有教材 Bella；新單字與例句 Matilda，部分新文章由 Bella 備援。", fallbackGender: "female" },
  male: { id: "michael", label: "Michael 男聲", description: "自然語速，聲音沉穩清楚。", fallbackGender: "male" },
  slow: { id: "jasper", label: "Jasper 慢速", description: "語速較慢，適合第一次聽與跟讀。", fallbackGender: "male" }
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

export function getAudioPath(audioId, kind, gender = "female") {
  const voice = AUDIO_VOICES[gender] || AUDIO_VOICES.female;
  const safeId = String(audioId || "").replace(/[^0-9]/g, "");
  const validKinds = new Set(["word", "example-1", "example-2"]);
  if (!safeId || !validKinds.has(kind)) return null;
  const file = `${safeId}-${kind}.mp3`;
  return `./audio/${gender === 'female' && MATILDA_ASSETS.has(file) ? 'matilda' : voice.id}/${file}`;
}

export function getStoryAudioPath(storyId, gender = "female") {
  const voice = AUDIO_VOICES[gender] || AUDIO_VOICES.female;
  const file = `stories/${storyId}.mp3`;
  return /^\d{2,}$/.test(storyId || "") ? `./audio/${gender === 'female' && MATILDA_ASSETS.has(file) ? 'matilda' : voice.id}/${file}` : null;
}
