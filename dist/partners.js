export function initPartnerCarousels({t, motionDisabled}) {
  document.querySelectorAll('[data-partner-carousel]').forEach(root => {
    const track=root.querySelector('.partner-track'),cards=[...track.children];
    const controls=root.querySelector('.partner-controls'),pagination=root.querySelector('.partner-pagination');
    const previous=root.querySelector('[data-partner-previous]'),next=root.querySelector('[data-partner-next]');
    const pause=root.querySelector('[data-partner-pause]'),counter=root.querySelector('.partner-counter');
    const status=root.querySelector('.partner-status'),mobile=matchMedia('(max-width: 720px)');
    const progress=document.createElement('span');progress.className='partner-progress';progress.setAttribute('aria-hidden','true');root.append(progress);
    let position=0,max=0,userPaused=false,timer,scrollTimer,progressAnimation,transition=0,animating=false;
    const visibleCount=()=>mobile.matches?1:2;
    const sync=()=>{
      clearInterval(timer);
      const paused=userPaused;
      pause.setAttribute('aria-pressed',String(paused));
      pause.setAttribute('aria-label',t(paused?'Resume partner carousel':'Pause partner carousel'));
      pause.querySelector('span').textContent=paused?'▶':'Ⅱ';
      root.dataset.paused=String(paused);
      if(paused||document.hidden){progressAnimation?.pause();return;}
      progressAnimation?.cancel();
      if(max>0){
        if(!motionDisabled())progressAnimation=progress.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:2000,easing:'linear',fill:'forwards'});
        timer=setInterval(()=>go(position>=max?0:position+1),2000);
      }
    };
    const update=()=>{
      counter.textContent=`${String(position+1).padStart(2,'0')} / ${String(max+1).padStart(2,'0')}`;
      pagination.querySelectorAll('button').forEach((button,index)=>button.setAttribute('aria-current',String(index===position)));
    };
    const leftFor=index=>Math.min(cards[index].offsetLeft-cards[0].offsetLeft,track.scrollWidth-track.clientWidth);
    function cancelTransition(){transition++;track.getAnimations().forEach(animation=>animation.cancel());animating=false;}
    async function go(index,manual=false,animate=true) {
      cancelTransition();const token=transition;
      position=Math.max(0,Math.min(max,index));
      if(manual)status.textContent=t('Show partner group')+' '+(position+1);
      update();sync();
      if(!animate||motionDisabled()){track.scrollTo({left:leftFor(position),behavior:'instant'});return;}
      animating=true;
      try{
        const outgoing=track.animate([{opacity:1,transform:'translateX(0)',filter:'blur(0)'},{opacity:0,transform:'translateX(-16px)',filter:'blur(2px)'}],{duration:160,easing:'ease-in',fill:'forwards'});
        await outgoing.finished;if(token!==transition)return;
        track.scrollTo({left:leftFor(position),behavior:'instant'});outgoing.cancel();
        const incoming=track.animate([{opacity:0,transform:'translateX(22px)',filter:'blur(2px)'},{opacity:1,transform:'translateX(0)',filter:'blur(0)'}],{duration:440,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
        await incoming.finished;incoming.cancel();
      }catch{}finally{if(token===transition)animating=false;}
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
      go(position,false,false);
    };
    previous.addEventListener('click',()=>go(position===0?max:position-1,true));
    next.addEventListener('click',()=>go(position>=max?0:position+1,true));
    pause.addEventListener('click',()=>{userPaused=!userPaused;sync();});
    track.addEventListener('pointerdown',()=>{cancelTransition();let distance=Infinity;for(let index=0;index<=max;index++){const delta=Math.abs(track.scrollLeft-leftFor(index));if(delta<distance){distance=delta;position=index;}}update();sync();});
    track.addEventListener('keydown',event=>{
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
        event.preventDefault();go(event.key==='ArrowRight'?(position>=max?0:position+1):(position===0?max:position-1),true);
      }
    });
    track.addEventListener('scroll',()=>{
      clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{
        if(animating)return;
        let closest=0,distance=Infinity;
        for(let index=0;index<=max;index++){
          const difference=Math.abs(track.scrollLeft-leftFor(index));
          if(difference<distance){distance=difference;closest=index;}
        }
        position=closest;update();
      },100);
    },{passive:true});
    document.addEventListener('visibilitychange',sync);
    window.addEventListener('motionpreferencechange',sync);
    mobile.addEventListener('change',layout);
    new ResizeObserver(()=>{track.scrollTo({left:leftFor(position),behavior:'instant'});}).observe(track);
    layout();
  });
}
