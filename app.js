import { WORDS } from "./words.js";
import {
  STORAGE_KEY,
  answerReview,
  calculateStreak,
  completeToday,
  createInitialState,
  formatLocalDate,
  getDailyWords,
  getDueWords,
  normalizeState
} from "./core.js";
import { AUDIO_VOICES, getAudioPath, pickAmericanVoice, voicePitch } from "./speech.js";
import { createDailyStory } from "./story.js";

const elements = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((element) => [element.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), element])
);
const navButtons = [...document.querySelectorAll(".nav-button")];
const voiceButtons = [...document.querySelectorAll("[data-voice-gender]")];
const views = ["today", "review", "progress"];
let availableVoices = [];
let speakingText = "";
let activeAudio = null;
let audioSequenceToken = 0;
let storyHighlightTimeout = null;

const STORY_SPEAK_KEY = "__daily-story__";

function getToday() {
  const requested = new URLSearchParams(location.search).get("date");
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  return isLocal && /^\d{4}-\d{2}-\d{2}$/.test(requested || "") ? requested : formatLocalDate();
}

const isLocalTest = ["localhost", "127.0.0.1"].includes(location.hostname);
if (isLocalTest && new URLSearchParams(location.search).get("resetTest") === "1") {
  localStorage.removeItem(STORAGE_KEY);
}

const today = getToday();
const dailyWords = getDailyWords(WORDS, today);
let state = loadState();
let reviewQueue = [];
let currentReview = null;

function loadState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

function stripStrong(value) {
  return value.replace(/<\/?strong>/g, "");
}

function refreshVoices() {
  if ("speechSynthesis" in window) availableVoices = speechSynthesis.getVoices();
}

function renderVoiceControl() {
  voiceButtons.forEach((button) => {
    const active = button.dataset.voiceGender === state.voiceGender;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateSpeakButtons() {
  document.querySelectorAll("[data-speak-text]").forEach((button) => {
    const active = speakingText === button.dataset.speakText;
    button.classList.toggle("is-speaking", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function finishSpeaking() {
  speakingText = "";
  updateSpeakButtons();
}

function stopActivePlayback() {
  audioSequenceToken += 1;
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  finishSpeaking();
}

function speakWithDeviceVoice(text) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    showToast("這個瀏覽器不支援語音播放");
    return;
  }

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickAmericanVoice(availableVoices, state.voiceGender);
  utterance.lang = "en-US";
  utterance.rate = 0.86;
  utterance.pitch = voicePitch(state.voiceGender);
  if (voice) utterance.voice = voice;
  utterance.onstart = () => {
    speakingText = text;
    updateSpeakButtons();
  };
  utterance.onend = finishSpeaking;
  utterance.onerror = finishSpeaking;
  speechSynthesis.speak(utterance);
}

function speakText(text, audioId, kind) {
  stopActivePlayback();

  const path = getAudioPath(audioId, kind, state.voiceGender);
  if (!path) {
    speakWithDeviceVoice(text);
    return;
  }

  const audio = new Audio(path);
  activeAudio = audio;
  audio.preload = "auto";
  audio.onplay = () => {
    speakingText = text;
    updateSpeakButtons();
  };
  audio.onended = () => {
    activeAudio = null;
    finishSpeaking();
  };
  audio.onerror = () => {
    activeAudio = null;
    finishSpeaking();
    showToast("自然語音尚未下載完成，暫用裝置語音");
    speakWithDeviceVoice(text);
  };
  audio.play().catch(() => {
    activeAudio = null;
    finishSpeaking();
    showToast("請再點一次播放");
  });
}

function playStoryAudio(sentences) {
  if (speakingText === STORY_SPEAK_KEY) {
    stopActivePlayback();
    showToast("已停止文章朗讀");
    return;
  }

  stopActivePlayback();
  const sequenceToken = audioSequenceToken;
  const audio = new Audio();
  activeAudio = audio;
  speakingText = STORY_SPEAK_KEY;
  updateSpeakButtons();

  let index = 0;
  let showedError = false;
  const playNext = () => {
    if (sequenceToken !== audioSequenceToken) return;
    if (index >= sentences.length) {
      activeAudio = null;
      finishSpeaking();
      return;
    }

    const sentence = sentences[index];
    index += 1;
    const path = getAudioPath(sentence.audioId, sentence.audioKind, state.voiceGender);
    if (!path) {
      playNext();
      return;
    }
    let advanced = false;
    const continueOnce = () => {
      if (advanced) return;
      advanced = true;
      playNext();
    };
    audio.src = path;
    audio.play().catch(() => {
      if (!showedError) {
        showedError = true;
        showToast("文章音檔載入失敗，請稍後再試");
      }
      continueOnce();
    });
    audio.onended = continueOnce;
    audio.onerror = () => {
      if (!showedError) {
        showedError = true;
        showToast("部分音檔暫時無法播放，已繼續下一句");
      }
      continueOnce();
    };
  };

  playNext();
}

function createStoryWordButton(word, audioId, displayedWord = word) {
  const button = document.createElement("button");
  button.className = "story-word-link";
  button.type = "button";
  button.dataset.wordTarget = audioId;
  button.textContent = displayedWord;
  button.setAttribute("aria-label", `前往單字 ${word}`);
  return button;
}

function renderEnglishStory(container, sentences) {
  const fragment = document.createDocumentFragment();
  sentences.forEach((sentence, index) => {
    const wrapper = document.createElement("span");
    wrapper.className = "story-sentence";
    const lowerEnglish = sentence.english.toLocaleLowerCase("en-US");
    const wordStart = lowerEnglish.indexOf(sentence.word.toLocaleLowerCase("en-US"));

    if (wordStart === -1) {
      wrapper.append(sentence.english);
    } else {
      const wordEnd = wordStart + sentence.word.length;
      wrapper.append(sentence.english.slice(0, wordStart));
      wrapper.append(createStoryWordButton(sentence.word, sentence.audioId, sentence.english.slice(wordStart, wordEnd)));
      wrapper.append(sentence.english.slice(wordEnd));
    }
    if (index < sentences.length - 1) wrapper.append(" ");
    fragment.append(wrapper);
  });
  container.replaceChildren(fragment);
}

function renderChineseStory(container, sentences) {
  const fragment = document.createDocumentFragment();
  sentences.forEach((sentence, index) => {
    const wrapper = document.createElement("span");
    wrapper.className = "story-sentence";
    wrapper.append(createStoryWordButton(sentence.word, sentence.audioId));
    wrapper.append(`：${sentence.chinese}`);
    if (index < sentences.length - 1) wrapper.append(" ");
    fragment.append(wrapper);
  });
  container.replaceChildren(fragment);
}

function renderDailyStory() {
  const story = createDailyStory(dailyWords, today);
  elements.dailyStoryTitle.textContent = story.title;
  renderEnglishStory(elements.dailyStoryEnglish, story.sentences);
  renderChineseStory(elements.dailyStoryChinese, story.sentences);
  elements.storySpeak.dataset.speakText = STORY_SPEAK_KEY;
  elements.storySpeak.setAttribute("aria-label", `使用 ${AUDIO_VOICES[state.voiceGender].label} 播放今日文章`);
  return story;
}

function wordCard(item, index) {
  const article = document.createElement("article");
  article.className = "word-card";
  article.id = `word-${item.audioId}`;
  article.tabIndex = -1;
  article.innerHTML = `
    <div class="word-card-top">
      <div>
        <span class="word-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="level-badge">${item.level}</span>
      </div>
      <span class="topic-chip">${item.topic}</span>
    </div>
    <div class="word-heading-row">
      <div>
        <div class="word-title-row">
          <h3>${item.word}</h3>
          <span>${item.partOfSpeech}</span>
        </div>
        <p class="phonetic"><span>KK</span> ${item.phonetic}</p>
      </div>
      <button class="speak-button" type="button" aria-pressed="false">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 9v6h4l5 4V5L9 9H5Zm12 1a3 3 0 0 1 0 4m2-7a7 7 0 0 1 0 10"/></svg>
      </button>
    </div>
    <p class="word-meaning">${item.zh}</p>
    <div class="example-box">
      <div class="example-item">
        <div class="example-item-heading">
          <span>例句 1</span>
          <button class="example-speak-button" type="button" aria-pressed="false">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 9v6h4l5 4V5L9 9H5Zm12 1a3 3 0 0 1 0 4m2-7a7 7 0 0 1 0 10"/></svg>
            <span>播放</span>
          </button>
        </div>
        <p>${item.example}</p>
        <p>${item.exampleZh}</p>
      </div>
      <div class="example-item">
        <div class="example-item-heading">
          <span>例句 2</span>
          <button class="example-speak-button" type="button" aria-pressed="false">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 9v6h4l5 4V5L9 9H5Zm12 1a3 3 0 0 1 0 4m2-7a7 7 0 0 1 0 10"/></svg>
            <span>播放</span>
          </button>
        </div>
        <p>${item.example2}</p>
        <p>${item.exampleZh2}</p>
      </div>
    </div>`;
  const speakButton = article.querySelector(".speak-button");
  speakButton.dataset.speakText = item.word;
  speakButton.dataset.audioId = item.audioId;
  speakButton.dataset.audioKind = "word";
  speakButton.setAttribute("aria-label", `播放 ${item.word} 的美式發音`);
  const exampleButtons = article.querySelectorAll(".example-speak-button");
  [item.example, item.example2].forEach((example, exampleIndex) => {
    const plainExample = stripStrong(example);
    exampleButtons[exampleIndex].dataset.speakText = plainExample;
    exampleButtons[exampleIndex].dataset.audioId = item.audioId;
    exampleButtons[exampleIndex].dataset.audioKind = `example-${exampleIndex + 1}`;
    exampleButtons[exampleIndex].setAttribute("aria-label", `播放 ${item.word} 的例句 ${exampleIndex + 1}`);
  });
  return article;
}

function renderToday() {
  const completed = state.completedDates.includes(today);
  const date = new Intl.DateTimeFormat("zh-TW", { month: "long", day: "numeric", weekday: "long" }).format(
    new Date(`${today}T12:00:00`)
  );
  elements.todayDate.textContent = date;
  renderDailyStory();
  elements.wordList.replaceChildren(...dailyWords.map(wordCard));
  elements.todayCompleteCard.hidden = !completed;
  elements.completeToday.hidden = completed;
  elements.todayProgress.textContent = completed ? "已完成" : "10 個";
}

function renderReview() {
  reviewQueue = getDueWords(state, WORDS, today);
  const count = reviewQueue.length;
  elements.reviewBadge.hidden = count === 0;
  elements.reviewBadge.textContent = count > 99 ? "99+" : String(count);
  elements.reviewRemaining.textContent = `${count} 個`;
  elements.reviewEmpty.hidden = count !== 0;
  elements.reviewArea.hidden = count === 0;
  if (!count) {
    currentReview = null;
    return;
  }
  currentReview = reviewQueue[0];
  elements.reviewCard.classList.remove("is-flipped");
  elements.reviewCard.setAttribute("aria-pressed", "false");
  elements.reviewCard.querySelector(".review-front").setAttribute("aria-hidden", "false");
  elements.reviewCard.querySelector(".review-back").setAttribute("aria-hidden", "true");
  elements.reviewActions.hidden = true;
  elements.reviewSentenceActions.hidden = true;
  elements.reviewLevel.textContent = currentReview.level;
  elements.reviewWord.textContent = currentReview.word;
  elements.reviewPhonetic.textContent = `KK ${currentReview.phonetic}`;
  elements.reviewPos.textContent = currentReview.partOfSpeech;
  elements.reviewSpeak.dataset.speakText = currentReview.word;
  elements.reviewSpeak.dataset.audioId = currentReview.audioId;
  elements.reviewSpeak.dataset.audioKind = "word";
  elements.reviewSpeak.setAttribute("aria-label", `播放 ${currentReview.word} 的美式發音`);
  elements.reviewZh.textContent = currentReview.zh;
  elements.reviewExample.innerHTML = currentReview.example;
  elements.reviewExampleZh.textContent = currentReview.exampleZh;
  elements.reviewExampleSecond.innerHTML = currentReview.example2;
  elements.reviewExampleZhSecond.textContent = currentReview.exampleZh2;
  elements.reviewSentenceFirst.dataset.speakText = stripStrong(currentReview.example);
  elements.reviewSentenceSecond.dataset.speakText = stripStrong(currentReview.example2);
  elements.reviewSentenceFirst.dataset.audioId = currentReview.audioId;
  elements.reviewSentenceSecond.dataset.audioId = currentReview.audioId;
  elements.reviewSentenceFirst.dataset.audioKind = "example-1";
  elements.reviewSentenceSecond.dataset.audioKind = "example-2";
  elements.reviewSentenceFirst.setAttribute("aria-label", `播放 ${currentReview.word} 的例句 1`);
  elements.reviewSentenceSecond.setAttribute("aria-label", `播放 ${currentReview.word} 的例句 2`);
}

function renderProgress() {
  const reviews = Object.values(state.reviews);
  const streak = calculateStreak(state.completedDates, today);
  elements.headerStreak.textContent = streak;
  elements.statStreak.textContent = streak;
  elements.statReviewing.textContent = reviews.filter((item) => item.status === "reviewing").length;
  elements.statMastered.textContent = reviews.filter((item) => item.status === "mastered").length;
  elements.statDays.textContent = state.completedDates.length;

  const learnedWords = Object.keys(state.learned)
    .map((word) => WORDS.find((item) => item.word === word))
    .filter(Boolean)
    .sort((a, b) => a.word.localeCompare(b.word));
  elements.learnedCount.textContent = `${learnedWords.length} 個`;
  if (!learnedWords.length) {
    elements.learnedList.innerHTML = '<p class="learned-empty">完成今天的 10 個字後，學習清單會出現在這裡。</p>';
  } else {
    elements.learnedList.replaceChildren(
      ...learnedWords.map((item) => {
        const row = document.createElement("article");
        const mastered = state.reviews[item.word]?.status === "mastered";
        row.className = "learned-row";
        row.innerHTML = `
          <div><strong>${item.word}</strong><span>${item.zh}</span></div>
          <span class="learned-status ${mastered ? "mastered" : ""}">${mastered ? "🏆 精通" : "複習中"}</span>`;
        return row;
      })
    );
  }

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = navigator.standalone === true || matchMedia("(display-mode: standalone)").matches;
  elements.installGuide.hidden = !(isIOS && !isStandalone);
}

function renderAll() {
  renderVoiceControl();
  renderToday();
  renderReview();
  renderProgress();
}

function switchView(view, updateHistory = false) {
  const validView = views.includes(view) ? view : "today";
  document.querySelectorAll(".view").forEach((section) => {
    const active = section.id === `${validView}-view`;
    section.hidden = !active;
    section.classList.toggle("is-active", active);
  });
  navButtons.forEach((button) => {
    const active = button.dataset.view === validView;
    button.classList.toggle("is-active", active);
    active ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current");
  });
  const titles = {
    today: ["今天的 10 個字", "每天一點點，記得更久。"],
    review: ["複習時間", "想起來，比看過更重要。"],
    progress: ["我的進度", "每次回來，都算進步。"]
  };
  [elements.pageTitle.textContent, elements.headerSubtitle.textContent] = titles[validView];
  if (updateHistory && location.hash !== `#${validView}`) history.pushState({ view: validView }, "", `#${validView}`);
  window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

elements.completeToday.addEventListener("click", () => {
  state = completeToday(state, dailyWords, today);
  saveState();
  renderAll();
  showToast("完成！明天開始複習這 10 個字");
});

voiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stopActivePlayback();
    state.voiceGender = button.dataset.voiceGender;
    saveState();
    renderVoiceControl();
    elements.storySpeak.setAttribute("aria-label", `使用 ${AUDIO_VOICES[state.voiceGender].label} 播放今日文章`);
    showToast(`已切換為 ${AUDIO_VOICES[state.voiceGender].label}`);
  });
});

elements.wordList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speak-text]");
  if (button) speakText(button.dataset.speakText, button.dataset.audioId, button.dataset.audioKind);
});
elements.storySpeak.addEventListener("click", () => {
  const story = createDailyStory(dailyWords, today);
  playStoryAudio(story.sentences);
});
elements.storyTranslationToggle.addEventListener("click", () => {
  const willOpen = elements.dailyStoryTranslation.hidden;
  elements.dailyStoryTranslation.hidden = !willOpen;
  elements.storyTranslationToggle.setAttribute("aria-expanded", String(willOpen));
  elements.storyTranslationToggle.querySelector("span").textContent = willOpen ? "隱藏中文翻譯" : "顯示中文翻譯";
});
document.querySelector(".story-card").addEventListener("click", (event) => {
  const link = event.target.closest("[data-word-target]");
  if (!link) return;
  const target = document.getElementById(`word-${link.dataset.wordTarget}`);
  if (!target) return;
  target.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "center"
  });
  target.focus({ preventScroll: true });
  document.querySelectorAll(".word-card.is-story-target").forEach((card) => card.classList.remove("is-story-target"));
  target.classList.add("is-story-target");
  clearTimeout(storyHighlightTimeout);
  storyHighlightTimeout = setTimeout(() => target.classList.remove("is-story-target"), 1800);
});
elements.reviewSpeak.addEventListener("click", () => {
  speakText(elements.reviewSpeak.dataset.speakText, elements.reviewSpeak.dataset.audioId, elements.reviewSpeak.dataset.audioKind);
});
elements.reviewSentenceActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speak-text]");
  if (button) speakText(button.dataset.speakText, button.dataset.audioId, button.dataset.audioKind);
});

elements.reviewCard.addEventListener("click", () => {
  const flipped = !elements.reviewCard.classList.contains("is-flipped");
  elements.reviewCard.classList.toggle("is-flipped", flipped);
  elements.reviewCard.setAttribute("aria-pressed", String(flipped));
  elements.reviewCard.querySelector(".review-front").setAttribute("aria-hidden", String(flipped));
  elements.reviewCard.querySelector(".review-back").setAttribute("aria-hidden", String(!flipped));
  elements.reviewSentenceActions.hidden = !flipped;
  elements.reviewActions.hidden = !flipped;
});

function handleReviewAnswer(remembered) {
  if (!currentReview) return;
  const previous = state.reviews[currentReview.word];
  const willMaster = remembered && previous.stage === 4;
  state = answerReview(state, currentReview.word, remembered, today);
  saveState();
  showToast(willMaster ? "太棒了，這個字已精通！" : remembered ? "答對了，已安排下一次複習" : "沒關係，明天再試一次");
  renderAll();
}

elements.rememberButton.addEventListener("click", () => handleReviewAnswer(true));
elements.forgotButton.addEventListener("click", () => handleReviewAnswer(false));

navButtons.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view, true)));
window.addEventListener("popstate", () => switchView(location.hash.slice(1) || "today"));

renderAll();
switchView(location.hash.slice(1) || "today");

if ("speechSynthesis" in window) {
  refreshVoices();
  if (typeof speechSynthesis.addEventListener === "function") {
    speechSynthesis.addEventListener("voiceschanged", refreshVoices);
  } else {
    speechSynthesis.onvoiceschanged = refreshVoices;
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}
