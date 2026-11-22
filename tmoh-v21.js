/* Tmoh V21 — clean study-first UI and interactive games, additive to V20. */
(function(){
'use strict';
if(typeof VIEWS==='undefined'||typeof d==='undefined')return;
const esc21=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const G=[
 ['football','⚽','كرة القدم','سدد 10 ضربات، العب شوطين ضد الحارس','tm20'],
 ['racer','🏎️','سباق النجوم','تحرك يمين وشمال وتفادى الحواجز','new'],
 ['basket','🏀','كرة السلة','صوّب باللمس وسجل 3 سلات','new'],
 ['platform','🚀','مغامرة طموح','اقفز فوق العقبات واجمع 5 نجوم','new'],
 ['memory','🧠','تحدي الذاكرة','اقلب الكروت وطابق الأزواج','tm20'],
 ['drawing','🎨','مرسم طموح','ارسم على اللوحة واحفظ إبداعك','tm20'],
 ['music','🥁','صانع الإيقاع','اعمل إيقاع أصلي وشغّله','tm20']
];
function progress(){return d?.tm20Games&&typeof d.tm20Games==='object'?d.tm20Games:{}}
function played(){return G.filter(x=>progress()[x[0]]?.times>0).length}
const oldRewards=VIEWS.rewards;
VIEWS.rewards=function(){
 const completions=played(),x=typeof xp==='function'?xp():0;
 return `<div class="tm21-reward-page"><section class="tm21-hero tm21-arcade-hero"><div><span class="tm21-kicker">🎮 GAME ZONE • المكافآت</span><h1>عالم ألعاب طموح</h1><p>حققت خطوة في المذاكرة؟ استمتع باستراحة ممتعة! دي ألعاب بتتحكم فيها فعلًا، مش أسئلة اختيار من متعدد.</p><div class="tm21-pill-row"><span>⭐ ${x} نقطة من إنجازاتك</span><span>🏆 ${completions} من ${G.length} ألعاب جربتها</span></div></div><div class="tm21-hero-art" aria-hidden="true">🎮</div></section>
 <div class="tm21-sectionhead"><div><h2>اختار لعبتك</h2><p>كل الألعاب تشتغل باللمس على الموبايل، ومعظمها بالكيبورد على الكمبيوتر.</p></div><button type="button" class="soft" data-go="focus">⏱️ ارجع للمذاكرة</button></div>
 <div class="tm21-game-grid">${G.map(([id,icon,title,desc,mode])=>`<button type="button" class="tm21-game" data-${mode==='new'?'tm21':'tm20'}="open" data-game="${id}"><span class="tm21-game-pic">${icon}</span><span class="tm21-game-name">${title}</span><span class="tm21-game-desc">${desc}</span><span class="tm21-game-foot">${progress()[id]?.times?'✅ خلّصتها '+progress()[id].times+' مرة':'▶ ابدأ اللعب'}</span></button>`).join('')}</div>
 <section class="tm21-tip"><strong>🌱 الفكرة وراء المكافأة</strong><p>الاستراحة القصيرة بعد إنجاز حقيقي تساعدك تغيّر الجو. الألعاب مش بديل عن المذاكرة، ونتيجتك فيها ما بتأثرش على درجاتك.</p></section>
 <details class="tm21-history"><summary>🎁 افتح سجل الهدايا القديم (محفوظ)</summary><div>${(d.rewardHistory||[]).slice().reverse().map(g=>`<p>🎁 ${esc21(g.title)} — ${esc21(g.date||'')} ${g.completed?'✅':''}</p>`).join('')||'لسه ما فتحتش هدايا سابقة.'}</div></details></div>`;
};
const home=VIEWS.home;
VIEWS.home=function(...a){
 const done=Object.keys(d?.studyV1?.completed||{}).length;
 const mins=Math.round((d?.sessions||[]).reduce((sum,s)=>sum+(Number(s.ms)||0),0)/60000);
 const goal=Number(d?.daily)||120;
 const pct=Math.max(0,Math.min(100,Math.round((mins%1440)/goal*100)));
 const name=esc21(String(d?.name||'يا بطل').split(' ')[0]);
 const motivation=done===0?'أول خطوة هي الأصعب، ابدأ بدرس صغير واحتفل بإنجازك.':done<5?'شايف التقدم؟ كل درس بتخلصه بيقربك من حلمك.':'استمر بنفسك الهادي: الفهم أهم من السباق.';
 return `<div class="tm21-home"><section class="tm21-hero"><div><span class="tm21-kicker">✨ أهلاً بيك في عالم طموح</span><h1>يلا ننجز يا ${name}!</h1><p>${motivation}</p><div class="tm21-hero-actions"><button class="primary" data-go="curriculum">📚 ابدأ درس جديد</button><button class="soft" data-go="focus">⏱️ ابدأ جلسة تركيز</button></div></div><div class="tm21-hero-art" aria-hidden="true">🌟</div></section>
 <div class="tm21-metrics"><div><b>📖 ${done}</b><span>دروس أنجزتها</span></div><div><b>⏰ ${mins}</b><span>دقيقة مذاكرة مسجلة</span></div><div><b>📝 ${(d?.qbank||[]).length}</b><span>أسئلة بنكك</span></div><div><b>🎮 ${played()}</b><span>ألعاب جربتها</span></div></div>
 <section class="tm21-next"><div><h2>اختار خطوتك الجاية</h2><p>مش محتاج تعمل كل حاجة مرة واحدة. ابدأ بخطوة صغيرة.</p></div><div class="tm21-quick"><button data-go="studytools">🧰 <b>أدوات الدرس</b><small>شرح ومراجعة وتدريب</small></button><button data-go="planner">🗓️ <b>خطتي النهارده</b><small>رتّب مهامك</small></button><button data-go="rewards">🎮 <b>ألعاب المكافآت</b><small>استراحة بعد الإنجاز</small></button><button data-go="assistant">🤖 <b>الشات بوت</b><small>اسأل عن اللي مش فاهمه</small></button></div></section>
 <details class="tm21-more"><summary>📊 عرض لوحة التحكم والتفاصيل الكاملة</summary><div class="tm21-oldhome">${home.apply(this,a)}</div></details></div>`;
};
// Keep original academic features and chatbot functional; only add a clearer starting point.
const oldCurr=VIEWS.curriculum;
if(oldCurr)VIEWS.curriculum=function(...a){return `<div class="tm21-learninghead"><h2>📚 رحلتك في المذاكرة</h2><p>اختار المادة والدرس، افهم الشرح وجاوب على التدريبات. أسئلة المراجعة هنا، والألعاب في المكافآت.</p></div>`+oldCurr.apply(this,a)};

let game=null;
function stop(){if(!game)return;game.live=false;if(game.raf)cancelAnimationFrame(game.raf);if(game.timer)clearTimeout(game.timer);game.el?.remove();game=null;document.body.classList.remove('tm21-playing');}
function lose(result){if(!game)return;game.live=false;if(game.raf)cancelAnimationFrame(game.raf);game.box.innerHTML=`<div class="tm21-finish"><div>💪</div><h2>محاولة كويسة!</h2><p>${esc21(result)}</p><p>جرّب تاني، مفيش خصم نقاط.</p><div class="tm21-modal-actions"><button class="primary" data-tm21="restart">🔁 جرّب تاني</button><button class="soft" data-tm21="close">ارجع للمكافآت</button></div></div>`;}
function award(type,result){if(!game||game.done)return;game.done=true;game.live=false;if(game.raf)cancelAnimationFrame(game.raf);
 d.tm20Games=d.tm20Games||{};let q=d.tm20Games[type]||{times:0};q.times++;q.lastAt=Date.now();q.lastScore=result;d.tm20Games[type]=q;if(typeof save==='function')save();
 game.box.innerHTML=`<div class="tm21-finish"><div>🏆</div><h2>عاش! خلصت التحدي</h2><p>${esc21(result)}</p><p>✅ اتسجل إنجازك في ملفك</p><div class="tm21-modal-actions"><button class="primary" data-tm21="restart">🔁 العب تاني</button><button class="soft" data-tm21="close">ارجع للمكافآت</button></div></div>`;
}
function open(id){if(!d||!['racer','basket','platform'].includes(id))return;stop();const data=G.find(x=>x[0]===id);const el=document.createElement('div');el.className='tm21-overlay';el.innerHTML=`<div class="tm21-modal" role="dialog" aria-modal="true" aria-label="لعبة ${data[2]}"><header><div><strong>${data[1]} ${data[2]}</strong><small>${data[3]}</small></div><button type="button" data-tm21="close" aria-label="إغلاق اللعبة">✕</button></header><div class="tm21-modal-body"><div class="tm21-hud"><span id="tm21Score">جاهز؟</span><span id="tm21Help">اللمس أو الكيبورد</span></div><canvas id="tm21Canvas" width="600" height="400" tabindex="0" aria-label="ملعب اللعبة"></canvas><div class="tm21-controls" id="tm21Controls"></div></div></div>`;document.body.append(el);document.body.classList.add('tm21-playing');let canvas=el.querySelector('canvas');game={id,el,box:el.querySelector('.tm21-modal-body'),canvas,ctx:canvas.getContext('2d'),live:true,done:false,raf:0,pressed:{},last:0,started:performance.now()};
 if(id==='racer')initRacer();else if(id==='basket')initBasket();else initPlatform();canvas.focus({preventScroll:true});}
const round=(ctx,x,y,w,h,r=12)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r);};
function paintBg(ctx,top,bottom){const z=ctx.createLinearGradient(0,0,0,400);z.addColorStop(0,top);z.addColorStop(1,bottom);ctx.fillStyle=z;ctx.fillRect(0,0,600,400)}
function hud(a,b){if(!game)return;game.el.querySelector('#tm21Score').textContent=a;game.el.querySelector('#tm21Help').textContent=b}
function btns(html){game.el.querySelector('#tm21Controls').innerHTML=html;}
function loop(fn){const s=game;function frame(t){if(game!==s||!s.live||document.hidden){if(game===s&&s.live)s.raf=requestAnimationFrame(frame);return;}let dt=Math.min((t-(s.last||t))/1000,.05);s.last=t;fn(dt,t);if(s.live)s.raf=requestAnimationFrame(frame)}s.raf=requestAnimationFrame(frame)}
const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
function initRacer(){const s=game;let car={x:272,y:315,w:56,h:70},cars=[],passed=0,spawn=0,secs=0;
 btns('<button data-tm21-hold="left">⬅ يسار</button><button data-tm21-hold="right">يمين ➡</button><span>تفادى 20 عقبة علشان تفوز</span>');
 loop(dt=>{secs+=dt;spawn+=dt;const left=s.pressed.left||s.pressed.ArrowLeft,right=s.pressed.right||s.pressed.ArrowRight;car.x=Math.max(125,Math.min(418,car.x+(Number(!!right)-Number(!!left))*260*dt));if(spawn>.7){spawn=0;cars.push({x:150+Math.floor(Math.random()*4)*73,y:-80,w:46,h:64,passed:false})}
 cars.forEach(c=>c.y+=235*dt);for(const c of cars){if(hit({x:car.x+8,y:car.y+8,w:car.w-16,h:car.h-13},c)){lose(`تفاديت ${passed} عقبة. حاول توصل لـ20 عقبة في المحاولة الجاية!`);return;}if(c.y>400&&!c.passed){passed++;c.passed=true;}}cars=cars.filter(c=>c.y<470);if(passed>=20){award('racer','تفاديت 20 عقبة ووصلت لخط النهاية!');return;}
 const ctx=s.ctx;paintBg(ctx,'#b9e8ff','#ecfdff');ctx.fillStyle='#266e49';ctx.fillRect(100,0,400,400);ctx.fillStyle='#334155';ctx.fillRect(121,0,358,400);ctx.fillStyle='#f8fafc';for(let j=0;j<5;j++)for(let y=-60;y<450;y+=90)ctx.fillRect(190+j*73,y+(secs*120)%90,6,40);
 for(const c of cars){ctx.fillStyle='#f97316';round(ctx,c.x,c.y,c.w,c.h,9);ctx.fill();ctx.fillStyle='#fcd34d';ctx.fillRect(c.x+8,c.y+6,30,12);}ctx.fillStyle='#6555dc';round(ctx,car.x,car.y,car.w,car.h,14);ctx.fill();ctx.fillStyle='#bfe7ff';round(ctx,car.x+11,car.y+10,34,24,6);ctx.fill();ctx.fillStyle='white';ctx.fillRect(car.x+5,car.y+55,9,8);ctx.fillRect(car.x+42,car.y+55,9,8);hud('🏎️ عقبات تفاديتها: '+passed+'/20','تحرك بالأسهم أو الأزرار');});}
function initBasket(){let s=game,balls=0,hits=0,aim={x:300,y:355},drag=false,flight=null;btns('<span>اسحب من الكرة باتجاه السلة وارفع صباعك للتصويب، أو اضغط زر «صوّب»</span><button data-tm21="shootBasket">🏀 صوّب</button>');
 const pos=e=>{let r=s.canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*600/r.width,y:(e.clientY-r.top)*400/r.height}};
 s.canvas.addEventListener('pointerdown',e=>{drag=true;aim=pos(e);s.canvas.setPointerCapture(e.pointerId)});s.canvas.addEventListener('pointermove',e=>{if(drag)aim=pos(e)});s.canvas.addEventListener('pointerup',e=>{if(drag){drag=false;aim=pos(e);shoot()}});
 function shoot(){if(flight||hits>=3)return;balls++;const vx=(aim.x-300)*.014,vy=-9.4-(355-aim.y)*.012;flight={x:300,y:352,vx,vy,age:0,scored:false}}
 s.shoot=shoot;
 loop((dt,t)=>{let ctx=s.ctx;paintBg(ctx,'#aee8fd','#effcff');ctx.fillStyle='#e4c2a0';ctx.fillRect(0,340,600,60);ctx.fillStyle='#1d4ed8';ctx.fillRect(250,40,110,10);ctx.strokeStyle='#ef4444';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(305,130,54,7,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#f7a851';ctx.lineWidth=2;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(253+i*25,134);ctx.lineTo(260+i*22,178);ctx.stroke()}
 let x=300,y=352;if(flight){let f=flight;f.age+=dt;f.x+=f.vx*dt*60;f.y+=f.vy*dt*60;f.vy+=dt*18;x=f.x;y=f.y;if(!f.scored&&f.vy>0&&f.y>=122&&f.y<=148&&Math.abs(f.x-305)<42){f.scored=true;hits++;}if(y>430||x<0||x>600){flight=null;if(hits>=3){award('basket',`سجلت 3 سلات من ${balls} محاولات!`);return;}}}
 ctx.fillStyle='#f97316';ctx.beginPath();ctx.arc(x,y,19,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#7c2d12';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,19,0,Math.PI*2);ctx.moveTo(x-19,y);ctx.lineTo(x+19,y);ctx.moveTo(x,y-19);ctx.lineTo(x,y+19);ctx.stroke();if(drag&&!flight){ctx.strokeStyle='#2563eb';ctx.lineWidth=3;ctx.setLineDash([5,6]);ctx.beginPath();ctx.moveTo(300,352);ctx.lineTo(aim.x,aim.y);ctx.stroke();ctx.setLineDash([])}hud('🏀 سلات: '+hits+'/3','المحاولات: '+balls);});}
function initPlatform(){const s=game;let p={x:75,y:300,w:38,h:42,vy:0,ground:true},objs=[],stars=0,dist=0,spawn=0,won=false;
 btns('<button data-tm21="jump">🚀 اقفز</button><span>اضغط في أي مكان على اللعبة للقفز، أو المسافة</span>');const jump=()=>{if(p.ground){p.vy=-395;p.ground=false}};s.jump=jump;s.canvas.addEventListener('pointerdown',jump);
 loop(dt=>{dist+=dt;spawn+=dt;if(spawn>1.2){spawn=0;objs.push({x:640,y:Math.random()<.72?328:280,type:Math.random()<.72?'star':'rock',used:false})}p.vy+=1000*dt;p.y+=p.vy*dt;if(p.y>=300){p.y=300;p.vy=0;p.ground=true}
 objs.forEach(o=>o.x-=200*dt);objs=objs.filter(o=>o.x>-55);for(const o of objs){let b={x:o.x,y:o.y,w:30,h:30};if(hit(p,b)&&!o.used){o.used=true;if(o.type==='star')stars++;else {lose(`جمعت ${stars} نجوم، والمغامرة انتهت عند عقبة. جرّب تاني!`);return;}}}if(stars>=5){award('platform','جمعت 5 نجوم وخلصت مغامرة طموح!');return;}
 let c=s.ctx;paintBg(c,'#96d9ff','#eefbff');c.fillStyle='#15803d';c.fillRect(0,345,600,55);c.fillStyle='#65a30d';c.fillRect(0,338,600,12);for(let i=0;i<5;i++){c.fillStyle='#fff';c.beginPath();c.arc(i*160+30-(dist*20)%160,80+i%2*40,16,0,7);c.fill()}
 for(const o of objs){if(o.used)continue;c.font='30px system-ui';c.fillText(o.type==='star'?'⭐':'🪨',o.x,o.y+28)}c.font='38px system-ui';c.fillText('🧑‍🚀',p.x,p.y+36);hud('⭐ النجوم: '+stars+'/5','المسافة: '+Math.floor(dist*10));});}
function action(e){let b=e.target.closest('[data-tm21]');if(!b)return;let a=b.dataset.tm21;if(a==='open'){e.preventDefault();open(b.dataset.game);}else if(a==='close'){stop();if(typeof page!=='undefined'&&page==='rewards')render('rewards')}else if(a==='restart'&&game)open(game.id);else if(a==='shootBasket'&&game?.id==='basket')game.shoot();else if(a==='jump'&&game?.id==='platform')game.jump();}
document.addEventListener('click',action);
document.addEventListener('pointerdown',e=>{let b=e.target.closest('[data-tm21-hold]');if(!b||!game)return;e.preventDefault();game.pressed[b.dataset.tm21Hold]=true;b.setPointerCapture?.(e.pointerId)});
for(let evt of ['pointerup','pointercancel','lostpointercapture'])document.addEventListener(evt,e=>{let b=e.target.closest?.('[data-tm21-hold]');if(game&&b)game.pressed[b.dataset.tm21Hold]=false});
document.addEventListener('keydown',e=>{if(!game)return;if(e.key==='Escape'){stop();return;}if(['ArrowLeft','ArrowRight',' ','ArrowUp'].includes(e.key)){e.preventDefault();game.pressed[e.key]=true;if(game.id==='platform'&&(e.key===' '||e.key==='ArrowUp'))game.jump();if(game.id==='basket'&&e.key===' ')game.shoot()}});
document.addEventListener('keyup',e=>{if(game)game.pressed[e.key]=false});
window.TMOH_V21={get games(){return G.length},closeGame:stop};
})();
