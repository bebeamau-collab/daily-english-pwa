/* 2026-10 新增100詞。等級為編輯估級；口語另標。ID永久固定，禁止重編舊音檔。
 * 每行：word|詞性|繁中|KK|例句1|中譯1|例句2|中譯2
 * 每10行與下方同序故事固定配對。 */
const RAW = `
appetizer|n.|開胃菜|ˈæpəˌtaɪzɚ|Soup is our appetizer.|湯是我們的開胃菜。|We shared an appetizer.|我們分吃一道開胃菜。
broth|n.|高湯|brɔθ|The broth smells good.|高湯聞起來很香。|Try the warm broth.|嚐嚐溫熱的高湯。
crispy|adj.|酥脆的|ˈkrɪspɪ|The toast is crispy.|吐司很酥脆。|I like crispy potatoes.|我喜歡酥脆的馬鈴薯。
tender|adj.|軟嫩的|ˈtɛndɚ|The chicken is tender.|雞肉很軟嫩。|Cook it until tender.|把它煮到軟嫩。
seasoning|n.|調味料|ˈsiznɪŋ|Add a little seasoning.|加一點調味料。|This seasoning is mild.|這個調味料很溫和。
utensil|n.|餐具；器具|juˈtɛnsəl|Use a clean utensil.|使用乾淨的餐具。|Each utensil has a hook.|每件器具有一個掛鉤。
leftovers|n.|剩菜|ˈlɛftˌovɚz|Save the leftovers.|把剩菜留起來。|Heat the leftovers well.|把剩菜充分加熱。
split the bill|phr.|分攤帳單|splɪt ðə bɪl|Let us split the bill.|我們分攤帳單吧。|We can split the bill.|我們可以分攤帳單。
dig in|phr.|開始大快朵頤|dɪɡ ɪn|Please dig in now.|現在請開動吧。|Let us dig in together.|我們一起開動吧。
save room for|phr.|留肚子吃|sev rum fɚ|Please save room for pie.|請留肚子吃派。|I will save room for cake.|我會留肚子吃蛋糕。
checkout|n.|結帳處|ˈtʃɛkˌaʊt|Wait at the checkout.|在結帳處等候。|The checkout is busy.|結帳處很忙。
aisle|n.|走道|aɪl|Keep the aisle clear.|保持走道暢通。|Try the next aisle.|試試下一條走道。
label|n.|標籤|ˈlebəl|Read the label first.|先閱讀標籤。|The label says cotton.|標籤寫著棉製。
fabric|n.|布料|ˈfæbrɪk|This fabric feels soft.|這種布料很柔軟。|Choose a strong fabric.|選擇耐用的布料。
durable|adj.|耐用的|ˈdʊrəbəl|These boots are durable.|這雙靴子很耐穿。|We need a durable bag.|我們需要耐用的包包。
affordable|adj.|負擔得起的|əˈfɔrdəbəl|The coat is affordable.|這件外套價格實惠。|Find an affordable gift.|找一份負擔得起的禮物。
delivery|n.|配送|dɪˈlɪvərɪ|The delivery is late.|配送延遲了。|We offer free delivery.|我們提供免費配送。
in stock|phr.|有現貨|ɪn stɑk|Is this color in stock?|這個顏色有現貨嗎？|The blue bag is in stock.|藍色包包有現貨。
try on|phr.|試穿|traɪ ɑn|May I try on this coat?|我可以試穿這件外套嗎？|You can try on both.|你可以兩件都試穿。
pay off|phr.|有回報|pe ɔf|Your efforts will pay off.|你的努力會有回報。|Good planning can pay off.|妥善規劃可以帶來回報。
itinerary|n.|行程表|aɪˈtɪnəˌrɛrɪ|Check the itinerary.|查看行程表。|Our itinerary is simple.|我們的行程表很簡單。
fare|n.|車資|fɛr|The fare is reasonable.|車資很合理。|What is the bus fare?|公車車資是多少？
pedestrian|n.|行人|pəˈdɛstrɪən|A pedestrian needs help.|一位行人需要協助。|Let the pedestrian cross.|讓那位行人過馬路。
intersection|n.|十字路口|ˌɪntɚˈsɛkʃən|Stop at the intersection.|在十字路口停下。|Turn at this intersection.|在這個十字路口轉彎。
landmark|n.|地標|ˈlændˌmɑrk|The tower is a landmark.|那座塔是地標。|Meet near the landmark.|在地標附近碰面。
souvenir|n.|紀念品|ˌsuvəˈnɪr|I bought a souvenir.|我買了一件紀念品。|This souvenir is handmade.|這件紀念品是手工製的。
detour|n.|繞道|ˈdiˌtʊr|We took a short detour.|我們稍微繞了路。|The detour led uphill.|繞道路線通往山上。
check in|phr.|辦理入住|tʃɛk ɪn|We can check in at three.|我們三點可以辦理入住。|Please check in here.|請在這裡辦理入住。
set off|phr.|出發|sɛt ɔf|We set off at dawn.|我們黎明出發。|Let us set off early.|我們早點出發吧。
on foot|phr.|步行|ɑn fʊt|We went there on foot.|我們步行前往那裡。|Explore the town on foot.|步行探索小鎮。
assignment|n.|作業；任務|əˈsaɪnmənt|Finish your assignment.|完成你的作業。|This assignment is useful.|這份作業很實用。
outline|n.|大綱|ˈaʊtˌlaɪn|Write a brief outline.|寫一份簡短大綱。|The outline looks clear.|這份大綱很清楚。
evidence|n.|證據|ˈɛvədəns|We need more evidence.|我們需要更多證據。|Check the evidence again.|再次檢查證據。
source|n.|來源|sɔrs|Name your source.|註明你的來源。|Is this source reliable?|這個來源可靠嗎？
summary|n.|摘要|ˈsʌmərɪ|Write a short summary.|寫一篇簡短摘要。|Her summary was helpful.|她的摘要很有幫助。
feedback|n.|回饋|ˈfidˌbæk|Thanks for your feedback.|謝謝你的回饋。|Ask for honest feedback.|尋求誠實的回饋。
revise|v.|修訂|rɪˈvaɪz|Please revise this draft.|請修改這份草稿。|We revise our plan daily.|我們每天修訂計畫。
brainstorm|v.|腦力激盪|ˈbrenˌstɔrm|Let us brainstorm ideas.|我們來腦力激盪想點子。|We brainstorm after class.|我們下課後腦力激盪。
look up|phr.|查詢|lʊk ʌp|I will look up the word.|我會查這個字。|Please look up the date.|請查詢日期。
give it a shot|phr.|試一試|ɡɪv ɪt ə ʃɑt|I will give it a shot.|我會試一試。|Why not give it a shot?|何不試一試？
attachment|n.|附件|əˈtætʃmənt|Open the attachment.|開啟附件。|I forgot the attachment.|我忘了附上附件。
browser|n.|瀏覽器|ˈbraʊzɚ|Update your browser.|更新你的瀏覽器。|Close this browser tab.|關閉這個瀏覽器分頁。
bookmark|n.|書籤|ˈbʊkˌmɑrk|Add a bookmark here.|在這裡加入書籤。|Use the saved bookmark.|使用儲存的書籤。
backup|n.|備份|ˈbækˌʌp|Keep a backup offline.|保留一份離線備份。|This backup saved my work.|這份備份救了我的作品。
storage|n.|儲存空間|ˈstɔrɪdʒ|My phone needs storage.|我的手機需要儲存空間。|Check the free storage.|檢查剩餘儲存空間。
permission|n.|許可；權限|pɚˈmɪʃən|Ask for permission first.|先徵求許可。|This app needs permission.|這個程式需要權限。
scam|n.|詐騙|skæm|That message is a scam.|那則訊息是詐騙。|Report the scam safely.|安全地通報詐騙。
mute|v.|靜音|mjut|Please mute your phone.|請將手機靜音。|You can mute the video.|你可以將影片靜音。
sign up|phr.|報名；註冊|saɪn ʌp|Please sign up today.|請今天報名。|We can sign up together.|我們可以一起報名。
back up|phr.|備份|bæk ʌp|Please back up your files.|請備份你的檔案。|I back up my notes weekly.|我每週備份筆記。
frustrated|adj.|感到挫折的|ˈfrʌstretɪd|I felt frustrated today.|我今天感到挫折。|She looked frustrated.|她看起來很挫折。
relieved|adj.|鬆一口氣的|rɪˈlivd|I felt relieved at last.|我終於鬆了一口氣。|He sounded relieved.|他聽起來鬆了一口氣。
determined|adj.|堅定的|dɪˈtɝmɪnd|She is determined to win.|她決心要贏。|Stay determined and kind.|保持堅定與友善。
thoughtful|adj.|體貼的|ˈθɔtfəl|That was thoughtful of you.|你真體貼。|He is a thoughtful friend.|他是體貼的朋友。
sensitive|adj.|敏感的|ˈsɛnsətɪv|I am sensitive to noise.|我對噪音很敏感。|Be sensitive to feelings.|要留意他人的感受。
optimistic|adj.|樂觀的|ˌɑptəˈmɪstɪk|Try to stay optimistic.|試著保持樂觀。|She is optimistic today.|她今天很樂觀。
empathy|n.|同理心|ˈɛmpəθɪ|Show empathy to others.|對別人表現同理心。|His empathy comforted me.|他的同理心安慰了我。
courage|n.|勇氣|ˈkɝɪdʒ|It takes courage to ask.|開口詢問需要勇氣。|She found her courage.|她找回了勇氣。
take a breath|phr.|深呼吸一下|tek ə brɛθ|Pause and take a breath.|停下來深呼吸一下。|Let us take a breath.|我們深呼吸一下吧。
let it go|phr.|放下；別再介意|lɛt ɪt ɡo|Try to let it go.|試著放下它。|I decided to let it go.|我決定不再介意。
appointment|n.|預約|əˈpɔɪntmənt|I have an appointment.|我有預約。|Book an appointment today.|今天預約吧。
clinic|n.|診所|ˈklɪnɪk|The clinic opens at nine.|診所九點開門。|This clinic is nearby.|這間診所就在附近。
prescription|n.|處方箋|prɪˈskrɪpʃən|Bring your prescription.|帶上你的處方箋。|Keep the prescription safe.|妥善保存處方箋。
pharmacy|n.|藥局|ˈfɑrməsɪ|The pharmacy is open.|藥局開著。|Find the nearest pharmacy.|找最近的藥局。
hydration|n.|水分補充|haɪˈdreʃən|Hydration matters in heat.|天熱時補水很重要。|Plan regular hydration.|安排定時補水。
posture|n.|姿勢|ˈpɑstʃɚ|Check your sitting posture.|檢查你的坐姿。|Good posture takes practice.|良好姿勢需要練習。
stamina|n.|耐力|ˈstæmənə|Walking builds stamina.|走路能鍛鍊耐力。|Her stamina improved.|她的耐力進步了。
stretch|v.|伸展|strɛtʃ|Gently stretch your arms.|輕輕伸展手臂。|I stretch after walking.|我走路後會伸展。
sore|adj.|痠痛的|sɔr|My legs feel sore.|我的腿覺得痠痛。|Rest your sore muscles.|讓痠痛的肌肉休息。
take it easy|phr.|放輕鬆；別太勉強|tek ɪt ˈizɪ|Please take it easy today.|今天請別太勉強。|We can take it easy now.|我們現在可以放輕鬆。
drawer|n.|抽屜|drɔr|Look in the top drawer.|看看最上面的抽屜。|This drawer is stuck.|這個抽屜卡住了。
shelf|n.|架子|ʃɛlf|Put it on the shelf.|把它放在架子上。|We built a wooden shelf.|我們做了一個木架。
outlet|n.|插座|ˈaʊtlɛt|Use the wall outlet.|使用牆上的插座。|The outlet is behind you.|插座在你身後。
leak|n.|漏水處|lik|There is a leak upstairs.|樓上有漏水處。|We found a small leak.|我們找到一處小漏水。
stain|n.|汙漬|sten|This stain is old.|這塊汙漬很久了。|Can you remove the stain?|你能去掉汙漬嗎？
detergent|n.|清潔劑|dɪˈtɝdʒənt|Use less detergent.|少用一點清潔劑。|Store the detergent safely.|安全存放清潔劑。
appointment book|n.|預約記事本|əˈpɔɪntmənt bʊk|Check the appointment book.|查看預約記事本。|My appointment book is full.|我的預約記事本滿了。
lend a hand|phr.|幫個忙|lɛnd ə hænd|Could you lend a hand?|你可以幫個忙嗎？|I came to lend a hand.|我是來幫忙的。
drop by|phr.|順道拜訪|drɑp baɪ|Please drop by tomorrow.|明天請順道來訪。|I may drop by after lunch.|我午餐後可能順道過去。
pitch in|phr.|出一份力|pɪtʃ ɪn|Everyone can pitch in.|每個人都能出一份力。|We should all pitch in.|我們都應該出一份力。
rehearsal|n.|排練|rɪˈhɝsəl|Our rehearsal starts soon.|我們的排練快開始了。|We need another rehearsal.|我們需要再排練一次。
venue|n.|活動場地|ˈvɛnju|The venue is beautiful.|場地很漂亮。|Choose an accessible venue.|選擇方便到達的場地。
rhythm|n.|節奏|ˈrɪðəm|Listen to the rhythm.|聽聽節奏。|Clap along with the rhythm.|跟著節奏拍手。
melody|n.|旋律|ˈmɛlədɪ|I know this melody.|我知道這段旋律。|She hummed a gentle melody.|她哼著輕柔的旋律。
costume|n.|戲服|ˈkɑstjum|I made my own costume.|我自己做了戲服。|The costume needs a pocket.|這件戲服需要口袋。
spotlight|n.|聚光燈|ˈspɑtˌlaɪt|The spotlight turned on.|聚光燈亮了。|Stand under the spotlight.|站在聚光燈下。
applause|n.|掌聲|əˈplɔz|We heard loud applause.|我們聽到熱烈掌聲。|The applause made her smile.|掌聲讓她微笑。
volunteer|n.|志工|ˌvɑlənˈtɪr|A volunteer showed us in.|志工帶我們進去。|Thank the volunteer today.|今天向志工道謝。
drizzle|n.|毛毛雨|ˈdrɪzəl|A light drizzle began.|開始下起毛毛雨。|The drizzle soon stopped.|毛毛雨很快停了。
rain check|n.|改天的邀約|ren tʃɛk|Can I take a rain check?|可以改天再約嗎？|She asked for a rain check.|她提出改天再約。
internship|n.|實習|ˈɪntɝnˌʃɪp|My internship starts today.|我的實習今天開始。|This internship lasts a week.|這份實習持續一週。
resume|n.|履歷|ˈrɛzʊˌme|Update your resume.|更新你的履歷。|Her resume is clear.|她的履歷很清楚。
salary|n.|薪資|ˈsælərɪ|Ask about the salary.|詢問薪資。|The salary covers my rent.|薪資足以付我的房租。
colleague|n.|同事|ˈkɑliɡ|My colleague helped me.|我的同事幫了我。|Meet our new colleague.|認識我們的新同事。
initiative|n.|主動性|ɪˈnɪʃətɪv|She showed initiative.|她展現了主動性。|We value your initiative.|我們重視你的主動性。
resource|n.|資源|ˈrisɔrs|Time is a limited resource.|時間是有限的資源。|This guide is a resource.|這本指南是一項資源。
conservation|n.|保育；節約|ˌkɑnsɚˈveʃən|We study water conservation.|我們研究節約用水。|Conservation takes teamwork.|保育需要團隊合作。
biodiversity|n.|生物多樣性|ˌbaɪoʊdaɪˈvɝsətɪ|Protect local biodiversity.|保護在地生物多樣性。|This park has biodiversity.|這座公園有生物多樣性。
wetland|n.|濕地|ˈwɛtˌlænd|Birds live in the wetland.|鳥類住在濕地。|Visit the wetland quietly.|安靜地參觀濕地。
make a difference|phr.|帶來改變|mek ə ˈdɪfərəns|Small acts make a difference.|小小行動能帶來改變。|You can make a difference.|你能帶來改變。
`;
const topics = ['飲食點餐','購物消費','交通旅遊','學校學習','社群網路','情緒個性','健康身體','居家日常','娛樂休閒','工作未來'];
const bold = (text, word) => {
  const start = text.toLowerCase().indexOf(word.toLowerCase());
  return start < 0 ? text : `${text.slice(0,start)}<strong>${text.slice(start,start+word.length)}</strong>${text.slice(start+word.length)}`;
};
export const OCTOBER_WORDS = RAW.trim().split('\n').map((line, index) => {
  const [word,partOfSpeech,zh,kk,example,exampleZh,example2,exampleZh2] = line.split('|');
  return {word,partOfSpeech,zh,phonetic:`/${kk}/`,example:bold(example,word),exampleZh,example2:bold(example2,word),exampleZh2,
    topic: index >= 96 ? '天氣環境' : index >= 77 && index <= 79 ? '人際社交' : index === 88 ? '天氣環境' : topics[Math.floor(index/10)],
    level:partOfSpeech==='phr.'||word==='rain check'?'口語':'L3',levelNote:'編輯估級',audioId:String(index+301),batch:'2026-10',availableFrom:'2026-10-24'};
});

const NARRATIVES = [
['A Dinner Worth Sharing',
`Nina invited three friends to dinner after their school play. She planned a simple appetizer, a pot of broth, and some crispy potatoes. However, when everyone arrived, she discovered that she had forgotten to buy the chicken. She stared at the empty plate and wondered whether the whole evening was ruined.

Her friend Leo opened the refrigerator and found yesterday's vegetables. With a little seasoning and a clean utensil, they could turn the leftovers into something special. Nina cooked the carrots until they were tender, while the others set the table. Soon the kitchen smelled wonderful, and nobody mentioned the missing chicken again.

When the food was ready, Leo called, “Come on, dig in!” Nina reminded everyone to save room for the apple pie her father had made. They had planned to order delivery and split the bill, but cooking together was much more fun. Nina realized that a good dinner depended less on a perfect plan than on the people sharing it.`,
`Nina在學校演出後邀三位朋友吃晚餐。她準備了簡單的 appetizer、一鍋 broth 和 crispy 馬鈴薯。但朋友到達時，她才發現忘記買雞肉，擔心整晚都被搞砸了。

Leo打開冰箱，找到昨天的蔬菜。只要加點 seasoning，用乾淨的 utensil，就能把 leftovers 變成特別的料理。Nina把胡蘿蔔煮到 tender，其他人則擺好餐桌。很快廚房香氣四溢，沒人再提雞肉的事。

Leo喊著「dig in！」Nina提醒大家 save room for 爸爸做的蘋果派。他們原本打算叫外送並 split the bill，最後卻發現一起做飯更有趣。美好晚餐的關鍵不是完美計畫，而是一起分享的人。`],
['The Bag That Came Back',
`Evan needed a bag for a weekend trip, but he had only a small amount of money. In a crowded store, he walked down every aisle before finding a bright red bag near the checkout. Its label said that the fabric was strong and washable. It looked durable, and best of all, it was affordable.

Before paying, Evan asked whether he could try on the bag with his heavy books inside. The straps felt comfortable, but the red version had a broken button. The assistant checked the computer and discovered that the same bag was in stock in blue at another branch. Evan could collect it himself or wait for delivery the following afternoon.

He chose to wait. When the blue bag arrived, a small note explained that the shop had repaired the red one instead of throwing it away. Evan smiled because his careful search had helped him avoid a poor choice. Taking time to ask questions really could pay off, especially when something needed to last.`,
`Evan想買旅行包，但預算有限。他走過店裡每條 aisle，終於在 checkout 附近找到紅包。label 說 fabric 耐洗，看起來 durable，而且 affordable。

Evan問能否裝進重書 try on。背帶舒服，但紅包的鈕扣壞了。店員發現另一分店的藍包 in stock，可以自己領取或等隔天 delivery。

他選擇等待。藍包附的紙條說，店家已修好紅包而非丟掉。Evan慶幸自己仔細詢問，避開不適合的選擇。願意花時間了解，確實會 pay off。`],
['A Different Way to the Hotel',
`On their first family trip without a car, June proudly held the itinerary she had written herself. They would set off early, pay a small bus fare, and reach their hotel before lunch. Then a road closure changed everything. The driver announced a detour, and June watched their familiar route disappear from the screen.

At the next intersection, a pedestrian noticed their confused faces and offered to help. He pointed to a stone bridge, a famous landmark just outside the old town. From there, they could reach the hotel on foot in about twenty minutes. June worried that her parents would be tired, but they suggested turning the unexpected walk into an adventure.

They passed a little shop where June found a handmade souvenir for her grandmother. By the time they could check in, everyone had a new favorite memory. That evening, June added the bridge and the shop to her notebook. Her original plan had been useful, but the best part of the day had never appeared on it.`,
`June替無車家庭旅行寫好 itinerary：一早 set off，付便宜的 fare，午餐前抵達旅館。沒想到道路封閉，公車必須 detour，熟悉路線消失了。

在下一個 intersection，一位 pedestrian 主動幫忙，指出老城外作為 landmark 的石橋。過橋後 on foot 二十分鐘就能抵達。June怕父母累，他們卻提議把步行當成冒險。

途中June買了手工 souvenir 送祖母。可以 check in 時，每個人都已有難忘回憶。晚上她把石橋和商店補進筆記：計畫有用，但最美好的部分未必事先寫得到。`],
['The Poster Nobody Believed',
`For her science assignment, Rina wanted to explain why the school pond had become cloudy. She made an outline and copied a surprising claim from a colorful website. Her poster looked impressive, but her partner asked a difficult question: what evidence supported that claim? Rina realized she could not name a reliable source.

They decided to brainstorm instead of arguing. First, they would look up information from a university, then speak to the school gardener. He explained that recent rain had carried soil into the pond. The students compared his explanation with their notes and wrote a short summary in their own words. The answer was less dramatic than the website's story, but it made sense.

Rina was embarrassed to revise her beautiful poster. However, her teacher's feedback focused on how honestly she had corrected it. When another student feared asking a question during the presentation, Rina encouraged him to give it a shot. She had learned that a useful question could be more valuable than an impressive answer.`,
`Rina的科學 assignment 要解釋校園池水混濁。她先寫 outline，再抄網站上的驚人說法。搭檔卻問：有什麼 evidence？她答不出可靠的 source。

兩人決定 brainstorm，先 look up 大學資料，再問園丁。他解釋大雨把泥土帶入水中。學生比對資料，用自己的話寫成 summary。答案雖不戲劇化，卻合理。

Rina原本不好意思 revise 漂亮海報，但老師的 feedback 肯定她誠實修正。報告時，有同學不敢提問，她鼓勵他 give it a shot。有用的問題，可能比亮眼答案更有價值。`],
['The Missing Photo Folder',
`The school photography club was ready to sign up new members. Sam had designed an online form and saved a bookmark in his browser so everyone could find it easily. Before the meeting, he asked members to mute their phones. Then he opened an email attachment that appeared to contain the final exhibition photographs.

The message asked for permission to control his computer. Something felt wrong. Sam closed it and called the sender using a number he already knew. The email was a scam. While checking the real photo folder, he discovered another problem: his laptop had almost no storage left, and several pictures had never finished saving.

Fortunately, his partner kept a backup on a separate drive. Together they restored the missing photographs and agreed to back up their work after every club meeting. The new members arrived to find a complete exhibition. Sam explained what had happened instead of pretending the morning had gone perfectly. His mistake became the club's most useful lesson that day.`,
`攝影社準備讓新社員 sign up。Sam在 browser 存好表單 bookmark，請大家 mute 手機，接著開啟看似裝有展覽照片的 email attachment。

信件要求 permission 來控制電腦。他覺得不對，關掉信並用原有電話向寄件者查證，確認是 scam。檢查照片時又發現 storage 幾乎滿了，有些照片根本沒存完。

幸好搭檔把 backup 放在獨立硬碟。兩人還原照片，約定每次社團活動後 back up。新社員看見完整展覽，Sam也坦誠分享經過，讓錯誤變成實用的一課。`],
['A Second Chance on the Court',
`After missing the final shot in a basketball game, Alex felt frustrated and refused to speak on the bus home. His teammate Ben was usually optimistic, but this time he did not make a joke. He knew Alex was sensitive about disappointing other people. Instead, he offered a bottle of water and sat quietly beside him.

The next morning, Ben left a thoughtful note inside Alex's locker. It said that one missed shot did not erase a whole season of hard work. Alex felt relieved, yet he still needed courage to return to practice. When he finally entered the gym, the coach asked everyone to take a breath before discussing the game.

Nobody blamed him. His teammates showed empathy by sharing their own mistakes, and Alex became determined to support them in the same way. He could not change the score, but he could let it go. At the next practice, he passed the ball to a nervous new player and stayed nearby to encourage him.`,
`Alex投失關鍵球，感到 frustrated，在回程車上不說話。平常 optimistic 的Ben知道他很 sensitive，這次沒有開玩笑，只遞水並安靜陪伴。

隔天，Ben留下一張 thoughtful 的紙條：一次失誤抹不掉整季努力。Alex感到 relieved，但仍需要 courage 才敢回球場。教練先請大家 take a breath，再談比賽。

隊友分享自己的錯誤，表現 empathy，讓Alex變得 determined，也想同樣支持別人。他不能改分數，但能 let it go。下次練習，他把球傳給緊張的新隊員，並留在旁邊鼓勵他。`],
['A Walk Instead of a Race',
`Tara had an appointment at a clinic after a busy week left her feeling unusually tired. She had hoped to join her friends in a long charity race, but her legs were already sore. At the clinic, she described her routine honestly. The doctor discussed her situation and wrote a prescription, which her father took to the pharmacy.

On the way home, Tara worried that her friends would think she had given up. Her father suggested calling the organizer. To her surprise, the event also offered a short family walk. She could take it easy and still help raise money, as long as she followed the advice she had received at her appointment.

A month later, Tara joined the walk with her friends. They planned for hydration, checked their posture when carrying bags, and took breaks to stretch comfortably. Her stamina was improving gradually. She finished smiling, proud that she had chosen a sensible goal. Helping a good cause did not require finishing ahead of everyone else.`,
`Tara忙碌一週後異常疲倦，於是到 clinic赴 appointment。她本想參加長距離慈善賽跑，雙腿卻已 sore。醫師了解她的狀況後開 prescription，由爸爸拿去 pharmacy。

她擔心朋友以為她放棄。爸爸建議問主辦方，才知道也有短程家庭健走。依照就診時得到的個別建議，她可以 take it easy，同時幫忙募款。

一個月後，她與朋友參加健走，安排 hydration，背包時留意 posture，也休息 stretch。她的 stamina 漸漸進步，開心完成合理目標。支持公益不必跑贏所有人。`],
['The Saturday Repair Team',
`When Mrs. Wu moved into the neighborhood, she kept an appointment book beside her door because so many people offered to drop by. One Saturday, Leo came to lend a hand with a wooden shelf. He expected a quick job, but the first drawer he opened was stuck, and a brown stain covered the wall behind it.

Mrs. Wu explained that a small leak had damaged the cabinet. They moved the furniture away from a nearby outlet and called a repair professional. While waiting, Leo found a safe place to store the detergent and other cleaning supplies. He did not try to repair the electrical equipment himself, even though he wanted to be helpful.

Soon two other neighbors arrived and offered to pitch in. One brought lunch, while another helped sort books onto the new shelf. By afternoon, the cabinet was dry and the necessary repairs were arranged. Mrs. Wu crossed one task out of her notebook, then added a new one: invite the whole repair team back for tea.`,
`吳太太搬進社區後，把 appointment book 放門邊，因為很多人想 drop by。週六Leo來 lend a hand，幫忙做 shelf。他打開的第一個 drawer 卻卡住，後方牆上還有 stain。

原來一處 leak 損壞了櫃子。他們把家具移離 outlet，請專業人員維修。等候時，Leo找安全地方收好 detergent 等清潔用品，沒有逞強修理電器。

兩位鄰居也來 pitch in，一人帶午餐，一人整理書。下午安排好必要修繕，吳太太劃掉一項待辦，又加上新的：邀整個修繕團隊來喝茶。`],
['The Concert Under the Roof',
`The youth orchestra's final rehearsal took place beside an outdoor stage. Emma loved the rhythm of the opening song, and she quietly hummed its melody while checking her costume. A volunteer was testing the spotlight when a light drizzle began. Everyone hoped it would stop before the audience arrived that evening, but the sky grew darker.

Their director walked to a nearby community center and asked whether its hall could become their venue. The manager agreed, provided that the musicians helped move the chairs afterward. Some performers wanted to cancel and ask the audience for a rain check. Emma worried too, but then she remembered how many people had practiced for months.

They carried the instruments indoors and made a smaller stage. The concert began late, yet the close setting helped the audience hear every gentle note. When the final song ended, warm applause filled the hall. After moving the chairs back, Emma looked at the empty room and realized that the unexpected change had brought everyone closer together.`,
`青年樂團在戶外舞台進行最後 rehearsal。Emma喜歡開場曲的 rhythm，邊哼 melody 邊檢查 costume。volunteer 測試 spotlight 時，忽然下起 drizzle，天空越來越暗。

指揮借到附近活動中心作 venue，條件是演出後幫忙搬椅子。有團員想取消、向觀眾提出 rain check，但Emma想到大家數月的準備。

他們搬樂器入內，搭小舞台。音樂會雖晚開始，近距離反而讓輕柔音符更清楚。最後 applause 充滿大廳。搬回椅子後，Emma發現意外讓大家更團結。`],
['The First Week at the Wetland',
`Before her internship began, Lily updated her resume and asked about the working hours and salary. The small nature center could only offer a short paid placement, but she was excited to learn. On Monday, a colleague welcomed her with muddy boots and a map. Her first task was to help visitors understand the nearby wetland.

Lily expected to spend the week answering questions at a desk. Instead, she noticed that visitors often walked past an old sign without reading it. She showed initiative by suggesting a simple trail activity. Each group would search for evidence of biodiversity, draw what they found, and explain why conservation mattered to that place.

Her colleague helped her turn the idea into a useful resource for families. By Friday, children were pointing out insects and asking how to protect their homes. Lily watched a quiet visitor become an eager guide for his younger sister. She had arrived hoping to gain experience, but discovered that even a beginner could make a difference.`,
`internship 開始前，Lily更新 resume，也詢問工時與 salary。自然中心只有短期有薪名額，她仍很期待。週一，colleague 帶著泥靴和地圖迎接她，首項任務是介紹 wetland。

她原以為整週只在桌前回答問題，卻發現大家都略過老告示。她展現 initiative，提議步道小活動：找出 biodiversity 的證據、畫下觀察，說明 conservation 為何重要。

同事幫她把點子做成家庭適用的 resource。週五，孩子們開始觀察昆蟲、詢問如何保護棲地。一位安靜訪客甚至替妹妹當起導覽。Lily發現，初學者也能 make a difference。`]
];
export const OCTOBER_STORIES = NARRATIVES.map(([title,en,zh],index)=>({
  id:String(31+index),title,englishParagraphs:en.split('\n\n'),chineseParagraphs:zh.split('\n\n'),
  wordIds:OCTOBER_WORDS.slice(index*10,index*10+10).map(w=>w.audioId),batch:'2026-10',availableFrom:'2026-10-24'
}));
