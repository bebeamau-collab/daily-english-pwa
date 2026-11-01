/* 2026-11 增量100詞；401–500及故事41–50的ID永久不變。
 * 新增方式：每行 word|詞性|繁中|KK|例句1|中譯1|例句2|中譯2|編輯估級。
 * 每十行對應下方同序故事；不得重編已發布ID或替換舊音檔。
 * KK採常見美式讀音；L1–L6為編輯估級，並非官方逐字分級認證。 */
const RAW = `
bakery|n.|麵包店|ˈbekərɪ|The bakery opens at seven.|麵包店七點開門。|We stopped at a small bakery.|我們在一間小麵包店停留。|L2
dough|n.|麵團|do|The dough feels soft now.|麵團現在摸起來很柔軟。|Cover the dough with a towel.|用毛巾蓋住麵團。|L4
knead|v.|揉麵團|nid|Please knead the dough gently.|請輕輕揉麵團。|I learned to knead bread dough.|我學會了揉麵包麵團。|L5
yeast|n.|酵母|jist|Add yeast to the warm water.|把酵母加入溫水裡。|This bread needs a little yeast.|這種麵包需要一點酵母。|L5
crust|n.|麵包皮；外皮|krʌst|The crust is golden brown.|麵包皮呈金黃色。|I like a thin pizza crust.|我喜歡薄披薩皮。|L4
filling|n.|餡料|ˈfɪlɪŋ|This bun has a bean filling.|這個麵包有豆沙餡。|The filling is still warm.|餡料還是溫熱的。|L3
slice|n.|薄片；一片|slaɪs|Would you like a slice?|你想要一片嗎？|Save a slice of bread for me.|留一片麵包給我。|L2
tray|n.|托盤；烤盤|tre|Put the cups on the tray.|把杯子放在托盤上。|The hot tray needs to cool.|熱烤盤需要冷卻。|L3
preheat|v.|預熱|priˈhit|Please preheat the oven first.|請先預熱烤箱。|We preheat it before baking.|我們烘焙前會先預熱。|L4
from scratch|phr.|從頭開始；從原料做起|frəm skrætʃ|We made the bread from scratch.|我們從原料開始製作麵包。|She built the model from scratch.|她從頭開始製作模型。|口語
vendor|n.|攤販；賣家|ˈvɛndɚ|A vendor sold us fresh fruit.|一位攤販賣給我們新鮮水果。|Ask the vendor about the price.|向攤販詢問價格。|L4
stall|n.|攤位|stɔl|This stall sells handmade soap.|這個攤位販售手工皂。|We found a quiet corner stall.|我們找到角落一個安靜的攤位。|L3
handmade|adj.|手工製的|ˈhændˌmed|This handmade bowl is beautiful.|這個手工碗很漂亮。|He gave me a handmade card.|他送我一張手工卡片。|L3
secondhand|adj.|二手的|ˈsɛkəndˌhænd|I bought a secondhand bicycle.|我買了一輛二手腳踏車。|Her secondhand desk looks new.|她的二手書桌看起來很新。|L3
negotiate|v.|協商；議價|nɪˈɡoʃɪˌet|We can negotiate a fair price.|我們可以協商公平的價格。|They need time to negotiate.|他們需要時間協商。|L5
reasonable|adj.|合理的|ˈrizənəbəl|The price seems reasonable.|這個價格看起來很合理。|That is a reasonable request.|那是合理的要求。|L3
deposit|n.|訂金；押金|dɪˈpɑzɪt|We paid a small deposit.|我們付了一小筆訂金。|Is the deposit included in this amount?|這個金額包含訂金嗎？|L4
installment|n.|分期付款的一期款項|ɪnˈstɔlmənt|The first installment is due today.|第一期款項今天到期。|We paid the final installment.|我們付清了最後一期款項。|L5
price tag|n.|價格標籤|praɪs tæɡ|Check the price tag carefully.|仔細查看價格標籤。|The price tag fell off.|價格標籤掉了。|L3
a good deal|phr.|划算的交易|ə ɡʊd dil|This used desk was a good deal.|這張二手書桌買得很划算。|We found a good deal online.|我們在網路上找到划算的交易。|口語
boarding pass|n.|登機證|ˈbɔrdɪŋ pæs|Keep your boarding pass ready.|把登機證準備好。|My boarding pass is on my phone.|我的登機證在手機裡。|L3
terminal|n.|航廈；轉運站|ˈtɝmənəl|Our flight leaves from this terminal.|我們的班機從這座航廈出發。|Meet me outside the terminal.|在航廈外面和我碰面。|L4
shuttle|n.|接駁車|ˈʃʌtəl|The free shuttle arrives soon.|免費接駁車快到了。|We took a shuttle to the station.|我們搭接駁車到車站。|L4
timetable|n.|時刻表|ˈtaɪmˌtebəl|Check the timetable before leaving.|出發前查看時刻表。|The timetable changed last week.|時刻表上週更改了。|L3
carriage|n.|火車車廂|ˈkærɪdʒ|This carriage is almost empty.|這節車廂幾乎沒有人。|Our seats are in the last carriage.|我們的座位在最後一節車廂。|L4
overhead|adj.|頭頂上方的|ˈovɚˌhɛd|Use the overhead shelf for bags.|把袋子放在頭頂上方的架子。|An overhead light lit the table.|頭頂上方的燈照亮了桌子。|L4
accessible|adj.|方便使用或到達的|əkˈsɛsəbəl|The entrance is accessible to wheelchairs.|這個入口方便輪椅使用者通行。|The museum is accessible by bus.|這間博物館搭公車就能到。|L4
round trip|n.|來回行程|raʊnd trɪp|How long is the round trip?|來回行程要多久？|The round trip takes two hours.|來回行程需要兩小時。|L3
get off|phr.|下車|ɡɛt ɔf|We need to get off here.|我們需要在這裡下車。|Please get off at the next stop.|請在下一站下車。|口語
pick up|phr.|接人；取物|pɪk ʌp|Can you pick up my sister?|你可以去接我妹妹嗎？|I will pick up the tickets.|我會去取票。|口語
hypothesis|n.|假設|haɪˈpɑθəsɪs|Our hypothesis may be wrong.|我們的假設可能是錯的。|Write your hypothesis before the test.|測試前寫下你的假設。|L5
experiment|n.|實驗|ɪkˈspɛrəmənt|The experiment takes one hour.|這個實驗需要一小時。|Our experiment produced a surprising result.|我們的實驗出現令人驚訝的結果。|L3
variable|n.|變因|ˈvɛrɪəbəl|Change only one variable.|一次只改變一個變因。|Temperature is an important variable.|溫度是一個重要變因。|L5
observe|v.|觀察|əbˈzɝv|We observe the plants every morning.|我們每天早上觀察植物。|Please observe without touching anything.|請觀察，不要觸碰任何東西。|L3
measure|v.|測量|ˈmɛʒɚ|We measure the water carefully.|我們仔細測量水量。|Use a ruler to measure it.|用尺測量它。|L2
accurate|adj.|準確的|ˈækjərɪt|We need an accurate record.|我們需要準確的紀錄。|Is this map still accurate?|這份地圖還準確嗎？|L3
conclusion|n.|結論|kənˈkluʒən|Our conclusion surprised the class.|我們的結論讓全班驚訝。|Read the conclusion once more.|再讀一次結論。|L3
peer|n.|同儕|pɪr|Ask a peer to check it.|請一位同儕檢查它。|A peer offered helpful advice.|一位同儕提出有用的建議。|L4
draft|n.|草稿|dræft|This is only my first draft.|這只是我的第一份草稿。|Keep a copy of the draft.|保留一份草稿副本。|L3
break down|phr.|拆解；分成小部分|brek daʊn|Let us break down the problem.|我們把問題拆解吧。|We can break down this task.|我們可以把這項任務分成小部分。|口語
username|n.|使用者名稱|ˈjuzɚˌnem|Choose a username without your real name.|選擇不含真實姓名的使用者名稱。|I forgot my old username.|我忘了以前的使用者名稱。|L3
hyperlink|n.|超連結|ˈhaɪpɚˌlɪŋk|This hyperlink opens the school website.|這個超連結會開啟學校網站。|Check the hyperlink before clicking.|點擊前先檢查超連結。|L4
screenshot|n.|螢幕截圖|ˈskrinˌʃɑt|The screenshot shows the error.|這張螢幕截圖顯示了錯誤。|Please remove names from the screenshot.|請移除螢幕截圖中的姓名。|L3
subscription|n.|訂閱|səbˈskrɪpʃən|My magazine subscription ends soon.|我的雜誌訂閱快到期了。|This subscription renews every month.|這項訂閱每月續訂。|L4
livestream|n.|直播|ˈlaɪvˌstrim|The school livestream starts at noon.|學校的直播中午開始。|We watched the livestream at home.|我們在家看了直播。|L4
caption|n.|圖片說明；字幕|ˈkæpʃən|Write a clear caption for this photo.|為這張照片寫清楚的說明。|The caption explains the picture.|圖片說明解釋了這張圖。|L4
edit|v.|編輯；修改|ˈɛdɪt|Please edit the title carefully.|請仔細編輯標題。|I will edit the video tonight.|我今晚會剪輯影片。|L3
verify|v.|查證；核實|ˈvɛrəˌfaɪ|Always verify a surprising claim.|務必查證令人驚訝的說法。|We should verify the date first.|我們應該先核實日期。|L4
misleading|adj.|誤導的|mɪsˈlidɪŋ|That headline is misleading.|那個標題有誤導性。|The photo gives a misleading impression.|這張照片給人誤導的印象。|L4
clickbait|n.|誘使點擊的誇大內容|ˈklɪkˌbet|That dramatic title looks like clickbait.|那個誇張標題看起來是點擊誘餌。|Avoid sharing clickbait with friends.|避免和朋友分享誇大誘點內容。|口語
considerate|adj.|體貼的；為人著想的|kənˈsɪdərɪt|It was considerate to wait.|願意等候真是體貼。|She is considerate of our neighbors.|她很替我們的鄰居著想。|L4
awkward|adj.|尷尬的；不自在的|ˈɔkwɚd|There was an awkward silence.|現場出現尷尬的沉默。|I felt awkward at first.|我一開始覺得不自在。|L3
embarrassed|adj.|感到難為情的|ɪmˈbærəst|He looked embarrassed by the mistake.|他因這個錯誤顯得難為情。|I was embarrassed to ask again.|我不好意思再問一次。|L3
jealous|adj.|嫉妒的|ˈdʒɛləs|I felt jealous of her success.|我對她的成功感到嫉妒。|He admitted that he was jealous.|他承認自己感到嫉妒。|L3
resilient|adj.|能從挫折中恢復的|rɪˈzɪlɪənt|She remained resilient after the loss.|她輸了之後仍展現韌性。|Small setbacks can teach us to be resilient.|小挫折能教我們培養韌性。|L5
reassurance|n.|安慰；使人安心的話|ˌriəˈʃʊrəns|His reassurance helped me relax.|他安慰的話讓我放鬆。|She needed a little reassurance.|她需要一點安慰。|L5
misunderstanding|n.|誤會|ˌmɪsʌndɚˈstændɪŋ|A misunderstanding caused the argument.|一場誤會引起了爭執。|We cleared up the misunderstanding.|我們澄清了誤會。|L4
compromise|n.|妥協；折衷辦法|ˈkɑmprəˌmaɪz|We reached a fair compromise.|我們達成公平的折衷辦法。|This compromise works for both teams.|這個折衷辦法對兩隊都可行。|L4
speak up|phr.|說出想法；大聲說|spik ʌp|Please speak up if you disagree.|如果你不同意，請說出來。|I decided to speak up today.|我決定今天說出自己的想法。|口語
reach out|phr.|主動聯絡；尋求協助|ritʃ aʊt|You can reach out to a friend.|你可以主動聯絡朋友。|I will reach out tomorrow.|我明天會主動聯絡。|口語
bruise|n.|瘀青|bruz|There is a bruise on my knee.|我的膝蓋有一塊瘀青。|The bruise is fading now.|瘀青現在正在消退。|L4
dizzy|adj.|頭暈的|ˈdɪzɪ|I felt dizzy after spinning.|我轉圈後覺得頭暈。|Tell someone if you feel dizzy.|如果覺得頭暈，要告訴別人。|L3
bandage|n.|繃帶|ˈbændɪdʒ|The nurse gave me a bandage.|護理師給了我一條繃帶。|Keep the bandage clean and dry.|保持繃帶清潔乾燥。|L3
rest|n.|休息|rɛst|We stopped for a short rest.|我們停下來稍作休息。|You deserve some rest after that.|那之後你值得好好休息。|L1
nutritious|adj.|有營養的|nuˈtrɪʃəs|Beans can be a nutritious choice.|豆類可以是有營養的選擇。|We prepared a nutritious lunch.|我們準備了營養午餐。|L4
routine|n.|固定作息；例行程序|ruˈtin|My morning routine includes breakfast.|我的早晨固定作息包含吃早餐。|This routine helps me stay organized.|這套例行程序幫我保持條理。|L3
pillow|n.|枕頭|ˈpɪlo|This pillow feels too high.|這個枕頭感覺太高。|She put a pillow on the chair.|她在椅子上放了一個枕頭。|L2
blanket|n.|毯子|ˈblæŋkɪt|Would you like another blanket?|你想再拿一條毯子嗎？|We spread a blanket on the grass.|我們在草地上鋪了一條毯子。|L2
unplug|v.|拔掉電源插頭|ʌnˈplʌɡ|Please unplug the lamp first.|請先拔掉檯燈的插頭。|Remember to unplug the charger.|記得拔掉充電器。|L3
worn out|phr.|筋疲力盡的；耗損的|wɔrn aʊt|I felt worn out after moving.|搬家後我覺得筋疲力盡。|These old shoes are worn out.|這雙舊鞋已經穿壞了。|口語
clutter|n.|雜物|ˈklʌtɚ|Clear the clutter from the table.|清除桌上的雜物。|Too much clutter hides useful things.|太多雜物會把實用物品藏起來。|L5
pantry|n.|食品儲藏櫃；食品儲藏室|ˈpæntrɪ|The rice is in the pantry.|米在食品儲藏櫃裡。|We checked the pantry before shopping.|我們購物前先查看食品儲藏櫃。|L5
container|n.|容器|kənˈtenɚ|Use a container with a lid.|使用有蓋子的容器。|This container keeps the bread fresh.|這個容器讓麵包保持新鮮。|L3
cushion|n.|靠墊；坐墊|ˈkʊʃən|Put a cushion on the chair.|在椅子上放個坐墊。|The cushion has a blue cover.|靠墊有一個藍色的套子。|L3
doormat|n.|門墊|ˈdorˌmæt|Leave your muddy shoes on the doormat.|把沾泥的鞋子放在門墊上。|We bought a new doormat.|我們買了一塊新門墊。|L3
broom|n.|掃把|brum|The broom is behind the door.|掃把在門後面。|Use a broom for the dry leaves.|用掃把掃乾樹葉。|L2
mop|n.|拖把|mɑp|The mop needs a clean head.|拖把需要換上乾淨的拖把頭。|Let the mop dry outside.|讓拖把在外面晾乾。|L3
donate|v.|捐贈|ˈdonet|We can donate these clean blankets.|我們可以捐出這些乾淨的毯子。|They donate books to the library.|他們捐書給圖書館。|L3
borrow|v.|借入|ˈbɑro|May I borrow your ruler?|我可以借你的尺嗎？|We can borrow chairs from school.|我們可以向學校借椅子。|L2
come over|phr.|來家裡；過來拜訪|kʌm ˈovɚ|Please come over after lunch.|午餐後請過來拜訪。|Can you come over on Saturday?|你星期六可以來家裡嗎？|口語
telescope|n.|望遠鏡|ˈtɛləˌskop|The telescope points toward the moon.|望遠鏡朝向月亮。|We shared one small telescope.|我們共用一架小望遠鏡。|L4
constellation|n.|星座|ˌkɑnstəˈleʃən|Can you find that constellation?|你找得到那個星座嗎？|This constellation is easy to recognize.|這個星座很容易辨認。|L5
horizon|n.|地平線|həˈraɪzən|The sun appeared above the horizon.|太陽出現在地平線上方。|Clouds gathered along the horizon.|雲聚集在地平線一帶。|L4
breeze|n.|微風|briz|A cool breeze entered the room.|一陣涼風吹進房間。|The evening breeze felt pleasant.|傍晚的微風令人舒服。|L3
humidity|n.|濕度|hjuˈmɪdətɪ|The humidity is high today.|今天的濕度很高。|High humidity made the paper curl.|高濕度讓紙張捲曲。|L4
stargaze|v.|觀星|ˈstɑrˌɡez|We like to stargaze outdoors.|我們喜歡在戶外觀星。|They planned to stargaze after dinner.|他們計畫晚餐後觀星。|L5
campsite|n.|露營地|ˈkæmpˌsaɪt|The campsite is beside a lake.|露營地在湖邊。|Keep the campsite quiet at night.|晚上保持露營地安靜。|L3
binoculars|n.|雙筒望遠鏡|bəˈnɑkjəlɚz|Bring binoculars to watch the birds.|帶雙筒望遠鏡來賞鳥。|These binoculars are easy to carry.|這副雙筒望遠鏡很方便攜帶。|L5
pack up|phr.|收拾行李或物品|pæk ʌp|Let us pack up before dark.|我們在天黑前收拾吧。|Please pack up your art supplies.|請收拾你的美術用品。|口語
stay up|phr.|熬夜；不睡|ste ʌp|Do not stay up too late.|不要熬夜太晚。|We will stay up for the fireworks.|我們會等看煙火再睡。|口語
proposal|n.|提案|prəˈpozəl|Our proposal includes a simple plan.|我們的提案包含簡單的計畫。|They liked the proposal at once.|他們立刻喜歡上這個提案。|L4
milestone|n.|里程碑|ˈmaɪlˌston|Finishing the model was a milestone.|完成模型是一個里程碑。|Each milestone shows our progress.|每個里程碑都顯示我們的進展。|L5
teamwork|n.|團隊合作|ˈtimˌwɝk|Good teamwork saved us time.|良好的團隊合作替我們省下時間。|This challenge requires teamwork.|這項挑戰需要團隊合作。|L3
apprentice|n.|學徒|əˈprɛntɪs|The apprentice asked careful questions.|學徒仔細地提問。|An apprentice helped repair the chair.|一位學徒幫忙修椅子。|L5
workshop|n.|工作坊；工場|ˈwɝkˌʃɑp|The workshop begins after lunch.|工作坊午餐後開始。|We built a shelf in the workshop.|我們在工場裡做了一個架子。|L4
prototype|n.|原型；試作模型|ˈprotəˌtaɪp|Our prototype needs a stronger base.|我們的試作模型需要更堅固的底座。|They tested the prototype outside.|他們在戶外測試原型。|L5
solar|adj.|太陽能的；太陽的|ˈsolɚ|The solar panel faces south.|太陽能板朝南。|This light uses solar power.|這盞燈使用太陽能。|L4
insulation|n.|隔熱；隔熱材料|ˌɪnsəˈleʃən|The box needs better insulation.|這個箱子需要更好的隔熱。|We added insulation to the roof.|我們在屋頂加了隔熱材料。|L5
efficient|adj.|有效率的；節能的|ɪˈfɪʃənt|This small fan is efficient.|這台小風扇很節能。|We found a more efficient method.|我們找到更有效率的方法。|L3
bring up|phr.|提出話題|brɪŋ ʌp|May I bring up another idea?|我可以提出另一個想法嗎？|Please bring up the cost tomorrow.|請明天提出費用的話題。|口語
`;
const topics = ['飲食點餐','購物消費','交通旅遊','學校學習','社群網路','情緒個性','健康身體','居家日常','娛樂休閒','工作未來'];
const topicFor = i => i >= 82 && i <= 84 ? '天氣環境' : i >= 96 && i <= 98 ? '天氣環境' : i >= 65 && i <= 68 ? '居家日常' : i >= 77 && i <= 79 ? '人際社交' : i >= 55 && i <= 59 ? '人際社交' : topics[Math.floor(i / 10)];
const bold = (text, word) => {
  const i = text.toLowerCase().indexOf(word.toLowerCase());
  if (i < 0) throw new Error(`例句缺少單字：${word}`);
  return `${text.slice(0,i)}<strong>${text.slice(i,i+word.length)}</strong>${text.slice(i+word.length)}`;
};
export const NOVEMBER_WORDS = RAW.trim().split('\n').map((line,i) => {
  const [word,partOfSpeech,zh,kk,example,exampleZh,example2,exampleZh2,level] = line.split('|');
  return {word,partOfSpeech,zh,phonetic:`/${kk}/`,example:bold(example,word),exampleZh,example2:bold(example2,word),exampleZh2,topic:topicFor(i),level,levelNote:'編輯估級',audioId:String(401+i),batch:'2026-11',availableFrom:'2026-11-01'};
});

const NARRATIVES = [
['The Bread That Would Not Rise',
`Mia usually bought breakfast at the bakery near school, but this Saturday she wanted to surprise her grandfather. She decided to make bread from scratch. Following an old recipe, she mixed yeast with water and learned to knead the sticky dough. Then she covered the bowl and waited for it to grow.

An hour later, nothing had changed. Mia almost threw everything away, but her grandfather came into the kitchen. He touched the bowl and explained that the room was too cold. Together they moved it near a sunny window. While they waited, he told her about the first loaf he had burned as a teenager. Suddenly, her mistake felt less embarrassing.

When the dough was ready, Mia remembered to preheat the oven. She added an apple filling and placed the rolls on a tray. Soon a golden crust appeared. At breakfast, her grandfather cut a slice and smiled before tasting it. The bread was not perfectly shaped, but Mia had made something more valuable than a beautiful meal: a new memory with him.`,
`Mia平常在學校附近的 bakery 買早餐，週六卻想給爺爺一個驚喜。她決定 from scratch 做麵包，照舊食譜把 yeast 加入水，學著 knead 黏手的 dough，再蓋起來等它膨脹。

一小時過去，麵團完全沒變。她差點整盆倒掉，爺爺卻摸摸碗，發現房間太冷。他們把碗移到陽光充足的窗邊。等待時，爺爺說起自己年輕時烤焦第一條麵包的經驗，讓她沒那麼難為情。

麵團準備好後，Mia記得先 preheat 烤箱，再包入蘋果 filling，放在 tray 上。金黃的 crust 漸漸出現。早餐時，爺爺切了一 slice，還沒吃就笑了。麵包形狀不完美，卻成了兩人珍貴的新回憶。`],
['A Desk with a Second Life',
`At a neighborhood market, Ben stopped beside a stall full of old furniture. He needed a desk for his room, and one secondhand table immediately caught his eye. Its price tag was lower than those in the big stores. However, a loose leg made him wonder whether it was really a good deal.

The vendor noticed his concern and invited him to look underneath. She explained that the desk was handmade by her father, who had repaired furniture for many years. One screw was missing, but the wood was strong. Ben asked whether they could negotiate. Instead of simply lowering the price, she offered to fix the leg and deliver the desk. That seemed reasonable to both of them.

Ben had saved enough to pay a deposit, but not the full amount. With his mother's agreement, he arranged to pay the rest in one installment the following week. When the desk arrived, its leg was steady and the drawer opened smoothly. Sitting down with his homework, Ben felt proud that he had asked questions rather than judging everything by its appearance.`,
`Ben在社區市集的一個 stall 前停下，那裡擺滿舊家具。他需要書桌，一張 secondhand 桌子立刻吸引他。price tag 比大店便宜，但鬆動的桌腳讓他懷疑這是不是 a good deal。

vendor 請他看看桌底，說明這是父親以前做的 handmade 家具。木頭仍很堅固，只少一顆螺絲。Ben問能否 negotiate。攤販沒有單純降價，而是提議修好桌腳並送貨，兩人都覺得 reasonable。

Ben的積蓄只夠付 deposit。經媽媽同意，他約好下週用一筆 installment 付清剩款。桌子送到時很穩，抽屜也滑順。他坐下寫功課，慶幸自己有提問，而不是只憑外觀判斷。`],
['The Journey Before the Flight',
`Amy's family planned to pick up her cousin at the airport. Her younger brother used a wheelchair, so Amy checked whether the station and airport were accessible before they left. According to the timetable, an early train would give them plenty of time. She even calculated how long the round trip would take.

On the train, they found space in the first carriage and placed their small bags on an overhead shelf. Then Amy received a message: her cousin's flight would arrive at a different terminal. She worried that her careful plan had failed. Her father suggested asking the station staff instead of guessing. A friendly employee showed them where a free shuttle stopped and explained when to get off.

They reached the correct arrival hall just as her cousin appeared, holding a folded boarding pass and looking equally confused. Amy laughed and waved. On the way home, she realized that preparation did not mean preventing every surprise. It meant having enough information, and enough confidence to ask for help, when the journey changed.`,
`Amy一家要去機場 pick up 表親。弟弟使用輪椅，她先確認車站和機場是否 accessible。依 timetable 搭早班車應該很充裕，她連 round trip 要多久都算好了。

他們在第一節 carriage 找到空間，把小袋子放上 overhead 架子。這時表親傳訊說班機改到另一座 terminal。Amy擔心計畫全亂了，爸爸卻建議問站務員。親切的工作人員帶他們找到免費 shuttle，並說明何時 get off。

他們剛到正確的入境大廳，表親就拿著摺好的 boarding pass 出現，也是一臉困惑。Amy笑著揮手。回程時她明白，準備不是避免所有意外，而是在行程改變時，有足夠資訊與勇氣尋求協助。`],
['The Plant That Changed Their Answer',
`For the science fair, Nora's group wrote a hypothesis that music would help bean plants grow faster. Their experiment seemed simple: put one plant near a speaker and another in a quiet corner. Nora began a draft of their presentation before the first new leaf had even appeared. She was certain the result would be exciting.

A peer from another group asked an uncomfortable question. Were both plants receiving the same amount of sunlight? Nora checked the windows and realized they were not. Their teacher suggested that they break down the problem and change only one variable at a time. The group moved the pots, agreed to measure each plant at the same hour, and learned to observe rather than guess.

Their accurate records eventually showed little difference between the plants. At first, Nora felt disappointed. Then she rewrote their conclusion to explain what the evidence actually supported. During the fair, visitors asked more questions about their mistakes than their plants. Nora discovered that a surprising answer was not the only thing worth sharing. A fair test and an honest explanation could be just as interesting.`,
`科展時，Nora小組提出 hypothesis：音樂能讓豆苗長得更快。experiment 看似簡單，一盆放喇叭旁，另一盆放安靜角落。第一片新葉還沒長出，她就開始寫簡報 draft，深信結果會很精彩。

另一組的 peer 問兩盆日照是否一樣。Nora查看窗戶後才發現並不相同。老師建議先 break down 問題，一次只改一個 variable。他們移動花盆，約好每天同時間 measure，學著 observe 而非猜測。

accurate 紀錄最後顯示，兩盆差異不大。Nora原本失望，後來重寫 conclusion，誠實說明證據。科展訪客對他們犯錯的過程比植物更感興趣。她發現，公平的測試與誠實的解釋，也值得分享。`],
['The Missing Half of the Picture',
`While preparing the school livestream, Oliver received a screenshot with a dramatic caption. It appeared to show the principal canceling the music club. The sender used an unfamiliar username, but several classmates were already angry. Oliver almost shared the picture with the club, then noticed that its edges had been cut off.

He decided to verify the claim before responding. A hyperlink led to the full school newsletter, which required no subscription to read. The missing sentence explained that only one rehearsal had been moved because the hall needed repairs. The screenshot was misleading, and its shocking title looked like clickbait. Oliver contacted the student who had posted it and politely showed the complete paragraph.

Rather than pretending nothing had happened, they agreed to edit the post and add a clear correction. During the afternoon broadcast, Oliver explained how a small crop could change a story. He did not name or embarrass the sender. Later, a younger student thanked him for making the situation understandable. The music club kept its rehearsal, and the school gained a useful lesson in checking information.`,
`Oliver準備學校 livestream 時收到一張 screenshot，上面的 caption 像在說校長要取消音樂社。傳送者的 username 很陌生，但同學已經生氣。他差點轉傳，卻發現圖片邊緣被裁掉了。

他決定先 verify。hyperlink 連到完整校刊，不需要 subscription 就能閱讀。被裁掉的句子其實說，只有一次排練因禮堂維修而改期。這張圖很 misleading，聳動標題也像 clickbait。他私下聯絡發文同學，禮貌地出示完整段落。

兩人同意 edit 貼文並清楚更正，不假裝事情沒發生。下午廣播時，Oliver解釋裁圖如何改變意思，卻沒公開姓名讓人難堪。後來學弟向他道謝。音樂社照常排練，全校也學到查證的一課。`],
['A Conversation After the Audition',
`After the drama audition, Clara felt jealous when her best friend won the main role. She tried to look pleased, but an awkward silence grew between them. Her friend thought she was angry about an old joke. By lunchtime, the misunderstanding had turned a happy announcement into a miserable day for both girls.

Clara wanted to avoid the problem, yet she knew she should speak up. She asked to talk after class and admitted that she felt embarrassed about her reaction. Her friend listened without interrupting and offered reassurance: losing a role did not mean Clara lacked talent. It was considerate, but it was not an empty promise that everything would be easy. They both needed time to understand their feelings.

Together they found a compromise. Clara would help design the stage and try a smaller role, while her friend would practice difficult scenes with her. Clara also decided to reach out to another student who had not been selected. By the next rehearsal, she was still disappointed, but more resilient. Friendship had not removed the disappointment; it had made room for honesty and a new beginning.`,
`戲劇試鏡後，Clara看到好友拿到主角，心裡很 jealous。她努力微笑，兩人卻陷入 awkward 沉默。好友誤以為她還在氣以前的玩笑，這場 misunderstanding 讓兩人午餐都很難受。

Clara想逃避，卻知道應該 speak up。放學後，她承認自己對反應很 embarrassed。好友沒有打斷，給她 reassurance：沒拿到角色不表示沒有天分。這份 considerate 的安慰也沒有假裝一切會很容易，她們仍需要理解彼此。

兩人找到 compromise：Clara參與舞台設計並演小角色，好友陪她練難的場景。她也決定 reach out 聯絡另一位落選同學。下次排練，她仍失望，卻變得更 resilient。友誼沒有消除挫折，而是讓誠實與重新開始有了空間。`],
['The Race They Did Not Finish',
`On Saturday, Evan joined his first charity walk with his aunt. He wanted to finish before everyone else, although his usual routine involved very little exercise. After hurrying up a steep path, he felt dizzy and stumbled. A small bruise appeared on his leg, and a volunteer brought a bandage for a shallow scrape.

His aunt helped him sit in the shade and asked the event staff for assistance. Evan felt worn out and worried that stopping meant failure. She reminded him that the event was about helping others, not winning. They chose to leave early instead of forcing themselves to continue. At home, his uncle prepared a nutritious lunch while Evan settled against a pillow with a blanket nearby.

That evening, Evan decided to unplug his tablet and get some rest. He wrote a note thanking the volunteers, then planned a shorter walk for another weekend. The donation he had collected would still support the charity, even without a finish-line photo. For the first time that day, he stopped comparing himself with other walkers and felt proud of making a sensible decision.`,
`週六，Evan和阿姨參加第一次公益健走。他平常的 routine 很少運動，卻想比所有人先到。急走上坡後，他覺得 dizzy 並踉蹌，腿上出現 bruise，志工也拿來 bandage 處理小擦傷。

阿姨陪他到陰影下坐，請活動人員協助。他覺得 worn out，又怕停下就是失敗。阿姨提醒，活動是幫助別人，不是比賽。他們決定提早離開，不勉強走完。回家後，叔叔準備 nutritious 午餐，他靠著 pillow，旁邊放著 blanket。

晚上，Evan決定 unplug 平板充電線，好好 rest。他寫卡片感謝志工，打算改天走短一點的路。沒有終點合照，募集的捐款仍能幫助人。他終於不再與別人比較，而為合理的決定感到自豪。`],
['The Room Behind the Kitchen',
`When the community center needed a quiet reading room, Lila remembered the clutter in a small space behind its kitchen. A broken cushion blocked the door, and boxes covered the floor. She asked her neighbors to come over on Sunday and help. Some thought the task was too large, but she suggested starting with just one corner.

They found a useful container in the pantry and sorted small objects into it. A neighbor used a broom for the dust, while another brought a mop for the floor. Lila moved a doormat to the entrance so muddy shoes would not undo their work. They agreed to donate only clean, usable items that the center no longer needed, and to ask before moving anything important.

The room still lacked enough seats. Instead of spending money immediately, Lila arranged to borrow chairs from a nearby classroom. By afternoon, a child was reading beside the newly opened window. The neighbors sat down together and admired the space they had nearly given up on. Nothing in the room was expensive, but everyone could point to something they had helped change.`,
`社區中心需要安靜閱讀室時，Lila想到廚房後的小房間。clutter 堆滿地板，一個破 cushion 擋著門。她請鄰居週日 come over 幫忙。有人覺得工程太大，她提議先從一個角落開始。

他們在 pantry 找到可用的 container，拿來分類小物。一位鄰居用 broom 掃灰塵，另一位拿 mop 拖地。Lila把 doormat 放到入口，避免泥鞋弄髒地板。大家約好只 donate 中心不再需要、乾淨堪用的物品，移動重要東西前也先詢問。

房間仍缺座位。Lila沒有立刻花錢，而是安排向附近教室 borrow 椅子。下午已有孩子在窗邊閱讀。鄰居坐在差點放棄的房間裡欣賞成果。沒有昂貴的東西，但每個人都能指出自己幫忙改變的一部分。`],
['The Sky Was Worth Waiting For',
`At a lakeside campsite, Zoe hoped to stargaze with her older brother. They had brought a telescope, binoculars, and a book showing each constellation. As the sun dropped below the horizon, however, clouds covered almost everything. The humidity made their paper map curl, and Zoe wondered why they had traveled so far to stare at gray sky.

Her brother suggested that they pack up the expensive equipment before it became damp. Zoe thought that meant leaving, but he spread a groundsheet and offered her a seat. They listened to the water and felt a gentle breeze. Without a screen or a crowded schedule, they began talking about the school changes that had worried her all week. She had not realized how much she needed that conversation.

Just as they agreed not to stay up much longer, a narrow gap opened in the clouds. Her brother pointed out a bright pattern, and Zoe found it in the book. They saw only a few stars that night. Still, on the journey home, she remembered the listening as clearly as the sky.`,
`在湖邊 campsite，Zoe想和哥哥 stargaze。他們帶了 telescope、binoculars，還有介紹每個 constellation 的書。太陽降到 horizon 下，雲卻幾乎蓋住天空。humidity 讓紙地圖捲起，她懷疑為何大老遠來看灰天。

哥哥建議先 pack up 昂貴器材，以免受潮。她以為要離開，他卻鋪上地墊請她坐。他們聽著水聲，感受 breeze。沒有螢幕與擁擠行程，她開始說起整週擔心的學校變動，才發現自己多需要這場對話。

兩人剛約好不要再 stay up 太久，雲間就裂開一道縫。哥哥指出明亮的圖案，她在書裡找到了它。那夜只看到幾顆星，回家路上，她卻同樣清楚記得哥哥的傾聽。`],
['A Small Box for a Big Idea',
`During a weekend workshop, Sam joined a team designing a small food delivery box. Their proposal was to keep meals warm without wasting energy. A young apprentice from a bicycle repair shop offered to help build it. Sam knew a little about solar power, so he imagined a complicated lid covered in tiny panels.

Their first prototype was heavy and difficult to carry. Everyone had worked hard, but nobody wanted to admit that a delivery rider might hate it. Finally, the apprentice decided to bring up the weight problem. Instead of defending their own ideas, the team listened. They added simple insulation and tested how long warm water stayed warm inside. The lighter design turned out to be more efficient for their actual purpose.

Finishing a working box felt like a milestone, even though it looked less impressive than Sam's drawing. At the final presentation, he explained why they had abandoned the panels rather than hiding the change. Their teacher praised the teamwork behind that decision. Sam left with a useful lesson: a good design did not need every clever feature; it needed to solve the right problem.`,
`週末 workshop，Sam加入設計送餐箱的小組。proposal 是保溫又不浪費能源。腳踏車店的 apprentice 來幫忙，Sam則因懂一點 solar 能源，想做裝滿小面板的複雜箱蓋。

第一個 prototype 太重，難以攜帶。大家很努力，卻沒人願意承認外送員可能不喜歡。學徒終於決定 bring up 重量問題。大家不再捍衛各自點子，改加簡單 insulation，測試溫水能保溫多久。更輕的設計反而更 efficient。

完成可用箱子是一個 milestone，即使外觀沒有Sam的圖畫華麗。簡報時，他解釋放棄面板的原因，沒有隱瞞改變。老師稱讚促成決定的 teamwork。Sam明白，好設計不必塞進每個聰明功能，而是要解決正確問題。`]
];
export const NOVEMBER_STORIES = NARRATIVES.map(([title,en,zh],i) => ({
  id:String(41+i),title,englishParagraphs:en.split('\n\n'),chineseParagraphs:zh.split('\n\n'),
  wordIds:NOVEMBER_WORDS.slice(i*10,i*10+10).map(w=>w.audioId),batch:'2026-11',availableFrom:'2026-11-01'
}));
