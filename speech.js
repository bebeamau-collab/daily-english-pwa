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
  female: { id: "bella", label: "Bella 女聲" },
  male: { id: "michael", label: "Michael 男聲" }
};

// 播放時統一微調，不必重新產生全部 MP3。
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
  const hints = VOICE_HINTS[gender === "male" ? "male" : "female"];
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
  const voice = AUDIO_VOICES[gender === "male" ? "male" : "female"];
  const safeId = String(audioId || "").replace(/[^0-9]/g, "");
  const validKinds = new Set(["word", "example-1", "example-2"]);
  if (!safeId || !validKinds.has(kind)) return null;
  return `./audio/${voice.id}/${safeId}-${kind}.mp3`;
}

export function getStoryAudioPath(storyId, gender = "female") {
  const voice = AUDIO_VOICES[gender === "male" ? "male" : "female"];
  return /^\d{2}$/.test(storyId || "") ? `./audio/${voice.id}/stories/${storyId}.mp3` : null;
}
