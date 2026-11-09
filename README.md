# 每日英文單字 PWA

這是一個完全不需要後端、帳號或 API 的手機優先英文學習 APP。每天依日期固定選出 10 個不重複單字，先用一篇可點擊、可翻譯及可朗讀的情境文章帶入，再學習 KK 音標與兩組雙語例句；完成後依 1、3、7、14、30 天安排翻卡複習。所有進度只存在自己的裝置瀏覽器中。

## 專案內容

目前已擴充至 **500 詞、50 篇故事**（2026-11 批次）。原始300詞與30篇故事仍保留在下列基礎檔案，10月及11月教材分別放在 `monthly-2026-10.js`、`monthly-2026-11.js`；總資料由 `words.js` 與 `story.js` 合併。新批次不會更動已開始輪次或裝置的學習紀錄，11月新詞從下一輪接納，依固定順序12/13首次出現。詳見 [每月擴充規格](docs/monthly-expansion.md) 與 [11月驗收](docs/2026-11-checkpoint.md)。

ElevenLabs 女聲使用既有 Matilda 音檔，缺檔的教材只顯示文字。另可選 Qwen 男聲、0.9 倍速 Qwen 女聲及 Chatterbox 女聲。所有音檔都是預先產製的 MP3，播放時不呼叫語音 API。

- `index.html`：APP 畫面與 iPhone PWA 設定
- `styles.css`：手機優先樣式、淺色／深色閱讀模式與安全區域
- `app.js`：畫面互動與資料保存
- `core.js`：每日選字、間隔複習、streak 核心邏輯
- `stories-data.js`：30 篇有角色、事件轉折與結尾的每日故事
- `story.js`：依日期選出固定故事、計算字數並連結今日單字
- `words.js`：300 個內建單字與片語（檔頭有新增教學）
- `second-examples.js`：300 組第二例句與中文翻譯
- `phonetics.js`：300 筆 KK 音標
- `speech.js`：Bella／Michael 美式語音與備用播放邏輯
- `audio/`：自動產生的 Kokoro 美式發音 MP3
- `scripts/generate_audio.py`：批次產生單字及例句音檔
- `scripts/generate_story_audio.py`：批次產生 Bella／Michael 完整故事音檔
- `manifest.webmanifest`、`service-worker.js`：安裝與離線使用
- `icons/`：180×180 與 512×512 PNG 圖示
- `tests/`：核心功能自動測試

## 免費放上 GitHub Pages（零基礎版）

1. 到 [GitHub](https://github.com/) 註冊並登入。
2. 右上角按 `+` → `New repository`。
3. Repository name 填 `daily-english-pwa`，選 `Public`，按 `Create repository`。
4. 在新倉庫頁面按 `uploading an existing file`。
5. 把這個資料夾內的檔案和資料夾全部拖進去。請確認 `index.html` 位在最外層，不要多包一層資料夾。
6. 頁面下方按 `Commit changes`。
7. 進入倉庫的 `Settings` → 左側 `Pages`。
8. `Build and deployment` 的 Source 選 `Deploy from a branch`。
9. Branch 選 `main`，資料夾選 `/(root)`，按 `Save`。
10. 等待約一至三分鐘，重新整理同一頁，就會看到網址：
    `https://你的帳號.github.io/daily-english-pwa/`

之後若修改檔案，只要再次上傳並覆蓋同名檔案，GitHub Pages 會自動更新。因為 service worker 會保存離線版本，iPhone 有時需要關閉再重開 APP 才會看到最新版。

## 安裝到 iPhone

1. 務必用 **Safari** 開啟 GitHub Pages 網址。
2. 點 Safari 下方工具列的「分享」圖示。
3. 往下滑，選「加入主畫面」。
4. 名稱可保留「每日英文」，按右上角「新增」。
5. 之後從主畫面圖示開啟，就會像一般 APP，也能在曾載入成功後離線使用。

> 學習紀錄存放在 Safari／PWA 的 localStorage。刪除網站資料、移除 APP 後清除資料，或換一台手機，都不會自動同步。

## 白天與夜間閱讀底色

APP 預設使用明亮的淺色底，白天在手機或平板上閱讀文章與單字會更清楚。頁面上方的「閱讀底色」可隨時切換「淺色／深色」；選擇會保存在目前裝置，關閉或重新開啟 APP 後仍會沿用。這個選擇不會影響單字、複習排程或其他學習紀錄。

## 音標與發音

每張今日單字卡與複習卡都有 KK 音標及兩組雙語例句。單字和兩句英文例句有對應音檔時，會各自顯示播放按鈕，上方可切換 **ElevenLabs 女聲**、**Qwen 男聲**、**Qwen 慢速女聲**或 **Chatterbox 女聲**，選擇會自動保存。

每日 10 個單字上方會顯示一篇 **TODAY'S STORY**。這不是把十句例句接在一起，而是有角色、事件、轉折與結尾的連貫閱讀文章。文章以段落呈現並標示約略英文字數；有底線的英文都可以點擊，APP 會平滑移到對應單字卡。「顯示中文翻譯」會展開對應段落，但 10 個每日單字仍保留英文。

播放完整文章時，「逐段跟讀」會顯示目前第幾段與整體進度。跟讀列會留在文章上方，可以點「暫停」保留目前段落和播放位置，再點「繼續」接著聽；文章標題旁的「停止朗讀」則會結束這次播放。畫面一次標示整個段落，使用暖黃色／琥珀色底並在段落前後加入 `【　】`。段落移出安全閱讀區域時，畫面才會適度跟進。若裝置開啟「減少動態效果」，段落標記仍會更新，但不使用平滑捲動與脈衝動畫。

每日故事依固定日期順序循環，每篇對應當天固定的 10 個單字；輪完該輪可用字庫前不會重複。每輪開始時才接納已發布的新批次，避免中途換掉教材。這種固定配對讓同一天重新開啟時，單字、故事與音檔都保持一致，也能在完全離線的純前端 APP 中提供真正連貫的文章。

ElevenLabs 女聲只播放 Matilda，有音檔的單字、例句與文章才顯示播放按鈕。也可手動選擇 [Qwen Ryan 男聲、Serena 慢速女聲](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice)或 [Chatterbox 女聲](https://huggingface.co/ResembleAI/chatterbox-turbo)。Ryan 的 1,000 句例句與 50 篇文章使用 Qwen3-TTS 1.7B 的英文老師朗讀，保留適度的英文重音與平穩語速。新版檔案位於 `audio/qwen-teacher/`，並登錄在 `teacher-assets.js`。Serena 的 MP3 預先以 0.9 倍速處理。新音檔分批驗收並登錄在 `voice-assets.js`，缺少對應新檔時由原聲線補上。各聲線使用獨立的音檔路徑，瀏覽器以 1.0 倍播放。音量套用 1.55 倍基礎增益及動態峰值保護。音檔成功播放後可供離線使用。

APP 的 HTML、CSS 與 JavaScript 在有網路時會優先取得最新版，離線時才讀取快取；已播放過的 MP3 則優先讀取本機快取。這能兼顧 PWA 離線使用與版本更新速度。

專案的 GitHub Actions 語音工作會呼叫 `scripts/monthly-backup.py`，只補最新已登錄批次的缺失檔案，不整庫重做；本機可用 `--batch 2026-11` 指定月份。Bella會跳過已存在的Matilda檔案。第一次播放需要網路，成功播放後可由 service worker 保存供離線重播。

## 在電腦上預覽與測試（選用）

因為瀏覽器的安全限制，不建議直接雙擊 `index.html`。若電腦已安裝 Python，可在資料夾中執行：

```bash
python3 -m http.server 4173
```

再開啟 `http://localhost:4173/`。若已安裝 Node.js，也可以執行：

```bash
npm test
```

測試會檢查 300 筆字庫、600 組例句與音標、30 篇連貫故事及中英文單字覆蓋、Bella／Michael 音檔路徑、固定選字不重複、完成學習、翻卡排程、記得／忘記、精通、streak，以及閱讀底色與其他設定的 JSON 持久化。

## 自己新增單字

打開 `words.js`，依檔案最上方註解的格式新增一行，並在 `second-examples.js` 加入第二組例句。兩句英文例句都要原樣包含該單字或片語，程式才能自動粗體顯示；也請在 `phonetics.js` 加入相同英文鍵值的 KK 音標。若更動每日選字，還要同步修改 `stories-data.js` 中對應故事，讓英文與中文段落都原樣保留該日十個英文單字。最後把 `service-worker.js` 的 `CACHE_NAME` 改成新版本，已安裝的手機才會更快更新。
