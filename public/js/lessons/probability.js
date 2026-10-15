LESSONS.push({
 id:'probability', icon:'🎲',
 title:{ar:'الاحتمالات: القانون ثنائي الحد',fr:'Probabilités : loi binomiale'},
 summary:{ar:'نكرّر تجربة نجاح/فشل n مرة ونعدّ النجاحات.',fr:'On répète n fois une épreuve réussite/échec et on compte les succès.'},
 steps:[
  {h:{ar:'قطعة نقود غير متوازنة',fr:'Une pièce truquée'},
   p:{ar:`نرمي قطعة نقود ${M('n')} مرة، واحتمال «وجه» في كل رمية ${M('p')}. ${M('X')} = عدد الوجوه. هذا هو القانون <b>ثنائي الحد</b> ${M('B(n, p)')}.`,
      fr:`On lance ${M('n')} fois une pièce, la probabilité de « pile » est ${M('p')} à chaque lancer. ${M('X')} = nombre de piles. C’est la loi <b>binomiale</b> ${M('B(n, p)')}.`}},
  {h:{ar:'الصيغة',fr:'La formule'},
   p:{ar:`${M('P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ')} حيث ${M('C(n,k) = n!/(k!(n−k)!)')} هو عدد طرق اختيار ${M('k')} نجاحات.`,
      fr:`${M('P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ')} où ${M('C(n,k) = n!/(k!(n−k)!)')} est le nombre de façons de choisir ${M('k')} succès.`}},
  {h:{ar:'الأمل والتباين',fr:'Espérance et variance'},
   p:{ar:`${M('E(X) = n·p')} و ${M('V(X) = n·p·(1−p)')}. مثال: 10 رميات و ${M('p = 0.5')} ⇒ نتوقع 5 وجوه.`,
      fr:`${M('E(X) = n·p')} et ${M('V(X) = n·p·(1−p)')}. Exemple : 10 lancers, ${M('p = 0.5')} ⇒ on attend 5 piles.`}},
  {h:{ar:'جرّب',fr:'Essaie'},
   p:{ar:'حرّك n و p وشاهد كيف يتحرك الجرس: القمة دائماً قرب ‏n·p.',fr:'Bouge n et p et regarde la cloche se déplacer : le sommet est toujours près de n·p.'}}
 ],
 widget(el,T){
  el.innerHTML = `<canvas></canvas><div class="ctl">${UI.slider('n =','n',1,20,1,10)}${UI.slider('p =','p',0.05,0.95,0.05,0.5)}</div><div class="read" id="r"></div>`;
  const C=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r};
  const cv=el.querySelector('canvas');
  const draw=()=>{
    const n=+el.querySelector('#n').value,p=+el.querySelector('#p').value;
    const P=[];for(let k=0;k<=n;k++)P.push(C(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k));
    const mx=Math.max(...P);
    const g=Graph(cv,{xmin:-1,xmax:n+1,ymin:-mx*0.12,ymax:mx*1.15}); g.clear();
    P.forEach((v,k)=>g.rect(k-0.4,0,k+0.4,v,Math.abs(k-n*p)<0.5?'#f59e0b':'#14b8a6','#0f766e'));
    g.line(-1,0,n+1,0,'#2c4a46',2);
    for(let k=0;k<=n;k+= n>12?2:1) g.text(k,k,-mx*0.08,'#2c4a46','center','12px sans-serif');
    const sum=P.reduce((a,b)=>a+b,0);
    el.querySelector('#r').innerHTML = `${M('E(X) = np = '+(n*p).toFixed(2))} &nbsp; ${M('V(X) = '+(n*p*(1-p)).toFixed(3))}<br>${M('P(X='+P.indexOf(mx)+') = '+mx.toFixed(4))} ${T('(الأكبر)','(la plus grande)')}<br>${M('Σ P(X=k) = '+sum.toFixed(4))}`;
  };
  const N=bind(el,'n',null,draw),Pp=bind(el,'p',v=>v.toFixed(2),draw);N.update();Pp.update();
 },
 quiz:[
  {q:{ar:`${M('X ~ B(10 ; 0.5)')}. ما هو ${M('E(X)')}؟`,fr:`${M('X ~ B(10 ; 0,5)')}. Que vaut ${M('E(X)')} ?`},
   o:[{ar:'0.5',fr:'0,5'},{ar:'5',fr:'5'},{ar:'10',fr:'10'},{ar:'2.5',fr:'2,5'}],a:1,w:{ar:`${M('np = 10×0.5 = 5')}.`,fr:`${M('np = 10×0,5 = 5')}.`}},
  {q:{ar:'نرمي قطعة نقود متوازنة 3 مرات. احتمال الحصول على وجهين بالضبط:',fr:'On lance 3 fois une pièce équilibrée. Probabilité d’obtenir exactement 2 piles :'},
   o:[{ar:'1/8',fr:'1/8'},{ar:'3/8',fr:'3/8'},{ar:'1/2',fr:'1/2'},{ar:'2/3',fr:'2/3'}],a:1,w:{ar:`${M('C(3,2)·(1/2)²·(1/2) = 3/8')}.`,fr:`${M('C(3,2)·(1/2)²·(1/2) = 3/8')}.`}},
  {q:{ar:`${M('X ~ B(5 ; 0.2)')}. ما هو ${M('V(X)')}؟`,fr:`${M('X ~ B(5 ; 0,2)')}. Que vaut ${M('V(X)')} ?`},
   o:[{ar:'1',fr:'1'},{ar:'0.8',fr:'0,8'},{ar:'0.16',fr:'0,16'},{ar:'4',fr:'4'}],a:1,w:{ar:`${M('5×0.2×0.8 = 0.8')}.`,fr:`${M('5×0,2×0,8 = 0,8')}.`}}
 ]
});
