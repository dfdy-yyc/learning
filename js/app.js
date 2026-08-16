/* ================= 工具 ================= */
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const pct=(a,b)=>b?Math.round(a/b*100):0;
const prefersReducedMotion=()=>!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ================= 状态 ================= */
const KEY='algo_hub_v1';
const QTARGET=Math.ceil(QUIZ.length*0.8);
const DEF={theme:null,track:'foundation',ck:{},tp:{},cards:{},quizBest:-1,days:{},path:{},quest:{algo:{},sql:{},hot100:{},sql50:{}}};
const TRACK_MIGRATION={fast:'recommend',full:'recommend'};
const PROGRESS_FORMAT='algo-handbook-progress';
const PROGRESS_VERSION=1;

function plainRecord(value){
  if(!value||typeof value!=='object'||Array.isArray(value))return {};
  return Object.fromEntries(Object.entries(value).filter(([key])=>!['__proto__','prototype','constructor'].includes(key)));
}

function normalizeProgressState(value){
  const source=plainRecord(value),quest=plainRecord(source.quest);
  const state={
    theme:source.theme==='dark'||source.theme==='light'?source.theme:null,
    track:typeof source.track==='string'?source.track:DEF.track,
    ck:plainRecord(source.ck),
    tp:plainRecord(source.tp),
    cards:plainRecord(source.cards),
    quizBest:Number.isFinite(source.quizBest)?source.quizBest:DEF.quizBest,
    days:plainRecord(source.days),
    path:plainRecord(source.path),
    quest:{
      algo:plainRecord(quest.algo),
      sql:plainRecord(quest.sql),
      hot100:plainRecord(quest.hot100),
      sql50:plainRecord(quest.sql50)
    }
  };
  if(TRACK_MIGRATION[state.track])state.track=TRACK_MIGRATION[state.track];
  if(!ROADMAPS[state.track])state.track=DEF.track;
  return state;
}

let S;
try{S=normalizeProgressState(JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){S=normalizeProgressState({});}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}

function progressStateFromPayload(payload){
  const parsed=typeof payload==='string'?JSON.parse(payload):payload;
  if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error('进度 JSON 必须是对象');
  if(parsed.format!==undefined){
    if(parsed.format!==PROGRESS_FORMAT||parsed.version!==PROGRESS_VERSION)throw new Error('不支持的进度 JSON 版本');
    if(!parsed.state||typeof parsed.state!=='object'||Array.isArray(parsed.state))throw new Error('进度 JSON 缺少 state');
    return parsed.state;
  }
  if(!Object.keys(DEF).some(key=>Object.prototype.hasOwnProperty.call(parsed,key)))throw new Error('不是有效的旧版进度 JSON');
  return parsed;
}

function exportProgressJSON(){
  return JSON.stringify({format:PROGRESS_FORMAT,version:PROGRESS_VERSION,exportedAt:new Date().toISOString(),state:S},null,2);
}

function downloadProgressJSON(){
  const blob=new Blob([exportProgressJSON()],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download='算法手册进度-'+todayKey()+'.json';document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),4000);
  return link.download;
}

function importProgressJSON(payload){
  S=normalizeProgressState(progressStateFromPayload(payload));
  save();
  return JSON.parse(JSON.stringify(S));
}

const ProgressAPI=Object.freeze({
  format:PROGRESS_FORMAT,
  version:PROGRESS_VERSION,
  exportJSON:exportProgressJSON,
  downloadJSON:downloadProgressJSON,
  importJSON:importProgressJSON
});
window.AlgoHandbookProgress=ProgressAPI;

/* ================= 主题 ================= */
function applyTheme(t){
  document.documentElement.dataset.theme=t;
  const btn=$('#themeBtn'),label=t==='dark'?'切换为浅色主题':'切换为深色主题';
  if(btn){btn.setAttribute('aria-label',label);btn.title=label;}
}
applyTheme(S.theme||(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));

/* ================= 代码高亮（Python） ================= */
const PY_RE=/("""[\s\S]*?"""|"[^"\n]*"|'[^'\n]*'|#[^\n]*|\b\d+(?:\.\d+)?\b|\b(?:def|class|return|if|elif|else|for|while|in|not|and|or|import|from|as|None|True|False|break|continue|pass|lambda|yield|try|except|finally|raise|with|is|assert|del|global|nonlocal|print|range|len|enumerate|sorted|sum|min|max|abs|map|list|dict|set|tuple|str|int|float|bool|input|self)\b)/g;
function hl(code){
  return esc(code).replace(PY_RE,m=>{
    const c=m[0];
    if(c==='#')return '<span class="c-cm">'+m+'</span>';
    if(c==='"'||c==="'")return '<span class="c-str">'+m+'</span>';
    if(c>='0'&&c<='9')return '<span class="c-num">'+m+'</span>';
    return '<span class="c-kw">'+m+'</span>';
  });
}
function hlCode(code,language){return language==='sql'?esc(code):hl(code);}

function hasPythonComment(line){
  let quote='',escaped=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(escaped){escaped=false;continue;}
    if(ch==='\\'&&quote){escaped=true;continue;}
    if(quote){if(ch===quote)quote='';continue;}
    if(ch==='"'||ch==="'"){quote=ch;continue;}
    if(ch==='#')return true;
  }
  return false;
}
function pythonLineNote(line){
  const s=line.trim();
  let m;
  if((m=s.match(/^from\s+([\w.]+)\s+import\s+(.+)/)))return '从 '+m[1]+' 导入所需对象';
  if((m=s.match(/^import\s+(.+)/)))return '导入 '+m[1].replace(/\s+as\s+.*/,'')+' 模块';
  if((m=s.match(/^class\s+(\w+)/)))return '定义 '+m[1]+' 类';
  if((m=s.match(/^(?:async\s+)?def\s+(\w+)/)))return '定义 '+m[1]+' 方法';
  if(s.startsWith('@'))return '应用装饰器';
  if(/^return\b/.test(s))return '返回当前计算结果';
  if(/^yield\b/.test(s))return '生成当前结果';
  if(/^if\b/.test(s))return '判断当前条件';
  if(/^elif\b/.test(s))return '检查另一种条件';
  if(/^else\s*:/.test(s))return '处理其余情况';
  if(/^for\b/.test(s))return '遍历当前数据';
  if(/^while\b/.test(s))return '循环处理满足条件的数据';
  if(/^try\s*:/.test(s))return '尝试执行当前逻辑';
  if(/^except\b/.test(s))return '捕获并处理异常';
  if(/^with\b/.test(s))return '进入受控上下文';
  if(/^break\b/.test(s))return '结束当前循环';
  if(/^continue\b/.test(s))return '进入下一轮循环';
  if(/^raise\b/.test(s))return '抛出当前异常';
  if(/^pass\b/.test(s))return '保留空操作';
  if(/heapq\.heappush/.test(s))return '把候选状态加入最小堆';
  if(/heapq\.heappop/.test(s))return '取出当前最优状态';
  if(/\.append\(/.test(s))return '把当前结果加入列表';
  if(/\.add\(/.test(s))return '把当前元素加入集合';
  if(/\.pop\(/.test(s))return '移除并取得目标元素';
  if((m=s.match(/^([\w.]+)\s*(?:\+=|-=|\*=|\/=|\/{2}=|%=|=)/)))return '更新 '+m[1].replace(/^self\./,'')+' 的值';
  return '执行当前算法步骤';
}
function sqlLineNote(line){
  const s=line.trim().replace(/^\(+/,'').toUpperCase();
  if(s.startsWith('SELECT'))return '选择需要输出的字段';
  if(s.startsWith('FROM'))return '指定查询的数据来源';
  if(/^(LEFT |RIGHT |INNER |CROSS )?JOIN\b/.test(s))return '关联所需数据表';
  if(s.startsWith('ON '))return '设置数据表关联条件';
  if(s.startsWith('WHERE'))return '筛选符合条件的记录';
  if(s.startsWith('GROUP BY'))return '按指定字段分组';
  if(s.startsWith('HAVING'))return '筛选聚合后的分组';
  if(s.startsWith('ORDER BY'))return '按指定规则排序';
  if(s.startsWith('LIMIT'))return '限制返回记录数量';
  if(s.startsWith('UNION'))return '合并两次查询结果';
  if(s.startsWith('WITH'))return '定义公共表表达式';
  if(s.startsWith('CASE'))return '开始条件分类';
  if(s.startsWith('WHEN'))return '判断当前分类条件';
  if(s.startsWith('ELSE'))return '处理其余分类';
  if(s.startsWith('END'))return '结束条件表达式';
  return '继续构造当前查询';
}
function annotateCode(code,language){
  const lines=String(code||'').split('\n');
  const comment=language==='sql'?'--':'#';
  const width=Math.min(76,Math.max(0,...lines.map(line=>line.trim()?line.length:0))+2);
  return lines.map(line=>{
    if(!line.trim())return line;
    if(language!=='sql'&&(line.trim().startsWith('#')||hasPythonComment(line)))return line;
    if(language==='sql'&&/--/.test(line))return line;
    const note=language==='sql'?sqlLineNote(line):pythonLineNote(line);
    return line.padEnd(Math.max(line.length+2,width),' ')+comment+' '+note;
  }).join('\n');
}

/* ================= 复制 / 提示 / 彩带 ================= */
const COPYREG={};let copySeq=0;
function codebox(title,code,explain){
  const k='cp'+(copySeq++),annotated=annotateCode(code,'python');COPYREG[k]=annotated;
  return '<div class="codebox"><div class="cb-head"><span class="cb-title">'+esc(title)+'</span><button class="cb-copy" data-copykey="'+k+'">复制</button></div><pre class="code">'+hl(annotated)+'</pre>'+(explain?'<div class="cb-expl">💬 '+esc(explain)+'</div>':'')+'</div>';
}
let toastT=null;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),1800);}
function copyText(txt){
  const done=()=>toast('已复制 ✓');
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done).catch(()=>{fallbackCopy(txt);done();});}
  else{fallbackCopy(txt);done();}
}
function fallbackCopy(txt){const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}ta.remove();}
function confetti(x,y,n){
  if(prefersReducedMotion())return;
  n=n||24;const colors=['#4f46e5','#7c3aed','#16a34a','#f59e0b','#ec4899','#06b6d4'];
  for(let i=0;i<n;i++){
    const p=document.createElement('i');p.className='confetti-p';
    p.style.left=x+'px';p.style.top=y+'px';p.style.background=colors[i%colors.length];
    const ang=Math.random()*Math.PI*2,v=50+Math.random()*130;
    const dx=Math.cos(ang)*v,dy=Math.sin(ang)*v-70;
    document.body.appendChild(p);
    p.animate([{transform:'translate(0,0) rotate(0deg)',opacity:1},{transform:'translate('+dx+'px,'+(dy+170)+'px) rotate('+(Math.random()*720-360)+'deg)',opacity:0}],{duration:720+Math.random()*220,easing:'cubic-bezier(.23,1,.32,1)'});
    setTimeout(()=>p.remove(),1000);
  }
}
function confettiAt(el){const r=el.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2);}

/* ================= 进度计算 ================= */
function cardStats(){return{done:FLASHCARDS.filter(c=>S.cards[c.id]===1).length,total:FLASHCARDS.length};}
function overall(){
  return typeof learningOverall==='function'?learningOverall():0;
}

/* ================= 导航 / 路由 ================= */
let curView='home';
function renderNav(){$('#nav').innerHTML=VIEWS.map(v=>'<button class="nav-it'+(v.id===curView?' on':'')+'" data-go="'+v.id+'"><span class="nav-em">'+v.em+'</span>'+v.name+'</button>').join('');}
function showView(id){
  if(!VIEWS.some(v=>v.id===id))id='home';
  curView=id;
  $$('section[data-view]').forEach(s=>{s.hidden=s.dataset.view!==id;});
  renderNav();
  if(location.hash!=='#/'+id){history.replaceState(null,'','#/'+id);}
  window.scrollTo({top:0});
  if(id==='checkin'){renderCal();renderCheckStats();}
}

/* ================= 总览 ================= */
function renderQuote(){const q=$('#quoteBox');if(q)q.textContent=QUOTES[Math.floor(Math.random()*QUOTES.length)];}
function ringSet(frac){const C=402.12;const fg=$('#ringFg');fg.style.strokeDashoffset=(C*(1-Math.max(0,Math.min(1,frac)))).toFixed(1);$('#ringNum').textContent=Math.round(frac*100)+'%';}
function fmtHM(sec){if(!sec)return '0m';if(sec<60)return Math.max(1,Math.round(sec))+'s';const m=Math.round(sec/60);if(m<60)return m+'m';return (sec/3600).toFixed(1)+'h';}

/* ================= 学习路线 ================= */
const openSteps={};
function renderRoadmap(){
  const entries=Object.entries(ROADMAPS),current=ROADMAPS[S.track];
  $('#trackOverview').innerHTML=entries.map(([key,roadmap])=>{
    const done=roadmap.steps.filter(step=>S.ck['rm.'+step.id]).length;
    return '<button class="direction-item'+(key===S.track?' on':'')+'" data-track="'+key+'"><span class="direction-icon">'+roadmap.icon+'</span><span class="direction-copy"><b>'+esc(roadmap.name)+'</b><small>'+esc(roadmap.goal)+'</small></span><span class="direction-progress">'+done+'/'+roadmap.steps.length+'</span></button>';
  }).join('');
  $('#trackTabs').innerHTML=entries.map(([key,roadmap])=>'<button class="tab-btn'+(key===S.track?' on':'')+'" data-track="'+key+'">'+roadmap.icon+' '+esc(roadmap.name)+'</button>').join('');
  $('#trackIntro').innerHTML='<div class="route-boundary"><b>路线边界</b><span>'+esc(current.intro)+'</span></div><div class="route-meta"><div><b>前置条件</b><span>'+esc(current.prereq)+'</span></div><div><b>学习目标</b><span>'+esc(current.goal)+'</span></div><div><b>完成标准</b><span>'+esc(current.exit)+'</span></div></div>';
  $('#trackBody').innerHTML=current.steps.map((s,i)=>{
    const done=!!S.ck['rm.'+s.id];
    return '<div class="step'+(done?' done':'')+(openSteps[s.id]?' open':'')+'">'
     +'<div class="step-h" data-stepto="'+s.id+'"><div class="step-idx">'+(i+1)+'</div>'
     +'<div style="min-width:0;flex:1"><div class="step-t">'+esc(s.t)+'</div><div class="step-src">'+esc(s.src)+'</div></div>'
     +'<div class="step-meta"><span class="chip">⏱ '+esc(s.time)+'</span><label style="display:inline-flex;align-items:center;gap:5px;font-size:12.5px;color:var(--mut);cursor:pointer" data-noexp><input type="checkbox" data-k="rm.'+s.id+'"'+(done?' checked':'')+' style="margin-top:0">完成</label><span class="caret">▾</span></div></div>'
     +'<div class="step-b">'+s.d
     +(s.tips&&s.tips.length?'<ul>'+s.tips.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'')
     +(s.links&&s.links.length?'<div class="step-links">'+s.links.map(l=>'<a href="'+l[1]+'" target="_blank" rel="noopener">🔗 '+esc(l[0])+'</a>').join('')+'</div>':'')
     +(s.out?'<div class="step-out">🎯 阶段产出：'+s.out+'</div>':'')
     +'</div></div>';
  }).join('');
}

function updateRoadmapProgress(){
  Object.entries(ROADMAPS).forEach(([key,roadmap])=>{
    const counter=$('#trackOverview [data-track="'+key+'"] .direction-progress');
    if(counter)counter.textContent=roadmap.steps.filter(step=>S.ck['rm.'+step.id]).length+'/'+roadmap.steps.length;
  });
}

/* ================= 刷题：模式对比 / 主题卡 ================= */
let modeIdx=0;
function renderModes(){
  const m=MODES[modeIdx];
  $('#modeTabs').innerHTML='<div class="tab-btns">'+MODES.map((x,i)=>'<button class="tab-btn'+(i===modeIdx?' on':'')+'" data-mode="'+i+'">'+x.name+'<span style="opacity:.75;font-weight:400;margin-left:6px;font-size:11px">'+x.sub+'</span></button>').join('')+'</div>'
   +'<div class="callout tip" style="margin-top:2px">'+m.note+'</div>'
   +codebox(m.name+' · Python 示例',m.code)
   +(m.tips&&m.tips.length?'<ul class="mode-tips">'+m.tips.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'');
}
function shortName(n){return n.split('（')[0];}
function sortedTopics(){return TOPICS.slice().sort((a,b)=>a.order-b.order);}
function renderStepper(){
  const el=$('#stepper');if(!el)return;
  el.innerHTML=sortedTopics().map((t,i)=>{
    const done=S.tp[t.id]&&S.tp[t.id].done;
    return (i?'<span class="stp-arr">→</span>':'')+'<button class="stp'+(done?' done':'')+'" data-goto-tp="'+t.id+'">'+(done?'✓ ':'')+t.emoji+' '+esc(shortName(t.name))+'</button>';
  }).join('');
}
const openTp={};
function diffCls(d){return d==='简单'?'e':d==='中等'?'m':'h';}
function topicHTML(t){
  const st=S.tp[t.id]||{},probs=t.problems||[];
  const done=probs.filter(p=>st.p&&st.p[p.lc]).length,mast=!!st.done;
  let b='';
  b+='<p class="tp-core">'+esc(t.core)+'</p>';
  if(t.signals&&t.signals.length)b+='<div class="mini-h">🔍 识别信号</div><div class="sig">'+t.signals.map(s=>'<span>'+esc(s)+'</span>').join('')+'</div>';
  if(t.templates&&t.templates.length){b+='<div class="mini-h">🧩 模板代码</div>'+t.templates.map(x=>codebox(x.title,x.code,x.explain)).join('');}
  if(probs.length){
    b+='<div class="mini-h">🧗 题目清单（'+probs.length+' 题）</div><div class="plist">'+probs.map(p=>{
      const ck=st.p&&st.p[p.lc];
      const link=p.slug?'<a href="https://leetcode.cn/problems/'+p.slug+'/" target="_blank" rel="noopener">'+esc(p.title)+' ↗</a>':esc(p.title);
      return '<div class="prow'+(ck?' ok':'')+'"><input type="checkbox" data-prob="'+t.id+'|'+p.lc+'"'+(ck?' checked':'')+'><span class="lc-no">'+p.lc+'</span><div class="p-main"><div class="p-t">'+link+' <span class="diff '+diffCls(p.difficulty)+'">'+esc(p.difficulty)+'</span></div><div class="p-h">💡 '+esc(p.hint||'')+'</div></div></div>';
    }).join('')+'</div>';
  }
  if(t.pitfalls&&t.pitfalls.length)b+='<div class="callout warnc"><b>⚠️ 易错点</b><ul style="margin:6px 0 0 18px">'+t.pitfalls.map(x=>'<li style="margin:3px 0">'+esc(x)+'</li>').join('')+'</ul></div>';
  if(t.interviewNote)b+='<div class="callout tip"><b>🎤 面试手写提醒：</b>'+esc(t.interviewNote)+'</div>';
  if(t.resources&&t.resources.length)b+='<div class="tp-res">'+t.resources.map(r=>'<a href="'+r.url+'" target="_blank" rel="noopener">🔗 '+esc(r.name)+'</a>').join('')+'</div>';
  return '<div class="tp'+(mast?' mastered':'')+(openTp[t.id]?' open':'')+'" id="tp-'+t.id+'">'
   +'<div class="tp-head" data-tp="'+t.id+'"><div class="tp-idx">'+String(t.order).padStart(2,'0')+'</div><div class="tp-emoji">'+t.emoji+'</div>'
   +'<div class="tp-nm"><div class="n">'+esc(t.name)+'</div><div class="tg">'+esc(t.tagline||'')+'</div></div>'
   +'<div class="tp-meta"><span class="chip">⏱ ~'+t.estHours+'h</span><span class="tp-cnt" id="cnt-'+t.id+'">'+done+'/'+probs.length+'</span>'
   +'<label class="done-tg" data-noexp><input type="checkbox" data-tdone="'+t.id+'"'+(mast?' checked':'')+'>已掌握</label><span class="caret">▾</span></div></div>'
   +'<div class="tp-body">'+b+'</div></div>';
}
function renderTopics(){$('#topicList').innerHTML=sortedTopics().map(topicHTML).join('');}

/* ================= 知识卡片 ================= */
let deckFilter='all';const flipped={};
function renderCards(){
  const chips=[{id:'all',label:'全部 '+FLASHCARDS.length}].concat(DECKS.map(d=>({id:d.id,label:d.em+' '+d.n+' '+FLASHCARDS.filter(c=>c.deck===d.id).length}))).concat([{id:'todo',label:'🔁 未掌握 '+FLASHCARDS.filter(c=>S.cards[c.id]!==1).length}]);
  $('#deckChips').innerHTML=chips.map(c=>'<button class="tab-btn'+(deckFilter===c.id?' on':'')+'" data-deck="'+c.id+'">'+c.label+'</button>').join('');
  const list=FLASHCARDS.filter(c=>deckFilter==='all'?true:deckFilter==='todo'?S.cards[c.id]!==1:c.deck===deckFilter);
  $('#flipGrid').innerHTML=list.length?list.map(c=>{
    const got=S.cards[c.id]===1,deck=DECKS.find(d=>d.id===c.deck);
    const isFlipped=Boolean(flipped[c.id]),label=(isFlipped?'返回问题：':'查看答案：')+c.q;
    return '<div class="flip'+(isFlipped?' fl':'')+(got?' got':'')+'" data-flip="'+c.id+'" role="button" tabindex="0" aria-pressed="'+isFlipped+'" aria-label="'+esc(label)+'">'
     +'<div class="flip-in"><div class="ff"><div class="f-deck">'+deck.em+' '+deck.n+(got?'<span class="f-got">✓ 已掌握</span>':'')+'</div><div class="f-q">'+c.q+'</div><div class="f-tip">👆 点击翻面看答案</div></div>'
     +'<div class="fb"><div class="f-deck">💡 答案</div><div class="f-a">'+c.a+'</div><div class="f-btns"><button class="btn btn-sm btn-p" data-got="'+c.id+'">✓ 记住了</button><button class="btn btn-sm" data-again="'+c.id+'">🔁 再看看</button></div></div></div></div>';
  }).join(''):'<p style="color:var(--mut2);padding:20px 4px">这一组全部掌握了 🎉 去「随堂自测」检验一下？</p>';
  cardProgLine();
}
function toggleFlipCard(el,instant){
  const id=el.dataset.flip;flipped[id]=!flipped[id];
  if(instant)el.classList.add('flip-instant');
  el.classList.toggle('fl',flipped[id]);
  el.setAttribute('aria-pressed',String(Boolean(flipped[id])));
  const card=FLASHCARDS.find(c=>String(c.id)===String(id));
  if(card)el.setAttribute('aria-label',(flipped[id]?'返回问题：':'查看答案：')+card.q);
  if(instant)requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove('flip-instant')));
}
function cardProgLine(){const cs=cardStats();const f=$('#cardFill');if(f){f.style.width=pct(cs.done,cs.total)+'%';$('#cardPct').textContent='已掌握 '+cs.done+'/'+cs.total;}}

/* ================= 随堂自测 ================= */
let qAns=[];
function renderQuiz(){
  const A='ABCD';
  let html=QUIZ.map((q,i)=>{
    const pick=qAns[i];
    return '<div class="qz'+(pick!=null?' answered':'')+'"><div class="qz-q"><span class="qz-no">Q'+(i+1)+'</span>'+esc(q.q)+'</div>'
     +q.o.map((o,j)=>{
       let cls='opt';
       if(pick!=null){if(j===q.a)cls+=' right';else if(j===pick)cls+=' wrong';}
       return '<button class="'+cls+'" data-q="'+i+'" data-o="'+j+'"'+(pick!=null?' disabled':'')+'>'+A[j]+'. '+esc(o)+'</button>';
     }).join('')
     +'<div class="qz-expl">'+(pick!=null?(pick===q.a?'✅ 答对了！':'❌ 正确答案是 '+A[q.a]+'。')+' '+esc(q.w):'')+'</div></div>';
  }).join('');
  const done=qAns.filter(x=>x!=null).length;
  if(done<QUIZ.length){html+='<div class="qz" style="text-align:center;color:var(--mut2);font-size:13px">已答 '+done+' / '+QUIZ.length+'</div>';}
  else{
    const score=QUIZ.reduce((s,q,i)=>s+(qAns[i]===q.a?1:0),0);
    html+='<div class="qz qz-result"><div class="qz-score">'+score+' / '+QUIZ.length+'</div>'
     +'<div style="color:var(--mut);margin:8px 0 6px">'+(score>=QTARGET?'稳了，方法论已经长在脑子里了 🎉':score>=Math.ceil(QUIZ.length/2)?'不错！把答错的解析再读一遍':'再把各版块过一遍，回来重测')+'</div>'
     +'<div style="font-size:12.5px;color:var(--mut2);margin-bottom:14px">历史最佳：'+Math.max(S.quizBest,score)+' / '+QUIZ.length+'</div>'
     +'<button class="btn btn-p" id="quizRetry">↺ 重新测验</button></div>';
  }
  $('#quizBox').innerHTML=html;
}

/* ================= 求职宝典 ================= */
function ckrow(it){const on=!!S.ck[it.id];return '<div class="ckrow'+(on?' ok':'')+'"><input type="checkbox" data-k="'+it.id+'"'+(on?' checked':'')+'><div><div class="c-t">'+it.t+'</div>'+(it.n?'<div class="c-n">'+it.n+'</div>':'')+'</div></div>';}
function renderJob(){
  $('#resumeBasics').innerHTML=RESUME.basics.map(ckrow).join('');
  $('#resumeAdv').innerHTML=RESUME.adv.map(ckrow).join('');
  $('#resumeQA').innerHTML=RESUME.qa.map(x=>'<details><summary>'+x.q+'</summary><div>'+x.a+'</div></details>').join('');
  $('#jobChannels').innerHTML=JOB.channels.map(c=>'<div style="padding:10px 0;border-bottom:1px dashed var(--line2)"><b>'+c.n+'</b>'+(c.u?' · <a href="'+c.u+'" target="_blank" rel="noopener">打开 ↗</a>':'')+'<div style="font-size:13.4px;color:var(--mut);margin-top:3px">'+c.d+'</div></div>').join('');
  $('#bossTips').innerHTML=JOB.boss.map(b=>'<div style="margin:11px 0"><div style="font-weight:650;font-size:14px">'+b.t+'</div><div style="font-size:13.4px;color:var(--mut);margin-top:3px">'+b.d+'</div></div>').join('');
  $('#tmplBox').textContent=JOB.tmpl;COPYREG.boss=JOB.tmpl;
  $('#mindset').innerHTML=QUOTES.map(q=>'<blockquote>'+q+'</blockquote>').join('');
  $('#ivList').innerHTML=JOB.iv.map(ckrow).join('');
  $('#actList').innerHTML=JOB.act.map(ckrow).join('');
  $('#jobFlow').innerHTML=JOB.flow.map((f,i)=>'<div class="flow-step"><div class="flow-no">'+(i+1)+'</div><div><div class="flow-t">'+f.t+'</div><div class="flow-d">'+f.d+'</div></div></div>').join('');
  $('#baguList').innerHTML=JOB.bagu.map(b=>'<details><summary>'+b.q+'</summary><div>'+b.a+'</div></details>').join('');
  $('#mjList').innerHTML=JOB.mj.map(m=>'<details><summary>'+m.t+'<span class="mj-meta">'+m.meta+'</span></summary><div><ol class="mj-ol">'+m.qs.map(q=>'<li>'+q+'</li>').join('')+'</ol><div class="mj-cmt">'+m.cmt+'</div></div></details>').join('');
  $('#mjPoints').innerHTML=JOB.mjPoints.map((p,i)=>'<div class="flow-step"><div class="flow-no">'+(i+1)+'</div><div><div class="flow-t">'+p.t+'</div><div class="flow-d">'+p.d+'</div></div></div>').join('');
  $('#mjFlags').innerHTML=JOB.mjFlags.map(f=>'<li>'+f+'</li>').join('');
  $('#projTmpl').innerHTML='<ul class="mode-tips">'+JOB.projTmpl.formula.map(x=>'<li>'+x+'</li>').join('')+'</ul>'
   +JOB.projTmpl.examples.map(e=>'<details><summary>'+e.name+'<span class="mj-meta">'+e.role+'</span></summary><div>'
    +'<div class="pt-bg"><b>项目背景：</b>'+e.bg+'</div><div class="pt-stack">'+e.stack+'</div>'
    +'<ul class="pt-ul">'+e.pts.map(p=>'<li>'+p+'</li>').join('')+'</ul>'
    +'<div class="mj-cmt">'+e.note+'</div></div></details>').join('')
   +'<div class="callout tip" style="margin:12px 0 0">'+JOB.projTmpl.warn+'</div>';
  $('#mjReview').innerHTML=JOB.review.map((p,i)=>'<div class="flow-step"><div class="flow-no">'+(i+1)+'</div><div><div class="flow-t">'+p.t+'</div><div class="flow-d">'+p.d+'</div></div></div>').join('');
}

/* ================= 资源库 ================= */
function renderRes(){
  $('#resLib').innerHTML=RESLIB.map(g=>'<div class="card"><h3>'+g.g+'</h3>'+g.items.map(it=>
    '<div class="res-row"><span class="lang '+(it.lang==='中'?'zh':'en')+'">'+it.lang+'</span><div class="rr-main"><div style="font-weight:650;font-size:13.8px">'+(it.u?'<a href="'+it.u+'" target="_blank" rel="noopener">'+it.n+' ↗</a>':it.n)+'</div><div class="rr-d">'+it.d+'</div></div></div>'
  ).join('')+'</div>').join('');
}

/* ================= 打卡 / 计时 ================= */
function todayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function dateKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
let runStart=null,sessionSec=0,timerInt=null,lastFold=0;
function fmtHMS(sec){sec=Math.max(0,Math.floor(sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
function foldDelta(){if(!runStart)return;const d=(Date.now()-runStart)/1000;S.days[todayKey()]=(S.days[todayKey()]||0)+d;sessionSec+=d;runStart=Date.now();save();}
function timerTick(){
  const cur=runStart?(Date.now()-runStart)/1000:0;
  $('#timerBig').textContent=fmtHMS(sessionSec+cur);
  $('#timerSub').textContent=(runStart?'专注中 · ':'已暂停 · ')+'今日累计 '+fmtHM((S.days[todayKey()]||0)+cur);
  if(runStart&&Date.now()-lastFold>60000){foldDelta();lastFold=Date.now();renderCheckStats();}
}
function timerStart(){if(runStart)return;runStart=Date.now();lastFold=Date.now();$('#timerToggle').textContent='⏸ 暂停';if(!timerInt)timerInt=setInterval(timerTick,1000);timerTick();}
function timerPause(){if(!runStart)return;foldDelta();runStart=null;$('#timerToggle').textContent='▶ 继续专注';timerTick();renderCal();renderCheckStats();updateStats();}
function timerStop(){
  if(runStart){foldDelta();runStart=null;}
  if(sessionSec>0)toast('已记录 '+fmtHM(sessionSec)+' 专注时间 ✓');
  sessionSec=0;$('#timerToggle').textContent='▶ 开始专注';
  if(timerInt){clearInterval(timerInt);timerInt=null;}
  $('#timerBig').textContent='00:00:00';$('#timerSub').textContent='今日累计 '+fmtHM(S.days[todayKey()]||0);
  renderCal();renderCheckStats();updateStats();
}
function streak(){
  let n=0;const d=new Date();
  if(!((S.days[dateKey(d)]||0)>=60))d.setDate(d.getDate()-1);
  while((S.days[dateKey(d)]||0)>=60){n++;d.setDate(d.getDate()-1);}
  return n;
}
function calLevel(sec){const m=sec/60;if(!sec)return 'l0';if(m<30)return 'l1';if(m<75)return 'l2';if(m<150)return 'l3';return 'l4';}
function renderCal(){
  const grid=$('#calGrid');if(!grid)return;
  const now=new Date(),y=now.getFullYear(),mo=now.getMonth();
  $('#calTitle').textContent=y+' 年 '+(mo+1)+' 月';
  const st=streak();$('#calStreak').textContent=st>0?'🔥 连续 '+st+' 天':'';
  const first=new Date(y,mo,1),days=new Date(y,mo+1,0).getDate(),lead=(first.getDay()+6)%7;
  let h='一二三四五六日'.split('').map(w=>'<div class="cal-w">'+w+'</div>').join('');
  for(let i=0;i<lead;i++)h+='<div></div>';
  for(let d=1;d<=days;d++){
    const k=dateKey(new Date(y,mo,d)),sec=S.days[k]||0;
    h+='<div class="cal-d '+calLevel(sec)+(d===now.getDate()?' today':'')+'" title="'+k+' · '+fmtHM(sec)+'">'+d+'</div>';
  }
  grid.innerHTML=h;
}
function renderCheckStats(){
  const t=$('#stToday');if(!t)return;
  t.textContent=fmtHM(S.days[todayKey()]||0);
  let wk=0;for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);wk+=S.days[dateKey(d)]||0;}
  $('#stWeek').textContent=fmtHM(wk);
  $('#stStreak').textContent=streak()+' 天';
}

/* ================= 汇总刷新 ================= */
function updateStats(){
  const o=overall();
  ringSet(o);
  $('#sideFill').style.width=Math.round(o*100)+'%';
  $('#sidePct').textContent=Math.round(o*100)+'%';
  renderPathHomeTiles();renderPathNext();renderLearningPath();renderStepper();cardProgLine();
}

/* ================= 事件（全局委托） ================= */
document.addEventListener('click',e=>{
  const T=x=>e.target.closest(x);
  let el;
  if(el=T('[data-copykey]')){copyText(COPYREG[el.dataset.copykey]||'');return;}
  if(el=T('[data-go]')){showView(el.dataset.go);return;}
  if(el=T('[data-track]')){S.track=el.dataset.track;save();renderRoadmap();updateStats();return;}
  if(el=T('[data-quest-branch]')){algoQuestFilter.branch=el.dataset.questBranch;renderAlgoQuest();return;}
  if(el=T('[data-practice-tab]')){practiceFilter.tab=el.dataset.practiceTab;practiceFilter.group='all';practiceFilter.query='';renderPractice();return;}
  if(el=T('[data-mode]')){modeIdx=+el.dataset.mode;renderModes();return;}
  if(el=T('[data-deck]')){deckFilter=el.dataset.deck;renderCards();return;}
  if(el=T('[data-got]')){S.cards[el.dataset.got]=1;flipped[el.dataset.got]=false;save();confettiAt(el);renderCards();updateStats();return;}
  if(el=T('[data-again]')){S.cards[el.dataset.again]=0;flipped[el.dataset.again]=false;save();renderCards();updateStats();return;}
  if(el=T('[data-goto-tp]')){
    const id=el.dataset.gotoTp;showView('leetcode');openTp[id]=true;
    const tp=$('#tp-'+id);if(tp){tp.classList.add('open');setTimeout(()=>tp.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth',block:'start'}),60);}
    return;
  }
  if(el=T('[data-q]')){
    const i=+el.dataset.q,j=+el.dataset.o;
    if(qAns[i]!=null)return;
    qAns[i]=j;
    const done=qAns.filter(x=>x!=null).length;
    if(done===QUIZ.length){
      const score=QUIZ.reduce((s,q,k)=>s+(qAns[k]===q.a?1:0),0);
      if(score>Math.max(S.quizBest,0)||S.quizBest<0)S.quizBest=score;
      save();if(score>=QTARGET)confetti(window.innerWidth/2,220,40);
    }
    renderQuiz();updateStats();return;
  }
  if(e.target.id==='quizRetry'){qAns=[];renderQuiz();window.scrollTo({top:0,behavior:prefersReducedMotion()?'auto':'smooth'});return;}
  if(el=T('[data-stepto]')){
    if(e.target.closest('[data-noexp]')||e.target.tagName==='INPUT')return;
    const id=el.dataset.stepto;openSteps[id]=!openSteps[id];
    el.parentElement.classList.toggle('open',openSteps[id]);return;
  }
  if(el=T('[data-tp]')){
    if(e.target.closest('[data-noexp]')||e.target.tagName==='INPUT')return;
    const id=el.dataset.tp;openTp[id]=!openTp[id];
    el.parentElement.classList.toggle('open',openTp[id]);return;
  }
  if(el=T('[data-flip]')){
    toggleFlipCard(el,false);return;
  }
});
document.addEventListener('keydown',e=>{
  if(e.key!=='Enter'&&e.key!==' ')return;
  const el=e.target.closest('[data-flip]');
  if(!el||e.target!==el)return;
  e.preventDefault();toggleFlipCard(el,true);
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.matches('[data-path-stage]')){
    S.path[t.dataset.pathStage]=t.checked;save();if(t.checked)confettiAt(t);updateStats();return;
  }
  if(t.matches('[data-quest-prob]')){
    const parts=t.dataset.questProb.split('|'),kind=parts[0],slug=parts[1];
    S.quest[kind][slug]=t.checked;save();if(t.checked)confettiAt(t);
    renderAlgoQuest();renderSqlQuest();renderPractice();updateStats();return;
  }
  if(t.id==='algoUnitFilter'){algoQuestFilter.unit=t.value;renderAlgoQuest();return;}
  if(t.id==='algoTodoOnly'){algoQuestFilter.todo=t.checked;renderAlgoQuest();return;}
  if(t.id==='sqlUnitFilter'){sqlQuestFilter.unit=t.value;renderSqlQuest();return;}
  if(t.id==='sqlTodoOnly'){sqlQuestFilter.todo=t.checked;renderSqlQuest();return;}
  if(t.id==='practiceGroupFilter'){practiceFilter.group=t.value;renderPractice();return;}
  if(t.id==='practiceTodoOnly'){practiceFilter.todo=t.checked;renderPractice();return;}
  if(t.matches('[data-k]')){
    S.ck[t.dataset.k]=t.checked;save();
    const row=t.closest('.ckrow');if(row)row.classList.toggle('ok',t.checked);
    const step=t.closest('.step');if(step)step.classList.toggle('done',t.checked);
    if(t.dataset.k.startsWith('rm.'))updateRoadmapProgress();
    if(t.checked)confettiAt(t);
    updateStats();return;
  }
  if(t.matches('[data-prob]')){
    const parts=t.dataset.prob.split('|'),id=parts[0],lc=parts[1];
    if(!S.tp[id])S.tp[id]={done:false,p:{}};
    if(!S.tp[id].p)S.tp[id].p={};
    S.tp[id].p[lc]=t.checked;save();
    const row=t.closest('.prow');if(row)row.classList.toggle('ok',t.checked);
    const topic=TOPICS.find(x=>x.id===id),st=S.tp[id];
    const done=(topic.problems||[]).filter(p=>st.p[p.lc]).length;
    const cnt=$('#cnt-'+id);if(cnt)cnt.textContent=done+'/'+(topic.problems||[]).length;
    if(t.checked&&done===(topic.problems||[]).length)confettiAt(t);
    updateStats();return;
  }
  if(t.matches('[data-tdone]')){
    const id=t.dataset.tdone;
    if(!S.tp[id])S.tp[id]={done:false,p:{}};
    S.tp[id].done=t.checked;save();
    const card=$('#tp-'+id);if(card)card.classList.toggle('mastered',t.checked);
    if(t.checked)confettiAt(t);
    updateStats();return;
  }
});
document.addEventListener('input',e=>{
  if(e.target.id==='algoQuestSearch'){algoQuestFilter.query=e.target.value;renderAlgoQuest();const input=$('#algoQuestSearch');if(input){input.focus();input.setSelectionRange(input.value.length,input.value.length);}return;}
  if(e.target.id==='sqlQuestSearch'){sqlQuestFilter.query=e.target.value;renderSqlQuest();const input=$('#sqlQuestSearch');if(input){input.focus();input.setSelectionRange(input.value.length,input.value.length);}return;}
  if(e.target.id==='practiceSearch'){practiceFilter.query=e.target.value;renderPractice();const input=$('#practiceSearch');if(input){input.focus();input.setSelectionRange(input.value.length,input.value.length);}return;}
});
window.addEventListener('hashchange',()=>{const id=location.hash.replace('#/','')||'home';if(id!==curView)showView(id);});
window.addEventListener('beforeunload',()=>{if(runStart){foldDelta();}save();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&runStart){foldDelta();}});

/* ================= 初始化 ================= */
$('#themeBtn').addEventListener('click',()=>{
  const cur=document.documentElement.dataset.theme==='dark'?'light':'dark';
  S.theme=cur;save();applyTheme(cur);
});
$('#timerToggle').addEventListener('click',()=>{runStart?timerPause():timerStart();});
$('#timerStop').addEventListener('click',timerStop);
$('#manualCheck').addEventListener('click',e=>{
  const k=todayKey();S.days[k]=Math.max(S.days[k]||0,60);save();
  toast('已打卡 ✓ 坚持就是胜利');confettiAt(e.target);renderCal();renderCheckStats();updateStats();
});
function handleProgressExport(){
  ProgressAPI.downloadJSON();toast('已导出 JSON 进度文件');
}
['expBtn','globalExpBtn'].forEach(id=>$('#'+id).addEventListener('click',handleProgressExport));
['impBtn','globalImpBtn'].forEach(id=>$('#'+id).addEventListener('click',()=>$('#impFile').click()));
$('#impFile').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    try{ProgressAPI.importJSON(r.result);toast('JSON 进度导入成功，正在刷新…');setTimeout(()=>location.reload(),600);
    }catch(err){toast('导入失败：'+err.message);}
    e.target.value='';
  };
  r.onerror=()=>{toast('导入失败：无法读取 JSON 文件');e.target.value='';};
  r.readAsText(f);
});

renderRoadmap();renderAlgoQuest();renderSqlQuest();renderPractice();renderLearningPath();renderModes();renderTopics();renderCards();renderQuiz();renderJob();renderRes();renderPathQuick();
renderCal();renderCheckStats();updateStats();renderQuote();
$('#timerSub').textContent='今日累计 '+fmtHM(S.days[todayKey()]||0);
showView((location.hash||'#/home').replace('#/','')||'home');

