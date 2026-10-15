(function(){
const UIT = {
  skip:{ar:'تخطّ إلى المحتوى',fr:'Aller au contenu'},
  heroT:{ar:'الرياضيات للباكالوريا العلمية… بسيطة وممتعة 🎯',fr:'Les maths du Bac scientifique… simples et amusantes 🎯'},
  heroP:{ar:'دروس تفاعلية خطوة بخطوة: حرّك المؤشرات، شاهد الفكرة، ثم اختبر نفسك فوراً. لا يوجد طالب «ضعيف» — هناك فقط خطوة لم تُشرح جيداً بعد.',fr:'Leçons interactives pas à pas : bouge les curseurs, vois l’idée, puis teste-toi aussitôt. Il n’y a pas d’élève « nul » — seulement une étape pas encore bien expliquée.'},
  lessons:{ar:'الدروس',fr:'Leçons'},soon:{ar:'قريباً',fr:'Bientôt'},done:{ar:'✓ أُنجز',fr:'✓ Terminé'},
  start:{ar:'ابدأ',fr:'Commencer'},steps:{ar:'افهم الفكرة خطوة بخطوة',fr:'Comprends l’idée pas à pas'},
  play:{ar:'🎮 جرّب بنفسك',fr:'🎮 Essaie toi-même'},quiz:{ar:'✅ اختبر نفسك',fr:'✅ Teste-toi'},
  good:{ar:'أحسنت! ',fr:'Bravo ! '},bad:{ar:'ليس تماماً. ',fr:'Pas tout à fait. '},
  score:{ar:'نتيجتك',fr:'Ton score'},home:{ar:'← كل الدروس',fr:'← Toutes les leçons'},next:{ar:'الدرس التالي →',fr:'Leçon suivante →'},
  again:{ar:'أعد المحاولة',fr:'Recommencer'},
  disc:{ar:'موقع تعليمي مستقل لا يمثّل أي جهة رسمية، وليس محتوى وزارة التهذيب الوطني. المحتوى للمراجعة والفهم؛ راجع كتبك المدرسية دائماً.',fr:'Site éducatif indépendant, non officiel : il ne s’agit pas du contenu du ministère. Ce contenu sert à comprendre et réviser ; réfère-toi toujours à tes manuels.'},
  roadmap:{ar:'قريباً: الاستمرارية، المتجهات والهندسة، التكامل بالأجزاء، المعادلات التفاضلية…',fr:'Bientôt : continuité, vecteurs et géométrie, intégration par parties, équations différentielles…'},
  cat:{ar:'مسار: الباكالوريا العلمية (C / D / رياضيات)',fr:'Parcours : Bac scientifique (C / D / Maths)'},
  nf:{ar:'الصفحة غير موجودة',fr:'Page introuvable'}
};
let lang = localStorage.getItem('ms_lang') || 'ar';
let prog = JSON.parse(localStorage.getItem('ms_prog') || '{"xp":0,"done":{}}');
const save = () => localStorage.setItem('ms_prog', JSON.stringify(prog));
const T = (ar,fr) => lang==='ar' ? ar : fr;
const U = k => UIT[k][lang];
const app = document.getElementById('app');

function setLang(l){
  lang=l; localStorage.setItem('ms_lang',l);
  document.documentElement.lang=l; document.documentElement.dir = l==='ar'?'rtl':'ltr';
  document.getElementById('lang').textContent = l==='ar'?'FR':'العربية';
  document.getElementById('disclaimer').textContent = U('disc');
  document.querySelector('[data-i18n=skip]').textContent = U('skip');
  render();
}
function xp(){ document.getElementById('xp').textContent = '⭐ '+prog.xp; }

function home(){
  const total = LESSONS.length, d = Object.keys(prog.done).length;
  app.innerHTML = `<section class="hero"><h1>${U('heroT')}</h1><p>${U('heroP')}</p></section>
  <p><span class="badge">${U('cat')}</span></p>
  <div class="bar" role="progressbar" aria-valuenow="${d}" aria-valuemax="${total}"><i style="width:${d/total*100}%"></i></div>
  <h2 class="sec">${U('lessons')} (${d}/${total})</h2>
  <div class="grid">${LESSONS.map(L=>`<a class="card lesson" href="#/lesson/${L.id}"><div class="ic">${L.icon}</div><h3>${L.title[lang]}</h3><p>${L.summary[lang]}</p>
    <p>${prog.done[L.id]?`<span class="badge done">${U('done')} ${'★'.repeat(prog.done[L.id])}</span>`:`<span class="badge">${U('start')}</span>`}</p></a>`).join('')}</div>
  <p class="tip">${U('roadmap')}</p>`;
}

function lesson(id){
  const i = LESSONS.findIndex(l=>l.id===id); if(i<0) return notFound();
  const L = LESSONS[i];
  app.innerHTML = `<p><a href="#/">${U('home')}</a></p><h1>${L.icon} ${L.title[lang]}</h1><p>${L.summary[lang]}</p>
  <h2 class="sec">${U('steps')}</h2><div class="steps">${L.steps.map(s=>`<div class="card step"><h3>${s.h[lang]}</h3><p>${s.p[lang]}</p></div>`).join('')}</div>
  <h2 class="sec">${U('play')}</h2><div class="card" id="w"></div>
  <h2 class="sec">${U('quiz')}</h2><div id="quiz"></div>
  <div class="nav"><a class="btn sec" href="#/">${U('home')}</a>${LESSONS[i+1]?`<a class="btn" href="#/lesson/${LESSONS[i+1].id}">${U('next')}</a>`:''}</div>`;
  L.widget(document.getElementById('w'), T);
  quiz(L);
}

function quiz(L){
  const box = document.getElementById('quiz'); let right=0, answered=0;
  box.innerHTML = L.quiz.map((q,qi)=>`<div class="q" data-i="${qi}"><p class="qt">${qi+1}. ${q.q[lang]}</p><div class="opts">${q.o.map((o,oi)=>`<button class="opt" type="button" data-o="${oi}">${o[lang]}</button>`).join('')}</div><div class="fb" aria-live="polite"></div></div>`).join('')+`<div class="result card" id="res" hidden></div>`;
  box.querySelectorAll('.q').forEach(div=>{
    const q = L.quiz[+div.dataset.i]; let tries=0, finished=false;
    div.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{
      if(finished) return; tries++;
      const ok = +b.dataset.o===q.a, fb = div.querySelector('.fb');
      if(ok){
        finished=true; b.classList.add('ok'); div.querySelectorAll('.opt').forEach(x=>x.disabled=true);
        fb.className='fb ok'; fb.innerHTML = U('good')+q.w[lang];
        answered++; if(tries===1){right++; prog.xp+=10;} else prog.xp+=3; save(); xp();
        if(answered===L.quiz.length) finish(L,right);
      } else {
        b.classList.add('bad'); b.disabled=true; fb.className='fb bad'; fb.innerHTML = U('bad')+T('حاول مرة أخرى 💪','Réessaie 💪');
      }
    }));
  });
}
function finish(L,right){
  const stars = right===3?3:right===2?2:1, prev = prog.done[L.id]||0;
  if(stars>prev){ prog.xp += (prev?0:20); prog.done[L.id]=stars; save(); xp(); }
  const r=document.getElementById('res'); r.hidden=false;
  r.innerHTML = `🏆 ${U('score')}: ${right}/${L.quiz.length} — ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}<br><button class="btn" type="button" id="again">${U('again')}</button>`;
  document.getElementById('again').onclick=()=>lesson(L.id);
}
function notFound(){ app.innerHTML = `<h1>${U('nf')}</h1><p><a href="#/">${U('home')}</a></p>`; }

function render(){
  xp(); const h = location.hash.replace(/^#\/?/,'');
  if(!h) home(); else if(h.startsWith('lesson/')) lesson(h.slice(7)); else notFound();
}
let rt, lastW=innerWidth; window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{ if(innerWidth!==lastW && location.hash.startsWith('#/lesson/')){ lastW=innerWidth; const y=scrollY; render(); scrollTo(0,y);} },250)});
window.addEventListener('hashchange',()=>{render();scrollTo(0,0);app.focus();});
document.getElementById('lang').addEventListener('click',()=>setLang(lang==='ar'?'fr':'ar'));
setLang(lang);
})();
