/*
 * 每個單字的第二組自然例句與繁體中文翻譯。
 * 格式：英文單字或片語|第二句英文例句|第二句中文翻譯
 * 英文鍵值必須與 words.js 裡的 word 完全相同，例句也必須包含該字或片語。
 */

const RAW_SECOND_EXAMPLES = `
menu|The lunch menu changes every Monday.|午餐菜單每週一都會更換。
order|We usually order dumplings for lunch.|我們午餐通常會點水餃。
meal|A warm meal can make a rainy day better.|一頓熱騰騰的餐點能讓雨天好過一些。
snack|Yogurt is my favorite afternoon snack.|優格是我最喜歡的下午點心。
ingredient|Check every ingredient if you have allergies.|如果你會過敏，請檢查每一項成分。
delicious|This soup smells delicious already.|這碗湯光聞起來就很美味。
spicy|I ordered the noodles less spicy.|我點了小辣的麵。
sweet|The mango is naturally sweet and juicy.|這顆芒果天然香甜又多汁。
fresh|We bought fresh fruit at the morning market.|我們在早市買了新鮮水果。
vegetarian|My sister chose the vegetarian lunch box.|我姊姊選了素食便當。
dessert|Fruit makes a light dessert after dinner.|水果是晚餐後清爽的甜點。
beverage|You may choose one cold beverage with the set.|這份套餐可以選一杯冷飲。
appetite|The smell of bread increased my appetite.|麵包的香味讓我更有食慾。
portion|This small portion is enough for me.|這份小份量對我來說已經夠了。
refill|The server brought us another tea refill.|服務生又幫我們續了一壺茶。
bill|I checked the bill before paying.|我付款前先核對了帳單。
recommend|Can you recommend a popular breakfast dish?|你可以推薦一道熱門早餐嗎？
reserve|Please reserve a window seat for us.|請幫我們預訂靠窗的座位。
takeout|The takeout box kept the food warm.|外帶餐盒讓食物保持溫熱。
allergy|His milk allergy is written on the order.|他的牛奶過敏已註明在點單上。
grab a bite|We can grab a bite near the station.|我們可以在車站附近隨便吃點東西。
eat out|We eat out only once a week.|我們一週只外出用餐一次。
on the house|Our birthday drinks were on the house.|我們的生日飲料是店家招待的。
to go|She ordered a sandwich to go.|她點了一份外帶三明治。
have a sweet tooth|People who have a sweet tooth will love this bakery.|愛吃甜食的人會喜歡這間麵包店。

price|The price dropped after the holiday.|假期過後價格下降了。
cost|These notebooks cost less online.|這些筆記本在線上買比較便宜。
sale|I found this jacket during a winter sale.|我在冬季特賣時找到這件外套。
discount|Show your student card to receive a discount.|出示學生證就能享有折扣。
cash|The small shop accepts cash only.|這間小店只收現金。
receipt|The receipt shows the return deadline.|收據上有標示退貨期限。
customer|A customer asked where the fitting room was.|一位顧客詢問試衣間在哪裡。
cashier|The cashier put my purchases in a paper bag.|收銀員把我買的東西裝進紙袋。
budget|We planned a monthly food budget together.|我們一起規劃了每月餐費預算。
brand|This local brand makes durable backpacks.|這個本土品牌製作耐用的背包。
quality|Good quality matters more than a low price.|良好品質比低價更重要。
size|I need the same shoes in a different size.|我需要同款但不同尺寸的鞋子。
fit|Try on the coat to see whether it will fit.|試穿這件外套，看看是否合身。
exchange|The store let me exchange the broken lamp.|店家讓我更換損壞的檯燈。
refund|My refund arrived three days later.|我的退款三天後入帳。
warranty|Keep this card as proof of the warranty.|保留這張卡作為保固證明。
afford|We can afford the tickets if we save this month.|如果這個月存點錢，我們就買得起票。
compare|I compare reviews before buying electronics.|買電子產品前我會比較評論。
purchase|Every purchase earns one reward point.|每次購買都能獲得一點獎勵點數。
coupon|This coupon expires at the end of June.|這張優惠券六月底到期。
bargain|The used bicycle was a great bargain.|那輛二手腳踏車非常划算。
rip-off|Paying that much for water is a rip-off.|花那麼多錢買水根本是在坑人。
shop around|Take time to shop around for a better deal.|花點時間貨比三家，找更好的價格。
sold out|My favorite color was already sold out.|我最喜歡的顏色已經售罄了。
worth it|The long wait was worth it for such a good seat.|為了這麼好的座位，久等也是值得的。

station|The bus station is across from the library.|公車站在圖書館對面。
ticket|Keep your ticket until you leave the station.|離開車站前請保留車票。
platform|Passengers are waiting on the correct platform.|乘客正在正確的月台上等候。
route|We chose a scenic route along the coast.|我們選了沿著海岸的景觀路線。
traffic|Morning traffic made the trip much longer.|早晨車流讓旅程多花了很多時間。
passenger|Each passenger may carry one small bag.|每位乘客可以攜帶一個小包。
destination|The screen displays the next destination.|螢幕會顯示下一個目的地。
departure|Our departure time was moved to noon.|我們的出發時間改到中午。
arrival|Please text me after your arrival.|你抵達後請傳訊息給我。
luggage|We left our luggage at the hotel.|我們把行李寄放在飯店。
passport|Her passport is valid for five more years.|她的護照還有五年效期。
journey|Music made the long journey feel shorter.|音樂讓漫長旅程感覺短了一些。
local|A local family showed us the best food stalls.|一個當地家庭帶我們去最棒的美食攤位。
transfer|We transfer to the blue line downtown.|我們在市中心轉乘藍線。
delay|The airline announced a short delay.|航空公司宣布班機短暫延誤。
cancel|We had to cancel our beach trip.|我們不得不取消海邊旅行。
explore|Let us explore the old streets on foot.|我們步行探索這些老街吧。
map|This map marks every public restroom.|這張地圖標出了每間公共廁所。
direction|The sign points in the direction of the airport.|標誌指向機場的方向。
accommodation|Our accommodation includes free breakfast.|我們的住宿包含免費早餐。
get around|Visitors can get around the island by bus.|遊客可以搭公車在島上移動。
hit the road|Let us hit the road right after breakfast.|我們吃完早餐就出發吧。
red-eye flight|She brought a neck pillow for the red-eye flight.|她為紅眼班機帶了頸枕。
off the beaten path|The quiet village is off the beaten path.|這座寧靜村莊遠離熱門觀光路線。
miss the bus|Leave now or you might miss the bus.|現在就走，不然你可能會錯過公車。

subject|History is the most interesting subject to me.|歷史對我來說是最有趣的科目。
lesson|Today’s lesson taught us how to write a letter.|今天的課教我們如何寫一封信。
homework|I finished my math homework before dinner.|我在晚餐前完成了數學作業。
exam|The final exam covers all twelve chapters.|期末考涵蓋全部十二章。
grade|Her science grade improved this semester.|她這學期的自然科成績進步了。
project|Our group project is about clean energy.|我們的小組專題是關於潔淨能源。
report|The report needs a clear introduction.|這份報告需要清楚的引言。
research|The students did research in the school library.|學生們在學校圖書館做研究。
knowledge|Reading widely builds useful knowledge.|廣泛閱讀能累積實用知識。
skill|Listening is an important language skill.|聽力是一項重要的語言技能。
focus|Turn off notifications so you can focus.|關閉通知，這樣你才能專心。
review|I review new vocabulary on the bus.|我會在公車上複習新單字。
practice|We practice speaking English in pairs.|我們兩人一組練習說英文。
memorize|A short song helped me memorize the rule.|一首短歌幫助我記住這項規則。
understand|I finally understand this difficult formula.|我終於理解這個困難的公式。
explain|Could you explain the answer one more time?|你可以再解釋一次答案嗎？
submit|Remember to submit the form before Friday.|記得在星期五前繳交表格。
deadline|The application deadline is next Wednesday.|申請截止日是下週三。
classmate|A classmate helped me carry the science project.|一位同學幫我搬自然科專題作品。
scholarship|The scholarship covers tuition and books.|這筆獎學金支付學費與書本費。
cram for|Do not stay up all night to cram for the test.|不要熬夜臨時抱佛腳準備考試。
catch up|I watched the recorded class to catch up.|我看了課堂錄影來跟上進度。
hand in|Please hand in your worksheet after class.|請在下課後繳交學習單。
figure out|It took me an hour to figure out the answer.|我花了一小時才想出答案。
learn by heart|Actors often learn by heart every line they perform.|演員常把演出的每句台詞背得滾瓜爛熟。

account|I created an account for the learning website.|我為學習網站建立了一個帳號。
profile|Her profile includes a short introduction.|她的個人檔案包含簡短自我介紹。
post|I will post the photos after school.|我放學後會發布照片。
comment|His kind comment made the creator smile.|他友善的留言讓創作者笑了。
message|Please send me a message when you arrive.|抵達時請傳訊息給我。
follower|Every new follower can see the welcome post.|每位新追蹤者都能看到歡迎貼文。
content|This channel creates useful study content.|這個頻道製作實用的學習內容。
upload|I need to upload the video before midnight.|我需要在午夜前上傳影片。
download|You can download the worksheet for free.|你可以免費下載這份學習單。
privacy|Check your privacy settings regularly.|請定期檢查隱私設定。
password|Never share your password with strangers.|絕對不要和陌生人分享密碼。
online|The full interview is available online.|完整訪談可以在線上觀看。
digital|We keep a digital copy of every document.|我們保存每份文件的數位副本。
search|Use a clear keyword to search the website.|使用明確的關鍵字搜尋網站。
share|May I share this article with my class?|我可以和全班分享這篇文章嗎？
block|You can block accounts that make you uncomfortable.|你可以封鎖讓你不舒服的帳號。
flag|Users should flag harmful or false content.|使用者應檢舉有害或不實內容。
notification|One notification reminded me about the event.|一則通知提醒我這場活動。
algorithm|The algorithm suggests videos based on your interests.|演算法會依照你的興趣推薦影片。
influence|Online reviews influence where people eat.|網路評論會影響人們選擇用餐地點。
go viral|A simple dance video can go viral overnight.|一支簡單的舞蹈影片可能一夜爆紅。
scroll through|I scroll through the news during breakfast.|我吃早餐時會滑閱新聞。
DM someone|You can DM someone privately instead of replying publicly.|你可以私訊某人，不必公開回覆。
log in|Use your school email to log in.|使用學校電子郵件登入。
unfollow|It is okay to unfollow an account you no longer enjoy.|不再喜歡某個帳號時，取消追蹤也沒關係。

happy|I feel happy when my friends visit.|朋友來訪時我感到很開心。
sad|The ending of the movie made everyone sad.|電影結局讓大家很難過。
angry|He was angry about the unfair decision.|他對不公平的決定感到生氣。
nervous|Taking a deep breath helps me when I am nervous.|緊張時深呼吸對我有幫助。
excited|The children are excited about the school trip.|孩子們對校外教學感到興奮。
worried|My parents were worried when I came home late.|我晚回家時父母很擔心。
calm|Her calm voice helped everyone relax.|她平靜的聲音幫助大家放鬆。
proud|We are proud of the progress you made.|我們為你的進步感到驕傲。
lonely|Calling an old friend made me feel less lonely.|打給老朋友讓我不再那麼寂寞。
relaxed|I felt relaxed after a warm shower.|洗完熱水澡後我感到很放鬆。
patient|Please be patient while your food is prepared.|餐點準備時請耐心等候。
honest|An honest answer is better than an excuse.|誠實的回答比藉口更好。
generous|Our generous neighbor shared fruit with us.|我們慷慨的鄰居和我們分享水果。
curious|The curious child asked many questions.|好奇的孩子問了很多問題。
confident|Practice made her more confident on stage.|練習讓她在台上更有自信。
shy|He is shy around people he just met.|他在剛認識的人面前很害羞。
polite|It is polite to thank someone for their help.|感謝別人的幫忙是有禮貌的行為。
responsible|You are responsible for keeping your room clean.|你有責任保持房間整潔。
stubborn|My stubborn brother refuses to ask for directions.|我固執的弟弟不肯問路。
grateful|I am grateful for your time and support.|我很感激你付出的時間與支持。
cheer up|A funny story may cheer up your friend.|一個有趣的故事可能讓朋友振作起來。
freak out|Try not to freak out over a small mistake.|別為了一個小錯誤而驚慌。
feel down|I listen to cheerful music when I feel down.|心情低落時我會聽輕快的音樂。
open-minded|An open-minded person listens to different opinions.|思想開放的人會聆聽不同意見。
easygoing|Our easygoing coach rarely gets upset.|我們隨和的教練很少生氣。

health|Regular checkups are important for your health.|定期健康檢查對健康很重要。
body|Stretch your body gently after sitting for hours.|久坐數小時後請輕輕伸展身體。
exercise|Walking to school is good daily exercise.|走路上學是很好的日常運動。
sleep|Enough sleep helps students remember more.|充足睡眠能幫助學生記得更多。
pain|Tell the nurse where you feel pain.|告訴護理師你哪裡感到疼痛。
fever|She stayed home because she had a fever.|她因為發燒而待在家裡。
cough|His cough became worse during the night.|他的咳嗽在夜裡變嚴重了。
headache|A short nap helped ease my headache.|小睡一下減輕了我的頭痛。
medicine|Take this medicine after breakfast.|早餐後服用這個藥。
doctor|The doctor listened to my breathing.|醫生聽了我的呼吸聲。
hospital|The nearest hospital is ten minutes away.|最近的醫院距離十分鐘。
symptom|A sore throat was her first symptom.|喉嚨痛是她最先出現的症狀。
energy|A healthy breakfast gives me energy for class.|健康早餐給我上課所需的精神。
habit|Drinking water regularly is a good habit.|定時喝水是好習慣。
stress|Exercise can reduce stress after a busy day.|運動可以減輕忙碌一天後的壓力。
recover|He needs a few days to recover from the flu.|他需要幾天才能從流感中康復。
injury|Warm up properly to prevent an injury.|確實暖身以避免受傷。
treatment|The treatment helped her knee feel better.|這項治療讓她的膝蓋舒服多了。
balanced|A balanced breakfast includes several food groups.|均衡早餐包含數種食物類別。
mental|Taking breaks is important for mental health.|適度休息對心理健康很重要。
work out|My friends work out together on weekends.|我的朋友們週末會一起健身。
under the weather|She stayed home because she was under the weather.|她因為身體不舒服而待在家裡。
get back on your feet|Rest will help you get back on your feet.|休息會幫助你恢復健康。
cut down on|Our family decided to cut down on plastic bags.|我們家決定減少使用塑膠袋。
out of shape|I felt out of shape after months without exercise.|幾個月沒運動後，我覺得體能變差了。

home|It feels good to return home after a long trip.|長途旅行後回家感覺真好。
room|Sunlight fills the room every morning.|每天早晨陽光都灑滿房間。
kitchen|We eat breakfast together in the kitchen.|我們一起在廚房吃早餐。
bathroom|Please hang the clean towel in the bathroom.|請把乾淨毛巾掛在浴室裡。
bedroom|My bedroom faces a quiet garden.|我的臥室面向一座安靜的花園。
furniture|Simple furniture makes the small apartment feel larger.|簡單的家具讓小公寓感覺更寬敞。
laundry|I do the laundry every Saturday afternoon.|我每週六下午洗衣服。
chore|Washing dishes is my least favorite chore.|洗碗是我最不喜歡的家事。
tidy|Her desk stays tidy even during exams.|即使考試期間，她的書桌仍保持整齊。
messy|The floor became messy after the art project.|美術作業後地板變得很凌亂。
clean|We clean the windows at the end of each month.|我們每月底清潔窗戶。
repair|A worker came to repair the air conditioner.|一位工人來修理冷氣。
replace|We should replace this old light bulb.|我們應該更換這顆舊燈泡。
electricity|Turn off the fan to save electricity.|關掉電風扇以節省電力。
water|Do not leave the water running while brushing.|刷牙時不要讓水一直流。
neighbor|Our neighbor waters the plants when we travel.|我們旅行時鄰居會幫忙澆花。
rent|The rent includes internet and building fees.|房租包含網路與管理費。
balcony|We grow herbs in pots on the balcony.|我們在陽台盆栽裡種香草。
entrance|Please leave your wet umbrella by the entrance.|請把濕雨傘放在入口旁。
comfortable|This reading chair is surprisingly comfortable.|這張閱讀椅出乎意料地舒服。
sleep in|We can sleep in during winter vacation.|寒假期間我們可以睡晚一點。
clean up|Everyone helped clean up after the party.|派對後每個人都幫忙清理。
run out of|We must buy rice before we run out of it.|我們得在米用完前去購買。
feel at home|The warm welcome made our guests feel at home.|熱情的歡迎讓客人感到賓至如歸。
around the corner|A convenience store is just around the corner.|轉角就有一間便利商店。

friend|A true friend listens without judging you.|真正的朋友會不帶批判地傾聽。
family|My family eats dinner together on Sundays.|我的家人星期日會一起吃晚餐。
relationship|Clear communication strengthens any relationship.|清楚的溝通能讓任何關係更穩固。
conversation|Our conversation continued until the café closed.|我們聊到咖啡店打烊。
invite|I will invite my cousins to the picnic.|我會邀請表兄弟姊妹參加野餐。
introduce|Let me introduce our new team member.|讓我介紹我們的新組員。
promise|She kept her promise to call every week.|她遵守了每週打電話的承諾。
trust|It takes time to trust a new friend.|信任一位新朋友需要時間。
respect|We should respect each person’s boundaries.|我們應尊重每個人的界線。
support|Good teammates support one another after mistakes.|好隊友會在犯錯後彼此支持。
apologize|I need to apologize for forgetting your birthday.|我需要為忘記你的生日道歉。
forgive|Can you forgive me for speaking too quickly?|你能原諒我說話太衝動嗎？
argue|The brothers sometimes argue about small things.|這對兄弟有時會為小事爭吵。
agree|We agree that safety should come first.|我們同意安全應該擺第一。
advice|My teacher gave me helpful advice about studying.|老師給了我實用的讀書建議。
compliment|A sincere compliment can brighten someone’s day.|真誠的讚美能點亮一個人的一天。
guest|Each guest received a name tag at the door.|每位客人在門口都拿到名牌。
community|The community planted trees beside the river.|社區在河邊種了樹。
contact|Please contact me if the schedule changes.|如果行程有變，請聯絡我。
cooperate|The two classes cooperate on the school festival.|兩個班級合作舉辦校慶。
hang out|We often hang out at the park after class.|我們放學後常在公園一起玩。
get along|My cousins get along despite their different interests.|我的表親雖然興趣不同，卻相處融洽。
keep in touch|We use a group chat to keep in touch.|我們用群組聊天保持聯絡。
make up|The friends talked honestly and decided to make up.|朋友們坦白溝通後決定和好。
have your back|Real friends have your back when things get difficult.|真正的朋友會在困難時支持你。

movie|That movie is based on a true story.|那部電影改編自真實故事。
music|Soft music was playing in the bookstore.|書店裡播放著輕柔音樂。
game|We learned the rules of a new board game.|我們學會了一款新桌遊的規則。
sport|Swimming is a popular summer sport.|游泳是一項受歡迎的夏季運動。
hobby|Baking became my favorite weekend hobby.|烘焙成了我最喜歡的週末嗜好。
concert|Thousands of fans attended the outdoor concert.|數千名歌迷參加了戶外演唱會。
episode|The next episode will be released on Friday.|下一集將在星期五上架。
series|My family watched the entire series together.|我的家人一起看完了整部影集。
character|This character becomes braver throughout the story.|這個角色在故事中變得越來越勇敢。
performance|Her piano performance began at seven.|她的鋼琴表演七點開始。
audience|The audience became silent when the lights dimmed.|燈光變暗時，觀眾安靜了下來。
creative|We found a creative way to reuse old boxes.|我們找到有創意的方法再利用舊紙箱。
relax|I relax by reading beside the window.|我會坐在窗邊閱讀來放鬆。
enjoy|Many people enjoy walking along the river.|許多人喜歡沿著河邊散步。
collect|Many children collect cards from the series.|許多孩子收藏這個系列的卡片。
draw|She can draw animals with only a few lines.|她只用幾條線就能畫出動物。
camp|Our class will camp near the lake this fall.|我們班今年秋天會在湖邊露營。
photograph|This photograph captures the city at sunset.|這張照片捕捉了城市日落景色。
instrument|The violin was the first instrument he learned.|小提琴是他學的第一種樂器。
entertainment|The hotel offers evening entertainment for families.|飯店為家庭提供晚間娛樂活動。
binge-watch|We plan to binge-watch the final season tonight.|我們今晚打算一口氣看完最後一季。
catch a movie|Let us catch a movie after finishing our homework.|我們寫完作業後去看場電影吧。
take up|She decided to take up photography during vacation.|她決定在假期開始學攝影。
kill time|I solve puzzles to kill time on long rides.|長途搭車時我會解謎來打發時間。
page-turner|The mystery novel was a real page-turner.|那本推理小說讓人愛不釋手。

weather|We checked the weather before leaving home.|出門前我們查看了天氣。
sunny|It will be sunny enough for a picnic tomorrow.|明天天氣晴朗，適合野餐。
cloudy|The sky remained cloudy all afternoon.|整個下午天空都陰陰的。
rainy|We played cards indoors on the rainy day.|下雨天我們在室內玩牌。
windy|It is too windy to use an umbrella.|風太大了，無法撐傘。
storm|The storm knocked down several tree branches.|暴風雨吹斷了好幾根樹枝。
temperature|The temperature falls after sunset.|日落後氣溫會下降。
forecast|The weekend forecast shows clear skies.|週末預報顯示天空晴朗。
climate|This island has a warm and humid climate.|這座島氣候溫暖潮濕。
environment|Using less plastic helps the environment.|減少使用塑膠有助於環境。
nature|Spending time in nature helps me slow down.|待在大自然裡能讓我放慢步調。
pollution|Air pollution was lower after the rain.|下雨後空氣污染降低了。
recycle|Our school teaches students how to recycle correctly.|學校教學生如何正確回收。
reuse|We reuse glass jars to store small items.|我們重複使用玻璃罐收納小物。
waste|Planning meals can reduce food waste.|規劃餐點能減少食物浪費。
renewable energy|The town invests in renewable energy to reduce pollution.|這座城鎮投資再生能源以減少污染。
earthquake|We practiced what to do during an earthquake.|我們練習地震時該怎麼做。
flood|Sandbags protected several homes from the flood.|沙包保護了幾戶人家免受洪水侵襲。
drought|Farmers saved water during the drought.|農民在乾旱期間節約用水。
sustainable|The company chose sustainable packaging.|公司選擇了永續包裝。
pouring|It was pouring when we left the museum.|我們離開博物館時正下著傾盆大雨。
clear up|The sky should clear up before noon.|天空應該會在中午前放晴。
cool down|The evening breeze helped the city cool down.|晚風吹來，讓城市涼了下來。
eco-friendly|We brought eco-friendly cups to the event.|我們帶了環保杯參加活動。
carbon footprint|Taking public transportation can lower your carbon footprint.|搭乘大眾運輸可以減少碳足跡。

job|Her first job taught her how to serve customers.|她的第一份工作教會她如何服務顧客。
work|Good work requires both time and patience.|好成果需要時間與耐心。
career|He wants a career that helps other people.|他想從事能幫助他人的職涯。
future|These skills will be useful in the future.|這些技能未來會很有用。
company|The company allows employees to work from home.|這家公司允許員工在家工作。
office|The new office has a quiet meeting room.|新辦公室有一間安靜的會議室。
manager|Our manager explains each task clearly.|我們的經理會清楚說明每項任務。
team|A strong team communicates openly.|優秀的團隊會坦誠溝通。
interview|She wore a neat shirt to the interview.|她穿著整潔的襯衫參加面試。
experience|Travel can be a valuable learning experience.|旅行可以是珍貴的學習經驗。
ability|His ability to solve problems impressed us.|他解決問題的能力讓我們印象深刻。
goal|Write down one goal you want to reach.|寫下一個你想達成的目標。
opportunity|Volunteering gave me an opportunity to meet new people.|志工服務給我認識新朋友的機會。
challenge|Speaking in public was a personal challenge.|公開演說是我個人的挑戰。
success|Teamwork played an important role in our success.|團隊合作對我們的成功很重要。
prepare|We prepare a list before every meeting.|每次開會前我們都會準備清單。
apply|I plan to apply for a part-time job.|我計畫申請一份兼職工作。
develop|Group activities develop communication skills.|團體活動能培養溝通能力。
professional|Please use a professional tone in the email.|請在電子郵件中使用專業語氣。
technology|Modern technology lets people work from anywhere.|現代科技讓人們能在任何地方工作。
side hustle|Tutoring became his weekend side hustle.|家教成了他的週末副業。
move up|She took extra courses to move up in her field.|她修讀額外課程，希望在專業領域晉升。
start from scratch|After losing the file, we had to start from scratch.|檔案遺失後，我們只好從頭開始。
think outside the box|Great designers think outside the box.|優秀設計師懂得跳脫框架思考。
in the long run|Learning to communicate well helps in the long run.|學會良好溝通長期而言很有幫助。
`;

export const SECOND_EXAMPLES = Object.fromEntries(
  RAW_SECOND_EXAMPLES.trim().split("\n").filter(Boolean).map((line) => {
    const [word, example2, exampleZh2] = line.split("|");
    return [word, { example2, exampleZh2 }];
  })
);

export default SECOND_EXAMPLES;
