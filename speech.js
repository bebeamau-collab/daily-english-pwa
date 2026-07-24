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
