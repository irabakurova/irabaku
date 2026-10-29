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
