const STORY_TITLES = [
  "A Day of Small Adventures",
  "Ten Moments in Everyday Life",
  "Useful English in Real Life"
];

function plainText(value) {
  return value.replace(/<\/?strong>/g, "");
}

function dateSeed(dateString) {
  return [...dateString].reduce((total, character) => total + character.charCodeAt(0), 0);
}

export function createDailyStory(words, dateString) {
  const seed = dateSeed(dateString);
  const sentences = words.map((item, index) => {
    const useSecondExample = (seed + index) % 2 === 0;
    return {
      word: item.word,
      audioId: item.audioId,
      audioKind: useSecondExample ? "example-2" : "example-1",
      english: plainText(useSecondExample ? item.example2 : item.example),
      chinese: useSecondExample ? item.exampleZh2 : item.exampleZh
    };
  });

  return {
    title: STORY_TITLES[seed % STORY_TITLES.length],
    sentences
  };
}
