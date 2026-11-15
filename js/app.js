(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const el=id=>document.getElementById(id);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const phone=el('phone'), fit=el('fit');
let scale=1;

/* ---------- icons ---------- */
const P={
  arrow:'<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  'chev-l':'<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>','chev-r':'<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>','chev-d':'<path d="m6 9 6 6 6-6"/>',
  up:'<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',plus:'<path d="M12 5v14"/><path d="M5 12h14"/>',minus:'<path d="M5 12h14"/>',
  mic:'<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20.5a6.5 6.5 0 0 1 13 0"/><circle cx="17.3" cy="9" r="2.6"/><path d="M17.8 14.3a5 5 0 0 1 3.7 5.2"/>',
  'user-x':'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20.5a6.5 6.5 0 0 1 13 0"/><path d="m17 8 4 4"/><path d="m21 8-4 4"/>',
  home:'<path d="M3.5 10.8 12 3.5l8.5 7.3V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z"/><path d="M9.5 20.5v-6.5h5v6.5"/>',
  msg:'<path d="M20.5 15.5a2 2 0 0 1-2 2H8l-4.5 4V5.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  'msg-f':'<path d="M12 3.5c-5 0-9 3.4-9 7.6 0 2.4 1.3 4.5 3.4 5.9-.2 1.3-.9 2.6-2 3.5 2.1 0 3.9-.8 5.1-1.8.8.2 1.6.2 2.5.2 5 0 9-3.4 9-7.7S17 3.5 12 3.5z"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'phone-f':'<path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
  'phone-x':'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><path d="m16 3 5 5"/><path d="m21 3-5 5"/>',
  camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3.5"/>',
  globe:'<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a14.5 14.5 0 0 1 0 19a14.5 14.5 0 0 1 0-19"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  heart:'<path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/>',
  grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  scan:'<path d="M3.5 8V5.5a2 2 0 0 1 2-2H8"/><path d="M16 3.5h2.5a2 2 0 0 1 2 2V8"/><path d="M20.5 16v2.5a2 2 0 0 1-2 2H16"/><path d="M8 20.5H5.5a2 2 0 0 1-2-2V16"/><path d="M7.5 9h9"/><path d="M7.5 12h9"/><path d="M7.5 15h6"/>',
  bell:'<path d="M6 8.5a6 6 0 0 1 12 0c0 6.5 2.5 8.5 2.5 8.5h-17S6 15 6 8.5"/><path d="M10.2 20.5a2 2 0 0 0 3.6 0"/>',
  pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
  clock:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5.2l3.2 2"/>',
  calendar:'<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M16 2.5v4"/><path d="M8 2.5v4"/><path d="M3 10h18"/>',
  help:'<circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.5h.01"/>',
  lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  text:'<path d="M4 7V5h16v2"/><path d="M12 5v14"/><path d="M9 19h6"/>',
  send:'<path d="M4 4.5 21 12 4 19.5 7 12z"/><path d="M7 12h7"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6.5 9.5 17 4.5 12"/>',
  volume:'<path d="M11 5.5 6.5 9H3v6h3.5L11 18.5z"/><path d="M15.3 9a4.2 4.2 0 0 1 0 6"/><path d="M18.2 6.3a8 8 0 0 1 0 11.4"/>',
  replay:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4.5"/><path d="M12 16h.01"/>',
  file:'<path d="M14.5 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7.5z"/><path d="M14 2.5V6a2 2 0 0 0 2 2h3.5"/>',
  pause:'<path d="M9 5v14"/><path d="M15 5v14"/>',play:'<path d="M7 4.5v15l12-7.5z"/>',
  gauge:'<path d="m12 14 4.5-4.5"/><path d="M3.5 17.5a9.5 9.5 0 1 1 17 0"/>',
  alert:'<path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  battery:'<rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M22 11v2"/><path d="M6 10v4"/><path d="M9.5 10v4"/>',
  pencil:'<path d="M17 3.5a2.1 2.1 0 0 1 3 3L8 18.5 3.5 20.5 5.5 16z"/>',
  person:'<circle cx="12" cy="8.5" r="4"/><path d="M4 20.5a8 8 0 0 1 16 0"/>'
};
function icon(n,s,w){s=s||24;const fill=/-f$/.test(n);return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="'+(fill?'currentColor':'none')+'" stroke="'+(fill?'none':'currentColor')+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[n]+'</svg>';}
function hydrate(root){$$('[data-ic]',root).forEach(n=>{const st=n.getAttribute('style'),cls=n.getAttribute('class');const t=document.createElement('template');t.innerHTML=icon(n.dataset.ic,+n.dataset.s||24,n.dataset.w!=null?+n.dataset.w:2);const sv=t.content.firstChild;if(st)sv.setAttribute('style',st);if(cls)sv.setAttribute('class',cls);n.replaceWith(sv);});}

/* ---------- state ---------- */
const QUOTA=3;let clockMin=581;
const FACE=$('#at-btn img').getAttribute('src');
const S={sapaan:'Oma',nama:'Siti',anak:'Budi',hub:'anak',hubB:'Anak',sound:true,voice:'f',slow:false,toured:false,plus:false,quota:QUOTA,
  widgets:['rem','ask','sos'],rem:[],log:[],sos:null,help:false,scamBlocked:false};
const REM0=[
  {id:1,kind:'obat',name:'Obat darah tinggi',time:480,dose:'1 tablet',meal:'Sesudah makan',rep:'Setiap hari',done:true},
  {id:2,kind:'obat',name:'Obat gula',time:780,dose:'1 tablet',meal:'Sebelum makan',rep:'Setiap hari',done:false},
  {id:3,kind:'dokter',name:'Kontrol ke dokter',time:600,rep:'Sekali saja',place:'Kamis, RS Sehat',done:false}];
function resetData(){clockMin=581;S.rem=REM0.map(r=>Object.assign({},r));S.log=[{t:'08.02',txt:'Obat darah tinggi sudah diminum'},{t:'09.12',txt:'{anak} mengirim foto kebun'}];S.sos=null;S.help=false;S.quota=QUOTA;}
resetData();
const T=str=>String(str).replace(/\{(\w+)\}/g,(m,k)=>(k in S?S[k]:m));
function renderText(){$$('[data-t]').forEach(n=>{n.textContent=T(n.dataset.t);});$$('.pin-t').forEach(p=>p.textContent=S.sapaan);}
const hhmm=m=>String(Math.floor(m/60)%24).padStart(2,'0')+'.'+String(m%60).padStart(2,'0');
const nowT=()=>hhmm(clockMin);
function addLog(txt,c){clockMin++;S.log.push({t:nowT(),txt:txt,c:c||''});}

/* ---------- one-time markup ---------- */
const SB='<svg width="78" height="14" viewBox="0 0 78 14" fill="currentColor" aria-hidden="true"><rect x="0" y="8.5" width="3.3" height="5.5" rx="1"/><rect x="5.2" y="6" width="3.3" height="8" rx="1"/><rect x="10.4" y="3.2" width="3.3" height="10.8" rx="1"/><rect x="15.6" y="0.3" width="3.3" height="13.7" rx="1"/><path d="M34.5 2.3c3.3 0 6.3 1.3 8.5 3.4l-1.5 1.6a10 10 0 0 0-14 0L26 5.7a12.3 12.3 0 0 1 8.5-3.4z"/><path d="M34.5 6.4c2.1 0 4 .8 5.5 2.2l-1.6 1.6a5.7 5.7 0 0 0-7.8 0L29 8.6a7.9 7.9 0 0 1 5.5-2.2z"/><path d="M34.5 10.4c1 0 1.9.4 2.6 1l-2.6 2.6-2.6-2.6c.7-.6 1.6-1 2.6-1z"/><rect x="51" y="1" width="25" height="12.4" rx="3.9"/><rect x="76.6" y="5" width="1.4" height="4.4" rx=".7"/></svg>';
$$('.scr').forEach(s=>{const d=document.createElement('div');d.className='sb'+(s.dataset.status==='light'?' light':'');d.innerHTML='<b>9:41</b>'+SB;s.prepend(d);});
$$('.scr.setup').forEach(s=>{
  const n=+s.dataset.step;
  let h='<button class="back" data-back><i data-ic="chev-l" data-s="26" data-w="2.4"></i>Kembali</button><div class="su-step">Langkah '+n+' dari 4</div><div class="su-prog">';
  for(let i=1;i<=4;i++)h+='<i class="'+(i<=n?'f':'')+(i===n?' now':'')+'"></i>';
  s.insertAdjacentHTML('beforeend',h+'</div><button class="btn dark su-next" data-go="'+s.dataset.next+'">Lanjut</button>');
});
hydrate(document);
const IMG={};$$('[data-pick]').forEach(b=>{IMG[b.dataset.pick]=$('img',b).src;});

/* ---------- fit ---------- */
function fitPhone(){
  const wrap=$('.wrap'),cs=getComputedStyle(wrap),rail=el('rail');
  const railW=getComputedStyle(rail).display==='none'?0:rail.offsetWidth+parseFloat(cs.columnGap||cs.gap||0);
  const aw=wrap.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-railW;
  const ah=wrap.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);
  const bare=window.innerWidth<560, m=bare?0:13;
  scale=Math.max(.3,Math.min((aw-2*m)/440,(ah-2*m)/956,1.2));
  phone.classList.toggle('bare',bare);phone.style.transform='scale('+scale+')';
  fit.style.width=440*scale+'px';fit.style.height=956*scale+'px';fit.style.margin=m+'px';
}
addEventListener('resize',fitPhone);fitPhone();
phone.addEventListener('scroll',()=>{phone.scrollTop=0;phone.scrollLeft=0;});

/* ---------- suara Cucu: pilih suara Indonesia paling natural, lafal angka/singkatan dirapikan, jeda antar kalimat ---------- */
let voices=[];
function loadVoices(){try{voices=(speechSynthesis.getVoices()||[]).filter(v=>/^id|^in-/i.test(v.lang));}catch(e){voices=[];}try{fillVoices();}catch(e){}}
if('speechSynthesis' in window){loadVoices();try{speechSynthesis.addEventListener('voiceschanged',loadVoices);}catch(e){}setTimeout(loadVoices,600);}
const VPREF=[/gadis.*(natural|online)/i,/google bahasa indonesia/i,/damayanti.*(premium|enhanced|ditingkatkan)/i,/id-id-x-.*network|id-id-language|chirp|wavenet/i,/damayanti/i,/natural|neural|online|enhanced|premium/i];
const isNat=v=>!!v&&/natural|neural|online|enhanced|premium|google|network|wavenet|chirp/i.test(v.name+' '+(v.voiceURI||''));
function vScore(v){const n=v.name+' '+(v.voiceURI||'');let s=0;
  VPREF.forEach((re,i)=>{if(re.test(n))s+=(VPREF.length-i)*10;});
  if(/espeak|andika/i.test(n))s-=60;
  if(S.voice==='m'){if(/ardi|male|pria|laki/i.test(n))s+=35;}else if(/gadis|damayanti|female|wanita|perempuan/i.test(n))s+=6;
  return s;}
let voicePref='';try{voicePref=localStorage.getItem('cp-voice')||'';}catch(e){}
let vStyle='remaja';try{vStyle=localStorage.getItem('cp-vstyle')||'remaja';}catch(e){}
function pickVoice(){if(!voices.length)return null;const own=voices.find(v=>v.name===voicePref);if(own)return own;return voices.slice().sort((x,y)=>vScore(y)-vScore(x))[0];}
/* lafal Indonesia: jam, rupiah, angka, nomor HP, singkatan */
const SAT=['nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh','sebelas'];
function terbilang(n){n=Math.floor(Math.abs(n));
  if(n<12)return SAT[n];if(n<20)return terbilang(n-10)+' belas';
  if(n<100)return terbilang(Math.floor(n/10))+' puluh'+(n%10?' '+terbilang(n%10):'');
  if(n<200)return 'seratus'+(n>100?' '+terbilang(n-100):'');
  if(n<1000)return terbilang(Math.floor(n/100))+' ratus'+(n%100?' '+terbilang(n%100):'');
  if(n<2000)return 'seribu'+(n>1000?' '+terbilang(n-1000):'');
  if(n<1e6)return terbilang(Math.floor(n/1000))+' ribu'+(n%1000?' '+terbilang(n%1000):'');
  if(n<1e9)return terbilang(Math.floor(n/1e6))+' juta'+(n%1e6?' '+terbilang(n%1e6):'');
  return String(n);}
function waktu(hh,mm){hh=+hh;mm=+mm;const bag=hh<4?'malam':hh<11?'pagi':hh<15?'siang':hh<19?'sore':'malam';
  const j=hh%12||12;if(mm===0)return 'jam '+terbilang(j)+' '+bag;
  if(mm===30)return 'jam setengah '+terbilang(j%12+1)+' '+bag;
  return 'jam '+terbilang(j)+' lewat '+terbilang(mm)+' '+bag;}
const DIG=['kosong','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan'];
const ABBR=[[/\bCucuPintar\b/g,'Cucu Pintar'],[/\bHP\b/g,'ha pe'],[/\bSOS\b/g,'es o es'],[/\bOTP\b/g,'o te pe'],[/\bSMS\b/g,'es em es'],[/\bWA\b/g,'we a'],
  [/\bPIN\b/g,'pin'],[/\bRS\b/g,'rumah sakit'],[/\bdr\.\s?/gi,'dokter '],[/\bJl\.\s?/g,'jalan '],[/\bNo\.\s?/g,'nomor '],[/\bOK\b|\bOke\b/gi,'oke'],
  [/\.apk\b/gi,' a pe ka'],[/\bAPK\b/g,'a pe ka'],[/\bGoogle Play\b/g,'Gugel Plei'],[/\bWhatsApp\b/gi,'wotsap'],[/\bPlus\b/g,'Plas']];
function lafal(t){t=String(t);
  t=t.replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu,'');
  t=t.replace(/(\+62|\b0)([\d\s-]{8,}\d)/g,(m,pre,rest)=>(pre==='+62'?'plus enam dua, ':'kosong ')+rest.replace(/\D/g,' ').trim().split(/\s+/).map(g=>g.split('').map(d=>DIG[d]).join(' ')).join(', '));
  t=t.replace(/(?:\b(?:jam|pukul)\s+)?\b(\d{1,2})[.:](\d{2})\b(?![.\d])/gi,(m,a,b)=>+a<24&&+b<60?waktu(a,b):m);
  t=t.replace(/Rp\s?(\d{1,3}(?:\.\d{3})+|\d+)(,-)?/g,(m,n)=>terbilang(+n.replace(/\./g,''))+' rupiah');
  t=t.replace(/\b\d{1,3}(?:\.\d{3})+\b/g,m=>terbilang(+m.replace(/\./g,'')));
  t=t.replace(/(\d+)\s?x\b/g,'$1 kali').replace(/(\d+)\s?%/g,'$1 persen');
  ABBR.forEach(([re,s])=>{t=t.replace(re,s);});
  t=t.replace(/\b\d+\b/g,m=>terbilang(+m));
  t=t.replace(/\s*[·•|—–]\s*/g,', ').replace(/\s*\/\s*/g,' atau ').replace(/&/g,' dan ').replace(/\s+/g,' ').trim();
  return t;}
let sayTok=0;window.__utt=[];
function hush(){sayTok++;try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}}
function say(text,rate,force){
  if((!S.sound&&!force)||!('speechSynthesis' in window))return;
  try{
    hush();const tok=sayTok;const v=pickVoice();if(voices.length&&!v)return;
    const parts=(lafal(text).match(/[^.!?]+[.!?]*/g)||[String(text)]).map(s=>s.trim()).filter(Boolean);
    const nat=isNat(v);let i=0;window.__utt=[];
    const next=()=>{if(tok!==sayTok||i>=parts.length)return;const pt=parts[i++];
      const u=new SpeechSynthesisUtterance(pt);u.lang='id-ID';if(v)u.voice=v;
      const teen=vStyle==='remaja';u.rate=(rate||1)*(S.slow?.85:1)*(nat?.94:.88)*(teen?1.05:1);u.pitch=teen?(nat?1.32:1.42):(S.voice==='m'?.95:(nat?1.02:1.1));u.volume=1;
      u.onend=()=>setTimeout(next,/[?!]$/.test(pt)?260:200);u.onerror=()=>setTimeout(next,60);
      window.__utt.push(u);speechSynthesis.speak(u);};
    next();
  }catch(e){}
}
window.__lafal=lafal;
/* pilihan suara di panel demo */
function fillVoices(){const sel=document.getElementById('vsel');if(!sel)return;
  const list=voices.slice().sort((x,y)=>vScore(y)-vScore(x));const best=list[0];
  sel.innerHTML=list.length?list.map(v=>'<option value="'+v.name.replace(/"/g,'&quot;')+'">'+v.name.replace(/^Microsoft |^Google /,'')+(v===best?' (disarankan)':'')+'</option>').join(''):'<option>Tidak ada suara Indonesia</option>';
  const cur=pickVoice();if(cur)sel.value=cur.name;
  const hint=document.getElementById('vhint');
  if(hint)hint.textContent=!list.length?'HP/browser ini belum punya suara Bahasa Indonesia.':isNat(cur)?'Suara natural aktif.':'Untuk suara paling lembut, buka di Microsoft Edge (suara Gadis) atau iPhone dengan suara Damayanti (Ditingkatkan).';}
/* ---------- toast ---------- */
let toastT=0;
function toast(msg,ms){const t=el('toast');t.textContent=T(msg);t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),ms||3000);}

/* ---------- router ---------- */
let cur='ob1';const hist=[];
const enter={},leave={};
const at=el('at'),hb=el('homebar');
const DARK=['home','camera','soshold','sosactive'];
function syncNav(){const n=el(cur).dataset.nav;at.classList.toggle('off',!n);if(!n)closePanel();hb.classList.toggle('light',DARK.indexOf(cur)>=0);}
function go(id,o){
  o=o||{};
  if(o.fresh)hist.length=0;
  if(id===cur){if(enter[id])enter[id](o);return;}
  const from=el(cur),to=el(id),dir=o.dir||'fwd';
  if(dir==='fwd'&&!o.replace&&!o.fresh)hist.push(cur);
  if(leave[cur])leave[cur]();
  hush();closePanel();
  to.classList.add('on');to.style.zIndex=2;from.style.zIndex=1;
  if(!RM){
    if(id==='home'&&o.fresh&&cur!=='ready')to.animate([{transform:'scale(1.06)',opacity:0},{transform:'none',opacity:1}],{duration:340,easing:'cubic-bezier(.2,.8,.2,1)'});
    else to.animate([{transform:'translateX('+(dir==='back'?-44:44)+'px)',opacity:0},{transform:'translateX(0)',opacity:1}],{duration:340,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  const prev=cur;cur=id;
  setTimeout(()=>{if(cur!==prev)el(prev).classList.remove('on');},RM?0:320);
  syncNav();
  if(enter[id])enter[id](o);
}
function back(){go(hist.pop()||'home',{dir:'back'});}
let suppressClick=false;
phone.addEventListener('click',e=>{
  if(suppressClick){suppressClick=false;e.stopPropagation();e.preventDefault();return;}
  const fk=e.target.closest('.app.fake');if(fk&&!editing){toast('Ini aplikasi bawaan HP (contoh).',1800);return;}
  const g=e.target.closest('[data-go]');if(g&&!editing){go(g.dataset.go,{fresh:g.hasAttribute('data-fresh')});return;}
  if(e.target.closest('[data-back]')){back();return;}
  const tg=e.target.closest('.tg');if(tg&&!tg.id){const on=tg.classList.toggle('on');tg.setAttribute('aria-checked',on);}
},true);

/* ---------- setup ---------- */
function chipGroup(id,cb){el(id).addEventListener('click',e=>{const c=e.target.closest('.chip');if(!c)return;$$('.chip',el(id)).forEach(x=>x.classList.toggle('sel',x===c));cb&&cb(c.dataset.v||c.dataset.k,c);});}
chipGroup('sapaan',v=>{S.sapaan=v;renderText();});
chipGroup('voice-pick',v=>{S.voice=v;say(v==='f'?'Halo, aku Cucu. Senang bisa menemani.':'Halo, aku Cucu. Senang bisa menemani.');});
const firstWord=(v,d)=>(v.trim().split(/\s+/)[0]||d).slice(0,12);
el('f-nama').addEventListener('input',e=>{S.nama=firstWord(e.target.value,'Siti');renderText();});
el('f-anak').addEventListener('input',e=>{S.anak=firstWord(e.target.value,'Budi');renderText();});
el('f-hub').addEventListener('input',e=>{const v=e.target.value.trim()||'Anak';S.hubB=v.charAt(0).toUpperCase()+v.slice(1);S.hub=v.toLowerCase();renderText();});
el('f-size').addEventListener('input',e=>{el('sz-demo').style.fontSize=e.target.value+'px';});
el('sz-demo').style.fontSize='22px';
function setSound(on){S.sound=on;[el('snd'),el('ap-snd')].forEach(t=>{t.classList.toggle('on',on);t.setAttribute('aria-checked',on);});if(!on)hush();}
el('snd').addEventListener('click',()=>setSound(!S.sound));
el('ap-snd').addEventListener('click',()=>setSound(!S.sound));
enter.ob1=()=>setTimeout(()=>{if(cur==='ob1')say('Halo! Aku Cucu. Aku akan menemani kalau ada yang membingungkan di HP.');},RM?0:500);
enter.ready=()=>say(T('Semuanya sudah siap. Sekarang HP-nya bisa diserahkan ke {sapaan}, ya.'));
enter.home=()=>{renderHome();if(!S.toured){S.toured=true;setTimeout(()=>{if(cur==='home'&&!G)startTour();},RM?100:900);}};
leave.home=()=>exitEdit();

/* ---------- home screen: widgets + apps on one 4-column grid ---------- */
const DAYS=['MINGGU','SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'];
const today=new Date();
const APPS=[
  {id:'app-cucu',cls:'i-cucu',html:'<img src="'+FACE+'" alt="">',label:'CucuPintar',go:'app'},
  {cls:'i-gal',label:'Galeri',html:'<svg width="68" height="68" viewBox="0 0 68 68"><circle cx="46" cy="18" r="9" fill="#FFB020"/><g fill="none" stroke="#2FA866" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="17" width="35" height="35" rx="4"/><circle cx="26.5" cy="27.5" r="3"/><path d="M51 41 41 31 20 52"/></g></svg>'},
  {cls:'i-cal',label:'Kalender',html:'<span class="cal-d">SEN</span><span class="cal-n">27</span>'},
  {cls:'i-clock',label:'Jam',html:'<svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="25" fill="#fff"/><path d="M28 28V12" stroke="#111" stroke-width="2.2" stroke-linecap="round"/><path d="M28 28h12" stroke="#E0352B" stroke-width="2.2" stroke-linecap="round"/></svg>'},
  {cls:'i-wx',label:'Cuaca',html:'<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="19" cy="18" r="9" fill="#FFD43B"/><path d="M15 36h20a7 7 0 0 0 0-14 9 9 0 0 0-17 3 6 6 0 0 0-3 11z" fill="#fff"/></svg>'},
  {cls:'i-note',label:'Catatan',html:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6B4A00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>'},
  {cls:'i-contact',label:'Kontak',html:'<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'},
  {cls:'i-set',label:'Pengaturan',html:'<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88z"/></svg>'}
];
const WD={
  rem:{size:'m',name:'Pengingat obat',desc:'Obat berikutnya dan tombol sudah diminum'},
  ask:{size:'s',name:'Tanya Cucu',desc:'Tekan lalu bicara'},
  sos:{size:'s',name:'Darurat',desc:'Tahan 3 detik untuk SOS'},
  read:{size:'s',name:'Baca tulisan',desc:'Foto tulisan, Cucu bacakan'},
  fam:{size:'s',name:'Telepon keluarga',desc:'Satu tekan untuk menelepon'},
  rems:{size:'s',name:'Pengingat kecil',desc:'Jam minum obat berikutnya'}
};
const cellsOf=t=>WD[t].size==='m'?8:4;
const nextRem=()=>S.rem.filter(r=>r.kind==='obat'&&!r.done).sort((a,b)=>a.time-b.time)[0];
const nextDoc=()=>S.rem.find(r=>r.kind==='dokter');
function wHTML(t){
  const n=nextRem(),hd=(ic,lab,g,r)=>'<div class="whead"><span class="gl '+g+'">'+icon(ic,15,2.4)+'</span>'+lab+(r?'<span class="r">'+r+'</span>':'')+'</div>';
  if(t==='rem')return '<div class="wcard w-rem" role="button" tabindex="0" data-wact="app"><div class="wpad">'+hd('clock','Pengingat','g-brand','Hari ini')+
    (n?'<div class="t1">'+n.name+'</div><div class="t2">'+hhmm(n.time)+' · '+n.dose+', '+n.meal.toLowerCase()+'</div><button class="wbtn" data-wact="done">'+icon('check',20,2.8)+'Sudah diminum</button>'
      :'<div class="t1">Obat hari ini beres</div><div class="t2">'+T('Hebat, {sapaan}! Diingatkan lagi besok.')+'</div><div class="t3">'+icon('calendar',18,2.2)+(nextDoc()?nextDoc().name+', '+nextDoc().place.split(',')[0]:'Tidak ada jadwal lain')+'</div>')+'</div></div>';
  if(t==='ask')return '<button class="wcard w-s" data-wact="ask"><div class="wpad"><span class="ic gl"><img src="'+FACE+'" alt=""></span><b>Tanya Cucu</b><small>Tekan lalu bicara</small></div></button>';
  if(t==='sos')return '<button class="wcard w-s w-sos" data-hold aria-label="SOS, tahan 3 detik"><div class="wpad"><span class="ic gl g-red">SOS</span><b>Darurat</b><small>Tahan 3 detik</small></div></button>';
  if(t==='read')return '<button class="wcard w-s" data-wact="read"><div class="wpad"><span class="ic gl g-orange">'+icon('scan',30,2.1)+'</span><b>Baca tulisan</b><small>'+(S.plus?'Tanpa batas':'Sisa '+S.quota+' kali')+'</small></div></button>';
  if(t==='fam')return '<button class="wcard w-s w-fam" data-wact="fam"><div class="wpad"><span class="ic">'+S.anak[0].toUpperCase()+'</span><b>'+T('{anak}')+'</b><small>Tekan untuk menelepon</small></div></button>';
  if(t==='rems')return '<button class="wcard w-s w-rems" data-wact="app"><div class="wpad">'+hd('pill','Obat','g-brand')+(n?'<div class="tm">'+hhmm(n.time)+'</div><div class="nm">'+n.name+'</div>':'<div class="tm">✓</div><div class="nm">Semua sudah</div>')+'</div></button>';
}
function renderHome(){
  const hs=el('hs');let used=0;let h='';
  S.widgets.forEach(t=>{used+=cellsOf(t);h+='<div class="cell '+(WD[t].size==='m'?'wm':'ws')+'" data-w="'+t+'"><button class="wdel" data-del="'+t+'" aria-label="Hapus widget">'+icon('minus',18,3)+'</button>'+wHTML(t)+'<div class="wlab">CucuPintar</div></div>';});
  APPS.slice(0,Math.max(0,24-used)).forEach(a=>{h+='<div class="cell"><button class="app'+(a.go?'':' fake')+'"'+(a.id?' id="'+a.id+'"':'')+(a.go?' data-go="'+a.go+'"':'')+'><span class="ai gl '+a.cls+'">'+a.html+'</span><span class="al">'+a.label+'</span></button></div>';});
  hs.innerHTML=h;
}
el('hs').addEventListener('click',e=>{
  const d=e.target.closest('[data-del]');if(d){S.widgets=S.widgets.filter(x=>x!==d.dataset.del);renderHome();return;}
  if(editing)return;
  const a=e.target.closest('[data-wact]');if(!a)return;
  const k=a.dataset.wact;
  if(k==='done'){e.stopPropagation();obatDone();}
  else if(k==='app')go('app');
  else if(k==='ask')openListen();
  else if(k==='read')go('camera');
  else if(k==='fam'){CALL={name:S.anak,av:''};go('call');}
});
/* edit mode */
let editing=false,lpT=0,lpXY=null;
function enterEdit(){if(cur!=='home')return;editing=true;closePanel();endGuide();el('home').classList.add('editing');}
function exitEdit(){if(!editing)return;editing=false;el('home').classList.remove('editing');if(ovOpen==='wgal')ovHide();}
el('home').addEventListener('pointerdown',e=>{if(editing||e.target.closest('.dock,[data-hold],#at'))return;lpXY=[e.clientX,e.clientY];clearTimeout(lpT);lpT=setTimeout(()=>{suppressClick=true;enterEdit();try{navigator.vibrate&&navigator.vibrate(20);}catch(x){}},650);});
el('home').addEventListener('pointermove',e=>{if(lpXY&&Math.hypot(e.clientX-lpXY[0],e.clientY-lpXY[1])>10)clearTimeout(lpT);});
['pointerup','pointercancel','pointerleave'].forEach(ev=>el('home').addEventListener(ev,()=>{clearTimeout(lpT);lpXY=null;setTimeout(()=>{suppressClick=false;},0);}));
el('ed-done').addEventListener('click',exitEdit);
el('ed-add').addEventListener('click',()=>{renderWgal();ovShow('wgal');});
el('wg-close').addEventListener('click',ovHide);
function renderWgal(){
  const used=S.widgets.reduce((s,t)=>s+cellsOf(t),0);
  const ic={rem:['g-brand','pill'],ask:['face'],sos:['g-red','SOS'],read:['g-orange','scan'],fam:['g-blue','phone'],rems:['g-purple','clock']};
  el('wg-list').innerHTML=Object.keys(WD).map(t=>{const w=WD[t],has=S.widgets.indexOf(t)>=0,full=used+cellsOf(t)>20,i=ic[t];
    const vis=i[0]==='face'?'<span class="ic-c gl"><img src="'+FACE+'" alt=""></span>':'<span class="ic-c gl '+i[0]+'">'+(i[1]==='SOS'?'SOS':icon(i[1],24,2.2))+'</span>';
    return '<div class="wg-row">'+vis+'<div class="tx"><b>'+w.name+'</b><small>'+(w.size==='m'?'Sedang':'Kecil')+' · '+w.desc+'</small></div><button class="wg-add" data-add="'+t+'"'+(has||full?' disabled':'')+'>'+(has?'Sudah ada':full?'Penuh':'Tambah')+'</button></div>';}).join('');
}
el('wg-list').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b||b.disabled)return;S.widgets.push(b.dataset.add);renderHome();ovHide();toast('Widget ditambahkan.',1600);});

/* ---------- Plus + quota ---------- */
function renderPlus(){
  const p=S.plus;
  el('ap-plan').classList.toggle('on',p);el('ap-plan-t').textContent=p?'CucuPintar Plus':'Paket Gratis';el('ap-plan-tag').hidden=!p;
  el('ap-plan-s').textContent=p?'Aktif. Gratis sampai 26 Oktober, lalu Rp190.000 per tahun.':'Baca tulisan 3 kali sehari. Coba Plus untuk perlindungan lebih lengkap.';
  el('ap-plan-btn').hidden=p;el('sc-more').hidden=!p;el('sc-lock').hidden=p;
  el('t-read-s').textContent=p?'Tanpa batas':(S.quota>0?'Sisa '+S.quota+' kali hari ini':'Jatah hari ini habis');
  el('cam-quota').textContent=p?'Plus: tanpa batas':'Sisa '+S.quota+' kali';
  const rp=el('rail-plus');rp.classList.toggle('on',p);rp.setAttribute('aria-checked',p);
  if(cur==='home')renderHome();
}
function setPlus(v){S.plus=v;renderPlus();renderReminders();}
el('rail-plus').addEventListener('click',()=>{setPlus(!S.plus);toast(S.plus?'Mode Plus aktif (demo).':'Kembali ke paket gratis (demo).',1600);});
$$('[data-plan]').forEach(b=>b.addEventListener('click',()=>$$('[data-plan]').forEach(x=>x.classList.toggle('sel',x===b))));
el('p-cta').addEventListener('click',()=>{setPlus(true);back();setTimeout(()=>toast('CucuPintar Plus aktif. Gratis 7 hari pertama.'),350);});
el('ap-edit').addEventListener('click',()=>{goHome();setTimeout(enterEdit,RM?50:420);});
el('ap-tour').addEventListener('click',()=>{goHome();setTimeout(startTour,RM?50:450);});

/* ---------- overlays ---------- */
const ovDim=el('ov-dim');let ovOpen=null,ovTimers=[];
function ovShow(id){closePanel();if(ovOpen)el(ovOpen).classList.remove('on');ovOpen=id;ovDim.classList.add('on');el(id).classList.add('on');}
function ovHide(){if(!ovOpen)return;el(ovOpen).classList.remove('on');ovDim.classList.remove('on');ovOpen=null;ovTimers.forEach(clearTimeout);ovTimers=[];}
ovDim.addEventListener('click',()=>{if(['listen','picker','lock','wgal'].indexOf(ovOpen)>=0)ovHide();});
el('l-cancel').addEventListener('click',ovHide);el('pk-cancel').addEventListener('click',ovHide);
el('lock-later').addEventListener('click',ovHide);el('lock-plus').addEventListener('click',()=>{ovHide();go('plus');});

/* ---------- assistive button + panel ---------- */
const atBtn=el('at-btn'),panel=el('panel'),pnDim=el('pn-dim');
let panelOpen=false,drag=null,noClick=false;
function openPanel(){
  if(panelOpen)return;if(ovOpen)ovHide();exitEdit();
  const r=at.getBoundingClientRect(),p=phone.getBoundingClientRect();
  panel.style.setProperty('--ox',(((r.left+r.width/2)-p.left)/scale-22)+'px');panel.style.setProperty('--oy',(((r.top+r.height/2)-p.top)/scale-120)+'px');
  panelOpen=true;renderText();renderPlus();renderReminders();
  panel.classList.add('on');pnDim.classList.add('on');atBtn.setAttribute('aria-expanded','true');
}
function closePanel(){if(!panelOpen)return;panelOpen=false;panel.classList.remove('on');pnDim.classList.remove('on');atBtn.setAttribute('aria-expanded','false');}
pnDim.addEventListener('click',()=>{if(!(G&&G.tour))closePanel();});
el('pn-close').addEventListener('click',closePanel);
atBtn.addEventListener('pointerdown',e=>{drag={x0:e.clientX,y0:e.clientY,left:at.offsetLeft,top:at.offsetTop,moved:false};try{atBtn.setPointerCapture(e.pointerId);}catch(x){}});
atBtn.addEventListener('pointermove',e=>{
  if(!drag)return;const dx=(e.clientX-drag.x0)/scale,dy=(e.clientY-drag.y0)/scale;
  if(!drag.moved&&Math.hypot(dx,dy)<9)return;
  drag.moved=true;at.classList.add('dragging');
  at.style.left=Math.max(8,Math.min(338,drag.left+dx))+'px';at.style.top=Math.max(66,Math.min(826,drag.top+dy))+'px';
});
function dragEnd(){if(!drag)return;const m=drag.moved;drag=null;at.classList.remove('dragging');if(m){noClick=true;at.style.left=(at.offsetLeft+47<220?8:331)+'px';}}
atBtn.addEventListener('pointerup',dragEnd);atBtn.addEventListener('pointercancel',dragEnd);
atBtn.addEventListener('click',()=>{if(noClick){noClick=false;return;}panelOpen?closePanel():openPanel();});
el('t-ask').addEventListener('click',()=>{closePanel();setTimeout(openListen,RM?0:240);});
el('t-read').addEventListener('click',()=>{closePanel();if(cur!=='camera')go('camera');});
el('t-help').addEventListener('click',()=>{closePanel();openHelp();});
el('t-rem').addEventListener('click',()=>{closePanel();go('app');});
el('t-home').addEventListener('click',()=>{closePanel();goHome();});
el('pn-app').addEventListener('click',()=>{closePanel();go('app');});

/* ---------- reminders ---------- */
function remSub(r){return r.kind==='dokter'?r.place+', '+hhmm(r.time):r.rep+', '+hhmm(r.time)+' · '+r.dose;}
function remRow(r,fam){
  const lock=r.kind==='dokter'&&!S.plus;
  const st=r.kind==='dokter'?(lock?'<span class="plus-tag">PLUS</span>':'<span class="chipline gray sm">'+icon('calendar',14,2.2)+'Kamis</span>')
    :(r.done?'<span class="chipline brand sm">'+icon('check',14,2.8)+'Sudah</span>':'<span class="chipline gray sm">'+(fam?'Belum':'Nanti')+'</span>');
  return '<button class="grow" data-rem="'+r.id+'"><span class="sq gl '+(r.kind==='dokter'?'g-blue':'g-brand')+'">'+icon(r.kind==='dokter'?'calendar':'pill',20,2.2)+'</span><span class="tx"><b>'+r.name+'</b><small>'+remSub(r)+'</small></span>'+st+'</button>';
}
function renderReminders(){
  const n=nextRem();
  el('t-rem-s').textContent=n?n.name+', '+hhmm(n.time):'Semua sudah diminum';
  el('ap-rem').innerHTML=S.rem.map(r=>remRow(r)).join('')+
    '<button class="grow add" id="ap-add"><span class="sq" style="background:var(--brand-l);color:var(--brand-d);display:grid;place-items:center">'+icon('plus',20,2.6)+'</span><span class="tx"><b>Tambah pengingat</b></span></button>'+
    '<button class="grow" id="ap-ring"><span class="sq gl g-gray">'+icon('bell',20,2.2)+'</span><span class="tx"><b>Coba bunyikan pengingat</b></span>'+icon('chev-r',20,2.4).replace('<svg','<svg class="chev"')+'</button>';
  if(cur==='home')renderHome();
  if(cur==='family')renderFamily();
}
function obatDone(){const n=nextRem();if(!n)return;n.done=true;addLog(n.name+' sudah diminum');renderReminders();toast('Bagus, {sapaan}! {anak} sudah diberi tahu.');say(T('Mantap, {sapaan}. Nanti aku kabari {anak}, ya.'));}
document.addEventListener('click',e=>{
  const r=e.target.closest('[data-rem]');if(r){openRemEdit(+r.dataset.rem);return;}
  if(e.target.closest('#ap-add')){const obat=S.rem.filter(x=>x.kind==='obat').length;if(!S.plus&&obat>=3){go('plus');return;}openRemEdit(null);return;}
  if(e.target.closest('#ap-ring')){alarmFor(nextRem()||S.rem[1]);go('alarm');}
});
let RE=null;
function openRemEdit(id){
  const src=id?S.rem.find(x=>x.id===id):null;
  if(src&&src.kind==='dokter'&&!S.plus){go('plus');return;}
  RE=src?Object.assign({},src):{id:null,kind:'obat',name:'',time:1140,dose:'1 tablet',meal:'Sesudah makan',rep:'Setiap hari',done:false,place:'Kamis, RS Sehat'};
  el('re-title').textContent=src?'Ubah pengingat':'Pengingat baru';
  el('re-name').value=RE.name;el('re-del').hidden=!src;paintRE();go('remedit');
}
function paintRE(){
  const ob=RE.kind==='obat';
  $$('#re-kind .chip').forEach(c=>c.classList.toggle('sel',c.dataset.k===RE.kind));
  el('re-name-l').textContent=ob?'Nama obat':'Keperluan';el('re-name').placeholder=ob?'Contoh: Obat kolesterol':'Contoh: Kontrol ke dokter';
  el('re-obat').hidden=!ob;el('re-time').textContent=hhmm(RE.time);
  [['re-dose','dose'],['re-meal','meal'],['re-rep','rep']].forEach(([g,k])=>$$('#'+g+' .chip').forEach(c=>c.classList.toggle('sel',c.dataset.v===RE[k])));
}
el('re-kind').addEventListener('click',e=>{const c=e.target.closest('.chip');if(!c)return;if(c.dataset.k==='dokter'&&!S.plus){go('plus');return;}RE.kind=c.dataset.k;paintRE();});
[['re-dose','dose'],['re-meal','meal'],['re-rep','rep']].forEach(([g,k])=>el(g).addEventListener('click',e=>{const c=e.target.closest('.chip');if(!c)return;RE[k]=c.dataset.v;paintRE();}));
el('re-minus').addEventListener('click',()=>{RE.time=(RE.time+1410)%1440;paintRE();});
el('re-plus').addEventListener('click',()=>{RE.time=(RE.time+30)%1440;paintRE();});
el('re-save').addEventListener('click',()=>{
  RE.name=el('re-name').value.trim()||(RE.kind==='obat'?'Obat baru':'Kontrol ke dokter');
  if(RE.id){const i=S.rem.findIndex(x=>x.id===RE.id);S.rem[i]=RE;}else{RE.id=Date.now();S.rem.push(RE);}
  addLog('Pengingat "'+RE.name+'" diatur');renderReminders();back();toast('Pengingat disimpan. {anak} juga bisa melihatnya.');
});
el('re-del').addEventListener('click',()=>{S.rem=S.rem.filter(x=>x.id!==RE.id);renderReminders();back();toast('Pengingat dihapus.');});
let ALR=null;
function alarmFor(r){ALR=r;if(!r)return;el('al-t').textContent=hhmm(r.time);el('al-n').textContent=r.name+', '+(r.dose||'');el('al-m').textContent=r.meal?'Diminum '+r.meal.toLowerCase():'';}
enter.alarm=()=>{if(!ALR)alarmFor(nextRem()||S.rem[1]);setTimeout(()=>{if(cur==='alarm')say(T('{sapaan}, sudah jam '+el('al-t').textContent.replace('.',' lewat ').replace(' lewat 00','')+'. Waktunya minum '+ALR.name.toLowerCase()+', ya. '+(ALR.dose||'')+', '+(ALR.meal||'').toLowerCase()+'.'));},RM?0:500);};
el('al-done').addEventListener('click',()=>{back();if(ALR){ALR.done=true;addLog(ALR.name+' sudah diminum');renderReminders();toast('Bagus, {sapaan}! {anak} sudah diberi tahu.');}});
el('al-later').addEventListener('click',()=>{back();toast('Cucu ingatkan lagi 10 menit lagi.');});

/* ---------- messages ---------- */
const CHAT0={
  budi:{name:()=>S.anak,letter:()=>S.anak[0].toUpperCase(),av:'',online:true,
    msgs:[{d:'in',t:'{sapaan}, ini foto kebun kemarin.'},{d:'in',img:'garden'},{d:'out',t:'Bagus sekali. {sapaan} mau kirim foto juga.'}],
    photoReply:'Wah, bagus sekali fotonya, {sapaan}!',replies:['Iya, {sapaan}. Nanti {anak} telepon ya.','Siap, {sapaan}!']},
  sari:{name:()=>'Sari',letter:()=>'S',av:'sand',msgs:[{d:'in',t:'{sapaan}, minggu depan Sari main ya.'},{d:'in',t:'Sari kangen masakan {sapaan}.'}],
    photoReply:'Cantik sekali fotonya, {sapaan}!',replies:['Asyik! Sampai ketemu, {sapaan}.','Iya, {sapaan}. Sari sayang {sapaan}.']},
  scam:{name:()=>'+62 857 2210 7745',letter:()=>'?',av:'gray',msgs:[{d:'in',t:'Selamat siang. Ini undangan pernikahan kami, mohon dibuka ya.'},{d:'in',file:'Undangan.apk'}]}
};
let CH,CK='budi',att=null,replyT=[],replyN=0;
function resetChats(){CH={};for(const k in CHAT0)CH[k]=Object.assign({},CHAT0[k],{msgs:CHAT0[k].msgs.slice()});S.scamBlocked=false;el('row-scam').classList.remove('blocked');el('scam-meta').innerHTML='<i class="chipline amber sm">'+icon('shield',15,2.2)+'Periksa</i>';}
resetChats();
function bubEl(m,i){
  const d=document.createElement('div');d.className='bub '+m.d+(m.img?' ph':'')+(m.file?' file':'');
  if(m.img){const im=document.createElement('img');im.src=IMG[m.img];im.alt='Foto';d.appendChild(im);}
  else if(m.file){d.innerHTML='<i>'+icon('file',24,2)+'</i><div><b></b><small>Berkas aplikasi, 6,2 MB</small></div>';$('b',d).textContent=m.file;d.setAttribute('role','button');d.tabIndex=0;d.addEventListener('click',showScam);}
  else d.textContent=T(m.t);
  if(i!=null)d.style.animationDelay=(i*70)+'ms';return d;
}
function renderChat(){const c=CH[CK],b=el('c-body');const av=el('c-av');av.className='av'+(c.av?' '+c.av:'');av.innerHTML=c.letter()+(c.online?'<i class="dot"></i>':'');el('c-nm').textContent=c.name();b.innerHTML='<div class="c-day">Hari ini</div>';c.msgs.forEach((m,i)=>b.appendChild(bubEl(m,i)));b.scrollTop=0;clearAtt();el('chat-input').value='';syncSend();}
function addMsg(m){CH[CK].msgs.push(m);const b=el('c-body');b.appendChild(bubEl(m));requestAnimationFrame(()=>b.scrollTo({top:b.scrollHeight,behavior:RM?'auto':'smooth'}));}
function openChat(k,o){CK=k;renderChat();go('chat',o);}
function syncSend(){el('btn-send').classList.toggle('ready',!!att||el('chat-input').value.trim().length>0);}
function clearAtt(){att=null;el('c-att').hidden=true;el('chat-input').hidden=false;}
function setAtt(k){att=k;el('c-att-img').src=IMG[k];el('c-att').hidden=false;el('chat-input').hidden=true;syncSend();}
function replySoon(text){
  replyT.forEach(clearTimeout);replyT=[];const key=CK;let tip=null;
  replyT.push(setTimeout(()=>{if(cur!=='chat'||CK!==key)return;tip=document.createElement('div');tip.className='bub in typing';tip.innerHTML='<i></i><i></i><i></i>';const b=el('c-body');b.appendChild(tip);b.scrollTo({top:b.scrollHeight,behavior:RM?'auto':'smooth'});},800));
  replyT.push(setTimeout(()=>{if(tip)tip.remove();if(CK!==key)return;CH[key].msgs.push({d:'in',t:text});if(cur==='chat'){const b=el('c-body');b.appendChild(bubEl({d:'in',t:text}));b.scrollTo({top:b.scrollHeight,behavior:RM?'auto':'smooth'});}},2500));
}
function sendMsg(confirmed){
  const inp=el('chat-input'),txt=inp.value.trim(),c=CH[CK];
  if(!att&&!txt){toast('Tulis pesannya dulu ya, {sapaan}.');return;}
  if(att&&!confirmed){openConfirm();return;}
  const hadPhoto=!!att;
  if(att){addMsg({d:'out',img:att});clearAtt();addLog('{sapaan} mengirim foto ke '+c.name());}
  if(txt){addMsg({d:'out',t:txt});inp.value='';}
  const bs=el('btn-send');bs.classList.remove('fly');void bs.offsetWidth;bs.classList.add('fly');syncSend();
  if(c.replies)replySoon(hadPhoto?c.photoReply:c.replies[replyN++%c.replies.length]);
}
el('btn-send').addEventListener('click',()=>sendMsg(false));
el('chat-input').addEventListener('input',syncSend);
el('chat-input').addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg(false);});
let pickMode='chat';
function openPicker(mode){pickMode=mode;el('pk-h').textContent=mode==='read'?'Pilih foto tulisan':'Pilih foto';el('pk-p').textContent=mode==='read'?'Tekan foto yang ada tulisannya':'Tekan foto yang mau dikirim';ovShow('picker');}
el('btn-clip').addEventListener('click',()=>openPicker('chat'));
$$('[data-pick]').forEach(b=>b.addEventListener('click',()=>{
  const k=b.dataset.pick;
  if(pickMode==='read'){if(k!=='receipt'){toast('Cucu tidak menemukan tulisan di foto ini. Coba foto lain, ya.');return;}ovHide();startScan(true);return;}
  setAtt(k);ovHide();
}));
$$('[data-chat]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.chat==='scam'&&S.scamBlocked){toast('Pesan ini sudah diblokir. {sapaan} aman.');return;}openChat(b.dataset.chat);}));
enter.chat=()=>{if(CK==='scam'&&!S.scamBlocked)ovTimers.push(setTimeout(showScam,800));};
leave.chat=()=>{replyT.forEach(clearTimeout);replyT=[];$$('.typing',el('c-body')).forEach(n=>n.remove());};
function openConfirm(){const name=CH[CK].name();el('cf-img').src=IMG[att];el('cf-to').textContent=name;renderText();ovShow('cfs');say(T('Sebentar, {sapaan}. Mau kirim foto ini ke ')+name+', ya? Kalau sudah betul, tekan Ya, kirim.');}
el('cf-yes').addEventListener('click',()=>{ovHide();hush();sendMsg(true);});
el('cf-no').addEventListener('click',()=>{ovHide();hush();clearAtt();syncSend();toast('Foto tidak jadi dikirim.');});

/* ---------- scam ---------- */
function showScam(){if(ovOpen||cur!=='chat'||CK!=='scam')return;endGuide();renderPlus();ovShow('scam');
  say(T(S.plus?'Eh, hati-hati dulu, {sapaan}. Berkas ini sebenarnya aplikasi, bukan undangan. Kalau dipasang, penipu bisa membaca kode dari bank. Jangan dibuka, ya.':'Eh, hati-hati dulu, {sapaan}. Pesan ini kelihatannya mencurigakan. Jangan dibuka, ya.'));}
el('scam-close').addEventListener('click',()=>{
  ovHide();hush();S.scamBlocked=true;addLog('Pesan mencurigakan diblokir (Undangan.apk)','amber');
  el('row-scam').classList.add('blocked');el('scam-meta').innerHTML='<i class="chipline gray sm">'+icon('shield',15,2.2)+'Diblokir</i>';
  if(cur==='chat')back();toast('Pesan ditutup. {sapaan} aman.');
});
el('scam-ask').addEventListener('click',()=>{ovHide();hush();openHelp();});
el('sc-lock').addEventListener('click',()=>{ovHide();hush();go('plus');});

/* ---------- Tanya Cucu ---------- */
const FOTO=[
  {target:'#app-pesan',text:'Oke, {sapaan}. Pertama, tekan gambar Pesan yang hijau di bawah, ya.'},
  {target:'#row-budi',text:'Nah, sekarang tekan nama {anak}.'},
  {target:'#btn-clip',text:'Bagus. Tekan tombol tambah di kiri bawah.'},
  {target:'#pick-0',text:'Pilih fotonya. Tekan foto yang terang ini.',noptr:true},
  {target:'#btn-send',text:'Sedikit lagi. Tekan tombol kirim yang hijau.'},
  {target:'#cf-yes',text:'Aku bacakan dulu, ya. Kalau sudah betul, tekan Ya, kirim.',noptr:true}
];
function scenario(){
  const done={title:'Berhasil!',text:'Fotonya sudah sampai ke {anak}.'};
  if(cur==='home')return{q:'Cucu, bagaimana cara kirim foto ke {anak}?',steps:FOTO,i:0,shift:1,total:6,done};
  if(cur==='inbox')return{q:'Cucu, bagaimana cara kirim foto ke {anak}?',steps:FOTO,i:1,shift:0,total:5,done};
  if(cur==='chat'&&CK==='budi')return{q:'Cucu, bagaimana cara kirim foto ke {anak}?',steps:FOTO,i:att?4:2,shift:0,total:5,done};
  if(cur==='chat'&&CK==='sari')return{q:'Ini pesan dari siapa?',steps:[{text:'Ini dari Sari, cucu {sapaan}. Katanya minggu depan mau main ke rumah.'}]};
  if(cur==='chat')return{q:'Ini pesan dari siapa?',steps:[{text:'Nomor ini tidak dikenal, {sapaan}. Berkasnya jangan dibuka, ya.'}]};
  if(cur==='app'){const n=nextRem();return{q:'Kapan saya minum obat lagi?',steps:[{text:n?n.name+' diminum jam '+hhmm(n.time)+', '+n.meal.toLowerCase()+'. Nanti aku ingatkan, ya.':'Obat hari ini sudah diminum semua. Hebat, {sapaan}!'}]};}
  if(cur==='phone-list')return{q:'Bagaimana cara menelepon {anak}?',i:0,shift:1,total:1,steps:[{target:'#ct-budi',text:'Gampang, {sapaan}. Tekan nama {anak}, ya.'}]};
  if(cur==='camera')return{q:'Tolong bacakan tulisan ini.',i:0,shift:1,total:1,steps:[{target:'#shutter',text:'Arahkan kamera ke tulisannya, lalu tekan tombol bulat besar ini.'}]};
  return null;
}
function openListen(){
  if(ovOpen)return;endGuide();hush();closePanel();exitEdit();
  const sc=scenario();if(!sc){toast('Cucu bisa membantu di layar utama, Pesan, Telepon, atau Kamera.');return;}
  const words=('“'+T(sc.q)+'”').split(' ');
  el('l-title').textContent='Cucu mendengarkan…';
  const q=el('l-quote');q.textContent='';words.forEach((w,i)=>{const s=document.createElement('span');s.textContent=w;q.appendChild(s);if(i<words.length-1)q.appendChild(document.createTextNode(' '));});
  ovShow('listen');
  const sp=$$('span',q),gap=RM?40:220,t0=RM?100:750;
  sp.forEach((s,i)=>ovTimers.push(setTimeout(()=>s.classList.add('s'),t0+i*gap)));
  const end=t0+sp.length*gap;
  ovTimers.push(setTimeout(()=>{el('l-title').textContent='Oke, Cucu bantu, ya';},end+400));
  ovTimers.push(setTimeout(()=>{ovHide();startGuide(sc);},end+1200));
}

/* ---------- guide + tutorial ---------- */
const guide=el('guide'),gHole=el('g-hole'),gCard=el('g-card'),gLabel=el('g-label'),gArrow=el('g-arrow');
let G=null,gT=0;
function rel(n){const r=n.getBoundingClientRect(),p=phone.getBoundingClientRect();return{x:(r.left-p.left)/scale,y:(r.top-p.top)/scale,w:r.width/scale,h:r.height/scale};}
function startGuide(sc){G={steps:sc.steps,i:sc.i||0,shift:sc.shift||0,total:sc.total||0,done:sc.done||null,tour:!!sc.tour,rect:null,tries:0,pre:-1};showStep();}
function endGuide(){clearTimeout(gT);const wasTour=G&&G.tour;G=null;guide.classList.remove('on');if(wasTour)closePanel();}
function cardIn(){gCard.classList.remove('in');void gCard.offsetWidth;gCard.classList.add('in');}
function noPointer(){gLabel.hidden=true;gArrow.style.display='none';}
function cardTop(label){return '<div class="g-top"><img src="'+FACE+'" alt=""><span class="g-chip">'+label+'</span><button class="xbtn" id="g-x" aria-label="'+(G&&G.tour?'Tutup tutorial':'Tutup panduan')+'">'+icon('x',24,2.4)+'</button></div>';}
function bindX(){const x=$('#g-x',gCard);if(x)x.addEventListener('click',()=>{endGuide();hush();toast(G===null?'Panduan ditutup.':'',1400);});}
function showStep(){
  if(!G)return;
  const st=G.steps[G.i];
  if(!st)return showDone();
  if(st.pre&&G.pre!==G.i){G.pre=G.i;st.pre();gT=setTimeout(showStep,RM?60:460);return;}
  const t=st.target?$(st.target):null;let r=t?rel(t):null;
  if(st.target&&(!t||r.w<2||r.y>956||r.y+r.h<0)){
    if(G.tries++<10){gT=setTimeout(showStep,160);return;}
    G.tries=0;if(st.optional){G.i++;return showStep();}endGuide();return;
  }
  G.tries=0;
  const info=!st.target,text=T(st.text);
  const lab=G.tour?'Cara pakai, '+(G.steps.slice(0,G.i+1).length)+' dari '+G.total:(info?'Jawaban Cucu':'Langkah '+(G.i+G.shift)+' dari '+G.total);
  gCard.innerHTML=cardTop(lab)+'<p class="g-text"></p><div class="g-btns">'+(G.tour?'':'<button class="btn light" id="g-again">'+icon('volume',20,2)+'Ulangi</button>')+'<button class="btn primary" id="g-ok"></button></div>';
  $('.g-text',gCard).textContent=text;$('#g-ok',gCard).textContent=G.tour?'Lanjut':(info?'Mengerti':'Sudah');
  const again=$('#g-again',gCard);if(again)again.addEventListener('click',()=>say(text));
  bindX();$('#g-ok',gCard).addEventListener('click',advance);
  guide.classList.add('on');
  if(info){gHole.className='g-hole none';noPointer();G.rect=null;gCard.style.top='300px';}
  else{
    const pad=st.pad!=null?st.pad:6,cs=getComputedStyle(t).borderTopLeftRadius;let rad=parseFloat(cs)||0;if(/%/.test(cs))rad=Math.min(r.w,r.h)*rad/100;rad=Math.min(rad,Math.min(r.w,r.h)/2);
    const hx=r.x-pad,hy=r.y-pad,hw=r.w+pad*2,hh=r.h+pad*2;
    gHole.className='g-hole';Object.assign(gHole.style,{left:hx+'px',top:hy+'px',width:hw+'px',height:hh+'px',borderRadius:(rad+pad)+'px'});
    G.rect={x:hx,y:hy,w:hw,h:hh};
    const ch=gCard.offsetHeight||260,ringT=hy-12,ringB=hy+hh+12,cx=hx+hw/2;
    let top,where;
    if(ringT-60>=ch+120){top=ringT-120-ch;where='above';}
    else if(940-ringB>=ch+120){top=ringB+120;where='below';}
    else{where='none';top=(ringT-60>940-ringB)?Math.max(56,ringT-14-ch):Math.min(956-ch-20,ringB+14);}
    gCard.style.top=top+'px';
    if(where==='none'||st.noptr)noPointer();
    else{
      const lx=Math.max(80,Math.min(cx+50,360)),sg=lx>=cx?1:-1;let ly,sx,sy,ex,ey;
      if(where==='above'){ly=ringT-96;sx=lx+16*sg;sy=ly+22;ex=cx+(lx-cx)*.62;ey=ringT-12;}
      else{ly=ringB+96;sx=lx+16*sg;sy=ly-22;ex=cx+(lx-cx)*.62;ey=ringB+12;}
      gLabel.hidden=false;gLabel.textContent=G.tour?'Ini dia':'Tekan di sini';gLabel.style.left=lx+'px';gLabel.style.top=ly+'px';
      const dx=ex-sx,dy=ey-sy,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
      const rot=a=>[ux*Math.cos(a)-uy*Math.sin(a),ux*Math.sin(a)+uy*Math.cos(a)];const a=rot(.5),b=rot(-.5),hl=13;
      el('g-line').setAttribute('d','M'+sx+' '+sy+'L'+ex+' '+ey);
      el('g-headp').setAttribute('d','M'+(ex-a[0]*hl)+' '+(ey-a[1]*hl)+'L'+ex+' '+ey+'L'+(ex-b[0]*hl)+' '+(ey-b[1]*hl));
      gArrow.style.display='';gArrow.style.setProperty('--bx',(ux*5)+'px');gArrow.style.setProperty('--by',(uy*5)+'px');
    }
  }
  cardIn();say(text);
}
function advance(){
  if(!G)return;const st=G.steps[G.i];guide.classList.remove('on');hush();
  if(G.tour){G.i++;G.rect=null;gT=setTimeout(showStep,RM?60:280);return;}
  if(st&&st.target){const t=$(st.target);if(t)t.click();}
  if(!G)return;G.i++;G.rect=null;
  if(!st||!st.target){endGuide();return;}
  gT=setTimeout(showStep,RM?80:640);
}
function showDone(){
  if(!G.done){endGuide();return;}
  const d=G.done;if(d.pre)d.pre();
  gHole.className='g-hole none';noPointer();G.rect=null;
  gCard.innerHTML='<div class="g-done"><img src="'+FACE+'" alt="" class="pop"><h3></h3><p></p><button class="btn dark" id="g-fin"></button></div>';
  $('h3',gCard).textContent=T(d.title);$('p',gCard).textContent=T(d.text);$('#g-fin',gCard).textContent=d.btn||'Selesai';
  $('#g-fin',gCard).addEventListener('click',()=>{endGuide();hush();});
  gCard.style.top='290px';guide.classList.add('on');cardIn();
  say(T(d.say||('Yeay, berhasil! '+d.text)));
}
el('g-block').addEventListener('click',e=>{
  if(!G||!G.rect)return;
  const p=phone.getBoundingClientRect(),x=(e.clientX-p.left)/scale,y=(e.clientY-p.top)/scale,h=G.rect;
  if(x>=h.x-10&&x<=h.x+h.w+10&&y>=h.y-10&&y<=h.y+h.h+10){advance();return;}
  gLabel.classList.remove('shake');void gLabel.offsetWidth;gLabel.classList.add('shake');
});
const TOUR=[
  {target:'[data-w="rem"] .wcard',optional:true,text:'Ini widget pengingat. Jadwal minum obat {sapaan} muncul di sini.'},
  {target:'[data-w="ask"] .wcard',optional:true,text:'Kalau bingung, tekan Tanya Cucu lalu ngomong saja. Nanti aku pandu pelan-pelan.'},
  {target:'[data-w="sos"] .wcard',optional:true,text:'Kalau ada keadaan darurat, tahan tombol ini 3 detik. Aku langsung telepon {anak}.'},
  {target:'#at-btn',pad:8,text:'Ini aku, Cucu. Aku selalu ada di pinggir layar, di aplikasi apa pun. Tekan aku kalau butuh bantuan.'},
  {target:'#t-read',pre:openPanel,text:'Tulisannya kecil? Tekan Baca tulisan, lalu foto tulisannya. Nanti aku bacakan.'},
  {target:'#t-help',text:'Kalau masih bingung, tekan Minta bantuan. Layar {sapaan} dikirim ke {anak}.'}
];
function startTour(){if(ovOpen)ovHide();endGuide();exitEdit();startGuide({tour:true,steps:TOUR,i:0,total:TOUR.length,done:{title:'Sudah siap!',text:'Tutorial ini bisa dilihat lagi di Pengaturan CucuPintar.',btn:'Mulai pakai',say:'Sip, {sapaan} sudah siap. Kalau butuh apa-apa, panggil aku saja, ya.',pre:closePanel}});}

/* ---------- SOS ---------- */
const SOS={holding:false,raf:0,t0:0};const sosArc=el('sos-arc');
function sosIdle(msg){SOS.holding=false;cancelAnimationFrame(SOS.raf);el('soshold').classList.remove('holding');sosArc.style.transition='stroke-dashoffset .35s';sosArc.style.strokeDashoffset=748;el('sos-num').textContent='3';el('sos-keep').textContent='Tahan di sini';if(msg)toast(msg);}
function sosTick(now){
  if(!SOS.holding)return;const k=Math.min(1,(now-SOS.t0)/3000);
  sosArc.style.strokeDashoffset=748*(1-k);el('sos-num').textContent=Math.max(1,Math.ceil(3-k*3));
  if(k>=1){SOS.holding=false;el('soshold').classList.remove('holding');try{navigator.vibrate&&navigator.vibrate([90,60,90]);}catch(e){}go('sosactive',{replace:true});return;}
  SOS.raf=requestAnimationFrame(sosTick);
}
function holdStart(){if(SOS.holding||cur==='sosactive'||G||editing)return;if(ovOpen)ovHide();closePanel();if(cur!=='soshold')go('soshold');SOS.holding=true;SOS.t0=performance.now();el('soshold').classList.add('holding');sosArc.style.transition='none';el('sos-keep').textContent='Tetap tahan';try{navigator.vibrate&&navigator.vibrate(30);}catch(e){}SOS.raf=requestAnimationFrame(sosTick);}
function holdEnd(){if(SOS.holding)sosIdle('SOS belum aktif. Tahan penuh 3 detik ya.');}
phone.addEventListener('pointerdown',e=>{const h=e.target.closest('[data-hold]');if(!h||G||editing)return;e.preventDefault();clearTimeout(lpT);holdStart();});
document.addEventListener('pointerup',holdEnd);document.addEventListener('pointercancel',holdEnd);
phone.addEventListener('contextmenu',e=>{if(e.target.closest('[data-hold],#vn'))e.preventDefault();});
enter.soshold=()=>{if(!SOS.holding)sosIdle();};
leave.soshold=()=>{SOS.holding=false;cancelAnimationFrame(SOS.raf);el('soshold').classList.remove('holding');};
let sosT=0;
enter.sosactive=()=>{
  el('sos-timer').textContent='Berdering…';S.sos={t:nowT(),msg:null};addLog('SOS ditekan, menelepon {anak}','red');
  say(T('Tenang, {sapaan}. Aku sedang menelepon {anak}, dan lokasi {sapaan} sudah aku kirim.'));
  clearTimeout(sosT);sosT=setTimeout(()=>{if(cur==='sosactive'){addLog('Telepon SOS tidak diangkat','red');go('sosmiss',{replace:true});}},RM?1500:7000);
};
leave.sosactive=()=>clearTimeout(sosT);
el('sos-cancel').addEventListener('click',()=>{S.sos=null;back();toast('Panggilan darurat dibatalkan.');});
enter.sosmiss=()=>setTimeout(()=>{if(cur==='sosmiss')say(T('{anak} belum mengangkat. Tidak apa-apa, {sapaan}. Pilih pesan di bawah, atau tahan tombol merah untuk kirim pesan suara.'));},RM?0:400);
el('qmsg').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(b)sosSend('Pesan cepat',b.dataset.q);});
let vnT=0,vnS=0,vnOn=false;const vn=el('vn');
vn.addEventListener('pointerdown',e=>{e.preventDefault();try{vn.setPointerCapture(e.pointerId);}catch(x){}vnOn=true;vnS=0;vn.classList.add('rec');el('vn-t').hidden=false;el('vn-t').textContent='0:00';hush();vnT=setInterval(()=>{vnS++;el('vn-t').textContent='0:0'+Math.min(9,vnS);},1000);});
function vnEnd(){if(!vnOn)return;vnOn=false;clearInterval(vnT);vn.classList.remove('rec');el('vn-t').hidden=true;if(vnS<1){toast('Tahan lebih lama untuk merekam, ya.');return;}sosSend('Pesan suara','Rekaman suara, 0:0'+Math.min(9,vnS));}
['pointerup','pointercancel'].forEach(ev=>vn.addEventListener(ev,vnEnd));
el('sm-again').addEventListener('click',()=>go('sosactive',{replace:true}));
el('sm-close').addEventListener('click',goHome);
let ssT=[];
function sosSend(kind,text){if(S.sos)S.sos.msg={kind:kind,text:text};addLog(kind+' darurat dikirim: "'+text+'"','red');el('ss-kind').textContent=kind+' · '+nowT();el('ss-text').textContent=text;go('sossent',{replace:true});}
enter.sossent=()=>{
  const slot=el('ss-reply');slot.textContent='';ssT.forEach(clearTimeout);ssT=[];
  say(T('Pesannya sudah terkirim ke {anak} dan Sari, lengkap dengan lokasi {sapaan}.'));
  const mk=inner=>{slot.innerHTML='<div class="reply" style="top:520px"><span class="av">'+S.anak[0].toUpperCase()+'</span><div></div></div>';const d=$('.reply>div',slot);if(typeof inner==='string')d.textContent=inner;else d.appendChild(inner);};
  ssT.push(setTimeout(()=>{const t=document.createElement('div');t.className='bub typing';t.innerHTML='<i></i><i></i><i></i>';mk(t);},1400));
  ssT.push(setTimeout(()=>{const r=T('{sapaan} tunggu ya, {anak} ke sana sekarang.');mk(r);addLog('{anak} membalas: "'+r+'"');say(T('{anak} membalas. Katanya, ')+r);},3600));
};
leave.sossent=()=>{ssT.forEach(clearTimeout);ssT=[];};
el('ss-home').addEventListener('click',goHome);

/* ---------- camera + scanning ---------- */
const BOX=[[147,118,167,66],[117,217,218,24],[117,265,218,108],[117,393,218,39],[132,441,200,102]];
el('tboxes').innerHTML=BOX.map(b=>'<div class="tbox" style="left:'+b[0]+'px;top:'+b[1]+'px;width:'+b[2]+'px;height:'+b[3]+'px"></div>').join('');
let camT=[],scanRaf=0;
function camReset(){camT.forEach(clearTimeout);camT=[];cancelAnimationFrame(scanRaf);const c=el('camera');c.classList.remove('scanning');c.classList.add('live');el('det').classList.remove('on');$$('.tbox').forEach(b=>b.classList.remove('on'));const h=el('cam-hint');h.className='cam-hint';h.textContent='Arahkan kamera ke tulisan';}
enter.camera=()=>{renderPlus();camReset();camT.push(setTimeout(()=>{if(cur!=='camera')return;el('det').classList.add('on');const h=el('cam-hint');h.classList.add('ok');h.textContent='Tulisan terlihat. Tekan tombol bulat';},RM?100:1200));};
leave.camera=()=>{camT.forEach(clearTimeout);cancelAnimationFrame(scanRaf);};
function startScan(fromGallery){
  if(!S.plus&&S.quota<=0){ovShow('lock');say('Jatah baca hari ini sudah habis, ya.');return;}
  if(cur!=='camera')go('camera');
  camT.forEach(clearTimeout);camT=[];
  if(!fromGallery){const f=el('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}
  if(!S.plus)S.quota--;renderPlus();addLog('Membaca tulisan: struk belanja');
  const c=el('camera');c.classList.remove('live');c.classList.add('scanning');el('det').classList.add('on');
  const h=el('cam-hint');h.className='cam-hint';h.textContent='Tahan sebentar, ya…';
  const t0=performance.now(),D=RM?300:2600;
  (function f(now){const k=Math.min(1,(now-t0)/D);el('scan-bar').style.width=(k*100)+'%';el('scan-pct').textContent=Math.round(k*100)+'%';
    $$('.tbox').forEach((b,i)=>b.classList.toggle('on',k>(i+.5)/(BOX.length+1)));
    el('scan-lab').textContent=k<.35?'Mencari tulisan…':k<.85?'Membaca tulisan…':'Hampir selesai…';
    if(k<1)scanRaf=requestAnimationFrame(f);else camT.push(setTimeout(()=>go('reader'),300));})(t0);
}
el('shutter').addEventListener('click',()=>startScan(false));
el('cam-gal').addEventListener('click',()=>openPicker('read'));
const SENT=[
  {t:'Ini struk belanja dari Unggul Mart Antasari, tanggal 31 Oktober 2024.',s:'Ini struk belanja dari Unggul Mart Antasari, tanggal tiga puluh satu Oktober dua ribu dua puluh empat.'},
  {t:'Ada 4 barang. Totalnya Rp37.000.',s:'Ada empat barang. Totalnya tiga puluh tujuh ribu rupiah.'},
  {t:'Dibayar tunai Rp50.000, jadi kembaliannya Rp13.000.',s:'Dibayar tunai lima puluh ribu, jadi kembaliannya tiga belas ribu rupiah.'}];
let R=null,rRaf=0,rT=0;
function rdPaint(){
  $$('p',el('rd-txt')).forEach((p,i)=>p.classList.toggle('cur',!R.done&&i===R.i));
  el('rd-n').textContent=R.done?'Selesai, '+SENT.length+' kalimat':'Kalimat '+(R.i+1)+' dari '+SENT.length;
  el('rd-lab').textContent=R.done?'Selesai dibacakan':(R.paused?'Dijeda':'Sedang dibacakan');el('rd-state').classList.toggle('live',!R.done&&!R.paused);
  const pb=el('rd-pause');$('i',pb).innerHTML=icon(R.done||R.paused?'play':'pause',22,2.4);$('span',pb).textContent=R.done?'Putar lagi':(R.paused?'Lanjut':'Jeda');
  el('rd-slow').classList.toggle('act',R.rate<1);
}
const rdDur=i=>(1600+SENT[i].s.length*62)/R.rate;
function rdSpeak(){say(SENT[R.i].s,R.rate);}
function rdLoop(now){
  if(!R||cur!=='reader')return;const dt=Math.min(100,now-(R.last||now));R.last=now;
  if(!R.paused&&!R.done){R.el+=dt;const d=rdDur(R.i);
    if(R.el>=d){R.i++;R.el=0;if(R.i>=SENT.length){R.done=true;R.i=SENT.length-1;el('rd-fill').style.width='100%';rdPaint();}else{rdPaint();rdSpeak();}}
    if(!R.done)el('rd-fill').style.width=((R.i+Math.min(1,R.el/d))/SENT.length*100)+'%';}
  rRaf=requestAnimationFrame(rdLoop);
}
function rdStart(){R.i=0;R.el=0;R.done=false;R.paused=false;R.last=0;rdPaint();rdSpeak();cancelAnimationFrame(rRaf);rRaf=requestAnimationFrame(rdLoop);}
enter.reader=()=>{R={i:0,el:0,last:0,paused:false,rate:R?R.rate:1,done:false};el('rd-q').textContent=S.plus?'Plus':'Sisa '+S.quota+' kali';
  const box=el('rd-txt');box.textContent='';SENT.forEach(s=>{const p=document.createElement('p');p.textContent=s.t;box.appendChild(p);});
  el('rd-fill').style.width='0%';rdPaint();clearTimeout(rT);rT=setTimeout(rdStart,RM?50:700);};
leave.reader=()=>{clearTimeout(rT);cancelAnimationFrame(rRaf);};
el('rd-again').addEventListener('click',()=>{if(R)rdStart();});
el('rd-pause').addEventListener('click',()=>{if(!R)return;if(R.done){rdStart();return;}R.paused=!R.paused;if(R.paused)hush();else{R.el=0;rdSpeak();}rdPaint();});
el('rd-slow').addEventListener('click',()=>{if(!R)return;R.rate=R.rate<1?1:.75;rdPaint();if(!R.paused&&!R.done){R.el=0;rdSpeak();}toast(R.rate<1?'Dibacakan lebih pelan.':'Kecepatan biasa.',1600);});

/* ---------- minta bantuan ---------- */
function openHelp(){
  if(cur==='help'||cur==='helpsent')return;if(ovOpen)ovHide();endGuide();closePanel();exitEdit();
  const src=el(cur),th=el('thumb');$$('.clone',th).forEach(n=>n.remove());
  const c=src.cloneNode(true);c.classList.add('clone');c.classList.remove('on');c.setAttribute('aria-hidden','true');c.inert=true;c.removeAttribute('id');$$('[id]',c).forEach(n=>n.removeAttribute('id'));
  const k=.6;Object.assign(c.style,{inset:'auto',left:'0',top:'0',width:'440px',height:'956px',zIndex:0,transform:'scale('+k+') translate('+((360/k-440)/2)+'px,-60px)'});
  if(src.id==='home'){c.style.background=getComputedStyle(src).backgroundImage;}
  th.prepend(c);S.helpFrom=src.id;go('help');
}
leave.help=()=>{setTimeout(()=>{if(cur!=='help')$$('.clone',el('thumb')).forEach(n=>n.remove());},400);};
el('help-send').addEventListener('click',()=>{const b=el('help-send');b.classList.remove('fly');void b.offsetWidth;b.classList.add('fly');S.help={t:nowT(),from:S.helpFrom};addLog('{sapaan} minta bantuan, foto layar dikirim','blue');setTimeout(()=>go('helpsent',{replace:true}),RM?0:300);});
let hsT=[];
enter.helpsent=()=>{
  const slot=el('reply-slot');slot.textContent='';hsT.forEach(clearTimeout);hsT=[];
  say(T('Sudah aku kirim ke {anak}. Tunggu sebentar, ya, {sapaan}.'));
  const mk=inner=>{slot.innerHTML='<div class="reply" style="top:430px"><span class="av">'+S.anak[0].toUpperCase()+'</span><div></div></div>';const d=$('.reply>div',slot);if(typeof inner==='string')d.textContent=inner;else d.appendChild(inner);};
  hsT.push(setTimeout(()=>{const t=document.createElement('div');t.className='bub typing';t.innerHTML='<i></i><i></i><i></i>';mk(t);},1100));
  hsT.push(setTimeout(()=>{mk(T('Baik, {sapaan}. {anak} lihat layarnya, sebentar ya.'));},3100));
};
leave.helpsent=()=>{hsT.forEach(clearTimeout);hsT=[];};
el('help-done').addEventListener('click',back);

/* ---------- telepon ---------- */
let CALL={name:'Budi',av:''},callT=0,callInt=0;
$$('[data-call]').forEach(b=>b.addEventListener('click',()=>{CALL={name:b.dataset.call==='Budi'?S.anak:b.dataset.call,av:b.dataset.av||''};go('call');}));
const mmss=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
enter.call=()=>{const sc=el('call');sc.classList.remove('live');const a=el('cl-av');a.className='av cl-av'+(CALL.av?' '+CALL.av:'');a.textContent=CALL.name.replace(/^Bu /,'')[0].toUpperCase();
  el('cl-h').textContent='Memanggil '+CALL.name+'…';el('cl-s').textContent='Berdering';clearTimeout(callT);clearInterval(callInt);
  callT=setTimeout(()=>{sc.classList.add('live');el('cl-h').textContent=CALL.name;let s=0;el('cl-s').textContent='00:00';callInt=setInterval(()=>{el('cl-s').textContent=mmss(++s);},1000);},2600);};
leave.call=()=>{clearTimeout(callT);clearInterval(callInt);};
el('call-end').addEventListener('click',()=>{back();toast('Telepon ditutup.',1800);});

/* ---------- HP keluarga ---------- */
function renderFamily(){
  renderText();
  el('fm-plan').textContent=S.plus?'Plus aktif':'Paket gratis';
  let a='';
  if(S.sos)a+='<div class="fm-alert red"><span class="ic-c gl g-red" style="font:700 12px/1 var(--font)">SOS</span><div class="tx"><b>'+T('{sapaan} menekan SOS, ')+S.sos.t+'</b><p>'+(S.sos.msg?S.sos.msg.kind+': “'+S.sos.msg.text+'”':'Telepon belum terjawab.')+'<br>Lokasi: Jl. Kebon Jeruk IV No. 1</p><button class="btn danger" data-fm="call">'+icon('phone-f',18,0)+T('Telepon {sapaan}')+'</button></div></div>';
  if(S.help)a+='<div class="fm-alert blue"><span class="ic-c gl g-blue">'+icon('users',22,2.2)+'</span><div class="tx"><b>'+T('{sapaan} minta bantuan, ')+S.help.t+'</b><p>Foto layar '+({chat:'Pesan',home:'layar utama',inbox:'Pesan',camera:'Kamera',app:'CucuPintar'}[S.help.from]||'HP')+' dikirim lewat WhatsApp.</p><button class="btn primary" data-fm="call">'+icon('phone-f',18,0)+'Telepon dan bantu</button></div></div>';
  el('fm-alerts').innerHTML=a;
  el('fm-rem').innerHTML=S.rem.map(r=>remRow(r,true)).join('')+'<button class="grow add" id="fm-add"><span class="sq" style="background:var(--brand-l);color:var(--brand-d);display:grid;place-items:center">'+icon('plus',20,2.6)+'</span><span class="tx"><b>Tambah pengingat</b></span></button>';
  el('fm-sec').innerHTML=(S.scamBlocked?'<div class="grow"><span class="sq gl g-red">'+icon('shield',20,2.2)+'</span><span class="tx"><b>1 pesan mencurigakan diblokir</b><small>'+(S.plus?'Undangan.apk dari +62 857 2210 7745. Modus berkas aplikasi untuk mencuri kode OTP bank.':'Dari +62 857 2210 7745')+'</small></span>'+(S.plus?'':'<button class="plus-tag" data-go="plus">DETAIL</button>')+'</div>'
      :'<div class="grow"><span class="sq gl g-brand">'+icon('shield',20,2.2)+'</span><span class="tx"><b>Belum ada pesan berbahaya</b><small>CucuPintar memeriksa pesan yang masuk</small></span></div>')+
    '<div class="grow"><span class="sq gl g-orange">'+icon('scan',20,2.2)+'</span><span class="tx"><b>Baca tulisan</b><small>'+(S.plus?'Tanpa batas dengan Plus':'Dipakai '+(QUOTA-S.quota)+' dari '+QUOTA+' kali hari ini')+'</small></span></div>';
  el('fm-log').innerHTML=S.log.slice().reverse().map(l=>'<div class="ev '+(l.c||'')+'"><small>'+l.t+'</small>'+T(l.txt)+'</div>').join('');
}
enter.family=()=>{renderFamily();el('fm-scroll').scrollTop=0;};
document.addEventListener('click',e=>{
  if(e.target.closest('[data-fm="call"],#fm-call')){toast('Menelepon {sapaan}… (demo)');return;}
  if(e.target.closest('#fm-msg')){toast('Membuka WhatsApp {sapaan}… (demo)');return;}
  if(e.target.closest('#fm-loc')){toast('{sapaan} ada di rumah, Jl. Kebon Jeruk IV No. 1.');return;}
  if(e.target.closest('#fm-add,#fm-edit-rem')){openRemEdit(null);}
});

/* ---------- home bar ---------- */
function goHome(){if(ovOpen)ovHide();endGuide();closePanel();go('home',{fresh:true});}
const SETUP=['ob1','ob2','ob3','setup1','setup2','setup3','setup4','ready'];
hb.addEventListener('click',()=>{if(editing){exitEdit();return;}if(SETUP.indexOf(cur)<0)goHome();});
hb.addEventListener('keydown',e=>{if(e.key==='Enter'&&SETUP.indexOf(cur)<0)goHome();});

/* ---------- demo rail ---------- */
function clean(){if(ovOpen)ovHide();endGuide();closePanel();exitEdit();hush();SOS.holding=false;}
function jump(id,h,o){clean();hist.length=0;(h||[]).forEach(x=>hist.push(x));go(id,Object.assign({replace:true},o||{}));}
const JUMP={
  awal(){clean();resetChats();resetData();R=null;S.toured=false;S.widgets=['rem','ask','sos'];setPlus(false);at.style.left='';at.style.top='';hist.length=0;go('ob1',{replace:true,dir:'back'});},
  home(){S.toured=true;goHome();},
  tutorial(){S.toured=true;goHome();setTimeout(startTour,RM?50:500);},
  edit(){S.toured=true;goHome();setTimeout(enterEdit,RM?50:450);},
  tanya(){S.toured=true;goHome();setTimeout(openListen,RM?50:600);},
  scam(){S.toured=true;resetChats();CK='scam';renderChat();jump('chat',['home','inbox']);},
  sos(){S.toured=true;jump('soshold',['home']);},
  obat(){S.toured=true;const n=nextRem()||S.rem[1];n.done=false;renderReminders();alarmFor(n);jump('alarm',['home']);},
  baca(){S.toured=true;jump('camera',['home']);},
  bantuan(){S.toured=true;resetChats();CK='budi';renderChat();jump('chat',['home','inbox']);setTimeout(openHelp,RM?50:700);},
  app(){S.toured=true;jump('app',['home']);},
  plus(){S.toured=true;jump('plus',['home','app']);},
  family(){S.toured=true;jump('family',['home']);}
};
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>JUMP[b.dataset.jump]()));


/* onboarding: pembuka + suara tiap slide */
let obIntro=true;const _ob1=enter.ob1;
enter.ob1=()=>{const s=el('ob1');if(obIntro&&!RM){obIntro=false;s.classList.add('intro');setTimeout(()=>{_ob1&&_ob1();},3500);}else{s.classList.remove('intro');_ob1&&_ob1();}};
el('ob-intro').addEventListener('click',()=>el('ob1').classList.remove('intro'));
enter.ob2=()=>setTimeout(()=>{if(cur==='ob2')say('Bantuan Cucu ada di layar utama. Tekan maskot Cucu kapan saja.');},700);
enter.ob3=()=>setTimeout(()=>{if(cur==='ob3')say('Keluarga ikut menjaga, jadi Oma lebih aman dan tenang.');},700);

/* suara: pilihan & coba */
try{el('vsel').addEventListener('change',e=>{voicePref=e.target.value;try{localStorage.setItem('cp-voice',voicePref);}catch(_){}fillVoices();say('Halo Oma, ini suara Cucu. Enak didengar, ya?',1,true);});
el('vtry').addEventListener('click',()=>say('Halo Oma, aku Cucu. Jam 13.00 nanti waktunya minum obat gula, ya. Pelan-pelan saja, aku temani.',1,true));fillVoices();
const paintVs=()=>document.querySelectorAll('.vseg button').forEach(b=>b.classList.toggle('on',b.dataset.vs===vStyle));paintVs();
document.querySelectorAll('.vseg button').forEach(b=>b.addEventListener('click',()=>{vStyle=b.dataset.vs;try{localStorage.setItem('cp-vstyle',vStyle);}catch(_){}paintVs();say(vStyle==='remaja'?'Halo Oma! Aku Cucu, siap bantu kapan saja.':'Halo Oma, aku Cucu. Senang bisa menemani.',1,true);}));}catch(e){}
renderText();renderPlus();renderReminders();renderHome();syncNav();enter.ob1();
window.__cp={go:go,jump:k=>JUMP[k](),setPlus:setPlus,enterEdit:enterEdit,state:()=>({cur:cur,hist:hist.slice(),ov:ovOpen,panel:panelOpen,guide:G?G.i:null,tour:!!(G&&G.tour),plus:S.plus,quota:S.quota,widgets:S.widgets.slice(),editing:editing,rem:S.rem.map(r=>r.name+(r.done?'✓':''))})};
})();
