export function initPartnerCarousels({t, motionDisabled}) {
  document.querySelectorAll('[data-partner-carousel]').forEach(root => {
    const track=root.querySelector('.partner-track'),cards=[...track.children];
    const controls=root.querySelector('.partner-controls'),pagination=root.querySelector('.partner-pagination');
    const previous=root.querySelector('[data-partner-previous]'),next=root.querySelector('[data-partner-next]');
    const pause=root.querySelector('[data-partner-pause]'),counter=root.querySelector('.partner-counter');
    const status=root.querySelector('.partner-status'),mobile=matchMedia('(max-width: 720px)');
    let position=0,max=0,userPaused=false,hovered=false,timer,scrollTimer,inView=false;
    const visibleCount=()=>mobile.matches?1:2;
    const sync=()=>{
      clearInterval(timer);
      const paused=userPaused||motionDisabled();
      pause.setAttribute('aria-pressed',String(paused));
      pause.setAttribute('aria-label',t(paused?'Resume partner carousel':'Pause partner carousel'));
      pause.querySelector('span').textContent=paused?'▶':'Ⅱ';
      if(max>0&&!paused&&!hovered&&!root.contains(document.activeElement)&&!document.hidden&&inView){
        timer=setInterval(()=>go(position>=max?0:position+1),5500);
      }
    };
    const update=()=>{
      counter.textContent=`${String(position+1).padStart(2,'0')} / ${String(max+1).padStart(2,'0')}`;
      pagination.querySelectorAll('button').forEach((button,index)=>button.setAttribute('aria-current',String(index===position)));
    };
    const leftFor=index=>Math.min(cards[index].offsetLeft-cards[0].offsetLeft,track.scrollWidth-track.clientWidth);
    function go(index,manual=false) {
      position=Math.max(0,Math.min(max,index));
      if(manual){userPaused=true;status.textContent=t('Show partner group')+' '+(position+1);}
      track.scrollTo({left:leftFor(position),behavior:motionDisabled()?'instant':'smooth'});
      update();sync();
    }
    const layout=()=>{
      max=Math.max(0,cards.length-visibleCount());position=Math.min(position,max);
      pagination.replaceChildren();
      for(let index=0;index<=max;index++){
        const button=document.createElement('button');button.type='button';
        button.setAttribute('aria-label',t('Show partner group')+' '+(index+1));
        button.setAttribute('aria-controls',track.id);
        button.addEventListener('click',()=>go(index,true));pagination.append(button);
      }
      controls.hidden=max===0;pagination.hidden=max===0;
      go(position);
    };
    previous.addEventListener('click',()=>go(position===0?max:position-1,true));
    next.addEventListener('click',()=>go(position>=max?0:position+1,true));
    pause.addEventListener('click',()=>{userPaused=!(userPaused||motionDisabled());sync();});
    track.addEventListener('pointerdown',()=>{userPaused=true;sync();});
    track.addEventListener('keydown',event=>{
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
        event.preventDefault();go(event.key==='ArrowRight'?(position>=max?0:position+1):(position===0?max:position-1),true);
      }
    });
    track.addEventListener('scroll',()=>{
      clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{
        let closest=0,distance=Infinity;
        for(let index=0;index<=max;index++){
          const difference=Math.abs(track.scrollLeft-leftFor(index));
          if(difference<distance){distance=difference;closest=index;}
        }
        position=closest;update();
      },100);
    },{passive:true});
    root.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;sync();}});
    root.addEventListener('pointerleave',()=>{hovered=false;sync();});
    root.addEventListener('focusin',sync);
    root.addEventListener('focusout',()=>requestAnimationFrame(sync));
    document.addEventListener('visibilitychange',sync);
    window.addEventListener('motionpreferencechange',sync);
    mobile.addEventListener('change',layout);
    new ResizeObserver(()=>{track.scrollTo({left:leftFor(position),behavior:'instant'});}).observe(track);
    if('IntersectionObserver' in window){new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.25}).observe(root);}else inView=true;
    layout();
  });
}
