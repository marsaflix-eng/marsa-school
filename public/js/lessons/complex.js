LESSONS.push({
 id:'complex', icon:'🧭',
 title:{ar:'الأعداد المركبة',fr:'Les nombres complexes'},
 summary:{ar:'نقطة في المستوى، طويلة، عمدة، ودوران ربع دورة.',fr:'Un point du plan, module, argument et quart de tour.'},
 steps:[
  {h:{ar:'عدد جديد: i',fr:'Un nouveau nombre : i'},
   p:{ar:`نعرّف ${M('i')} بأن ${M('i² = −1')}. العدد المركب ${M('z = a + bi')} هو ببساطة النقطة ${M('(a ; b)')} في المستوى.`,
      fr:`On définit ${M('i')} par ${M('i² = −1')}. Le nombre complexe ${M('z = a + bi')} est simplement le point ${M('(a ; b)')} du plan.`}},
  {h:{ar:'الطويلة والعمدة',fr:'Module et argument'},
   p:{ar:`الطويلة ${M('|z| = √(a² + b²)')} هي المسافة عن الأصل (فيثاغورس). العمدة ${M('arg z')} هي الزاوية مع محور الفواصل.`,
      fr:`Le module ${M('|z| = √(a² + b²)')} est la distance à l’origine (Pythagore). L’argument ${M('arg z')} est l’angle avec l’axe des réels.`}},
  {h:{ar:'المرافق',fr:'Le conjugué'},
   p:{ar:`${M('z̄ = a − bi')}: انعكاس النقطة بالنسبة لمحور الفواصل. و ${M('z·z̄ = a² + b² = |z|²')}.`,
      fr:`${M('z̄ = a − bi')} : symétrique par rapport à l’axe des réels. Et ${M('z·z̄ = a² + b² = |z|²')}.`}},
  {h:{ar:'الضرب في i = دوران',fr:'Multiplier par i = tourner'},
   p:{ar:`${M('i(a + bi) = −b + ai')}: كل ضرب في ${M('i')} يدير النقطة <b>ربع دورة</b> عكس عقارب الساعة. لذلك ${M('i⁴ = 1')}.`,
      fr:`${M('i(a + bi) = −b + ai')} : chaque multiplication par ${M('i')} fait tourner le point d’un <b>quart de tour</b> dans le sens direct. D’où ${M('i⁴ = 1')}.`}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider(T('الجزء الحقيقي a =','Partie réelle a ='),'a',-4,4,0.5,3)}${UI.slider(T('الجزء التخيلي b =','Partie imaginaire b ='),'b',-4,4,0.5,2)}
  <div><button class="btn sec" id="mi" type="button">× i</button> <button class="btn sec" id="cj" type="button">${T('المرافق z̄','Conjugué z̄')}</button></div></div><div class="read" id="r"></div>`;
  const g=Graph(el.querySelector('canvas'),{xmin:-5,xmax:5,ymin:-5,ymax:5},0.8);
  let showConj=false;
  const A=el.querySelector('#a'), B=el.querySelector('#b');
  const draw=()=>{
    const a=+A.value,b=+B.value, mod=Math.hypot(a,b); let arg=Math.atan2(b,a)*180/Math.PI;
    g.clear(); g.axes(1);
    g.text('Re',4.6,-0.5,'#2c4a46'); g.text('Im',0.15,4.7,'#2c4a46');
    g.line(0,0,a,b,'#0f766e',3); g.pt(a,b,'#0f766e',7); g.text('z',a+0.15,b+0.3,'#0f766e');
    g.line(a,0,a,b,'#999',1.5,[5,4]); g.line(0,b,a,b,'#999',1.5,[5,4]);
    if(showConj){ g.line(0,0,a,-b,'#dc2626',2); g.pt(a,-b,'#dc2626',6); g.text('z̄',a+0.15,-b-0.2,'#dc2626'); }
    const zs = `${a} ${b<0?'−':'+'} ${Math.abs(b)}i`;
    el.querySelector('#r').innerHTML = `${M('z = '+zs)}<br>${M('|z| = √('+a*a+' + '+b*b+') = '+mod.toFixed(3))}<br>` +
      (mod===0?T('العمدة غير معرّفة للصفر','L’argument n’est pas défini pour 0'):`${M('arg z ≈ '+arg.toFixed(1)+'°')}`) +
      `<br>${M('i·z = '+(-b)+' '+(a<0?'−':'+')+' '+Math.abs(a)+'i')}`;
  };
  const a=bind(el,'a',v=>v.toFixed(1),draw), b=bind(el,'b',v=>v.toFixed(1),draw); a.update(); b.update();
  el.querySelector('#mi').onclick=()=>{const x=+A.value,y=+B.value; A.value=-y; B.value=x; a.update(); b.update();};
  el.querySelector('#cj').onclick=()=>{showConj=!showConj; draw();};
 },
 quiz:[
  {q:{ar:`طويلة ${M('3 + 4i')} هي:`,fr:`Le module de ${M('3 + 4i')} est :`},
   o:[{ar:'7',fr:'7'},{ar:'5',fr:'5'},{ar:'25',fr:'25'},{ar:'√7',fr:'√7'}],a:1,w:{ar:`${M('√(9+16) = 5')}.`,fr:`${M('√(9+16) = 5')}.`}},
  {q:{ar:`${M('i·(2 + i)')} تساوي:`,fr:`${M('i·(2 + i)')} vaut :`},
   o:[{ar:'2 + i',fr:'2 + i'},{ar:'1 + 2i',fr:'1 + 2i'},{ar:'−1 + 2i',fr:'−1 + 2i'},{ar:'2i − 2',fr:'2i − 2'}],a:2,w:{ar:`${M('2i + i² = 2i − 1')}.`,fr:`${M('2i + i² = 2i − 1')}.`}},
  {q:{ar:`${M('i²⁰²⁶')} تساوي:`,fr:`${M('i²⁰²⁶')} vaut :`},
   o:[{ar:'1',fr:'1'},{ar:'i',fr:'i'},{ar:'−1',fr:'−1'},{ar:'−i',fr:'−i'}],a:2,w:{ar:`${M('2026 = 4×506 + 2')} إذن ${M('i²⁰²⁶ = i² = −1')}.`,fr:`${M('2026 = 4×506 + 2')} donc ${M('i²⁰²⁶ = i² = −1')}.`}}
 ]
});
