LESSONS.push({
 id:'sequences', icon:'🪜',
 title:{ar:'المتتاليات',fr:'Les suites'},
 summary:{ar:'سلّم من الأعداد: حسابية، هندسية، وهل تقترب من حدّ؟',fr:'Un escalier de nombres : arithmétiques, géométriques, convergent-elles ?'},
 steps:[
  {h:{ar:'سلّم الأعداد',fr:'L’escalier de nombres'},
   p:{ar:`المتتالية ${M('(uₙ)')} قائمة أعداد مرقّمة: ${M('u₀, u₁, u₂, …')}. إما أن نضيف عدداً ثابتاً كل مرة (<b>حسابية</b>) أو نضرب في عدد ثابت (<b>هندسية</b>).`,
      fr:`Une suite ${M('(uₙ)')} est une liste de nombres numérotés : ${M('u₀, u₁, u₂, …')}. On ajoute toujours le même nombre (<b>arithmétique</b>) ou on multiplie toujours par le même nombre (<b>géométrique</b>).`}},
  {h:{ar:'الصيغ',fr:'Les formules'},
   p:{ar:`حسابية أساسها ${M('r')}: ${M('uₙ = u₀ + n·r')}. هندسية أساسها ${M('q')}: ${M('vₙ = v₀·qⁿ')}.`,
      fr:`Arithmétique de raison ${M('r')} : ${M('uₙ = u₀ + n·r')}. Géométrique de raison ${M('q')} : ${M('vₙ = v₀·qⁿ')}.`}},
  {h:{ar:'حيلة الباك الشهيرة',fr:'L’astuce classique du Bac'},
   p:{ar:`لتكن ${M('uₙ₊₁ = q·uₙ + 4(1−q)')}. نضع ${M('vₙ = uₙ − 4')} فنجد ${M('vₙ₊₁ = q·vₙ')}: هندسية! إذن ${M('uₙ = 4 + qⁿ(u₀ − 4)')}.`,
      fr:`Soit ${M('uₙ₊₁ = q·uₙ + 4(1−q)')}. On pose ${M('vₙ = uₙ − 4')} et on trouve ${M('vₙ₊₁ = q·vₙ')} : géométrique ! Donc ${M('uₙ = 4 + qⁿ(u₀ − 4)')}.`}},
  {h:{ar:'متى تقترب؟',fr:'Quand converge-t-elle ?'},
   p:{ar:`${M('qⁿ → 0')} إذا وفقط إذا ${M('−1 < q < 1')}. عندها ${M('uₙ → 4')}. جرّب المؤشرات وراقب!`,
      fr:`${M('qⁿ → 0')} si et seulement si ${M('−1 < q < 1')}. Alors ${M('uₙ → 4')}. Essaie les curseurs !`}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider(T('الأساس q =','Raison q ='),'q',-1.2,1.2,0.1,0.5)}${UI.slider(T('الحد الأول u₀ =','Premier terme u₀ ='),'u',-5,12,1,10)}</div><div class="read" id="r"></div>`;
  const cv = el.querySelector('canvas');
  const draw = () => {
    const q=+el.querySelector('#q').value, u0=+el.querySelector('#u').value, N=20, us=[u0];
    for(let n=0;n<N;n++) us.push(q*us[n]+4*(1-q));
    let lo=Math.min(4,...us), hi=Math.max(4,...us); const pad=(hi-lo)*0.1+0.5;
    const g=Graph(cv,{xmin:-1,xmax:N+1,ymin:lo-pad,ymax:hi+pad});
    g.clear(); g.axes(Math.max(1,Math.round((hi-lo)/6)));
    g.line(-1,4,N+1,4,'#f59e0b',2,[7,5]); g.text('y = 4',N-1.5,4+pad*0.5,'#b45309');
    us.forEach((u,n)=>{ if(n) g.line(n-1,us[n-1],n,u,'#99d5cd',1.5); });
    us.forEach((u,n)=>g.pt(n,u,'#0f766e',4));
    const lim = Math.abs(q)<1;
    el.querySelector('#r').innerHTML = `${M('u₂₀ = '+us[N].toFixed(3))}<br>` + (lim ? T(`|q| < 1 ⇒ المتتالية <b>تتقارب</b> نحو ${M('4')}`,`|q| < 1 ⇒ la suite <b>converge</b> vers ${M('4')}`)
      : q===1||u0===4 ? T('المتتالية ثابتة','La suite est constante') : T(`|q| ≥ 1 ⇒ المتتالية <b>لا تتقارب</b> نحو 4`,`|q| ≥ 1 ⇒ la suite <b>ne converge pas</b> vers 4`));
  };
  const Q=bind(el,'q',v=>v.toFixed(1),draw), U=bind(el,'u',null,draw); Q.update(); U.update();
 },
 quiz:[
  {q:{ar:`متتالية هندسية ${M('v₀=3')} وأساسها ${M('q=2')}. ما هو ${M('v₃')}؟`,fr:`Suite géométrique ${M('v₀=3')}, raison ${M('q=2')}. Que vaut ${M('v₃')} ?`},
   o:[{ar:'9',fr:'9'},{ar:'18',fr:'18'},{ar:'24',fr:'24'},{ar:'48',fr:'48'}],a:2,w:{ar:`${M('3×2³ = 24')}.`,fr:`${M('3×2³ = 24')}.`}},
  {q:{ar:`متتالية حسابية ${M('u₀=5')} وأساسها ${M('r=3')}. ما هو ${M('u₁₀')}؟`,fr:`Suite arithmétique ${M('u₀=5')}, raison ${M('r=3')}. Que vaut ${M('u₁₀')} ?`},
   o:[{ar:'35',fr:'35'},{ar:'38',fr:'38'},{ar:'30',fr:'30'},{ar:'15',fr:'15'}],a:0,w:{ar:`${M('5 + 10×3 = 35')}.`,fr:`${M('5 + 10×3 = 35')}.`}},
  {q:{ar:`${M('lim (1/2)ⁿ')} عندما ${M('n → +∞')} تساوي:`,fr:`${M('lim (1/2)ⁿ')} quand ${M('n → +∞')} vaut :`},
   o:[{ar:'+∞',fr:'+∞'},{ar:'1',fr:'1'},{ar:'1/2',fr:'1/2'},{ar:'0',fr:'0'}],a:3,w:{ar:`لأن ${M('−1 < 1/2 < 1')}.`,fr:`Car ${M('−1 < 1/2 < 1')}.`}}
 ]
});
