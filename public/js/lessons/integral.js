LESSONS.push({
 id:'integral', icon:'🧱',
 title:{ar:'التكامل',fr:'Les intégrales'},
 summary:{ar:'المساحة تحت المنحنى بمستطيلات رفيعة.',fr:'L’aire sous une courbe avec des rectangles fins.'},
 steps:[
  {h:{ar:'ترصيف المساحة',fr:'Paver une surface'},
   p:{ar:'كيف نقيس مساحة شكل منحنٍ؟ نملؤه بمستطيلات رفيعة ونجمع مساحاتها. كلما زاد عددها كان التقدير أدق.',
      fr:'Comment mesurer une aire courbe ? On la remplit de rectangles fins et on additionne. Plus il y en a, plus c’est précis.'}},
  {h:{ar:'المجموع ثم النهاية',fr:'Somme puis limite'},
   p:{ar:`مع ${M('f(x)=x²')} على ${M('[0 ; 1]')} ومستطيلات عددها ${M('n')}: المجموع الأيمن ${M('= (n+1)(2n+1)/(6n²)')} ويؤول إلى ${M('1/3')}.`,
      fr:`Avec ${M('f(x)=x²')} sur ${M('[0 ; 1]')} et ${M('n')} rectangles : somme à droite ${M('= (n+1)(2n+1)/(6n²)')}, qui tend vers ${M('1/3')}.`}},
  {h:{ar:'الطريق المختصر: الدالة الأصلية',fr:'Le raccourci : la primitive'},
   p:{ar:`إذا كانت ${M('F′ = f')} فإن ${M('∫ₐᵇ f(x)dx = F(b) − F(a)')}. مثال: ${M('F(x) = x³/3')} فـ ${M('∫₀¹ x²dx = 1/3 − 0 = 1/3')} ✔.`,
      fr:`Si ${M('F′ = f')} alors ${M('∫ₐᵇ f(x)dx = F(b) − F(a)')}. Exemple : ${M('F(x) = x³/3')} donc ${M('∫₀¹ x²dx = 1/3 − 0 = 1/3')} ✔.`}},
  {h:{ar:'ملاحظة',fr:'Remarque'},
   p:{ar:`<div class="tip">عندما ${M('f ≥ 0')} يمثّل التكامل المساحة. إذا كانت ${M('f')} سالبة فالمساحة تُحسب بالقيمة المطلقة.</div>`,
      fr:`<div class="tip">Quand ${M('f ≥ 0')} l’intégrale est l’aire. Si ${M('f')} est négative, l’aire s’obtient avec la valeur absolue.</div>`}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider(T('عدد المستطيلات n =','Nombre de rectangles n ='),'n',1,50,1,4)}
  <label><input type="radio" name="md" value="L"> ${T('مجموع أيسر','Somme à gauche')}</label><label><input type="radio" name="md" value="R" checked> ${T('مجموع أيمن','Somme à droite')}</label></div><div class="read" id="r"></div>`;
  const g=Graph(el.querySelector('canvas'),{xmin:-0.15,xmax:1.2,ymin:-0.15,ymax:1.2},0.7);
  const draw=()=>{
    const n=+el.querySelector('#n').value, md=el.querySelector('input[name=md]:checked').value;
    g.clear(); g.axes(0.25); let s=0;
    for(let i=0;i<n;i++){ const x0=i/n,x1=(i+1)/n,h=(md==='R'?x1:x0)**2; s+=h/n; g.rect(x0,0,x1,h,'#14b8a655','#0f766e'); }
    g.fn(x=>x*x,'#dc2626',0,1.1);
    el.querySelector('#r').innerHTML = `${M('S = '+s.toFixed(5))}<br>${M('∫₀¹ x² dx = 1/3 ≈ 0.33333')}<br>${T('الفرق:','Écart :')} ${M(Math.abs(s-1/3).toFixed(5))}`;
  };
  const N=bind(el,'n',null,draw); N.update(); el.querySelectorAll('input[name=md]').forEach(r=>r.addEventListener('change',draw));
 },
 quiz:[
  {q:{ar:`${M('∫₀² x dx')} تساوي:`,fr:`${M('∫₀² x dx')} vaut :`},
   o:[{ar:'1',fr:'1'},{ar:'2',fr:'2'},{ar:'4',fr:'4'},{ar:'1/2',fr:'1/2'}],a:1,w:{ar:`${M('F(x)=x²/2')} ⇒ ${M('F(2)−F(0)=2')}.`,fr:`${M('F(x)=x²/2')} ⇒ ${M('F(2)−F(0)=2')}.`}},
  {q:{ar:`${M('∫₀¹ 3x² dx')} تساوي:`,fr:`${M('∫₀¹ 3x² dx')} vaut :`},
   o:[{ar:'1',fr:'1'},{ar:'3',fr:'3'},{ar:'1/3',fr:'1/3'},{ar:'0',fr:'0'}],a:0,w:{ar:`${M('F(x)=x³')} ⇒ ${M('1−0=1')}.`,fr:`${M('F(x)=x³')} ⇒ ${M('1−0=1')}.`}},
  {q:{ar:`دالة أصلية للدالة ${M('2x')}:`,fr:`Une primitive de ${M('2x')} :`},
   o:[{ar:'x² + 5',fr:'x² + 5'},{ar:'2',fr:'2'},{ar:'x',fr:'x'},{ar:'2x²',fr:'2x²'}],a:0,w:{ar:`مشتق ${M('x²+5')} هو ${M('2x')}.`,fr:`La dérivée de ${M('x²+5')} est ${M('2x')}.`}}
 ]
});
