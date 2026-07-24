/*
 * 如何新增單字：
 * 1. 在下方對應的「#主題」區塊新增一行。
 * 2. 格式固定為：英文|詞性|中文意思|英文例句|例句中文翻譯|等級
 * 3. 欄位間請用半形直線「|」分隔；例句本身不要使用這個符號。
 * 4. level 可填 L1～L6；生活口語片語請填「口語」。
 * 5. 第二組例句請在 second-examples.js 加入相同的英文鍵值。
 * 程式會自動把例句中第一次出現的英文單字／片語加上 <strong> 粗體標籤。
 */

import { PHONETICS } from "./phonetics.js";
import { SECOND_EXAMPLES } from "./second-examples.js";

const RAW_WORDS = `
#飲食點餐
menu|n.|菜單|Could we see the menu, please?|可以讓我們看一下菜單嗎？|L1
order|v.|點餐|I am ready to order now.|我現在可以點餐了。|L1
meal|n.|一餐|This meal comes with a drink.|這份餐點附一杯飲料。|L1
snack|n.|點心|I packed a snack for the train ride.|我帶了點心在火車上吃。|L1
ingredient|n.|食材；成分|Peanuts are the main ingredient in this sauce.|花生是這個醬汁的主要成分。|L3
delicious|adj.|美味的|The noodles here are delicious.|這裡的麵很好吃。|L2
spicy|adj.|辣的|Is this curry very spicy?|這份咖哩會很辣嗎？|L2
sweet|adj.|甜的|This tea is too sweet for me.|這杯茶對我來說太甜了。|L1
fresh|adj.|新鮮的|The bakery sells fresh bread every morning.|這間麵包店每天早上賣新鮮麵包。|L2
vegetarian|adj.|素食的|Do you have a vegetarian option?|你們有素食的選項嗎？|L3
dessert|n.|甜點|Let us share a dessert after dinner.|晚餐後我們一起分一份甜點吧。|L2
beverage|n.|飲料|Each lunch set includes a beverage.|每份午餐套餐都含一杯飲料。|L4
appetite|n.|食慾|The long walk gave me a good appetite.|走了很久讓我胃口大開。|L4
portion|n.|份量|The portion is large enough for two people.|這個份量夠兩個人吃。|L3
refill|n.|續杯|Can I get a free refill of water?|我可以免費續水嗎？|L3
bill|n.|帳單|Could we have the bill, please?|可以麻煩給我們帳單嗎？|L1
recommend|v.|推薦|What dish do you recommend?|你推薦哪一道菜？|L2
reserve|v.|預訂|I would like to reserve a table for four.|我想預訂四人桌。|L3
takeout|n.|外帶餐點|We ordered takeout because it was raining.|因為下雨，我們叫了外帶。|L3
allergy|n.|過敏|Please tell the server about your food allergy.|請告訴服務生你對食物過敏。|L3
grab a bite|phr.|隨便吃點東西|Let us grab a bite before the movie.|電影開始前，我們去吃點東西吧。|口語
eat out|phr.|外出用餐|My family likes to eat out on Fridays.|我家喜歡星期五外出用餐。|口語
on the house|phr.|店家招待|The dessert is on the house tonight.|今晚的甜點由店家招待。|口語
to go|phr.|外帶|I would like one coffee to go.|我想要一杯咖啡外帶。|口語
have a sweet tooth|phr.|愛吃甜食|I have a sweet tooth and love chocolate cake.|我愛吃甜食，也很喜歡巧克力蛋糕。|口語

#購物消費
price|n.|價格|The price includes tax.|這個價格已含稅。|L1
cost|v.|花費|How much does this jacket cost?|這件外套多少錢？|L1
sale|n.|特價活動|These shoes are on sale this week.|這雙鞋本週特價。|L1
discount|n.|折扣|Students can get a ten percent discount.|學生可以享有九折優惠。|L2
cash|n.|現金|I only have cash with me.|我身上只有現金。|L1
receipt|n.|收據|Keep the receipt in case you need a refund.|留著收據，以防需要退款。|L2
customer|n.|顧客|Every customer receives a reusable bag.|每位顧客都會拿到一個環保袋。|L2
cashier|n.|收銀員|The cashier helped me use the coupon.|收銀員幫我使用優惠券。|L2
budget|n.|預算|This laptop is within my budget.|這台筆電在我的預算內。|L3
brand|n.|品牌|Which brand of headphones do you prefer?|你比較喜歡哪個品牌的耳機？|L2
quality|n.|品質|The quality is better than I expected.|品質比我預期的更好。|L2
size|n.|尺寸|Do you have this shirt in a larger size?|這件襯衫有更大的尺寸嗎？|L1
fit|v.|合身|These jeans fit me perfectly.|這件牛仔褲非常合身。|L2
exchange|v.|換貨|Can I exchange this for a smaller one?|我可以把這個換成小一點的嗎？|L3
refund|n.|退款|The store gave me a full refund.|店家全額退款給我。|L3
warranty|n.|保固|This phone has a one-year warranty.|這支手機有一年保固。|L4
afford|v.|負擔得起|I cannot afford a new computer right now.|我目前買不起新電腦。|L3
compare|v.|比較|Compare the prices before you decide.|決定前先比較價格。|L2
purchase|v.|購買|You can purchase tickets online.|你可以在線上購票。|L3
coupon|n.|優惠券|I used a coupon to save fifty dollars.|我用了優惠券省下五十元。|L2
bargain|n.|便宜貨|This second-hand desk was a real bargain.|這張二手書桌真的很划算。|L3
rip-off|n.|坑人貨；敲竹槓|That tiny drink is a rip-off at this price.|這麼小杯的飲料賣這個價錢太坑人了。|口語
shop around|phr.|貨比三家|It is smart to shop around before buying a phone.|買手機前貨比三家很聰明。|口語
sold out|phr.|售罄|The concert tickets sold out in ten minutes.|演唱會門票十分鐘內就售罄了。|口語
worth it|phr.|值得|The bag is expensive, but it is worth it.|這個包很貴，但很值得。|口語

#交通旅遊
station|n.|車站|Meet me outside the train station.|在火車站外面跟我碰面。|L1
ticket|n.|票|I bought a ticket to Tainan.|我買了一張去台南的票。|L1
platform|n.|月台|The local train leaves from platform two.|區間車從第二月台出發。|L2
route|n.|路線|This bus route goes through downtown.|這條公車路線會經過市中心。|L3
traffic|n.|交通；車流|There is heavy traffic during rush hour.|尖峰時段車流量很大。|L2
passenger|n.|乘客|Every passenger must wear a seat belt.|每位乘客都必須繫安全帶。|L2
destination|n.|目的地|Taipei is our final destination.|台北是我們的最終目的地。|L3
departure|n.|出發|Please arrive an hour before departure.|請在出發前一小時抵達。|L3
arrival|n.|抵達|Our arrival was delayed by the storm.|我們因暴風雨而延誤抵達。|L3
luggage|n.|行李|My luggage is too heavy to carry.|我的行李太重，拿不動。|L2
passport|n.|護照|Check your passport before leaving home.|離家前檢查你的護照。|L2
journey|n.|旅程|The journey took nearly five hours.|這趟旅程花了將近五小時。|L2
local|adj.|當地的|We asked a local guide for directions.|我們向當地導遊問路。|L2
transfer|v.|轉乘|You need to transfer at the next station.|你需要在下一站轉乘。|L3
delay|n.|延誤|The flight delay lasted two hours.|班機延誤了兩小時。|L2
cancel|v.|取消|They may cancel the ferry because of the wind.|他們可能因風勢取消渡輪。|L2
explore|v.|探索|We rented bikes to explore the town.|我們租腳踏車探索小鎮。|L2
map|n.|地圖|Download an offline map before the trip.|旅行前下載離線地圖。|L1
direction|n.|方向；指示|Could you give me direction to the night market?|你可以告訴我去夜市的方向嗎？|L2
accommodation|n.|住宿|We found affordable accommodation near the beach.|我們在海邊找到負擔得起的住宿。|L5
get around|phr.|四處移動|The MRT makes it easy to get around Taipei.|搭捷運讓人在台北四處移動很方便。|口語
hit the road|phr.|上路；出發|We should hit the road before sunrise.|我們應該在日出前上路。|口語
red-eye flight|phr.|紅眼班機|I slept through most of the red-eye flight.|那趟紅眼班機我大部分時間都在睡覺。|口語
off the beaten path|phr.|人跡罕至；非熱門路線|We found a quiet café off the beaten path.|我們在非熱門路線上找到一間安靜咖啡廳。|口語
miss the bus|phr.|錯過公車|Hurry, or we will miss the bus.|快點，不然我們會錯過公車。|口語

#學校學習
subject|n.|科目|English is my favorite subject.|英文是我最喜歡的科目。|L1
lesson|n.|課程|Today’s lesson is about climate change.|今天的課程是關於氣候變遷。|L1
homework|n.|家庭作業|I finished my homework before dinner.|我在晚餐前寫完家庭作業。|L1
exam|n.|考試|Our final exam is next Monday.|我們的期末考在下星期一。|L1
grade|n.|成績|She worked hard to improve her grade.|她努力提升成績。|L2
project|n.|專題|Our science project is due on Friday.|我們的科學專題星期五截止。|L2
report|n.|報告|I am writing a report about ocean life.|我正在寫一份關於海洋生物的報告。|L2
research|n.|研究|Good research begins with a clear question.|好的研究始於清楚的問題。|L3
knowledge|n.|知識|Reading expands your knowledge of the world.|閱讀能拓展你對世界的知識。|L3
skill|n.|技能|Writing is a skill that improves with practice.|寫作是會隨練習進步的技能。|L2
focus|v.|專心|It is easier to focus in a quiet room.|在安靜的房間裡比較容易專心。|L2
review|v.|複習|I review new vocabulary before bed.|我睡前複習新單字。|L2
practice|v.|練習|You should practice speaking every day.|你應該每天練習口說。|L1
memorize|v.|記住|Pictures can help you memorize new words.|圖片可以幫助你記住新單字。|L3
understand|v.|理解|I finally understand this math problem.|我終於理解這道數學題。|L1
explain|v.|解釋|Could you explain the answer again?|你可以再解釋一次答案嗎？|L2
submit|v.|繳交|Please submit your essay by midnight.|請在午夜前繳交作文。|L3
deadline|n.|截止期限|The application deadline is tomorrow.|申請截止期限是明天。|L3
classmate|n.|同學|My classmate shared her notes with me.|我的同學把筆記借我看。|L1
scholarship|n.|獎學金|He applied for a scholarship to study abroad.|他申請了出國留學的獎學金。|L4
cram for|phr.|為考試臨時抱佛腳|Do not cram for the test the night before.|不要在考試前一晚臨時抱佛腳。|口語
catch up|phr.|趕上進度|I stayed after school to catch up on my work.|我放學後留下來趕上作業進度。|口語
hand in|phr.|繳交|Remember to hand in your worksheet.|記得繳交學習單。|口語
figure out|phr.|想通；解決|We worked together to figure out the puzzle.|我們一起想辦法解開謎題。|口語
learn by heart|phr.|背熟|We had to learn by heart all the lines in the play.|我們必須背熟戲劇裡的所有台詞。|口語

#社群網路
account|n.|帳號|I created a private account for my photos.|我建立了一個私人帳號放照片。|L2
profile|n.|個人檔案|Update your profile with a recent picture.|用近期照片更新你的個人檔案。|L2
post|v.|發文|I rarely post pictures of my family.|我很少發家人的照片。|L2
comment|n.|留言|Her kind comment made my day.|她友善的留言讓我心情很好。|L2
message|n.|訊息|Send me a message when you arrive.|你抵達時傳訊息給我。|L1
follower|n.|追蹤者|The artist thanked every new follower.|那位藝術家感謝每一位新追蹤者。|L2
content|n.|內容|This channel makes useful study content.|這個頻道製作實用的學習內容。|L3
upload|v.|上傳|It may take a minute to upload the video.|上傳影片可能需要一分鐘。|L2
download|v.|下載|You can download the file for offline use.|你可以下載檔案供離線使用。|L2
privacy|n.|隱私|Check the privacy settings on your phone.|檢查你手機上的隱私設定。|L3
password|n.|密碼|Use a different password for each account.|每個帳號使用不同密碼。|L1
online|adv.|在線上|The new episode is already online.|新的一集已經上線了。|L1
digital|adj.|數位的|I keep a digital copy of my notes.|我的筆記有保存數位副本。|L3
search|v.|搜尋|Search the title to find the article.|搜尋標題就能找到這篇文章。|L1
share|v.|分享|Please ask before you share someone’s photo.|分享別人的照片前請先詢問。|L1
block|v.|封鎖|You can block anyone who sends harmful messages.|你可以封鎖傳送傷害性訊息的人。|L2
flag|v.|標記檢舉|Flag the fake account so the platform can review it.|標記檢舉假帳號，讓平台審查。|L2
notification|n.|通知|I turned off every notification during class.|上課時我關閉了所有通知。|L3
algorithm|n.|演算法|The algorithm suggests videos based on your history.|演算法會根據你的紀錄推薦影片。|L5
influence|v.|影響|Social media can influence how we see ourselves.|社群媒體可能影響我們看待自己的方式。|L3
go viral|phr.|爆紅|A funny cooking video can go viral overnight.|一支有趣的料理影片可能一夕爆紅。|口語
scroll through|phr.|滑看|I scroll through the news on the bus.|我在公車上滑看新聞。|口語
DM someone|phr.|私訊某人|You can DM someone to ask for details.|你可以私訊某人詢問細節。|口語
log in|phr.|登入|I cannot log in without the security code.|沒有安全碼我無法登入。|口語
unfollow|v.|取消追蹤|It is okay to unfollow accounts that upset you.|取消追蹤讓你不舒服的帳號沒有關係。|口語

#情緒個性
happy|adj.|快樂的|I feel happy when I help a friend.|幫助朋友時我覺得很快樂。|L1
sad|adj.|難過的|It is normal to feel sad sometimes.|偶爾感到難過很正常。|L1
angry|adj.|生氣的|Take a breath when you feel angry.|感到生氣時先深呼吸。|L1
nervous|adj.|緊張的|I was nervous before my speech.|演講前我很緊張。|L2
excited|adj.|興奮的|We are excited about the school trip.|我們對校外教學感到興奮。|L2
worried|adj.|擔心的|She is worried about tomorrow’s exam.|她擔心明天的考試。|L2
calm|adj.|平靜的|Soft music helps me stay calm.|輕柔音樂幫助我保持平靜。|L2
proud|adj.|驕傲的|Your parents are proud of your effort.|你的父母為你的努力感到驕傲。|L2
lonely|adj.|寂寞的|He felt lonely after moving to a new city.|搬到新城市後，他感到寂寞。|L2
relaxed|adj.|放鬆的|I feel relaxed after a warm shower.|洗完熱水澡後我覺得很放鬆。|L2
patient|adj.|有耐心的|A good teacher is patient with beginners.|好老師對初學者很有耐心。|L2
honest|adj.|誠實的|Please be honest about what happened.|請誠實說明發生了什麼。|L2
generous|adj.|慷慨的|It was generous of her to share her lunch.|她願意分享午餐，真是慷慨。|L3
curious|adj.|好奇的|Curious students ask many questions.|好奇的學生會問很多問題。|L2
confident|adj.|有自信的|Practice made him more confident on stage.|練習讓他在台上更有自信。|L3
shy|adj.|害羞的|I was too shy to introduce myself.|我太害羞，不敢自我介紹。|L1
polite|adj.|有禮貌的|It is polite to say thank you.|說謝謝是有禮貌的。|L2
responsible|adj.|負責任的|She is responsible and always keeps her promises.|她很負責任，總是信守承諾。|L3
stubborn|adj.|固執的|He is too stubborn to change his mind.|他太固執，不願改變心意。|L3
grateful|adj.|感激的|I am grateful for your support.|我很感激你的支持。|L3
cheer up|phr.|振作起來|A walk outside may help you cheer up.|出門走走也許能幫你振作起來。|口語
freak out|phr.|慌張；抓狂|Do not freak out; we still have time.|別慌張，我們還有時間。|口語
feel down|phr.|感到低落|I call my best friend when I feel down.|心情低落時我會打給最好的朋友。|口語
open-minded|adj.|思想開放的|Try to stay open-minded when hearing new ideas.|聽到新想法時，試著保持開放。|口語
easygoing|adj.|隨和的|Our new coach is friendly and easygoing.|我們的新教練友善又隨和。|口語

#健康身體
health|n.|健康|Enough sleep is important for your health.|充足睡眠對健康很重要。|L1
body|n.|身體|Stretch your body after sitting for an hour.|坐一小時後伸展身體。|L1
exercise|n.|運動|Regular exercise can improve your mood.|規律運動可以改善心情。|L1
sleep|n.|睡眠|Teenagers need plenty of sleep.|青少年需要充足睡眠。|L1
pain|n.|疼痛|Tell the doctor where you feel pain.|告訴醫師你哪裡疼痛。|L1
fever|n.|發燒|He stayed home because he had a fever.|他因為發燒而待在家。|L2
cough|n.|咳嗽|Drink warm water if you have a cough.|如果咳嗽就喝溫水。|L2
headache|n.|頭痛|Too much screen time gives me a headache.|看螢幕太久讓我頭痛。|L2
medicine|n.|藥物|Take this medicine after meals.|這個藥要飯後服用。|L1
doctor|n.|醫師|You should see a doctor if it gets worse.|如果變嚴重，你應該去看醫師。|L1
hospital|n.|醫院|The nearest hospital is two blocks away.|最近的醫院在兩個街區外。|L1
symptom|n.|症狀|A sore throat can be a symptom of a cold.|喉嚨痛可能是感冒的症狀。|L3
energy|n.|活力|A healthy breakfast gives you energy.|健康早餐帶給你活力。|L2
habit|n.|習慣|Walking after dinner is a healthy habit.|晚餐後散步是健康的習慣。|L2
stress|n.|壓力|Deep breathing can reduce stress.|深呼吸可以減輕壓力。|L2
recover|v.|康復|It took her a week to recover from the flu.|她花了一週才從流感中康復。|L3
injury|n.|受傷|He returned to practice after his knee injury.|膝蓋受傷後，他重返練習。|L3
treatment|n.|治療|The dentist explained the treatment clearly.|牙醫清楚說明治療方式。|L3
balanced|adj.|均衡的|A balanced diet includes many kinds of food.|均衡飲食包含多種食物。|L3
mental|adj.|心理的|Rest is important for your mental health.|休息對心理健康很重要。|L3
work out|phr.|健身|I work out at home three times a week.|我每週在家健身三次。|口語
under the weather|phr.|身體不舒服|I am feeling under the weather today.|我今天身體不太舒服。|口語
get back on your feet|phr.|恢復健康|I hope you get back on your feet soon.|希望你早日恢復健康。|口語
cut down on|phr.|減少|I am trying to cut down on sugary drinks.|我正試著減少含糖飲料。|口語
out of shape|phr.|體能不佳|I felt out of shape after the long break.|長假後我覺得體能變差了。|口語

#居家日常
home|n.|家|I will be home before nine.|我九點前會到家。|L1
room|n.|房間|My room gets plenty of sunlight.|我的房間有充足陽光。|L1
kitchen|n.|廚房|Dad is making soup in the kitchen.|爸爸正在廚房煮湯。|L1
bathroom|n.|浴室|Please keep the bathroom floor dry.|請保持浴室地板乾燥。|L1
bedroom|n.|臥室|I left my phone in the bedroom.|我把手機留在臥室了。|L1
furniture|n.|家具|We moved the furniture before painting.|油漆前我們移動了家具。|L2
laundry|n.|待洗衣物|I do my laundry on Sunday afternoons.|我星期日下午洗衣服。|L2
chore|n.|家務|Washing dishes is my daily chore.|洗碗是我每天的家務。|L3
tidy|adj.|整潔的|Keep your desk tidy so you can focus.|保持書桌整潔，才能專心。|L2
messy|adj.|凌亂的|My room gets messy during exam week.|考試週時我的房間會變得凌亂。|L2
clean|v.|清潔|We clean the windows once a month.|我們每月清潔一次窗戶。|L1
repair|v.|修理|A technician came to repair the washing machine.|技師來修理洗衣機。|L3
replace|v.|更換|It is time to replace the old light bulb.|該更換舊燈泡了。|L2
electricity|n.|電|Turn off the lights to save electricity.|關燈以節省用電。|L3
water|n.|水|Do not waste water while brushing your teeth.|刷牙時不要浪費水。|L1
neighbor|n.|鄰居|Our neighbor brought us some fruit.|我們的鄰居帶了些水果給我們。|L2
rent|n.|房租|The rent is due at the start of each month.|房租每月初到期。|L3
balcony|n.|陽台|We grow herbs on the balcony.|我們在陽台種香草。|L2
entrance|n.|入口|Leave the package near the entrance.|把包裹放在入口附近。|L2
comfortable|adj.|舒適的|This sofa is soft and comfortable.|這張沙發柔軟又舒適。|L2
sleep in|phr.|睡晚一點|I like to sleep in on rainy Sundays.|下雨的星期日我喜歡睡晚一點。|口語
clean up|phr.|整理乾淨|Please clean up after making a snack.|做完點心後請整理乾淨。|口語
run out of|phr.|用完|We have run out of toilet paper.|我們的衛生紙用完了。|口語
feel at home|phr.|感到自在|Her family made me feel at home.|她的家人讓我感到很自在。|口語
around the corner|phr.|就在附近|The convenience store is around the corner.|便利商店就在附近。|口語

#人際社交
friend|n.|朋友|A true friend listens without judging.|真正的朋友會傾聽而不批判。|L1
family|n.|家人|My family eats dinner together.|我的家人會一起吃晚餐。|L1
relationship|n.|關係|Trust is important in every relationship.|信任在每段關係中都很重要。|L3
conversation|n.|對話|We had a long conversation after class.|下課後我們聊了很久。|L2
invite|v.|邀請|I will invite my classmates to the party.|我會邀請同學來參加派對。|L2
introduce|v.|介紹|Let me introduce you to my cousin.|讓我介紹你認識我的表弟。|L2
promise|n.|承諾|She kept her promise to call me.|她信守打電話給我的承諾。|L2
trust|v.|信任|It takes time to trust someone new.|信任一個新認識的人需要時間。|L2
respect|v.|尊重|We should respect different opinions.|我們應該尊重不同意見。|L2
support|v.|支持|My friends support my decision.|我的朋友支持我的決定。|L2
apologize|v.|道歉|You should apologize when you hurt someone.|傷害別人時，你應該道歉。|L3
forgive|v.|原諒|It can be hard to forgive a serious mistake.|原諒嚴重的錯誤可能很難。|L3
argue|v.|爭論|We sometimes argue but remain close friends.|我們有時爭論，但仍是好友。|L2
agree|v.|同意|I agree with your main point.|我同意你的主要觀點。|L1
advice|n.|建議|My teacher gave me useful advice.|老師給了我實用的建議。|L2
compliment|n.|讚美|A sincere compliment can build confidence.|真誠的讚美可以建立自信。|L3
guest|n.|客人|Every guest received a name tag.|每位客人都拿到名牌。|L2
community|n.|社群；社區|Our community held a weekend market.|我們的社區舉辦了週末市集。|L3
contact|v.|聯絡|Please contact me if the plan changes.|計畫有變時請聯絡我。|L2
cooperate|v.|合作|Team members must cooperate to finish on time.|團隊成員必須合作才能準時完成。|L3
hang out|phr.|一起玩；相處|Do you want to hang out after school?|放學後你想一起玩嗎？|口語
get along|phr.|相處融洽|My brother and I usually get along well.|我和弟弟通常相處融洽。|口語
keep in touch|phr.|保持聯絡|Let us keep in touch after graduation.|畢業後讓我們保持聯絡。|口語
make up|phr.|和好|They talked honestly and decided to make up.|他們坦白交談後決定和好。|口語
have your back|phr.|挺你；支持你|Do not worry; I have your back.|別擔心，我挺你。|口語

#娛樂休閒
movie|n.|電影|We watched a funny movie last night.|我們昨晚看了一部好笑的電影。|L1
music|n.|音樂|I listen to music while doing chores.|我做家事時會聽音樂。|L1
game|n.|遊戲|This board game is easy to learn.|這款桌遊很容易上手。|L1
sport|n.|運動|Basketball is a popular sport at our school.|籃球是我們學校很受歡迎的運動。|L1
hobby|n.|興趣|Photography became my favorite hobby.|攝影成了我最喜歡的興趣。|L2
concert|n.|演唱會|The concert starts at seven thirty.|演唱會七點半開始。|L2
episode|n.|一集|The latest episode made everyone laugh.|最新一集讓大家都笑了。|L3
series|n.|系列；影集|I finished the whole series this weekend.|我這週末看完整部影集。|L2
character|n.|角色|My favorite character is brave and funny.|我最喜歡的角色勇敢又有趣。|L2
performance|n.|表演|The dance performance received loud applause.|舞蹈表演獲得熱烈掌聲。|L3
audience|n.|觀眾|The audience became quiet when the lights dimmed.|燈光變暗時，觀眾安靜下來。|L3
creative|adj.|有創意的|She found a creative way to reuse the boxes.|她找到有創意的方法重複利用盒子。|L2
relax|v.|放鬆|Reading comics helps me relax.|看漫畫幫助我放鬆。|L1
enjoy|v.|享受；喜歡|I enjoy walking along the river.|我喜歡沿著河邊散步。|L1
collect|v.|收藏|My grandfather likes to collect old postcards.|我祖父喜歡收藏老明信片。|L2
draw|v.|畫畫|I often draw in my sketchbook.|我常在素描本上畫畫。|L1
camp|v.|露營|We plan to camp by the lake.|我們計畫在湖邊露營。|L2
photograph|n.|照片|This photograph reminds me of summer.|這張照片讓我想起夏天。|L2
instrument|n.|樂器|The violin is a difficult instrument to master.|小提琴是很難精通的樂器。|L3
entertainment|n.|娛樂|The festival offers entertainment for all ages.|這場節慶提供適合各年齡的娛樂。|L3
binge-watch|v.|追劇；一次看很多集|We binge-watch the show during the holiday.|我們假期時追了這部劇。|口語
catch a movie|phr.|去看電影|Let us catch a movie this Saturday.|這星期六我們去看電影吧。|口語
take up|phr.|開始培養興趣|I want to take up painting this summer.|我今年夏天想開始學畫畫。|口語
kill time|phr.|打發時間|I play word games to kill time on the bus.|我在公車上玩文字遊戲打發時間。|口語
page-turner|n.|令人愛不釋手的書|This mystery novel is a real page-turner.|這本推理小說讓人愛不釋手。|口語

#天氣環境
weather|n.|天氣|The weather changes quickly in the mountains.|山裡的天氣變化很快。|L1
sunny|adj.|晴朗的|It will be sunny this afternoon.|今天下午會是晴天。|L1
cloudy|adj.|多雲的|The sky became cloudy before lunch.|午餐前天空變得多雲。|L1
rainy|adj.|下雨的|Bring an umbrella on a rainy day.|下雨天要帶傘。|L1
windy|adj.|有風的|It is too windy to ride safely.|風太大，不適合安全騎車。|L1
storm|n.|暴風雨|The storm knocked down several trees.|暴風雨吹倒了幾棵樹。|L2
temperature|n.|溫度|The temperature dropped suddenly at night.|夜間溫度突然下降。|L2
forecast|n.|天氣預報|The forecast says rain is likely.|天氣預報說很可能下雨。|L3
climate|n.|氣候|The island has a warm climate.|這座島的氣候溫暖。|L3
environment|n.|環境|Small choices can protect the environment.|小小的選擇也能保護環境。|L2
nature|n.|大自然|Spending time in nature helps me relax.|待在大自然中能幫助我放鬆。|L1
pollution|n.|污染|Air pollution can harm our lungs.|空氣污染會傷害肺部。|L3
recycle|v.|回收|Remember to recycle plastic bottles.|記得回收塑膠瓶。|L2
reuse|v.|重複使用|We reuse shopping bags to reduce waste.|我們重複使用購物袋以減少垃圾。|L2
waste|n.|廢棄物|Food waste is a serious problem.|食物浪費是嚴重問題。|L2
renewable energy|n.|再生能源|Solar power is a form of renewable energy.|太陽能是一種再生能源。|L2
earthquake|n.|地震|Stay away from windows during an earthquake.|地震時要遠離窗戶。|L2
flood|n.|洪水|Heavy rain caused a flood near the river.|大雨在河邊造成洪水。|L3
drought|n.|乾旱|The long drought damaged many crops.|長期乾旱損害了許多作物。|L4
sustainable|adj.|永續的|Public transport is a more sustainable choice.|大眾運輸是更永續的選擇。|L5
pouring|adj.|下著傾盆大雨|It is pouring, so wait inside for a while.|外面正下著傾盆大雨，先在室內等一下。|口語
clear up|phr.|放晴|The sky should clear up by noon.|天空中午前應該會放晴。|口語
cool down|phr.|變涼|It usually starts to cool down after sunset.|日落後通常會開始變涼。|口語
eco-friendly|adj.|環保的|We chose eco-friendly cleaning products.|我們選擇環保的清潔用品。|口語
carbon footprint|n.|碳足跡|Taking the train can reduce your carbon footprint.|搭火車可以減少你的碳足跡。|口語

#工作未來
job|n.|工作|She found a part-time job near school.|她在學校附近找到一份兼職。|L1
work|n.|工作|Meaningful work can bring a sense of purpose.|有意義的工作能帶來目標感。|L1
career|n.|職涯|He hopes to build a career in design.|他希望在設計領域建立職涯。|L3
future|n.|未來|Learning languages may open doors in the future.|學語言未來可能帶來更多機會。|L1
company|n.|公司|The company offers training for new staff.|公司為新進員工提供訓練。|L2
office|n.|辦公室|Her office is close to the MRT station.|她的辦公室靠近捷運站。|L1
manager|n.|經理|The manager asked for our ideas.|經理詢問我們的想法。|L2
team|n.|團隊|Our team meets every Monday morning.|我們團隊每週一早上開會。|L1
interview|n.|面試|I practiced before the job interview.|我在工作面試前做了練習。|L2
experience|n.|經驗|Volunteer work gave me useful experience.|志工服務帶給我實用經驗。|L2
ability|n.|能力|Communication ability matters in every field.|溝通能力在每個領域都很重要。|L2
goal|n.|目標|Set a small goal for this month.|為這個月設定一個小目標。|L1
opportunity|n.|機會|This course is a good opportunity to learn.|這門課是很好的學習機會。|L3
challenge|n.|挑戰|Every challenge teaches us something new.|每個挑戰都會教我們新事物。|L2
success|n.|成功|Success often comes from steady effort.|成功通常來自持續努力。|L2
prepare|v.|準備|I prepare for tomorrow’s meeting by reading the notes.|我閱讀筆記來準備明天的會議。|L1
apply|v.|申請|You can apply for the summer program online.|你可以在線上申請暑期計畫。|L2
develop|v.|培養；發展|The club helped me develop leadership skills.|社團幫助我培養領導能力。|L3
professional|adj.|專業的|Her email sounded clear and professional.|她的電子郵件清楚又專業。|L3
technology|n.|科技|New technology is changing the way we work.|新科技正在改變我們的工作方式。|L2
side hustle|n.|副業|Selling handmade cards became her side hustle.|賣手工卡片成了她的副業。|口語
move up|phr.|升遷；向上發展|He worked hard to move up in the company.|他努力工作以在公司升遷。|口語
start from scratch|phr.|從零開始|Sometimes a new project must start from scratch.|有時新專案必須從零開始。|口語
think outside the box|phr.|跳脫框架思考|We need to think outside the box to solve this.|我們需要跳脫框架思考來解決這件事。|口語
in the long run|phr.|長期而言|Good habits will help you in the long run.|良好習慣長期而言會幫助你。|口語
`;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function boldFirst(example, word) {
  return example.replace(new RegExp(escapeRegExp(word), "i"), (match) => `<strong>${match}</strong>`);
}

let currentTopic = "";
export const WORDS = RAW_WORDS.trim().split("\n").flatMap((line) => {
  const trimmed = line.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("#")) {
    currentTopic = trimmed.slice(1);
    return [];
  }
  const [word, partOfSpeech, zh, example, exampleZh, level] = trimmed.split("|");
  const second = SECOND_EXAMPLES[word];
  return [{
    word,
    partOfSpeech,
    zh,
    phonetic: PHONETICS[word],
    example: boldFirst(example, word),
    exampleZh,
    example2: boldFirst(second.example2, word),
    exampleZh2: second.exampleZh2,
    topic: currentTopic,
    level
  }];
});

export default WORDS;
