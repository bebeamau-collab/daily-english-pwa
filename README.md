# 每日英文單字 PWA

這是一個完全不需要後端、帳號或 API 的手機優先英文學習 APP。每天依日期固定選出 10 個不重複單字，每個字都有 KK 音標、兩組雙語例句，以及可選女聲／男聲的美式單字與例句發音；完成後依 1、3、7、14、30 天安排翻卡複習。所有進度只存在自己的裝置瀏覽器中。

## 專案內容

- `index.html`：APP 畫面與 iPhone PWA 設定
- `styles.css`：手機優先樣式、深色模式與安全區域
- `app.js`：畫面互動與資料保存
- `core.js`：每日選字、間隔複習、streak 核心邏輯
- `words.js`：300 個內建單字與片語（檔頭有新增教學）
- `second-examples.js`：300 組第二例句與中文翻譯
- `phonetics.js`：300 筆 KK 音標
- `speech.js`：美式語音與女聲／男聲選擇邏輯
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

每張今日單字卡與複習卡都有 KK 音標及兩組雙語例句。單字和兩句英文例句都有各自的播放按鈕，會使用裝置內建的美式英文語音，不需要串接網路 API；上方可以切換女聲或男聲，選擇會自動保存。不同 iPhone、iPad 或瀏覽器內建的語音名稱不完全相同，若沒有指定性別的美式聲線，APP 會改用裝置上可用的美式英文聲音。離線發音是否可用，取決於該聲音是否已下載到裝置。

## 在電腦上預覽與測試（選用）

因為瀏覽器的安全限制，不建議直接雙擊 `index.html`。若電腦已安裝 Python，可在資料夾中執行：

```bash
python3 -m http.server 4173
```

再開啟 `http://localhost:4173/`。若已安裝 Node.js，也可以執行：

```bash
npm test
```

測試會檢查 300 筆字庫、600 組例句與音標、美式男女聲選擇、固定選字不重複、完成學習、翻卡排程、記得／忘記、精通、streak 與 JSON 持久化。

## 自己新增單字

打開 `words.js`，依檔案最上方註解的格式新增一行，並在 `second-examples.js` 加入第二組例句。兩句英文例句都要原樣包含該單字或片語，程式才會自動將它粗體顯示；也請在 `phonetics.js` 加入相同英文鍵值的 KK 音標。新增後也要把 `service-worker.js` 的 `CACHE_NAME` 改成新版本（例如 `daily-english-v4`），已安裝的手機才會更快更新。
