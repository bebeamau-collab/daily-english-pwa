# 每日英文單字 PWA

這是一個完全不需要後端、帳號或 API 的手機優先英文學習 APP。每天依日期固定選出 10 個不重複單字，先用一篇可點擊、可翻譯及可朗讀的情境文章帶入，再學習 KK 音標與兩組雙語例句；完成後依 1、3、7、14、30 天安排翻卡複習。所有進度只存在自己的裝置瀏覽器中。

## 專案內容

- `index.html`：APP 畫面與 iPhone PWA 設定
- `styles.css`：手機優先樣式、深色模式與安全區域
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

## 音標與發音

每張今日單字卡與複習卡都有 KK 音標及兩組雙語例句。單字和兩句英文例句都有各自的播放按鈕，上方可切換 **Bella 女聲**或 **Michael 男聲**，選擇會自動保存。

每日 10 個單字上方會顯示一篇 **TODAY'S STORY**。這不是把十句例句接在一起，而是有角色、事件、轉折與結尾的連貫閱讀文章。文章以段落呈現並標示約略英文字數；有底線的英文都可以點擊，APP 會平滑移到對應單字卡。「顯示中文翻譯」會展開對應段落，但 10 個每日單字仍保留英文。

播放完整文章時，「跟讀模式」會顯示目前第幾句與整體進度；正在朗讀的句子會以柔和底色及左側標記提示。句子移出安全閱讀區域時，畫面才會適度跟進，避免頻繁捲動干擾專注。若裝置開啟「減少動態效果」，跟讀標記仍會更新，但不使用平滑捲動與脈衝動畫。

30 篇故事依固定日期順序循環，每篇對應當天固定的 10 個單字；輪完 300 字前不會重複。這種固定配對讓同一天重新開啟時，單字、故事與音檔都保持一致，也能在完全離線的純前端 APP 中提供真正連貫的文章。

語音使用 Apache 2.0 授權的 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 預先產生，不需要在手機中放 API 金鑰。Bella、Michael 的單字、例句與文章會以原音高的 0.92 倍速播放，並套用 1.35 倍基礎增益及動態峰值保護，讓發音更清楚又避免突然爆音。音檔第一次播放需要網路，成功播放後 service worker 會保存該音檔，之後可離線重播；如果自然語音檔暫時無法取得，APP 才會改用裝置內建的美式英文語音，備用速度為 0.82 倍，而且不會再用變更音高的方式模擬性別。

APP 的 HTML、CSS 與 JavaScript 在有網路時會優先取得最新版，離線時才讀取快取；已播放過的 MP3 則優先讀取本機快取。這能兼顧 PWA 離線使用與版本更新速度。

專案的 GitHub Actions 頁面中可手動執行 `Generate Bella and Michael audio`，它會產生 300 個單字及 600 句例句的兩組聲音，共 1,800 個 MP3。另一個 `Generate complete story audio` 工作會為 30 篇完整故事各產生 Bella 與 Michael 版本，共 60 個 MP3。所有音檔都會自動提交到 `audio/`；第一次播放需要網路，成功播放後可由 service worker 保存供離線重播。

## 在電腦上預覽與測試（選用）

因為瀏覽器的安全限制，不建議直接雙擊 `index.html`。若電腦已安裝 Python，可在資料夾中執行：

```bash
python3 -m http.server 4173
```

再開啟 `http://localhost:4173/`。若已安裝 Node.js，也可以執行：

```bash
npm test
```

測試會檢查 300 筆字庫、600 組例句與音標、30 篇連貫故事及中英文單字覆蓋、Bella／Michael 音檔路徑、固定選字不重複、完成學習、翻卡排程、記得／忘記、精通、streak 與 JSON 持久化。

## 自己新增單字

打開 `words.js`，依檔案最上方註解的格式新增一行，並在 `second-examples.js` 加入第二組例句。兩句英文例句都要原樣包含該單字或片語，程式才能自動粗體顯示；也請在 `phonetics.js` 加入相同英文鍵值的 KK 音標。若更動每日選字，還要同步修改 `stories-data.js` 中對應故事，讓英文與中文段落都原樣保留該日十個英文單字。最後把 `service-worker.js` 的 `CACHE_NAME` 改成新版本，已安裝的手機才會更快更新。
