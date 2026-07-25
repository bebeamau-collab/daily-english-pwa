import { RAW_STORIES } from "./stories-data.js";
import { WORDS_PER_DAY, dayNumber } from "./core.js";

function parseStories(raw) {
  return [...raw.matchAll(
    /@@(\d{2})\nTITLE:(.+)\nEN:\n([\s\S]*?)\nZH:\n([\s\S]*?)(?=\n@@\d{2}\n|$)/g
  )].map((match) => ({
    id: match[1],
    title: match[2].trim(),
    englishParagraphs: match[3].trim().split(/\n{2,}/),
    chineseParagraphs: match[4].trim().split(/\n{2,}/)
  }));
}

export const STORIES = parseStories(RAW_STORIES);

export function getStoryIndex(dateString) {
  const index = dayNumber(dateString) - dayNumber("2026-01-01");
  return ((index % STORIES.length) + STORIES.length) % STORIES.length;
}

export function createDailyStory(words, dateString) {
  const story = STORIES[getStoryIndex(dateString)];
  const english = story.englishParagraphs.join(" ");
  return {
    ...story,
    words,
    wordCount: (english.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length
  };
}

export function getStoryAudioText(story) {
  return `${story.title}. ${story.englishParagraphs.join(" ")}`;
}

export function validateStories(words) {
  return STORIES.map((story, index) => {
    const dailyWords = words.slice(index * WORDS_PER_DAY, index * WORDS_PER_DAY + WORDS_PER_DAY);
    const english = story.englishParagraphs.join(" ").toLocaleLowerCase("en-US");
    const chinese = story.chineseParagraphs.join(" ").toLocaleLowerCase("en-US");
    return {
      id: story.id,
      missingEnglish: dailyWords.filter((item) => !english.includes(item.word.toLocaleLowerCase("en-US"))).map((item) => item.word),
      missingChinese: dailyWords.filter((item) => !chinese.includes(item.word.toLocaleLowerCase("en-US"))).map((item) => item.word)
    };
  });
}
