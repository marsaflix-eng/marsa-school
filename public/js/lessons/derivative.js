LESSONS.push({
 id:'derivative', icon:'📈',
 title:{ar:'الاشتقاق',fr:'La dérivation'},
 summary:{ar:'السرعة اللحظية والمماس: ميل المنحنى في نقطة.',fr:'Vitesse instantanée et tangente : la pente d’une courbe en un point.'},
 steps:[
  {h:{ar:'عدّاد السرعة',fr:'Le compteur de vitesse'},
   p:{ar:'السرعة المتوسطة بين لحظتين تختلف عن السرعة التي يعرضها العدّاد <b>الآن</b>. المشتق هو «سرعة العدّاد» للدالة.',
      fr:'La vitesse moyenne entre deux instants n’est pas celle que le compteur affiche <b>maintenant</b>. La dérivée est le « compteur de vitesse » de la fonction.'}},
  {h:{ar:'القاطع ثم المماس',fr:'Sécante puis tangente'},
   p:{ar:`ميل المستقيم القاطع بين ${M('a')} و ${M('a+h')} هو ${M('(f(a+h) − f(a))/h')}. نُصغّر ${M('h')} فيقترب القاطع من <b>المماس</b>.`,
      fr:`La pente de la sécante entre ${M('a')} et ${M('a+h')} est ${M('(f(a+h) − f(a))/h')}. On rapetisse ${M('h')} et la sécante tend vers la <b>tangente</b>.`}},
  {h:{ar:'مثال: f(x)=x²',fr:'Exemple : f(x)=x²'},
   p:{ar:`${M('(a+h)² − a² = 2ah + h²')} فالميل ${M('= 2a + h')}. عندما ${M('h → 0')} نجد ${M('f′(a) = 2a')}.`,
      fr:`${M('(a+h)² − a² = 2ah + h²')} donc la pente ${M('= 2a + h')}. Quand ${M('h → 0')} : ${M('f′(a) = 2a')}.`}},
  {h:{ar:'قواعد مهمة',fr:'Règles à retenir'},
   p:{ar:`${M('(xⁿ)′ = n·xⁿ⁻¹')} — معادلة المماس: ${M('y = f(a) + f′(a)(x − a)')}. <div class="tip">إذا كان ${M('f′ > 0')} فالدالة متزايدة، وإذا كان ${M('f′ < 0')} فهي متناقصة.</div>`,
      fr:`${M('(xⁿ)′ = n·xⁿ⁻¹')} — équation de la tangente : ${M('y = f(a) + f′(a)(x − a)')}. <div class="tip">Si ${M('f′ > 0')} la fonction croît, si ${M('f′ < 0')} elle décroît.</div>`}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider(T('النقطة a =','Le point a ='),'a',-2,2,0.1,1)}${UI.slider(T('h (صغّره!) =','h (rapetisse-le !) ='),'h',0.01,2,0.01,1.5)}</div><div class="read" id="r"></div>`;
  const g = Graph(el.querySelector('canvas'),{xmin:-3,xmax:3.5,ymin:-2,ymax:9});
  const f = x=>x*x;
  const draw = () => {
    const a=+el.querySelector('#a').value, h=+el.querySelector('#h').value, m=(f(a+h)-f(a))/h;
    g.clear(); g.axes(1); g.fn(f,'#0f766e');
    const L = (s,x)=>f(a)+s*(x-a);
    g.line(-3,L(2*a,-3),3.5,L(2*a,3.5),'#16a34a',2,[7,5]);
    g.line(-3,L(m,-3),3.5,L(m,3.5),'#dc2626',2.5);
    g.pt(a,f(a),'#f59e0b',7); g.pt(a+h,f(a+h),'#dc2626',6);
    el.querySelector('#r').innerHTML = T(`ميل القاطع (أحمر) = ${M(m.toFixed(3))} = ${M('2a + h')}<br>ميل المماس (أخضر) = ${M("f′(a) = "+(2*a).toFixed(2))}`,
      `Pente de la sécante (rouge) = ${M(m.toFixed(3))} = ${M('2a + h')}<br>Pente de la tangente (vert) = ${M("f′(a) = "+(2*a).toFixed(2))}`);
  };
  const A=bind(el,'a',v=>v.toFixed(1),draw), H=bind(el,'h',v=>v.toFixed(2),draw); A.update(); H.update();
 },
 quiz:[
  {q:{ar:`مشتق ${M('x³')} هو:`,fr:`La dérivée de ${M('x³')} est :`},
   o:[{ar:'x²',fr:'x²'},{ar:'3x²',fr:'3x²'},{ar:'3x',fr:'3x'},{ar:'x⁴/4',fr:'x⁴/4'}],a:1,
   w:{ar:`${M('(xⁿ)′ = n xⁿ⁻¹')} مع ${M('n=3')}.`,fr:`${M('(xⁿ)′ = n xⁿ⁻¹')} avec ${M('n=3')}.`}},
  {q:{ar:`ميل مماس ${M('f(x)=x²')} عند ${M('x=3')} هو:`,fr:`La pente de la tangente à ${M('f(x)=x²')} en ${M('x=3')} est :`},
   o:[{ar:'3',fr:'3'},{ar:'6',fr:'6'},{ar:'9',fr:'9'},{ar:'2',fr:'2'}],a:1,
   w:{ar:`${M('f′(3) = 2×3 = 6')}.`,fr:`${M('f′(3) = 2×3 = 6')}.`}},
  {q:{ar:`معادلة مماس ${M('f(x)=x²')} عند ${M('x=1')}:`,fr:`Équation de la tangente à ${M('f(x)=x²')} en ${M('x=1')} :`},
   o:[{ar:'y = 2x + 1',fr:'y = 2x + 1'},{ar:'y = 2x − 1',fr:'y = 2x − 1'},{ar:'y = x − 1',fr:'y = x − 1'},{ar:'y = x²',fr:'y = x²'}],a:1,
   w:{ar:`${M('f(1)=1')} و ${M('f′(1)=2')} إذن ${M('y = 1 + 2(x−1) = 2x − 1')}.`,fr:`${M('f(1)=1')} et ${M('f′(1)=2')} donc ${M('y = 1 + 2(x−1) = 2x − 1')}.`}}
 ]
});
