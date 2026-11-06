// Progressive enhancement: core page content and contact links are static HTML.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const header=document.querySelector('.site-header');
const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
function closeMenu(){menuToggle?.setAttribute('aria-expanded','false');menuToggle?.setAttribute('aria-label','Open navigation');mobileNav?.classList.remove('open');if(mobileNav)mobileNav.inert=true;}
menuToggle?.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.classList.toggle('open',open);mobileNav.inert=!open;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuToggle?.getAttribute('aria-expanded')==='true'){closeMenu();menuToggle.focus();}});
mobileNav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
window.matchMedia('(min-width: 721px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>15),{passive:true});

if(!reduceMotion.matches&&'IntersectionObserver' in window){
  document.documentElement.classList.add('js-motion');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  // Ensure content never stays concealed if the observer does not fire.
  window.addEventListener('pageshow',()=>document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('visible');}));
}

const scenes=[...document.querySelectorAll('.hero-scene')];
if(scenes.length){
  const dots=[...document.querySelectorAll('[data-scene]')],pause=document.querySelector('.scene-pause'),sceneLabel=document.querySelector('#scene-label');
  const names=['01 — SITE INFRASTRUCTURE','02 — CONNECTED SYSTEMS','03 — PEOPLE & EXPERTISE'];
  let active=0,userPaused=reduceMotion.matches,timer;
  const show=i=>{active=i;scenes.forEach((el,j)=>el.classList.toggle('active',i===j));dots.forEach((el,j)=>el.setAttribute('aria-pressed',String(i===j)));sceneLabel.textContent=names[i];};
  const sync=()=>{clearInterval(timer);pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Play background transitions':'Pause background transitions');pause.firstElementChild.textContent=userPaused?'▶':'Ⅱ';if(!userPaused&&!document.hidden)timer=setInterval(()=>show((active+1)%scenes.length),8500);};
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);userPaused=true;sync();}));
  pause.addEventListener('click',()=>{userPaused=!userPaused;sync();});
  document.addEventListener('visibilitychange',sync);
  reduceMotion.addEventListener('change',e=>{if(e.matches){userPaused=true;sync();}});
  sync();
}

const networkInfo={site:['Site infrastructure','The physical foundation: towers, mounting systems and equipment installation.'],radio:['Radio & transmission','The links between sites: radio systems, antennas and microwave transmission equipment.'],fibre:['Fibre optic connectivity','The physical connections that carry information between equipment and network infrastructure.'],support:['Maintenance & support','Hands-on technical assistance and field interventions that help support the connection.']};
document.querySelectorAll('[data-node]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-node]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));const [title,copy]=networkInfo[button.dataset.node];const panel=document.querySelector('#network-description');panel.replaceChildren();const strong=document.createElement('strong');strong.textContent=title;panel.append(strong,document.createTextNode(copy));}));

const dialog=document.querySelector('#photo-dialog');
if(dialog){let opener;const close=()=>{dialog.close();document.body.classList.remove('modal-open');opener?.focus();};
 document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{opener=button;const img=button.querySelector('img');const display=document.querySelector('#lightbox-image');display.src=img.src;display.alt=img.alt;const caption=document.querySelector('#lightbox-caption');caption.replaceChildren();const strong=document.createElement('strong');strong.textContent=button.querySelector('.gallery-meta small').textContent;caption.append(strong,document.createTextNode('Supplied field photography'));dialog.showModal();document.body.classList.add('modal-open');}));
 document.querySelector('.lightbox-close')?.addEventListener('click',close);
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));let count=0;document.querySelectorAll('.gallery-item').forEach(el=>{el.hidden=filter!=='all'&&el.dataset.category!==filter;if(!el.hidden){count++;el.classList.add('visible');}});document.querySelector('#gallery-count').textContent=`${count} photograph${count===1?'':'s'}`;}));

const form=document.querySelector('#enquiry-form');
if(form){
  const service=document.querySelector('#service'),requested=new URLSearchParams(location.search).get('service');
  if(requested&&[...service.options].some(o=>o.value===requested))service.value=requested;
  form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
    const data=new FormData(form),selected=service.selectedOptions[0].textContent;
    const lines=['Hello JAL TELECOM,','',`I would like to discuss: ${selected}`,'',String(data.get('message')).trim(),'','Contact details',`Name: ${String(data.get('name')).trim()}`,data.get('organisation')?`Organisation: ${String(data.get('organisation')).trim()}`:'',`Email: ${String(data.get('email')).trim()}`,data.get('phone')?`Phone: ${String(data.get('phone')).trim()}`:''];
    const draft=lines.filter((line,i)=>line!==''||i===1||i===3||i===5).join('\n');
    document.querySelector('#enquiry-draft').value=draft;
    document.querySelector('#send-email').href='mailto:info@jaltelecom.com?subject='+encodeURIComponent('Project enquiry — '+selected)+'&body='+encodeURIComponent(draft);
    document.querySelector('#send-whatsapp').href='https://wa.me/244936307797?text='+encodeURIComponent(draft);
    const output=document.querySelector('#draft-output');output.hidden=false;output.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'center'});
    document.querySelector('#form-feedback').textContent='Enquiry prepared. Review it below and choose how to send.';
  });
  document.querySelector('#copy-enquiry').addEventListener('click',async()=>{const field=document.querySelector('#enquiry-draft'),feedback=document.querySelector('#copy-feedback');try{await navigator.clipboard.writeText(field.value);feedback.textContent='Enquiry copied. Paste it into your preferred messaging app.';}catch{field.focus();field.select();feedback.textContent='Select and copy the enquiry text using your device’s copy command.';}});
}
