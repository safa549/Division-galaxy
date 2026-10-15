const $=s=>document.querySelector(s),R=n=>Math.floor(Math.random()*n),pick=a=>a[R(a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LESSON='Use Multiplication to Divide with 2, 3, 4, and 5';
const LV=[{n:'Moon Base — Multiplication Power',p:'🌙',h:'🤖',b:'Moon Math Rookie',o:'Use multiplication facts to solve division. Hints are here to help!'},
{n:'Planet Equation — Horizontal Division',p:'🪐',h:'🛸',b:'Planet Equation Expert',o:'Solve horizontal division equations. Type each answer.'},
{n:'Rocket Control — Vertical Division',p:'🚀',h:'🧑‍🚀',b:'Rocket Division Commander',o:'Fill in the quotient below the line on the control panel.'},
{n:'Alien Math Lab — Identify the Parts',p:'👽',h:'🔬',b:'Galactic Math Champion',o:'Find the dividend, divisor and quotient in each equation.'}];
const SK=[['mult','Multiplication facts'],['d2','Dividing by 2'],['d3','Dividing by 3'],['d4','Dividing by 4'],['d5','Dividing by 5'],['horiz','Horizontal equations'],['vert','Vertical equations'],['dividend','Identifying the dividend'],['divisor','Identifying the divisor'],['quotient','Identifying the quotient']];
const GOOD=['Amazing, Space Explorer!','Mission Success!','You found the correct answer!','Your spaceship is ready for takeoff!'];
let S;const fresh=()=>({name:'',qs:[],i:0,log:[],score:0,hints:0,t0:0,t1:0,mode:'main',pr:null});S=fresh();
// sky
{const k=$('#sky');for(let i=0;i<70;i++){const e=document.createElement('i');e.className='st';e.style.cssText=`left:${R(100)}%;top:${R(100)}%;animation-delay:${R(30)/10}s`;k.appendChild(e)}
['🪐','🌍','☄️','🛰️','🚀'].forEach((x,i)=>{const e=document.createElement('span');e.className='fl';e.textContent=x;e.style.cssText=`left:${[5,88,80,8,45][i]}%;top:${[70,12,65,15,88][i]}%;animation-delay:${i}s`;k.appendChild(e)})}
// question makers
const opts=a=>{const s=new Set([a]);while(s.size<4){const v=a+R(7)-3;if(v>0)s.add(v)}return shuf([...s])};
const inp=()=>'<input id="in" inputmode="numeric" maxlength="3" aria-label="answer" autocomplete="off">';
const base=(lvl,d,q,o)=>Object.assign({lvl,d,q,n:d*q,ans:q},o);
function mk1(d,q){const n=d*q;return base(1,d,q,{kind:'mc',prompt:'Use multiplication to solve!',html:`<div class="eq">${n} ÷ ${d} = ?</div>`,choices:opts(q),hint:`${d} × ? = ${n}`,txt:`${n} ÷ ${d} = ?`,tags:['mult','d'+d]})}
function mk2(d,q){const n=d*q;return base(2,d,q,{kind:'type',prompt:'Solve the equation. Think of a multiplication fact!',html:`<div class="eq">${n} ÷ ${d} = ${inp()}</div>`,hint:`${d} × ? = ${n}`,txt:`${n} ÷ ${d} = ?`,tags:['horiz','d'+d]})}
const vert=(n,d,a,col)=>`<div class="vert"><span></span><span class="n ${col?'c1':''}">${n}</span><span class="op">÷</span><span class="n ${col?'c2':''}">${d}</span><span class="ln"></span><span></span><span class="n ${col?'c3':''}">${a}</span></div>`;
function mk3(d,q){const n=d*q;return base(3,d,q,{kind:'type',prompt:'Fuel up! Type the quotient below the line.',html:vert(n,d,inp()),hint:`${d} × ? = ${n}`,txt:`${n} ÷ ${d} = ?`,tags:['vert','d'+d]})}
function mk4(d,q,part,fmt){const n=d*q;const eq=part==='comp'?{n,d,q:'?'}:{n,d,q};let html;
 if(fmt)html=vert(eq.n,eq.d,eq.q,1);else html=`<div class="eq"><span class="c1">${eq.n}</span> ÷ <span class="c2">${eq.d}</span> = <span class="c3">${eq.q}</span></div>`;
 const P={dividend:['Find the dividend.',n,'The dividend is the number being divided.'],divisor:['Find the divisor.',d,'The divisor is the number we divide by.'],quotient:['Find the quotient.',q,'The quotient is the answer to the division.'],comp:['Choose the correct quotient to complete the equation.',q,`${d} × ? = ${n}`]}[part];
 return base(4,d,q,{kind:'mc',prompt:P[0],html,ans:P[1],choices:part==='comp'?opts(q):shuf([n,d,q]),hint:part==='comp'?P[2]:P[2]+` Check: ${d} × ${q} = ${n}.`,txt:part==='comp'?`${n} ÷ ${d} = ?`:`In ${n} ÷ ${d} = ${q}, ${P[0].toLowerCase()}`,tags:[part==='comp'?'quotient':part,'d'+d]})}
const P=(ds,qs,f)=>{const a=[];ds.forEach(d=>qs.forEach(q=>{if(!f||f(d,q))a.push([d,q])}));return a};
const take=(a,n)=>shuf(a).slice(0,n).sort((x,y)=>x[0]*x[1]-y[0]*y[1]);
function build(){const pt=shuf(['dividend','divisor','quotient','comp','divisor','dividend']);
 return[...take(P([2,3,4,5],[2,3,4,5]),6).map(a=>mk1(...a)),...take(P([2,3,4,5],[4,5,6,7,8,9],(d,q)=>d*q>=14&&d*q<=45),6).map(a=>mk2(...a)),...take(P([2,3,4,5],[5,6,7,8,9,10]),6).map(a=>mk3(...a)),...take(P([2,3,4,5],[3,4,5,6,7,8,9,10],(d,q)=>d!==q),6).map((a,i)=>mk4(a[0],a[1],pt[i],R(2)))]}
function pq(tag){const d=/^d\d$/.test(tag)?+tag[1]:pick([2,3,4,5]);let q=3+R(8);if(q===d)q++;
 if(tag==='mult')return mk1(d,2+R(5));if(tag==='horiz')return mk2(d,q);if(tag==='vert')return mk3(d,q);
 if(/^d\d$/.test(tag))return R(2)?mk2(d,q):mk3(d,q);return mk4(d,q,tag,R(2))}
// screens
const show=id=>{document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id===id));scrollTo(0,0)};
$('#go').onclick=()=>{const v=$('#nm').value.trim();if(v.length<2){$('#nmerr').textContent='Please type your full name to launch!';return}S=fresh();S.name=v;S.qs=build();S.log=S.qs.map(()=>({tries:0,first:null,final:false,hint:false,done:false}));S.t0=Date.now();show('s-acad')};
$('#nm').onkeydown=e=>{if(e.key==='Enter')$('#go').click()};
$('#got').onclick=()=>brief(1);
function brief(l){const m=LV[l-1];document.body.className='lv'+l;$('#b-pl').textContent=m.p;$('#b-nm').textContent='Mission '+l+': '+m.n;$('#b-ob').textContent=m.o;$('#b-hp').textContent=m.h+' Good luck, '+S.name+'!';show('s-brief')}
$('#b-go').onclick=()=>{show('s-game');render()};
function hud(){const L=S.log,c=L.filter(x=>x.final).length;$('#h-sc').textContent=S.mode==='main'?S.score:S.pr.score;$('#h-st').textContent=c;const d=S.i+(L[S.i]&&L[S.i].done?1:0);$('#h-pr').style.width=d/S.qs.length*100+'%';$('#h-fu').style.width=c/S.qs.length*100+'%'}
function render(){const q=S.qs[S.i],m=LV[q.lvl-1];document.body.className='lv'+q.lvl;$('#h-name').textContent=S.name;
 $('#h-mis').textContent=(S.mode==='main'?'Mission '+q.lvl:'Practice')+' • '+m.p+' '+m.n.split(' — ')[0];$('#h-q').textContent='Question '+(S.i+1)+' of '+S.qs.length;
 $('#helper').textContent=m.h;$('#qp').textContent=q.prompt;$('#qb').innerHTML=q.html;$('#fb').textContent='';$('#fb').className='';
 const ch=$('#chs');ch.innerHTML='';if(q.kind==='mc')q.choices.forEach(v=>{const b=document.createElement('button');b.className='ch';b.textContent=v;b.onclick=()=>answer(v,b);ch.appendChild(b)});
 $('#chk').hidden=q.kind!=='type';$('#nx').hidden=true;$('#hint').hidden=false;if(q.kind==='type')$('#in').focus();hud()}
function rocket(){const e=document.createElement('div');e.className='rk';e.textContent='🚀';e.style.left=10+R(80)+'%';document.body.appendChild(e);setTimeout(()=>e.remove(),1700)}
function answer(v,btn){const q=S.qs[S.i],L=S.log[S.i];if(L.done||isNaN(v))return;L.tries++;const ok=v===q.ans,fb=$('#fb');if(L.tries===1)L.first=ok;
 if(ok){L.final=L.done=true;if(S.mode==='main')S.score+=10;else S.pr.score+=10;fb.className='good';fb.textContent='⭐ '+pick(GOOD);if(btn)btn.classList.add('ok');rocket()}
 else if(L.tries===1){fb.className='bad';fb.textContent=`Don't give up, Astronaut! Let's try another calculation. Hint: ${q.hint}`;if(btn){btn.classList.add('bad');btn.disabled=true}else{$('#in').select()}}
 else{L.done=true;fb.className='bad';fb.textContent=`Not yet — the answer is ${q.ans}. ${q.n} = ${q.d} × ${q.q}, so ${q.n} ÷ ${q.d} = ${q.q}. Let's keep going!`;document.querySelectorAll('.ch').forEach(b=>{b.disabled=true;if(+b.textContent===q.ans)b.classList.add('ok')})}
 if(L.done){document.querySelectorAll('.ch').forEach(b=>b.disabled=true);$('#nx').hidden=false;$('#chk').hidden=true;$('#hint').hidden=true;$('#nx').textContent=S.i===S.qs.length-1?'Finish ➜':'Next ➜'}hud()}
$('#hint').onclick=()=>{const q=S.qs[S.i],L=S.log[S.i];if(L.done)return;if(!L.hint){L.hint=true;if(S.mode==='main')S.hints++;else S.pr.hints++}$('#fb').className='bad';$('#fb').textContent='💡 Hint: '+q.hint};
$('#chk').onclick=()=>{const e=$('#in');if(!e||e.value.trim()==='')return;answer(parseInt(e.value,10))};
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='in')$('#chk').click()});
$('#nx').onclick=()=>{const last=S.i===S.qs.length-1;if(S.mode==='practice'){if(last)endPractice();else{S.i++;render()}return}
 const q=S.qs[S.i];if(last||S.qs[S.i+1].lvl!==q.lvl)badge(q.lvl,last);else{S.i++;render()}};
function badge(l,last){const c=S.qs.map((x,i)=>x.lvl===l&&S.log[i].final).filter(Boolean).length,t=S.qs.filter(x=>x.lvl===l).length;$('#bd-t').textContent='🏅 Badge earned: '+LV[l-1].b+'!';$('#bd-s').textContent=`${S.name}, you solved ${c} of ${t} questions in Mission ${l}.`;
 $('#bd-go').textContent=last?'See Mission Report ➜':'Next Mission ➜';$('#bd-go').onclick=()=>{if(last)finish();else{S.i++;brief(S.qs[S.i].lvl)}};show('s-badge')}
// report
function stat(tag){let n=0,f=0,c=0;S.qs.forEach((q,i)=>{const L=S.log[i];if(q.tags.includes(tag)&&L.tries>0){n++;if(L.first)f++;if(L.final)c++}});return{n,f,c}}
const pc=(a,b)=>b?Math.round(a/b*100):null;
function tier(a){return a>=90?['Galactic Math Champion','Excellent understanding!']:a>=75?['Planet Explorer','Great progress!']:a>=50?['Rising Astronaut','Keep practicing!']:['Space Academy Trainee',"Let's learn and try again!"]}
const fmtT=ms=>Math.floor(ms/60000)+' min '+Math.floor(ms/1000)%60+' sec';
function data(){const A=S.log.filter(l=>l.tries>0).length,C=S.log.filter(l=>l.final).length,F=S.log.filter(l=>l.first).length;
 const sk=SK.map(([t,l])=>{const s=stat(t),fp=pc(s.f,s.n);return{t,l,...s,fp,cp:pc(s.c,s.n),st:s.n===0?'Not assessed':fp>=80?'Mastered':'Needs improvement'}});
 return{A,C,F,I:A-C,acc:pc(C,A),fa:pc(F,A),sk,time:fmtT((S.t1||Date.now())-S.t0),when:new Date(S.t1||Date.now()).toLocaleString()}}
function finish(){S.t1=Date.now();document.body.className='lv4';report();show('s-rep')}
function report(){const D=data(),T=D.acc===null?['No answers yet','Complete the mission to see results.']:tier(D.acc),ms=D.sk.filter(s=>s.st==='Mastered'),ws=D.sk.filter(s=>s.st==='Needs improvement');
 const msg=D.A===0?'No answers were recorded.':`${esc(S.name)}, you answered ${D.C} of ${D.A} correctly and got ${D.F} right on the first try${S.hints?`, using ${S.hints} hint${S.hints>1?'s':''}`:' without any hints'}. ${D.fa<D.acc?'Many answers needed a second try, so more practice will build independence. ':'You solved most problems independently. '}${ws.length?'Keep working on: '+ws.map(s=>s.l.toLowerCase()).join(', ')+'.':'You showed strong skills across the board!'}`;
 const rec=ws.slice(0,4).map(s=>{const u=new Set();for(let k=0;k<30&&u.size<3;k++)u.add(pq(s.t).txt);return`<li><b>${s.l}:</b> ${[...u].join(' &nbsp;|&nbsp; ')}</li>`}).join('');
 $('#rep').innerHTML=`<div class="c"><div class="big">🧑‍🚀</div><h1>Mission Complete!</h1><h2>${esc(S.name)}</h2><p>${LESSON}</p></div>
<p><b>Date/time:</b> ${D.when} &nbsp; <b>Total time:</b> ${D.time}</p>
<h2>🌟 ${T[0]} — ${T[1]}</h2>
<table><tr><td>Questions attempted</td><td>${D.A} of ${S.qs.length}</td></tr><tr><td>Correct / Incorrect</td><td>${D.C} / ${D.I}</td></tr><tr><td>Score</td><td>${S.score} of ${S.qs.length*10}</td></tr><tr><td>Accuracy (final)</td><td>${D.acc===null?'—':D.acc+'%'}</td></tr><tr><td>First-attempt accuracy</td><td>${D.fa===null?'—':D.fa+'%'}</td></tr><tr><td>Hints used</td><td>${S.hints}</td></tr></table>
<h2>Skill Analysis</h2><table><tr><th>Skill</th><th>First try</th><th>Final</th><th>Status</th></tr>${D.sk.map(s=>`<tr><td>${s.l}</td><td>${s.n?s.f+'/'+s.n+' ('+s.fp+'%)':'—'}</td><td>${s.n?s.c+'/'+s.n+' ('+s.cp+'%)':'—'}</td><td class="${s.st==='Mastered'?'m':'w'}">${s.st}</td></tr>`).join('')}</table>
<p style="font-size:.9rem">Mastered = at least 80% correct on the first try. Skills overlap (one question can count toward several skills).</p>
<h2>Personalized Feedback</h2><p><b>Mastered:</b> ${ms.length?ms.map(s=>s.l).join(', '):'None yet'}</p><p><b>Needs improvement:</b> ${ws.length?ws.map(s=>s.l).join(', '):'None'}</p>${rec?`<p><b>Recommended practice:</b></p><ul>${rec}</ul>`:''}<p>${msg}</p>${S.pr?`<p><b>Latest practice round:</b> ${S.pr.score/10} of ${S.pr.total} correct, ${S.pr.hints} hint(s).</p>`:''}`}
// tools
$('#pr').onclick=()=>{try{print()}catch(e){$('#dlmsg').textContent='Printing is not available in this view. Open the page in its own browser tab to print.'}};
$('#rs').onclick=()=>{S=fresh();$('#nm').value='';$('#nmerr').textContent='';$('#dlmsg').textContent='';document.body.className='';show('s-reg')};
$('#wk').onclick=()=>{const D=data(),pool=D.sk.filter(s=>s.n>0).sort((a,b)=>a.fp-b.fp||a.cp-b.cp).slice(0,3);if(!pool.length){$('#dlmsg').textContent='Finish some questions first.';return}
 const qs=[];pool.forEach(s=>{for(let k=0;k<2;k++)qs.push(pq(s.t))});const t=qs.length;S.mode='practice';S.qs=shuf(qs);S.pr={score:0,hints:0,total:t};S.i=0;S.main=S.log;S.log=S.qs.map(()=>({tries:0,first:null,final:false,hint:false,done:false}));S.pLog=S.log;show('s-game');render()};
function endPractice(){S.mode='main';S.log=S.main;S.qs=S.main.qs||S.qs;restoreMain()}
function restoreMain(){S.qs=S.mainQs;report();show('s-rep')}
// keep main questions safe when practicing
const _wk=$('#wk').onclick;$('#wk').onclick=()=>{S.mainQs=S.qs;_wk()};
$('#dl').onclick=async()=>{const D=data(),q=v=>'"'+String(v).replace(/"/g,'""')+'"',r=[['Student',S.name],['Lesson',LESSON],['Completed',D.when],['Total time',D.time],['Questions attempted',D.A],['Correct',D.C],['Incorrect',D.I],['Score',S.score+' of '+S.qs.length*10],['Accuracy %',D.acc??''],['First-attempt accuracy %',D.fa??''],['Hints used',S.hints],[],['Skill','First-try correct','Attempted','Final correct','First-try %','Final %','Status'],...D.sk.map(s=>[s.l,s.f,s.n,s.c,s.fp??'',s.cp??'',s.st]),[],['Question','Mission','Skills','Correct on first try','Final correct','Tries','Hint used'],...S.qs.map((x,i)=>{const L=S.log[i];return[x.txt,x.lvl,x.tags.join(' '),L.tries?(L.first?'Yes':'No'):'Not answered',L.tries?(L.final?'Yes':'No'):'Not answered',L.tries,L.hint?'Yes':'No']})];
 const csv='\ufeff'+r.map(a=>a.map(q).join(',')).join('\r\n'),name='mission-report-'+S.name.replace(/\W+/g,'_')+'.csv',blob=new Blob([csv],{type:'text/csv'});
 try{const d=window.claude&&await claude.use('downloads');if(d){await d.save({filename:name,data:blob});$('#dlmsg').textContent='';return}}catch(e){if(e&&e.code==='declined')return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();$('#dlmsg').textContent='If no file appeared, open this page in its own browser tab and try again.'};
