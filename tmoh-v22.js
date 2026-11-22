/* Tmoh V22 — study-first visual identity. Additive to V20/V21; no changes to cloud auth or chatbot API. */
(function(){
'use strict';
if(typeof VIEWS==='undefined'||typeof d==='undefined')return;
const E=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(page,label,cls='')=>`<button type="button" class="${cls}" data-go="${page}">${label}</button>`;
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj||{},key);
const n=(value)=>Number.isFinite(Number(value))?Number(value):0;
const fmt=x=>Math.max(0,Math.round(x)).toLocaleString('ar-EG');
const startDay=()=>{let t=new Date();t.setHours(0,0,0,0);return +t};
const todayMin=()=>Math.round((d.sessions||[]).filter(x=>n(x.end)>=startDay()).reduce((a,x)=>a+n(x.ms),0)/60000);
const allMin=()=>Math.round((d.sessions||[]).reduce((a,x)=>a+n(x.ms),0)/60000);
const doneLessons=()=>Object.keys(d.studyV1?.completed||{}).length+Object.keys(d.done||{}).filter(k=>!own(d.studyV1?.completed,k)).length;
const activeTasks=()=>Array.isArray(d.tasks)?d.tasks:[];
const tasksDone=()=>activeTasks().filter(t=>t.done).length;
const points=()=>typeof xp==='function'?Math.max(0,n(xp())):0;
const dream=()=>String(d?.dream||d?.dreamJob||'حلمك').slice(0,90);
const userName=()=>String(d?.name||'يا بطل').split(/\s+/)[0];
const motto=()=>{const m=todayMin();return m===0?'ابدأ بخطوة صغيرة… أول عشر دقائق بتفرق.':m<30?'عاش! بدأت رحلتك النهارده، كمّل بالراحة.':'كل دقيقة فهم بتقربك من هدفك. أنت بتتقدم!'};
const pct=(a,b)=>Math.min(100,Math.max(0,Math.round(a/Math.max(1,b)*100)));
const quickTask=()=>{const t=activeTasks().find(t=>!t.done);return t?String(t.title||t.name||t.text||t.task||'مهمة مذاكرة'):'اختار أول درس تذاكره النهارده';};
const card=(symbol,num,label,css='')=>`<div class="tv22-stat ${css}"><span aria-hidden="true">${symbol}</span><div><strong>${num}</strong><small>${label}</small></div></div>`;
const header=(title,subtitle,badge='✨ عالم طموح')=>`<section class="tv22-header"><div class="tv22-banner-backdrop" aria-hidden="true"></div><div class="tv22-header-copy"><span class="tv22-eyebrow">${badge}</span><h1>${title}</h1><p>${subtitle}</p></div><img src="assets/tmoh-student.png" alt="" class="tv22-student" loading="lazy"></section>`;

const originalHome=VIEWS.home;
VIEWS.home=function(){
 const today=todayMin(),goal=Math.max(1,n(d.daily)||120),tasks=activeTasks(),done=doneLessons(),score=points();
 const t=quickTask(),tPct=pct(today,goal),complete=tasksDone(),p=tasks.length?pct(complete,tasks.length):tPct;
 const recent=(d.sessions||[]).slice(-1)[0];
 const name=E(userName()),title=E(t),dreamTxt=E(dream());
 return `<div class="tv22-page tv22-home">
  <div class="tv22-topline"><span>✦ Tmoh / طموح</span><span class="tv22-date">${new Date().toLocaleDateString('ar-EG',{weekday:'long',day:'numeric',month:'long'})}</span></div>
  <section class="tv22-home-hero"><div class="tv22-landscape" aria-hidden="true"></div><img class="tv22-home-character" src="assets/tmoh-student.png" alt="" loading="eager"><div class="tv22-home-intro"><span class="tv22-eyebrow">⭐ رحلتك نحو النجاح</span><h1>صباح الإنجاز يا ${name}!</h1><p>${E(motto())}</p><div class="tv22-hero-buttons">${link('curriculum','📖 ابدأ المذاكرة','tv22-btn tv22-btn-primary')}${link('journey','🏔️ رحلة الحلم','tv22-btn tv22-btn-outline')}</div></div><div class="tv22-hero-tag">🏆 حلمك يستاهل</div></section>
  <div class="tv22-stats">${card('🏆',fmt(score),'نقطة إنجاز','gold')}${card('✅',`${fmt(complete)} / ${fmt(tasks.length)}`,'مهامك المكتملة','emerald')}${card('⏱️',fmt(today),'دقيقة مذاكرة اليوم','azure')}${card('📚',fmt(done),'درس أنجزته','purple')}</div>
  <section class="tv22-goal"><div class="tv22-goal-icon" aria-hidden="true">🎓</div><div class="tv22-goal-main"><span class="tv22-eyebrow">🎯 هدفك اليوم</span><h2>${title}</h2><p>هدف التركيز: ${fmt(goal)} دقيقة • اللي سجلته النهارده: ${fmt(today)} دقيقة</p><div class="tv22-progress"><span style="width:${tPct}%"></span></div><small>${fmt(tPct)}% من هدف التركيز اليومي</small></div>${link(tasks.length&&!tasks.every(x=>x.done)?'planner':'curriculum','ابدأ الآن ←','tv22-btn tv22-btn-primary')}</section>
  <div class="tv22-dashboard-grid">
   <section class="tv22-panel tv22-dream"><div class="tv22-panel-head"><h2>🌱 رحلة تحقيق الحلم</h2>${link('journey','عرض الرحلة','tv22-text-btn')}</div><div class="tv22-dream-body"><span class="tv22-dream-illustration">🏔️</span><div><span>حلمك</span><h3>${dreamTxt}</h3><p>طريقك بيتبني من كل درس بتفهمه.</p><div class="tv22-level">⭐ ${fmt(score)} نقطة اكتسبتها</div></div></div></section>
   <section class="tv22-panel tv22-arcade"><div class="tv22-panel-head"><h2>🎮 المكافآت والألعاب</h2>${link('rewards','عرض الألعاب','tv22-text-btn')}</div><p>خلص مهمة واستمتع باستراحة لعب قصيرة.</p><div class="tv22-game-mini">${[['⚽','كرة قدم'],['🏎️','سباق'],['🏀','سلة'],['🚀','مغامرة'],['🧠','ذاكرة'],['🎨','رسم']].map(([icon,label])=>`<button type="button" data-go="rewards"><span>${icon}</span><small>${label}</small></button>`).join('')}</div>${link('rewards','🎮 دخول عالم الألعاب','tv22-btn tv22-btn-primary tv22-block')}</section>
   <section class="tv22-panel tv22-tools"><div class="tv22-panel-head"><h2>⚡ أدوات سريعة</h2></div><div class="tv22-tools-list">${link('focus','⏱️ مؤقت التركيز')}${link('planner','📅 خطة المذاكرة')}${link('studytools','🧠 أدوات الدرس')}${link('assistant','🤖 الشات بوت')}</div></section>
  </div><div class="tv22-encourage" role="note">💜 التقدم مش بعدد الساعات بس — افهم، راجع، وخد استراحة لما تحتاجها.</div>
  <details class="tv22-old-dashboard"><summary>📊 تفاصيل وإحصائيات طموح الكاملة</summary><div>${originalHome()}</div></details>
 </div>`;
};

// V21 already supplies seven genuinely interactive games; this layer only dresses its page.
const originalRewards=VIEWS.rewards;
VIEWS.rewards=function(){
 const body=originalRewards();
 const stats=typeof window.TMOH_V21!=='undefined'?window.TMOH_V21.games:7;
 return `<div class="tv22-page tv22-rewards">${header('المكافآت والألعاب','استراحة تستحقها بعد إنجازك الدراسي. العب بنفسك باللمس أو الماوس أو لوحة المفاتيح.','🎮 GAME ZONE • عالم الألعاب')}
 <div class="tv22-reward-strip"><span>🏆 ${fmt(points())} نقطة إنجاز</span><span>🎮 ${fmt(stats)} ألعاب تفاعلية</span><span>🌱 خلي اللعب استراحة مش بديل للمذاكرة</span></div>${body}</div>`;
};

// Academic pages retain all underlying tools, subject selection, exam checking and AI integration.
const originalCurriculum=VIEWS.curriculum;
VIEWS.curriculum=function(...args){return `<div class="tv22-page tv22-study">${header('المذاكرة','اختار مادتك، افهم الدرس، واتدرب على أسئلته. رحلة حلمك بتبدأ هنا.','📖 ذاكر بذكاء')}
 <div class="tv22-study-actions">${link('focus','⏱️ مؤقت المذاكرة','tv22-btn tv22-btn-primary')}${link('studytools','🧠 أدوات الدرس','tv22-btn tv22-btn-outline')}${link('planner','📅 خطتي','tv22-btn tv22-btn-outline')}${link('assistant','🤖 اسأل الشات بوت','tv22-btn tv22-btn-outline')}</div>
 <div class="tv22-embedded">${originalCurriculum.apply(this,args)}</div></div>`};

const originalAssistant=VIEWS.assistant;
VIEWS.assistant=function(...args){return `<div class="tv22-page tv22-assistant">${header('الشات بوت','رفيق مذاكرتك في الشرح والتلخيص والتدريب، خطوة بخطوة.','🤖 مساعد طموح الدراسي')}
 <div class="tv22-assistant-side"><span>📖 اكتب اسم الدرس اللي محتاج تفهمه، واطلب شرحًا أو مثالًا.</span>${link('curriculum','📚 العودة للدروس','tv22-btn tv22-btn-outline')}</div><div class="tv22-embedded">${originalAssistant.apply(this,args)}</div></div>`};

if(VIEWS.studytools){const originalTools=VIEWS.studytools;VIEWS.studytools=function(...args){return `<div class="tv22-page tv22-study">${header('أدوات المذاكرة','لخّص، اشرح، اختبر فهمك، وراجع الأخطاء في مكان واحد.','🧰 مساعد الدراسة')}${originalTools.apply(this,args)}</div>`}}

function navNames(){const map={home:'⌂ الرئيسية',curriculum:'📖 المذاكرة',studytools:'🧠 أدوات الدرس',assistant:'🤖 الشات بوت',rewards:'🎮 المكافآت والألعاب',journey:'🏔️ رحلة الحلم',exams:'🏆 الاختبارات',planner:'📅 خطة المذاكرة',focus:'⏱️ مؤقت التركيز',analytics:'📊 إنجازاتي'};document.querySelectorAll('#nav button[data-page]').forEach(btn=>{let x=map[btn.dataset.page];if(x&&btn.textContent!==x)btn.textContent=x})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',navNames,{once:true});else navNames();
const nav=document.querySelector('#nav');if(nav){let lock=false;new MutationObserver(()=>{if(lock)return;lock=true;queueMicrotask(()=>{navNames();lock=false})}).observe(nav,{childList:true,subtree:true})}
// The mobile menu remains the site's original working navigation control.
window.TMOH_V22={version:'22',features:['visual-dashboard','study','games','chatbot'],dailyMinutes:todayMin};
})();
