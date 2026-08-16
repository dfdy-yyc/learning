'use strict';
/* The single learning order used by the home page and study roadmap. */
const LEARNING_PATH=[
  {id:'python',order:1,emoji:'🐍',title:'Python 基础语法',status:'foundation',
   summary:'先掌握变量、容器、控制流、函数、类、异常、常用标准库以及基本输入输出。',
   exit:'能独立写小程序，并看懂 LeetCode 的 Python3 函数签名。',
   links:[['Python 官方教程','https://docs.python.org/zh-cn/3/tutorial/']]},
  {id:'hello',order:2,emoji:'📘',title:'《Hello 算法》',status:'foundation',
   summary:'按章节系统学习数据结构与算法，运行书中的 Python 示例并完成章节练习。',
   exit:'学完前 10 章及配套题，再进入力扣探险模式。',
   links:[['Hello 算法','https://www.hello-algo.com/']]},
  {id:'algo-quest',order:3,emoji:'🧭',title:'数据结构与算法探险模式',status:'quest',
   summary:'严格沿用 LeetCode 官网区域、关卡、分支和关内题序；每题保存完整 Python3 程序。',
   exit:'完成全部正式关卡题，并能用关卡算法复现；明显更优的解法也要掌握。',
   go:'leetcode'},
  {id:'sql-quest',order:4,emoji:'🗄️',title:'数据库探险模式',status:'quest',
   summary:'严格沿用 LeetCode 数据库探险的 5 个区域；每题并列练 SQL 与 Pandas。',
   exit:'能在两种实现之间解释分组、联表、窗口和排序的对应关系。',
   go:'database'},
  {id:'free-practice',order:5,emoji:'🎯',title:'Hot 100 与 SQL 50 自由复习',status:'practice',
   summary:'完成两条探险主线后，按面试时间、薄弱主题和错题情况自由选择。',
   exit:'完成两份题单并形成错题本，以复现质量为准，不机械追求题量。',
   go:'practice'},
  {id:'ai',order:6,emoji:'🧠',title:'AI 公共基础 → 独立方向专修',status:'advanced',
   summary:'公共基础只学一次，再从机器学习、深度学习、推荐、搜索、广告、大模型、RAG / Agent 与 AI 工程中选择主方向。',
   exit:'完成一条方向路线及其可复现项目；需要跨方向时只补明确依赖。',
   go:'roadmap'}
];
