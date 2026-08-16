'use strict';

function pathQuestStats(kind){
  const slug=kind==='algo'?'data-structures-and-algorithms-quest':'database-quest';
  const questions=flattenQuestQuestions(OFFICIAL_QUESTS[slug]);
  const done=questions.filter(item=>questProblemDone(kind,item.question)).length;
  return {done,total:questions.length};
}

function pathStageFraction(stage){
  if(stage.id==='algo-quest'){
    const stats=pathQuestStats('algo');
    return stats.total?stats.done/stats.total:0;
  }
  if(stage.id==='sql-quest'){
    const stats=pathQuestStats('sql');
    return stats.total?stats.done/stats.total:0;
  }
  if(stage.id==='free-practice'&&typeof practiceStageFraction==='function')return practiceStageFraction();
  return S.path[stage.id]?1:0;
}

function learningOverall(){
  if(!LEARNING_PATH.length)return 0;
  return LEARNING_PATH.reduce((sum,stage)=>sum+pathStageFraction(stage),0)/LEARNING_PATH.length;
}

function currentLearningStage(){
  return LEARNING_PATH.find(stage=>pathStageFraction(stage)<1)||LEARNING_PATH[LEARNING_PATH.length-1];
}

function renderLearningPath(){
  const root=$('#learningPath');
  if(!root)return;
  const current=currentLearningStage();
  root.innerHTML=LEARNING_PATH.map(stage=>{
    const frac=pathStageFraction(stage);
    const done=frac>=1;
    let status=done?'已完成':Math.round(frac*100)+'%';
    if(stage.id==='algo-quest'){
      const stats=pathQuestStats('algo');status=stats.done+'/'+stats.total+' 题';
    }else if(stage.id==='sql-quest'){
      const stats=pathQuestStats('sql');status=stats.done+'/'+stats.total+' 题';
    }else if(stage.id==='free-practice'&&typeof practiceStats==='function'){
      const hot=practiceStats('hot100'),sql=practiceStats('sql50');status=(hot.done+sql.done)+'/'+(hot.total+sql.total)+' 题';
    }
    const links=(stage.links||[]).map(link=>'<a href="'+link[1]+'" target="_blank" rel="noopener">'+esc(link[0])+' ↗</a>').join('');
    const action=stage.go?'<button class="btn btn-sm" data-go="'+stage.go+'">进入阶段</button>':'';
    const manual=stage.status==='quest'||stage.status==='practice'?'':'<label class="path-check"><input type="checkbox" data-path-stage="'+stage.id+'"'+(done?' checked':'')+'> 阶段完成</label>';
    return '<article class="path-stage'+(done?' done':'')+(current.id===stage.id?' current':'')+'">'
      +'<div class="path-order">'+stage.order+'</div><div class="path-content"><div class="path-title"><span>'+stage.emoji+'</span><h3>'+esc(stage.title)+'</h3><span class="path-status">'+status+'</span></div>'
      +'<p>'+esc(stage.summary)+'</p><div class="path-exit"><b>完成标准：</b>'+esc(stage.exit)+'</div>'
      +'<div class="path-actions">'+links+action+manual+'</div></div></article>';
  }).join('');
}

function renderPathHomeTiles(){
  const algo=pathQuestStats('algo'),sql=pathQuestStats('sql'),stage=currentLearningStage();
  const today=S.days[todayKey()]||0,st=streak();
  $('#statTiles').innerHTML=
    '<div class="tile"><div class="tile-lab">当前阶段</div><div class="tile-num"><small>第 '+stage.order+' 阶段</small></div><div class="tile-sub">'+stage.emoji+' '+esc(stage.title)+'</div><div class="prog-bar"><i style="width:'+Math.round(pathStageFraction(stage)*100)+'%"></i></div></div>'
   +'<div class="tile"><div class="tile-lab">算法探险</div><div class="tile-num">'+algo.done+'<small>/'+algo.total+' 题</small></div><div class="tile-sub">官方正式关卡</div><div class="prog-bar"><i style="width:'+pct(algo.done,algo.total)+'%"></i></div></div>'
   +'<div class="tile"><div class="tile-lab">数据库探险</div><div class="tile-num">'+sql.done+'<small>/'+sql.total+' 题</small></div><div class="tile-sub">SQL 与 Pandas 双解</div><div class="prog-bar"><i style="width:'+pct(sql.done,sql.total)+'%"></i></div></div>'
   +'<div class="tile"><div class="tile-lab">今日学习</div><div class="tile-num">'+fmtHM(today)+'</div><div class="tile-sub">连续打卡 '+st+' 天</div></div>';
}

function renderPathNext(){
  const stage=currentLearningStage();
  const target=stage.go||'path';
  const items=[{em:stage.emoji,t:'继续第 '+stage.order+' 阶段：'+stage.title,s:stage.exit,go:target}];
  const un=FLASHCARDS.filter(card=>S.cards[card.id]!==1).length;
  if(un)items.push({em:'🃏',t:'知识卡片还剩 '+un+' 张未掌握',s:'作为当前阶段的短时复习',go:'cards'});
  if(S.quizBest<QTARGET)items.push({em:'📝',t:S.quizBest<0?'随堂自测还没做过':'自测最佳 '+S.quizBest+'/'+QUIZ.length,s:'完成一次知识检查',go:'quiz'});
  $('#nextSteps').innerHTML=items.map(item=>'<button class="next-it" data-go="'+item.go+'"><span class="next-em">'+item.em+'</span><div><div class="next-t">'+esc(item.t)+'</div><div class="next-s">'+esc(item.s)+'</div></div><span class="next-go">→</span></button>').join('');
}

function renderPathQuick(){
  const algoQuest=OFFICIAL_QUESTS['data-structures-and-algorithms-quest'],algo=questStats('algo',algoQuest);
  const algoLevels=algoQuest.units.reduce((sum,unit)=>sum+unit.levels.length,0);
  const sqlQuest=OFFICIAL_QUESTS['database-quest'],sql=questStats('sql',sqlQuest);
  const desc={path:'唯一的六阶段学习顺序',leetcode:'官网 '+algoQuest.units.length+' 区、'+algoLevels+' 个公开关卡、'+algo.total+' 道正式题',database:'官网 '+sqlQuest.units.length+' 区、'+sql.total+' 道正式题，SQL/Pandas 双解',practice:'Hot 100 与 SQL 50，共 150 道',roadmap:'公共基础 + 8 个独立 AI 方向',cards:FLASHCARDS.length+' 张进阶知识卡',quiz:QUIZ.length+' 题随堂自测',job:'匿名化求职与面试资料',res:'按用途整理的公开资源',checkin:'专注计时与本机打卡'};
  $('#quickGrid').innerHTML=VIEWS.filter(view=>view.id!=='home').map(view=>'<button class="quick" data-go="'+view.id+'"><div class="q-e">'+view.em+'</div><div class="q-t">'+view.name+'</div><div class="q-d">'+esc(desc[view.id]||'')+'</div></button>').join('');
}
