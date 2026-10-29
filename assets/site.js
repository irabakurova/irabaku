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
