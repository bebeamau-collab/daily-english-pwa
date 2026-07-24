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
  return gender === "male" ? 0.9 : 1.05;
}
