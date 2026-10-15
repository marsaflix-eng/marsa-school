LESSONS.push({
 id:'limits', icon:'🚪',
 title:{ar:'النهايات',fr:'Les limites'},
 summary:{ar:'ماذا تفعل الدالة عندما نقترب من نقطة دون أن نلمسها؟',fr:'Que fait une fonction quand on s’approche d’un point sans l’atteindre ?'},
 steps:[
  {h:{ar:'فكرة بسيطة',fr:'L’idée simple'},
   p:{ar:'تخيّل أنك تمشي نحو باب مغلق وتقترب منه أكثر فأكثر. <b>النهاية</b> هي «المكان الذي تتجه إليه» حتى لو لم تدخل فعلاً.',
      fr:'Imagine que tu marches vers une porte fermée en t’en rapprochant de plus en plus. La <b>limite</b>, c’est « l’endroit vers lequel tu te diriges », même si tu n’y entres pas.'}},
  {h:{ar:'مشكلة: القسمة على صفر',fr:'Le problème : diviser par zéro'},
   p:{ar:`لتكن ${M('f(x) = (x² − 1)/(x − 1)')}. عند ${M('x = 1')} نحصل على ${M('0/0')}: غير ممكن! لكن لا بأس: نقترب فقط.`,
      fr:`Soit ${M('f(x) = (x² − 1)/(x − 1)')}. En ${M('x = 1')} on obtient ${M('0/0')} : impossible ! Mais pas grave : on s’en rapproche seulement.`}},
  {h:{ar:'السر: التبسيط',fr:'Le secret : simplifier'},
   p:{ar:`من أجل ${M('x ≠ 1')}: ${M('(x−1)(x+1)/(x−1) = x + 1')}. إذن كلما اقترب ${M('x')} من 1 اقترب ${M('f(x)')} من 2، أي ${M('lim f(x) = 2')}.`,
      fr:`Pour ${M('x ≠ 1')} : ${M('(x−1)(x+1)/(x−1) = x + 1')}. Donc quand ${M('x')} approche 1, ${M('f(x)')} approche 2 : ${M('lim f(x) = 2')}.`}},
  {h:{ar:'عند اللانهاية',fr:'À l’infini'},
   p:{ar:`${M('1/x')} عندما ${M('x → +∞')}: المقام ضخم والنتيجة صغيرة جداً، إذن ${M('lim 1/x = 0')}. <div class="tip">قاعدة: إذا ظهر ${M('0/0')} فكّك (حلّل) البسط والمقام ثم بسّط.</div>`,
      fr:`${M('1/x')} quand ${M('x → +∞')} : dénominateur énorme, résultat minuscule, donc ${M('lim 1/x = 0')}. <div class="tip">Règle : si tu tombes sur ${M('0/0')}, factorise numérateur et dénominateur puis simplifie.</div>`}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider(T('اقترب من 1 بالمؤشر: x =','Approche 1 avec le curseur : x ='),'x',0,2,0.01,0.3)}</div><div class="read" id="r"></div>`;
  const g = Graph(el.querySelector('canvas'),{xmin:-0.5,xmax:2.5,ymin:-0.5,ymax:3.5});
  const f = x => (x*x-1)/(x-1);
  const draw = () => {
    const x = +el.querySelector('#x').value, hole = Math.abs(x-1)<1e-9;
    g.clear(); g.axes(0.5);
    g.fn(t=>t+1,'#0f766e',-0.5,2.5);
    g.pt(1,2,'#0f766e',7,true);
    g.line(1,-0.5,1,3.5,'#999',1.5,[6,5]); g.line(-0.5,2,2.5,2,'#f59e0b',1.5,[6,5]);
    if(!hole){ g.pt(x,f(x),'#dc2626',7); }
    el.querySelector('#r').innerHTML = hole
      ? T(`عند ${M('x = 1')} الدالة <b>غير معرّفة</b> (دائرة فارغة) لكن النهاية موجودة: ${M('2')}`,`En ${M('x = 1')} la fonction n’est <b>pas définie</b> (cercle vide) mais la limite existe : ${M('2')}`)
      : `${M('x = '+x.toFixed(2))} → ${M('f(x) = '+f(x).toFixed(4))}<br>` + T(`المسافة إلى 1: ${M(Math.abs(x-1).toFixed(2))} — والفرق عن 2: ${M(Math.abs(f(x)-2).toFixed(2))}`,`Distance à 1 : ${M(Math.abs(x-1).toFixed(2))} — écart avec 2 : ${M(Math.abs(f(x)-2).toFixed(2))}`);
  };
  bind(el,'x',v=>v.toFixed(2),draw).update();
 },
 quiz:[
  {q:{ar:`ما قيمة ${M('lim x→2 (x² − 4)/(x − 2)')} ؟`,fr:`Que vaut ${M('lim x→2 (x² − 4)/(x − 2)')} ?`},
   o:[{ar:'0',fr:'0'},{ar:'4',fr:'4'},{ar:'1',fr:'1'},{ar:'غير موجودة',fr:'N’existe pas'}],a:1,
   w:{ar:`${M('(x−2)(x+2)/(x−2) = x+2')} وعند ${M('x=2')} يعطي 4.`,fr:`${M('(x−2)(x+2)/(x−2) = x+2')}, et en ${M('x=2')} cela donne 4.`}},
  {q:{ar:`${M('lim x→+∞ 1/x')} تساوي:`,fr:`${M('lim x→+∞ 1/x')} vaut :`},
   o:[{ar:'+∞',fr:'+∞'},{ar:'1',fr:'1'},{ar:'0',fr:'0'},{ar:'−∞',fr:'−∞'}],a:2,
   w:{ar:'المقام يكبر جداً فيصغر الكسر نحو 0.',fr:'Le dénominateur devient énorme, la fraction tend vers 0.'}},
  {q:{ar:`${M('lim x→+∞ (2x + 1)/x')} تساوي:`,fr:`${M('lim x→+∞ (2x + 1)/x')} vaut :`},
   o:[{ar:'0',fr:'0'},{ar:'1',fr:'1'},{ar:'2',fr:'2'},{ar:'+∞',fr:'+∞'}],a:2,
   w:{ar:`${M('(2x+1)/x = 2 + 1/x')} و ${M('1/x → 0')} إذن النهاية 2.`,fr:`${M('(2x+1)/x = 2 + 1/x')} et ${M('1/x → 0')}, donc la limite est 2.`}}
 ]
});
