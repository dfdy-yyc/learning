'use strict';

let sqlQuestFilter={unit:'all',todo:false,query:''};

function sqlCodebox(key,title,code,language){return questCodebox(key,title,code,'',language);}
function completePandasCode(code){
  if(!code)return code;
  return /^import pandas as pd/m.test(code)?code:'import pandas as pd\n\n'+code;
}

function renderSqlProblem(item){
  const question=item.question,solution=SQL_SOLUTIONS[question.slug]||{};
  const done=questProblemDone('sql',question),difficulty=DIFFICULTY_LABEL[question.difficulty]||question.difficulty;
  return '<details class="quest-problem'+(done?' done':'')+'"><summary><label class="quest-check" data-no-toggle><input type="checkbox" data-quest-prob="sql|'+question.slug+'"'+(done?' checked':'')+' aria-label="标记 '+esc(question.title)+' 完成"></label>'
    +'<span class="quest-index">本站 #'+(item.siteIndex+1)+'</span><div class="quest-name"><b>LC '+question.lc+' · '+esc(question.title)+'</b><span>官网第 '+item.officialLevel+' 关 · 本关第 '+(item.inLevelIndex+1)+' 题 · '+esc(item.unit.name)+' / '+esc(item.level.name)+'</span></div><span class="diff '+diffCls(difficulty)+'">'+difficulty+'</span></summary>'
    +'<div class="quest-solution"><div class="quest-meta"><span>本关概念：'+esc(solution.concept||item.level.name)+'</span><a href="https://leetcode.cn/problems/'+question.slug+'/" target="_blank" rel="noopener">打开原题 ↗</a></div>'
    +'<div class="solution-pair"><div><div class="mini-h">MySQL</div>'+sqlCodebox('sql-'+question.slug+'-mysql','完整 MySQL 解答',solution.sql||'-- 题解数据正在补充','sql')+'</div><div><div class="mini-h">Pandas</div>'+sqlCodebox('sql-'+question.slug+'-pandas','完整 Pandas 解答',completePandasCode(solution.pandas)||'# 题解数据正在补充','python')+'</div></div></div></details>';
}

function renderSqlQuest(){
  const quest=OFFICIAL_QUESTS['database-quest'],stats=questStats('sql',quest);
  $('#sqlQuestSummary').innerHTML='<div><b>'+stats.done+'/'+stats.total+'</b><span>正式题完成</span></div><div><b>'+quest.units.length+'</b><span>官网区域</span></div><div><b>5</b><span>正式关卡</span></div><div><b>SQL + Pandas</b><span>每题双解</span></div>';
  $('#sqlQuestToolbar').innerHTML='<input class="quest-search" id="sqlQuestSearch" value="'+esc(sqlQuestFilter.query)+'" placeholder="搜索题号、题名或关卡">'
    +'<select id="sqlUnitFilter"><option value="all">全部区域</option>'+quest.units.map(unit=>'<option value="'+unit.id+'"'+(sqlQuestFilter.unit===String(unit.id)?' selected':'')+'>'+esc(unit.name)+'</option>').join('')+'</select>'
    +'<label class="toolbar-check"><input type="checkbox" id="sqlTodoOnly"'+(sqlQuestFilter.todo?' checked':'')+'> 只看未完成</label>';
  const visible=stats.items.filter(item=>{
    if(sqlQuestFilter.unit!=='all'&&String(item.unit.id)!==sqlQuestFilter.unit)return false;
    if(sqlQuestFilter.todo&&questProblemDone('sql',item.question))return false;
    const hay=(item.question.lc+' '+item.question.title+' '+item.level.name).toLowerCase();
    return !sqlQuestFilter.query||hay.includes(sqlQuestFilter.query.toLowerCase());
  });
  const groups=[];
  visible.forEach(item=>{
    let group=groups.find(entry=>entry.level.id===item.level.id&&entry.unit.id===item.unit.id);
    if(!group){group={unit:item.unit,level:item.level,officialLevel:item.officialLevel,items:[]};groups.push(group);}
    group.items.push(item);
  });
  $('#sqlQuestList').innerHTML=groups.length?groups.map(group=>'<section class="quest-level"><div class="quest-level-head"><div><span class="quest-unit-name">'+esc(group.unit.name)+'</span><h3>官网第 '+group.officialLevel+' 关 · '+esc(group.level.name)+'</h3></div><span>'+group.items.length+' 题</span></div>'+group.items.map(renderSqlProblem).join('')+'</section>').join(''):'<div class="quest-empty">没有符合当前筛选的题目。</div>';
  renderQuestQuizzes('sql',quest,$('#sqlQuestQuizzes'));
}
