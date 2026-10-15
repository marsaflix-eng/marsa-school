LESSONS.push({
 id:'explog', icon:'🔁',
 title:{ar:'الأسية واللوغاريتم',fr:'Exponentielle et logarithme'},
 summary:{ar:'دالتان تلغي إحداهما الأخرى كالقفل والمفتاح.',fr:'Deux fonctions qui s’annulent, comme un cadenas et sa clé.'},
 steps:[
  {h:{ar:'القفل والمفتاح',fr:'Cadenas et clé'},
   p:{ar:`الدالة الأسية ${M('eˣ')} تُنمّي بسرعة، واللوغاريتم ${M('ln')} يفعل العكس تماماً: ${M('ln(eˣ) = x')} و ${M('e^(ln x) = x')} (مع ${M('x > 0')}).`,
      fr:`L’exponentielle ${M('eˣ')} fait croître très vite, le logarithme ${M('ln')} fait exactement l’inverse : ${M('ln(eˣ) = x')} et ${M('e^(ln x) = x')} (avec ${M('x > 0')}).`}},
  {h:{ar:'المنحنيان متناظران',fr:'Deux courbes symétriques'},
   p:{ar:`منحنى ${M('ln')} هو نظير منحنى ${M('exp')} بالنسبة للمستقيم ${M('y = x')}. النقطة ${M('(t ; eᵗ)')} نظيرها ${M('(eᵗ ; t)')}.`,
      fr:`La courbe de ${M('ln')} est la symétrique de celle de ${M('exp')} par rapport à la droite ${M('y = x')}. Le point ${M('(t ; eᵗ)')} a pour symétrique ${M('(eᵗ ; t)')}.`}},
  {h:{ar:'قواعد الحساب',fr:'Règles de calcul'},
   p:{ar:`${M('eᵃ⁺ᵇ = eᵃ·eᵇ')} ، ${M('ln(ab) = ln a + ln b')} ، ${M('ln(a/b) = ln a − ln b')} ، ${M('e⁰=1')} ، ${M('ln e = 1')}.`,
      fr:`${M('eᵃ⁺ᵇ = eᵃ·eᵇ')} , ${M('ln(ab) = ln a + ln b')} , ${M('ln(a/b) = ln a − ln b')} , ${M('e⁰=1')} , ${M('ln e = 1')}.`}},
  {h:{ar:'تذكّر دائماً',fr:'À ne jamais oublier'},
   p:{ar:`<div class="tip">${M('eˣ > 0')} دائماً. و ${M('ln x')} معرّفة فقط من أجل ${M('x > 0')}. المشتقان: ${M('(eˣ)′ = eˣ')} و ${M('(ln x)′ = 1/x')}.</div>`,
      fr:`<div class="tip">${M('eˣ > 0')} toujours. ${M('ln x')} n’existe que pour ${M('x > 0')}. Dérivées : ${M('(eˣ)′ = eˣ')} et ${M('(ln x)′ = 1/x')}.</div>`}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider('t =','t',-2,2,0.1,1)}</div><div class="read" id="r"></div>`;
  const g=Graph(el.querySelector('canvas'),{xmin:-3,xmax:8,ymin:-3,ymax:8},0.8);
  const draw=()=>{
    const t=+el.querySelector('#t').value, e=Math.exp(t);
    g.clear(); g.axes(1);
    g.line(-3,-3,8,8,'#999',1.5,[6,5]);
    g.fn(Math.exp,'#0f766e',-3,8); g.fn(Math.log,'#dc2626',0.0001,8);
    g.text('eˣ',1.9,7.2,'#0f766e'); g.text('ln x',6.6,2.6,'#dc2626'); g.text('y = x',6.4,6,'#666');
    g.line(t,e,e,t,'#f59e0b',1.5,[4,4]);
    g.pt(t,e,'#0f766e',7); g.pt(e,t,'#dc2626',7);
    el.querySelector('#r').innerHTML = `${M('P = (t ; eᵗ) = ('+t.toFixed(1)+' ; '+e.toFixed(2)+')')}<br>${M('Q = (eᵗ ; t) = ('+e.toFixed(2)+' ; '+t.toFixed(1)+')')}<br>${M('ln('+e.toFixed(2)+') ≈ '+t.toFixed(1))}`;
  };
  bind(el,'t',v=>v.toFixed(1),draw).update();
 },
 quiz:[
  {q:{ar:`${M('ln(e³)')} تساوي:`,fr:`${M('ln(e³)')} vaut :`},
   o:[{ar:'e',fr:'e'},{ar:'3',fr:'3'},{ar:'1/3',fr:'1/3'},{ar:'3e',fr:'3e'}],a:1,w:{ar:`${M('ln(eˣ) = x')}.`,fr:`${M('ln(eˣ) = x')}.`}},
  {q:{ar:`مجموعة تعريف ${M('ln(x − 2)')}:`,fr:`Ensemble de définition de ${M('ln(x − 2)')} :`},
   o:[{ar:'x > 0',fr:'x > 0'},{ar:'x > 2',fr:'x > 2'},{ar:'x < 2',fr:'x < 2'},{ar:'ℝ',fr:'ℝ'}],a:1,w:{ar:`نشترط ${M('x − 2 > 0')}.`,fr:`Il faut ${M('x − 2 > 0')}.`}},
  {q:{ar:`${M('ln 6 − ln 2')} تساوي:`,fr:`${M('ln 6 − ln 2')} vaut :`},
   o:[{ar:'ln 4',fr:'ln 4'},{ar:'ln 12',fr:'ln 12'},{ar:'ln 3',fr:'ln 3'},{ar:'3',fr:'3'}],a:2,w:{ar:`${M('ln a − ln b = ln(a/b) = ln 3')}.`,fr:`${M('ln a − ln b = ln(a/b) = ln 3')}.`}}
 ]
});
