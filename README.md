# 算法实习通关手册

纯前端学习网站：**双击 `index.html` 即可使用**，也可直接部署到 GitHub Pages，无需构建。

固定学习顺序：Python 基础语法 →《Hello 算法》→ LeetCode 数据结构与算法探险 → 数据库探险（SQL + Pandas）→ Hot 100 / SQL 50 自由复习 → AI 公共基础与独立方向专修。

AI 进阶不会重复前五阶段的 Python、算法与 SQL。公共基础只学习一次，之后可独立选择机器学习、深度学习、推荐系统、搜索系统、广告算法、大模型、RAG / Agent 或 AI 工程；需要跨方向时只补明确依赖。

## 文件结构

```
算法实习通关手册/
├── index.html          页面骨架与各版块容器
├── css/
│   └── style.css       全部样式（明暗两套主题，跟随系统可手动切换）
└── js/
    ├── data.js         四条路线 / 刷题模式 / 简历与项目范本 / 面经 / 资源库 —— 改文案主要在这
    ├── data-cards.js   知识卡片（40 张）与随堂自测（20 题）
    ├── data-topics.js  13 个刷题主题卡数据（题目 / 模板代码 / 易错点）
    ├── data-learning-path.js 固定的六阶段学习主线
    ├── data-quests-official.js LeetCode 官网探险题单快照（自动生成）
    ├── data-algo-solutions-a.js 算法探险前四区 Python3 题解
    ├── data-algo-solutions-b.js 算法探险后四区 Python3 题解
    ├── data-sql-solutions.js 数据库探险 SQL / Pandas 双解
    ├── data-hot100.js LeetCode 热题 100 官网题单与 Python3 题解
    ├── data-sql50.js 高频 SQL 50 题（基础版）及 SQL / Pandas 双解
    ├── view-home.js    学习主线与首页统计
    ├── view-adventure.js 算法探险渲染与筛选
    ├── view-database.js 数据库探险渲染与筛选
    ├── view-practice.js Hot 100 / SQL 50 自由复习渲染与筛选
    └── app.js          通用交互、其余页面、计时与导入导出
└── tools/
    └── sync-official-quests.ps1 从 LeetCode 中文站公开 GraphQL 同步题单
```

## 常见修改

| 想做的事 | 改哪里 |
|---|---|
| 同步官网探险题单 | 运行 `powershell -NoProfile -ExecutionPolicy Bypass -File tools/sync-official-quests.ps1` |
| 维护算法探险题解 | `js/data-algo-solutions-a.js` 或 `js/data-algo-solutions-b.js` |
| 维护数据库双解 | `js/data-sql-solutions.js` |
| 维护 Hot 100 | `js/data-hot100.js` |
| 维护 SQL 50 | `js/data-sql50.js` |
| 维护自由复习主题 | `js/data-topics.js` |
| 加一张知识卡 | `js/data-cards.js` 的 `FLASHCARDS` 加 `{id,deck,q,a}`（id 不要重复） |
| 加一道自测题 | `js/data-cards.js` 的 `QUIZ` 加 `{q,o:[四个选项],a:正确项下标,w:解析}` |
| 调整固定学习顺序 | `js/data-learning-path.js` |
| 调整 AI 进阶路线 | `js/data.js` 的 `ROADMAPS` |
| 增删资源链接 | `js/data.js` 的 `RESLIB` |
| 改配色 | `css/style.css` 顶部的 CSS 变量 |

改完保存、刷新浏览器即可，不需要任何构建工具。

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/pages.yml`。推送到 `main` 或 `master` 后，GitHub Actions 会自动组装纯静态发布包并部署到 Pages。

当前仓库已经启用 GitHub Actions Pages。之后每次推送都会自动更新网站，也可以在 Actions 页面手动运行 `Deploy static site to GitHub Pages`。如果将项目 fork 到新仓库，需要在 **Settings → Pages** 中把 **Build and deployment → Source** 设置为 **GitHub Actions**。

发布包只包含 `index.html`、`favicon.svg`、`.nojekyll`、`css/` 和 `js/`，不会把同步脚本或说明文档暴露为网站内容。所有资源均使用相对路径，因此同时支持用户主页仓库和项目子路径。

## 进度数据

- 所有勾选、翻卡、计时进度存在**本机浏览器 localStorage**（键名 `algo_hub_v1`），换浏览器/电脑不互通。
- 「学习打卡」页底部有 **导出进度 / 导入进度**，换环境前先导出备份。

官网算法探险是分支地图。页面显示本站遍历序号、官网关卡、本关题序与 LC 题号；当前收录 35 个公开关卡、109 道正式题，并与 24 道公开测验题分开统计。数据库探险同样将 19 道正式题与 3 道公开测验题分开统计。同步脚本会自动排除会员关卡和 `paidOnly` 题目。

## 进度 JSON API

页面的“导出进度 / 导入进度”按钮统一使用浏览器端 `window.AlgoHandbookProgress` API：

```js
const json = window.AlgoHandbookProgress.exportJSON(); // 返回带版本信息的 JSON 字符串
window.AlgoHandbookProgress.downloadJSON(); // 下载 JSON 进度文件
window.AlgoHandbookProgress.importJSON(json); // 导入 JSON 字符串或已解析对象
```

新版备份包含 `format`、`version`、`exportedAt` 和 `state`；导入接口同时兼容旧版直接保存状态对象的 JSON 文件。

自由复习页严格对齐 [LeetCode 热题 100](https://leetcode.cn/studyplan/top-100-liked/) 的 100 道题和 17 个官方分组，以及 [高频 SQL 50 题（基础版）](https://leetcode.cn/studyplan/sql-free-50/) 的 50 道题和 7 个官方分组。Hot 100 提供 Python3 题解，SQL 50 每题提供 MySQL / Pandas 双解；两份进度独立保存，并共同构成学习主线第 5 阶段的完成度。

