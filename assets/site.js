// меню на телефоне
document.querySelectorAll('.burger').forEach(function(b){
  b.addEventListener('click',function(){
    var h=b.closest('.site-header');var open=h.classList.toggle('open');
    b.setAttribute('aria-expanded',open?'true':'false');
  });
});
// защита фото: запрет контекстного меню и перетаскивания на фото
document.addEventListener('contextmenu',function(e){if(e.target.closest('.protect,img'))e.preventDefault();});
document.addEventListener('dragstart',function(e){if(e.target.closest('.protect,img'))e.preventDefault();});
// карусель: стрелки и индикатор
document.querySelectorAll('[data-carousel]').forEach(function(c){
  var t=c.querySelector('.track'),p=c.querySelector('.prev'),n=c.querySelector('.next'),d=c.querySelectorAll('.dots span');
  function step(){var card=t.querySelector('.case');return card?card.getBoundingClientRect().width+20:300;}
  function upd(){var max=t.scrollWidth-t.clientWidth-2;var none=max<=0;var ar=c.querySelector('.arrows'),dt=c.querySelector('.dots');if(ar)ar.style.visibility=none?'hidden':'';if(dt)dt.style.display=none?'none':'';if(p)p.disabled=t.scrollLeft<=2;if(n)n.disabled=t.scrollLeft>=max;
    if(d.length){var i=max>0?Math.round(t.scrollLeft/max*(d.length-1)):0;d.forEach(function(s,k){s.classList.toggle('on',k===i);});}}
  if(p)p.addEventListener('click',function(){t.scrollBy({left:-step(),behavior:'smooth'});});
  if(n)n.addEventListener('click',function(){t.scrollBy({left:step(),behavior:'smooth'});});
  t.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
});
// рубрики на странице «фото»
document.querySelectorAll('[data-filter]').forEach(function(box){
  var chips=box.querySelectorAll('.chip');
  chips.forEach(function(ch){ch.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.toggle('on',x===ch);});
    var cat=ch.dataset.cat;
    document.querySelectorAll('[data-cat-item]').forEach(function(it){it.classList.toggle('is-hidden',cat!=='all'&&it.dataset.catItem!==cat);});
    document.querySelectorAll('[data-cat-group]').forEach(function(g){g.classList.toggle('is-hidden',!g.querySelector('[data-cat-item]:not(.is-hidden)'));});var em=document.querySelector('[data-empty]');if(em)em.classList.toggle('is-hidden',!!document.querySelector('[data-cat-group]:not(.is-hidden)'));
  });});
});
// окно с кадром
(function(){
  var lb=document.querySelector('.lb');if(!lb)return;
  var img=lb.querySelector('.lb-stage img'),cap=lb.querySelector('.lb-cap'),meta=lb.querySelector('.lb-meta'),th=lb.querySelector('.lb-thumbs'),pv=lb.querySelector('.lb-prev'),nx=lb.querySelector('.lb-next');
  var set=[],i=0,last=null;
  function show(){var f=set[i];img.src=f.src;img.alt=f.alt||'';cap.textContent=f.cap+(set.length>1?' · '+(i+1)+' / '+set.length:'');meta.textContent=f.meta||'';
    pv.style.display=nx.style.display=set.length>1?'':'none';pv.disabled=i===0;nx.disabled=i===set.length-1;
    th.innerHTML='';if(set.length>1)set.forEach(function(s,k){var t=document.createElement('img');t.src=s.src;t.alt='';if(k===i)t.className='on';t.onclick=function(){i=k;show();};th.appendChild(t);});}
  function open(group,k,trigger){set=group;i=k;last=trigger;show();lb.classList.add('open');document.body.classList.add('lb-lock');lb.querySelector('.lb-close').focus();}
  function close(){lb.classList.remove('open');document.body.classList.remove('lb-lock');if(last)last.focus();}
  document.querySelectorAll('[data-lb]').forEach(function(el){el.addEventListener('click',function(){
    var g=el.dataset.lb,items=[].slice.call(document.querySelectorAll('[data-lb="'+g+'"]'));
    open(items.map(function(x){return{src:x.dataset.src,alt:x.dataset.alt,cap:x.dataset.cap,meta:x.dataset.meta};}),items.indexOf(el),el);});});
  lb.querySelector('.lb-close').onclick=close;
  pv.onclick=function(){if(i>0){i--;show();}};nx.onclick=function(){if(i<set.length-1){i++;show();}};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-stage'))close();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')pv.onclick();if(e.key==='ArrowRight')nx.onclick();});
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50){dx<0?nx.onclick():pv.onclick();}x0=null;});
})();
