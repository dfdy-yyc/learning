'use strict';

let practiceFilter={tab:'hot100',group:'all',todo:false,query:''};

function practiceGroups(kind){
  if(kind==='hot100')return HOT100_SECTIONS.map(section=>({id:section.id,name:section.name,questions:section.questions}));
  return SQL50_SECTIONS.map(section=>({
    id:section.id,
    name:section.name,
    questions:SQL50_QUESTIONS.filter(question=>question.sectionOrder===section.order)
  }));
}

function practiceQuestions(kind){return practiceGroups(kind).flatMap(group=>group.questions.map(question=>({group,question})));}

function practiceStats(kind){
  const items=practiceQuestions(kind),state=S.quest[kind]||{};
  return {done:items.filter(item=>state[item.question.slug]).length,total:items.length,items};
}

function practiceStageFraction(){
  const hot=practiceStats('hot100'),sql=practiceStats('sql50'),total=hot.total+sql.total;
  return total?(hot.done+sql.done)/total:0;
}

function hot100Solution(question){
  return Object.assign({},ALGO_SOLUTIONS_A[question.slug]||{},ALGO_SOLUTIONS_B[question.slug]||{},HOT100_SOLUTIONS[question.slug]||{});
}

function renderHot100Problem(item){
  const question=item.question,solution=hot100Solution(question),done=!!S.quest.hot100[question.slug];
  const difficulty=DIFFICULTY_LABEL[question.difficulty]||question.difficulty;
  const better=solution.better?'<div class="better-solution"><div class="mini-h">更优解 · '+esc(solution.better.title||'优化方案')+'</div><p class="solution-complexity">'+esc(solution.better.complexity||'')+'</p>'+questCodebox('hot100-'+question.slug+'-better','更优 Python3 程序',solution.better.code||'')+'</div>':'';
  return '<details class="quest-problem'+(done?' done':'')+'"><summary><label class="quest-check" data-no-toggle><input type="checkbox" data-quest-prob="hot100|'+question.slug+'"'+(done?' checked':'')+' aria-label="标记 '+esc(question.title)+' 完成"></label>'
    +'<span class="quest-index">第 '+question.order+' 题</span><div class="quest-name"><b>LC '+question.lc+' · '+esc(question.title)+'</b><span>Hot 100 官方题单序号 #'+question.order+'</span></div><span class="diff '+diffCls(difficulty)+'">'+difficulty+'</span></summary>'
    +'<div class="quest-solution"><div class="quest-meta"><span>核心算法与思路</span><span>'+esc(solution.complexity||'复杂度见程序分析')+'</span><a href="https://leetcode.cn/problems/'+question.slug+'/" target="_blank" rel="noopener">打开原题 ↗</a></div>'
    +'<p class="solution-approach">'+esc(solution.approach||'使用当前题目的常用最优解法。')+'</p>'+questCodebox('hot100-'+question.slug+'-primary','完整 Python3 程序',solution.code||'# 题解数据正在补充')+better+'</div></details>';
}

function renderSql50Problem(item){
  const question=item.question,done=!!S.quest.sql50[question.slug];
  const difficulty=DIFFICULTY_LABEL[question.difficulty]||question.difficulty;
  const pandas=/^import pandas as pd/m.test(question.pandas)?question.pandas:'import pandas as pd\n\n'+question.pandas;
  return '<details class="quest-problem'+(done?' done':'')+'"><summary><label class="quest-check" data-no-toggle><input type="checkbox" data-quest-prob="sql50|'+question.slug+'"'+(done?' checked':'')+' aria-label="标记 '+esc(question.title)+' 完成"></label>'
    +'<span class="quest-index">第 '+question.order+' 题</span><div class="quest-name"><b>LC '+question.lc+' · '+esc(question.title)+'</b><span>SQL 50 官方题单序号 #'+question.order+' · '+esc(question.category)+'</span></div><span class="diff '+diffCls(difficulty)+'">'+difficulty+'</span></summary>'
    +'<div class="quest-solution"><div class="quest-meta"><span>本题概念：'+esc(question.concept)+'</span><a href="https://leetcode.cn/problems/'+question.slug+'/" target="_blank" rel="noopener">打开原题 ↗</a></div>'
    +'<div class="solution-pair"><div><div class="mini-h">MySQL</div>'+questCodebox('sql50-'+question.slug+'-mysql','完整 MySQL 解答',question.sql,'','sql')+'</div><div><div class="mini-h">Pandas</div>'+questCodebox('sql50-'+question.slug+'-pandas','完整 Pandas 解答',pandas,'','python')+'</div></div></div></details>';
}

function renderPractice(){
  const root=$('#practiceList');if(!root)return;
  const kind=practiceFilter.tab,groups=practiceGroups(kind),stats=practiceStats(kind);
  if(practiceFilter.group!=='all'&&!groups.some(group=>group.id===practiceFilter.group))practiceFilter.group='all';
  $$('.practice-tabs [data-practice-tab]').forEach(button=>button.classList.toggle('on',button.dataset.practiceTab===kind));
  const easy=stats.items.filter(item=>(DIFFICULTY_LABEL[item.question.difficulty]||item.question.difficulty)==='简单').length;
  const medium=stats.items.filter(item=>(DIFFICULTY_LABEL[item.question.difficulty]||item.question.difficulty)==='中等').length;
  const hard=stats.total-easy-medium,source=kind==='hot100'?HOT100_SOURCE:SQL50_SOURCE;
  $('#practiceSummary').innerHTML='<div><b>'+stats.done+'/'+stats.total+'</b><span>题目完成</span></div><div><b>'+groups.length+'</b><span>官方分组</span></div><div><b>'+easy+' / '+medium+' / '+hard+'</b><span>简单 / 中等 / 困难</span></div><div><b>'+(kind==='hot100'?'Python3':'SQL + Pandas')+'</b><span>完整可提交程序</span></div>';
  $('#practiceSource').innerHTML='当前严格对应 <a href="'+esc(source.url)+'" target="_blank" rel="noopener">'+esc(source.name)+' 官方学习计划 ↗</a>，并按官网分组与题序展示。';
  $('#practiceToolbar').innerHTML='<input class="quest-search" id="practiceSearch" value="'+esc(practiceFilter.query)+'" placeholder="搜索题号、题名或主题">'
    +'<select id="practiceGroupFilter"><option value="all">全部主题</option>'+groups.map(group=>'<option value="'+esc(group.id)+'"'+(practiceFilter.group===group.id?' selected':'')+'>'+esc(group.name)+'</option>').join('')+'</select>'
    +'<label class="toolbar-check"><input type="checkbox" id="practiceTodoOnly"'+(practiceFilter.todo?' checked':'')+'> 只看未完成</label>';
  const state=S.quest[kind]||{},query=practiceFilter.query.trim().toLowerCase();
  const visibleGroups=groups.map(group=>({group,questions:group.questions.filter(question=>{
    if(practiceFilter.group!=='all'&&group.id!==practiceFilter.group)return false;
    if(practiceFilter.todo&&state[question.slug])return false;
    const hay=(question.lc+' '+question.title+' '+group.name+' '+(question.category||'')).toLowerCase();
    return !query||hay.includes(query);
  })})).filter(item=>item.questions.length);
  const renderProblem=kind==='hot100'?renderHot100Problem:renderSql50Problem;
  root.innerHTML=visibleGroups.length?visibleGroups.map(item=>'<section class="quest-level"><div class="quest-level-head"><div><span class="quest-unit-name">'+(kind==='hot100'?'ALGORITHM':'DATABASE')+'</span><h3>'+esc(item.group.name)+'</h3></div><span>'+item.questions.length+' 题</span></div>'+item.questions.map(question=>renderProblem({group:item.group,question})).join('')+'</section>').join(''):'<div class="quest-empty">没有符合当前筛选的题目。</div>';
}
