// Tiny canvas graph helper (no dependencies)
window.Graph = function(canvas, v, ratio){
  const ctx = canvas.getContext('2d'); canvas.setAttribute('dir','ltr');
  const g = {v};
  g.size = function(){
    const dpr = window.devicePixelRatio || 1, w = canvas.clientWidth || 600;
    const h = Math.round(w * (ratio || 0.62));
    canvas.width = w*dpr; canvas.height = h*dpr; canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.direction='ltr'; g.w = w; g.h = h;
  };
  g.X = x => (x - g.v.xmin) / (g.v.xmax - g.v.xmin) * g.w;
  g.Y = y => g.h - (y - g.v.ymin) / (g.v.ymax - g.v.ymin) * g.h;
  g.clear = function(){ g.size(); ctx.clearRect(0,0,g.w,g.h); };
  g.axes = function(step){
    step = step || 1; const {xmin,xmax,ymin,ymax} = g.v;
    ctx.lineWidth = 1; ctx.strokeStyle = '#e5eeec'; ctx.fillStyle = '#6b8581'; ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    for(let x=Math.ceil(xmin/step)*step; x<=xmax+1e-9; x+=step){
      ctx.beginPath(); ctx.moveTo(g.X(x),0); ctx.lineTo(g.X(x),g.h); ctx.stroke();
      if(Math.abs(x)>1e-9) ctx.fillText(+x.toFixed(2), g.X(x), Math.min(g.h-4, Math.max(12, g.Y(0)+14)));
    }
    ctx.textAlign = 'right';
    for(let y=Math.ceil(ymin/step)*step; y<=ymax+1e-9; y+=step){
      ctx.beginPath(); ctx.moveTo(0,g.Y(y)); ctx.lineTo(g.w,g.Y(y)); ctx.stroke();
      if(Math.abs(y)>1e-9) ctx.fillText(+y.toFixed(2), Math.min(g.w-4, Math.max(26, g.X(0)-4)), g.Y(y)-3);
    }
    ctx.strokeStyle = '#2c4a46'; ctx.lineWidth = 2;
    if(ymin<0&&ymax>0){ctx.beginPath(); ctx.moveTo(0,g.Y(0)); ctx.lineTo(g.w,g.Y(0)); ctx.stroke();}
    if(xmin<0&&xmax>0){ctx.beginPath(); ctx.moveTo(g.X(0),0); ctx.lineTo(g.X(0),g.h); ctx.stroke();}
  };
  g.fn = function(f, color, lo, hi, w){
    ctx.strokeStyle = color || '#0f766e'; ctx.lineWidth = w || 3; ctx.beginPath();
    let pen = false; lo = lo==null?g.v.xmin:lo; hi = hi==null?g.v.xmax:hi;
    for(let i=0;i<=400;i++){
      const x = lo + (hi-lo)*i/400, y = f(x);
      if(!isFinite(y)||Math.abs(y)>1e6){pen=false;continue}
      if(!pen){ctx.moveTo(g.X(x),g.Y(y));pen=true}else ctx.lineTo(g.X(x),g.Y(y));
    }
    ctx.stroke();
  };
  g.line = function(x1,y1,x2,y2,color,w,dash){
    ctx.strokeStyle = color||'#000'; ctx.lineWidth = w||2; ctx.setLineDash(dash||[]);
    ctx.beginPath(); ctx.moveTo(g.X(x1),g.Y(y1)); ctx.lineTo(g.X(x2),g.Y(y2)); ctx.stroke(); ctx.setLineDash([]);
  };
  g.pt = function(x,y,color,r,open){
    ctx.beginPath(); ctx.arc(g.X(x),g.Y(y),r||6,0,7);
    ctx.fillStyle = open?'#fff':(color||'#f59e0b'); ctx.fill();
    ctx.strokeStyle = color||'#f59e0b'; ctx.lineWidth = 2.5; ctx.stroke();
  };
  g.rect = function(x1,y1,x2,y2,fill,stroke){
    const X1=g.X(x1),X2=g.X(x2),Y1=g.Y(y1),Y2=g.Y(y2);
    ctx.fillStyle = fill; ctx.fillRect(Math.min(X1,X2),Math.min(Y1,Y2),Math.abs(X2-X1),Math.abs(Y2-Y1));
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.strokeRect(Math.min(X1,X2),Math.min(Y1,Y2),Math.abs(X2-X1),Math.abs(Y2-Y1))}
  };
  g.text = function(s,x,y,color,align,font){
    ctx.fillStyle = color||'#12302d'; ctx.font = font||'bold 14px sans-serif'; ctx.textAlign = align||'left'; ctx.fillText(s,g.X(x),g.Y(y));
  };
  g.ctx = ctx;
  return g;
};
// helpers used by lesson widgets
window.UI = {
  slider(label, id, min, max, step, val){
    return `<label>${label}<input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><span class="val" id="${id}v"></span></label>`;
  }
};
window.M = s => '<span class="m">'+s+'</span>';
window.LESSONS = [];
// bind a slider: updates value label and calls draw
window.bind = function(el, id, fmt, draw){
  const s = el.querySelector('#'+id), o = el.querySelector('#'+id+'v');
  const f = () => { o.textContent = fmt ? fmt(+s.value) : s.value; draw(); };
  s.addEventListener('input', f); return {s, update:f};
};
