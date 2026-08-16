'use strict';

const DIFFICULTY_LABEL={EASY:'简单',MEDIUM:'中等',HARD:'困难'};

function normalizeList(value){return Array.isArray(value)?value:(value?[value]:[]);}

function flattenQuestQuestions(quest){
  const main=[],branch=[];
  let officialLevel=0;
  quest.units.forEach((unit,unitIndex)=>{
    unit.levels.forEach(level=>{
      officialLevel++;
      const target=level.isMain?main:branch;
      normalizeList(level.questions).forEach((question,inLevelIndex)=>target.push({
        unit,unitIndex,level,officialLevel,inLevelIndex,question
      }));
    });
  });
  return main.concat(branch).map((item,siteIndex)=>Object.assign({siteIndex},item));
}

function oldAlgoDone(question){
  return TOPICS.some(topic=>S.tp[topic.id]&&S.tp[topic.id].p&&S.tp[topic.id].p[question.lc]);
}

function questProblemDone(kind,question){
  const own=S.quest&&S.quest[kind]&&S.quest[kind][question.slug];
  if(own!==undefined)return !!own;
  return kind==='algo'&&oldAlgoDone(question);
}

function questStats(kind,quest){
  const items=flattenQuestQuestions(quest);
  return {items,done:items.filter(item=>questProblemDone(kind,item.question)).length,total:items.length};
}

function questCodebox(key,title,code,explain,language){
  const annotated=annotateCode(code,language||'python');
  COPYREG[key]=annotated;
  return '<div class="codebox"><div class="cb-head"><span class="cb-title">'+esc(title)+'</span><button class="cb-copy" data-copykey="'+key+'">复制</button></div><pre class="code">'+hlCode(annotated,language||'python')+'</pre>'+(explain?'<div class="cb-expl">'+esc(explain)+'</div>':'')+'</div>';
}

function renderAlgoProblem(item){
  const question=item.question,solution=Object.assign({},ALGO_SOLUTIONS_A[question.slug]||{},ALGO_SOLUTIONS_B[question.slug]||{});
  const done=questProblemDone('algo',question),difficulty=DIFFICULTY_LABEL[question.difficulty]||question.difficulty;
  const branch=item.level.isMain?'主线':'支线';
  const badges='<span class="branch-badge '+(item.level.isMain?'main':'branch')+'">'+branch+'</span>';
  const better=solution.better?'<div class="better-solution"><div class="mini-h">更优解 · '+esc(solution.better.title||'优化方案')+'</div><p class="solution-complexity">'+esc(solution.better.complexity||'')+'</p>'+questCodebox('algo-'+question.slug+'-better','更优 Python3 程序',solution.better.code||'')+'</div>':'';
  return '<details class="quest-problem'+(done?' done':'')+'" data-unit="'+item.unit.id+'" data-branch="'+(item.level.isMain?'main':'branch')+'" data-search="'+esc((question.lc+' '+question.title+' '+item.level.name).toLowerCase())+'">'
    +'<summary><label class="quest-check" data-no-toggle><input type="checkbox" data-quest-prob="algo|'+question.slug+'"'+(done?' checked':'')+' aria-label="标记 '+esc(question.title)+' 完成"></label>'
    +'<span class="quest-index">本站 #'+(item.siteIndex+1)+'</span><div class="quest-name"><b>LC '+question.lc+' · '+esc(question.title)+'</b><span>官网第 '+item.officialLevel+' 关 · 本关第 '+(item.inLevelIndex+1)+' 题 · '+esc(item.unit.name)+' / '+esc(item.level.name)+'</span></div>'
    +'<span class="diff '+diffCls(difficulty)+'">'+difficulty+'</span>'+badges+'</summary>'
    +'<div class="quest-solution"><div class="quest-meta"><span>本关算法：'+esc(item.level.name)+'</span><span>'+esc(solution.complexity||'复杂度见程序分析')+'</span><a href="https://leetcode.cn/problems/'+question.slug+'/" target="_blank" rel="noopener">打开原题 ↗</a></div>'
    +'<p class="solution-approach">'+esc(solution.approach||'题解数据正在补充。')+'</p>'+questCodebox('algo-'+question.slug+'-primary','完整 Python3 程序',solution.code||'# 题解数据正在补充')+better+'</div></details>';
}

let algoQuestFilter={unit:'all',branch:'all',todo:false,query:''};

function renderAlgoQuest(){
  const quest=OFFICIAL_QUESTS['data-structures-and-algorithms-quest'],stats=questStats('algo',quest);
  const main=stats.items.filter(item=>item.level.isMain).length,branch=stats.total-main;
  const levelCount=quest.units.reduce((sum,unit)=>sum+unit.levels.length,0);
  $('#algoQuestSummary').innerHTML='<div><b>'+stats.done+'/'+stats.total+'</b><span>正式题完成</span></div><div><b>'+quest.units.length+'</b><span>官网区域</span></div><div><b>'+levelCount+'</b><span>公开关卡</span></div><div><b>'+main+' + '+branch+'</b><span>主线 + 支线</span></div>';
  $('#algoQuestToolbar').innerHTML='<input class="quest-search" id="algoQuestSearch" value="'+esc(algoQuestFilter.query)+'" placeholder="搜索题号、题名或关卡">'
    +'<select id="algoUnitFilter"><option value="all">全部区域</option>'+quest.units.map(unit=>'<option value="'+unit.id+'"'+(algoQuestFilter.unit===String(unit.id)?' selected':'')+'>'+esc(unit.name)+'</option>').join('')+'</select>'
    +'<div class="segmented"><button data-quest-branch="all" class="'+(algoQuestFilter.branch==='all'?'on':'')+'">全部</button><button data-quest-branch="main" class="'+(algoQuestFilter.branch==='main'?'on':'')+'">主线</button><button data-quest-branch="branch" class="'+(algoQuestFilter.branch==='branch'?'on':'')+'">支线</button></div>'
    +'<label class="toolbar-check"><input type="checkbox" id="algoTodoOnly"'+(algoQuestFilter.todo?' checked':'')+'> 只看未完成</label>';
  const visible=stats.items.filter(item=>{
    if(algoQuestFilter.unit!=='all'&&String(item.unit.id)!==algoQuestFilter.unit)return false;
    if(algoQuestFilter.branch!=='all'&&(item.level.isMain?'main':'branch')!==algoQuestFilter.branch)return false;
    if(algoQuestFilter.todo&&questProblemDone('algo',item.question))return false;
    const hay=(item.question.lc+' '+item.question.title+' '+item.level.name).toLowerCase();
    return !algoQuestFilter.query||hay.includes(algoQuestFilter.query.toLowerCase());
  });
  const groups=[];
  visible.forEach(item=>{
    let group=groups.find(entry=>entry.level.id===item.level.id&&entry.unit.id===item.unit.id);
    if(!group){group={unit:item.unit,level:item.level,officialLevel:item.officialLevel,items:[]};groups.push(group);}
    group.items.push(item);
  });
  $('#algoQuestList').innerHTML=groups.length?groups.map(group=>'<section class="quest-level"><div class="quest-level-head"><div><span class="quest-unit-name">'+esc(group.unit.name)+'</span><h3>官网第 '+group.officialLevel+' 关 · '+esc(group.level.name)+'</h3></div><span>'+group.items.length+' 题</span></div>'+group.items.map(renderAlgoProblem).join('')+'</section>').join(''):'<div class="quest-empty">没有符合当前筛选的题目。</div>';
  renderQuestQuizzes('algo',quest,$('#algoQuestQuizzes'));
}

function renderQuestQuizzes(kind,quest,root){
  if(!root)return;
  const quizzes=[];
  quest.units.forEach(unit=>normalizeList(unit.quizzes).forEach(quiz=>quizzes.push({unit,quiz,questions:normalizeList(quiz.questions)})));
  const count=quizzes.reduce((sum,item)=>sum+item.questions.length,0);
  root.innerHTML='<details class="quiz-fold"><summary>官网测验题（'+count+' 道，单独列出，不计正式进度）</summary><div>'+quizzes.map(item=>'<div class="quiz-group"><b>'+esc(item.unit.name)+' · '+esc(item.quiz.name)+'</b><p>'+item.questions.map(question=>'<a href="https://leetcode.cn/problems/'+question.slug+'/" target="_blank" rel="noopener">LC '+question.lc+' '+esc(question.title)+'</a>').join(' · ')+'</p></div>').join('')+'</div></details>';
}
