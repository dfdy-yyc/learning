'use strict';
/* ================= 静态数据（文案改这里） ================= */
const VIEWS=[
 {id:'home',name:'总览',em:'🏠'},
 {id:'path',name:'学习主线',em:'🧩'},
 {id:'leetcode',name:'算法探险',em:'🧭'},
 {id:'database',name:'数据库探险',em:'🗄️'},
 {id:'practice',name:'自由复习',em:'🎯'},
 {id:'roadmap',name:'AI 进阶',em:'🗺️'},
 {id:'cards',name:'知识卡片',em:'🃏'},
 {id:'quiz',name:'随堂自测',em:'📝'},
 {id:'job',name:'求职宝典',em:'💼'},
 {id:'res',name:'资源库',em:'📚'},
 {id:'checkin',name:'学习打卡',em:'⏱️'},
];

const QUOTES=[
 '“面试你可以失误无数次，但只要招聘方失误一次，就会把你招进去。”',
 '“不必等完全准备好再行动——面试本身也是学习。”',
 '“已读不回不代表不合适，那是供需关系的结果，不是你不行。”',
 '“遇到不懂的问题千万不要死磕，直接问大模型。”',
 '“第一份实习的核心：多投递，多看机会。”',
 '“没有实习，哪怕有一篇 A 类论文，秋招也会很被动。”',
 '“刷题不是堆数量，能复现、能讲清，才算真正掌握。”',
 '“很多小公司声称在做 Agent，实际还是开发的活——开发底子也要一起补。”',
 '“招聘节奏会波动，短期没有回复不代表能力不足；休整期继续准备即可。”',
];

const ROADMAPS={
 foundation:{name:'公共基础',icon:'🧱',prereq:'已完成前五阶段；Python、算法和 SQL 不在这里重学。',goal:'补齐数理、建模、实验和 PyTorch 这组所有 AI 方向共用的能力。',exit:'能独立完成一个可复现的监督学习实验，并解释指标与误差来源。',intro:'这是所有方向唯一共享的起点。只学一次，完成后直接进入目标方向，不要把所有方向从头到尾全部学一遍。',steps:[
  {id:'ai_base_math',t:'线性代数、概率与优化够用集',time:'1–2 周',src:'向量矩阵 / 条件概率 / 最大似然 / 梯度下降',d:'围绕模型真正会用到的内容学习：矩阵乘法与特征分解、期望方差与常见分布、最大似然和交叉熵、偏导与梯度下降。避免从头重修完整数学课程。',tips:['每个概念都配一个 NumPy 小实验','能解释公式里的每个维度比背推导更重要'],out:'一份 AI 数学速查表 + 4 个数值实验',links:[['南瓜书','https://datawhalechina.github.io/pumpkin-book/']]},
  {id:'ai_base_workflow',t:'机器学习实验闭环',time:'3–5 天',src:'数据切分 / 基线 / 交叉验证 / 调参',d:'掌握训练集、验证集、测试集的职责，建立 baseline，再做特征、模型和超参数对照实验；杜绝数据泄漏和只报最好结果。',tips:['固定随机种子并保存配置','先写评价方案，再开始调模型'],out:'一份含 baseline、对照实验和误差分析的 notebook',links:[['scikit-learn 模型选择指南','https://scikit-learn.org/stable/model_selection.html']]},
  {id:'ai_base_metrics',t:'指标、采样与 A/B 实验',time:'3–5 天',src:'分类回归指标 / 置信区间 / 假设检验',d:'理解 Accuracy、Precision、Recall、F1、AUC、LogLoss、MAE、RMSE 的适用边界，并能把离线指标与线上业务目标连接起来。',tips:['类别不平衡时不要只看 Accuracy','区分统计显著和业务显著'],out:'一张指标选择表 + 一个 A/B 实验分析案例',links:[]},
  {id:'ai_base_torch',t:'PyTorch 训练最小闭环',time:'1 周',src:'张量 / Dataset / Module / 优化器 / checkpoint',d:'只建立通用训练能力：数据加载、前向计算、损失、反向传播、参数更新、验证、保存与恢复。具体网络结构留到深度学习方向。',tips:['主动打印每层张量形状','训练与验证模式必须明确切换'],out:'一个带配置、日志、早停和 checkpoint 的训练脚手架',links:[['《动手学深度学习》中文版','https://zh.d2l.ai/']]},
  {id:'ai_base_repro',t:'复现、误差分析与实验记录',time:'2–3 天',src:'Git / 环境锁定 / 实验表 / failure cases',d:'记录数据版本、代码提交、依赖、参数和结果；从错误样本中判断问题来自数据、特征、模型还是阈值。',tips:['每次实验只改变一个主要变量','结论必须能由表格或样本支撑'],out:'一个别人按 README 可以复现的基础项目仓库',links:[]}
 ]},
 ml:{name:'机器学习',icon:'📊',prereq:'公共基础；不要求先学深度学习。',goal:'掌握表格数据上的经典建模、特征工程和可解释分析。',exit:'完成一个从数据清洗到误差分析的端到端表格项目。',intro:'适合数据挖掘、风控、运营分析和通用算法岗位。重点是可靠的实验与业务解释，不是机械罗列模型。',steps:[
  {id:'ml_linear_tree',t:'线性模型与决策树',time:'1 周',src:'线性/逻辑回归、树模型',d:'理解正则化、决策边界、树的分裂与剪枝，建立可解释 baseline。',tips:['先从线性模型判断数据是否有信号','比较训练误差与验证误差定位欠拟合或过拟合'],out:'同一数据集上的线性模型与树模型对照报告',links:[]},
  {id:'ml_feature',t:'特征工程与数据泄漏',time:'4–7 天',src:'缺失值 / 类别编码 / 数值变换 / 时间特征',d:'用 Pipeline 固化预处理；理解 target encoding、时间穿越和聚合特征最容易造成的数据泄漏。',tips:['所有统计量只能由训练折计算','时间数据优先按时间切分'],out:'一个无泄漏的 sklearn Pipeline',links:[]},
  {id:'ml_ensemble',t:'集成学习主线',time:'1–2 周',src:'Random Forest / GBDT / XGBoost / LightGBM',d:'理解 Bagging 与 Boosting 的差别，掌握学习率、树深、采样和早停对偏差方差的影响。',tips:['不要一上来就大规模网格搜索','用特征重要性和 SHAP 辅助排查'],out:'一份提升路径清晰的 boosting 实验记录',links:[]},
  {id:'ml_unsupervised',t:'无监督学习与异常检测',time:'1 周',src:'聚类 / 降维 / Isolation Forest',d:'掌握标准化、距离度量、聚类评估和二维可视化，理解无标签场景下结论的不确定性。',tips:['聚类标签不是天然业务人群','降维图只用于观察，不代替定量评估'],out:'一个用户分群或异常检测案例',links:[]},
  {id:'ml_project',t:'表格建模项目',time:'1–2 周',src:'公开数据 + 可复现实验',d:'选择流失预测、信用风险或销量预测中的一个，完成问题定义、数据验证、基线、调优、解释和部署接口。',tips:['先定义预测时点，避免使用未来信息','README 写清业务代价与模型限制'],out:'一个完整仓库 + 5 分钟项目讲解稿',links:[['Kaggle Datasets','https://www.kaggle.com/datasets']]}
 ]},
 deep:{name:'深度学习',icon:'🧠',prereq:'公共基础，熟悉 PyTorch 训练闭环。',goal:'系统理解神经网络训练、视觉、序列建模与注意力。',exit:'能从任务特点选择网络，定位训练异常并完成至少一个专项项目。',intro:'这是模型结构与训练机制方向。推荐、搜索、广告和大模型只在需要时引用这里的能力，不再各自重复讲神经网络基础。',steps:[
  {id:'dl_train',t:'MLP 与训练稳定性',time:'1 周',src:'初始化 / 激活 / 归一化 / 正则化',d:'理解反向传播、梯度消失与爆炸、BatchNorm、LayerNorm、Dropout、残差连接和学习率策略。',tips:['画训练/验证 loss 曲线再调参','用梯度范数定位训练异常'],out:'一份神经网络训练故障排查清单',links:[['动手学深度学习','https://zh.d2l.ai/']]},
  {id:'dl_vision',t:'CNN 与视觉任务',time:'1–2 周',src:'卷积 / 池化 / ResNet / 数据增强',d:'从图像分类理解局部连接、权重共享、感受野和迁移学习，再扩展到检测或分割的任务接口。',tips:['先用预训练模型建立强基线','检查类别分布与增强是否破坏标签'],out:'一个图像分类项目 + 混淆矩阵分析',links:[]},
  {id:'dl_sequence',t:'序列模型与注意力',time:'1–2 周',src:'RNN / LSTM / Attention / Transformer',d:'理解递归状态、长程依赖和 self-attention 的 Q/K/V、mask、位置编码与多头机制。',tips:['逐层标注张量维度','能解释训练并行与自回归推理的区别'],out:'手写一个最小 attention + 序列分类模型',links:[]},
  {id:'dl_optimization',t:'训练效率与迁移学习',time:'1 周',src:'混合精度 / 梯度累积 / 冻结与微调',d:'掌握显存、吞吐、batch size 和收敛之间的关系，能在有限硬件上完成可靠实验。',tips:['先测数据加载瓶颈再怪 GPU','保存最优验证指标对应的权重'],out:'一份训练性能与精度权衡报告',links:[]},
  {id:'dl_project',t:'专项项目与论文复现',time:'2–4 周',src:'视觉或序列任务二选一',d:'优先选择有公开数据和官方代码的工作，复现 baseline 后只做一个可验证改动。',tips:['先复现论文表格中的一个核心结果','记录环境、随机种子和失败实验'],out:'复现报告 + 可运行代码 + 改动消融实验',links:[['Papers with Code','https://paperswithcode.com/']]}
 ]},
 recommend:{name:'推荐系统',icon:'🎯',prereq:'公共基础；深度排序模型需要深度学习基础。',goal:'解决“在用户没有明确查询时，给谁推荐什么”。',exit:'完成召回、排序、重排和离线评估组成的推荐闭环。',intro:'推荐与搜索、广告共享部分模型，但任务和评价方式不同。本路线只讲推荐，不再用“搜广推”一词把三个岗位揉在一起。',steps:[
  {id:'rec_problem',t:'推荐目标与数据闭环',time:'3–5 天',src:'曝光 / 点击 / 停留 / 转化 / 负反馈',d:'定义用户、物品、场景和目标，理解曝光偏差、隐式反馈、冷启动与反馈回路。',tips:['没有曝光日志就无法构造可靠负样本','明确离线标签对应哪个线上目标'],out:'一张推荐数据流与指标树',links:[]},
  {id:'rec_cf',t:'协同过滤与矩阵分解',time:'1 周',src:'UserCF / ItemCF / MF / BPR',d:'掌握相似度、隐向量和 pairwise ranking，理解经典方法何时比复杂模型更稳。',tips:['分别处理热门偏置与长尾覆盖','同时报告 Recall 和 Coverage'],out:'一个 ItemCF + BPR 双基线',links:[['王树森推荐系统讲义','https://github.com/wangshusen/RecommenderSystem']]},
  {id:'rec_recall',t:'多路召回',time:'1–2 周',src:'热门 / 协同 / 内容 / 向量 / 图召回',d:'构建候选生成层，学习 ANN 索引、召回融合和各路配额；区分召回率、延迟和新颖性目标。',tips:['分召回通道统计命中与重合率','先保证候选覆盖，再谈排序提升'],out:'一个可解释的多路召回实验',links:[]},
  {id:'rec_rank',t:'粗排与精排',time:'1–2 周',src:'Wide&Deep / DeepFM / DIN / 多任务学习',d:'学习特征交叉、行为序列、样本构造和多目标建模，明确训练样本与线上打分链路。',tips:['先用 GBDT 或 LR 建立排序基线','校准与排序能力要分开评估'],out:'两种排序模型的消融对照',links:[]},
  {id:'rec_rerank',t:'重排、探索与在线评估',time:'1 周',src:'多样性 / 新颖性 / 去重 / 探索利用',d:'在相关性之外加入业务规则与用户体验约束，理解 A/B 实验、用户级 GAUC 和长期指标。',tips:['业务规则要记录命中率与损失','短期 CTR 提升不等于长期体验提升'],out:'一套重排规则 + 离线评估看板',links:[]},
  {id:'rec_project',t:'端到端推荐项目',time:'2–4 周',src:'公开行为数据',d:'实现离线样本、召回、排序、重排和服务接口，README 说明冷启动、更新频率和线上替代方案。',tips:['项目必须能展示候选如何逐层减少','至少保留一个失败方案和原因'],out:'推荐系统仓库 + 链路图 + 项目逐字稿',links:[['天池','https://tianchi.aliyun.com/']]}
 ]},
 search:{name:'搜索系统',icon:'🔎',prereq:'公共基础；语义检索建议先具备深度学习基础。',goal:'解决“用户带着明确查询时，如何快速返回最相关结果”。',exit:'完成可解释的关键词、向量和学习排序混合搜索系统。',intro:'搜索的核心是查询理解、索引、检索和相关性，不等同于推荐召回，也不等同于 RAG 的知识库封装。',steps:[
  {id:'search_ir',t:'倒排索引与 BM25',time:'1 周',src:'分词 / 倒排表 / TF-IDF / BM25',d:'理解文档如何进入索引、查询如何匹配，以及词频、文档频率和长度归一化如何影响得分。',tips:['用几个小文档手算一次 BM25','中文搜索先固定分词与同义词方案'],out:'一个支持 BM25 和字段权重的搜索基线',links:[['Introduction to Information Retrieval','https://nlp.stanford.edu/IR-book/']]},
  {id:'search_query',t:'查询理解与召回治理',time:'1 周',src:'纠错 / 同义词 / 意图 / 实体 / query rewrite',d:'处理短查询、拼写错误、零结果和歧义，建立 query 日志分析与词典迭代流程。',tips:['先分析高频零结果 query','rewrite 必须保留原查询便于回退'],out:'一份 query 分类集 + 规则与模型基线',links:[]},
  {id:'search_dense',t:'向量检索与混合召回',time:'1–2 周',src:'双塔编码 / ANN / sparse+dense',d:'学习 embedding、对比学习、负样本和向量索引，用融合策略兼顾精确词匹配与语义召回。',tips:['困难负样本决定语义检索上限','分别测召回质量、索引大小和延迟'],out:'BM25、向量、混合检索三组对照',links:[['BEIR','https://github.com/beir-cellar/beir']]},
  {id:'search_ltr',t:'Learning to Rank',time:'1–2 周',src:'pointwise / pairwise / listwise / LambdaMART',d:'构造 query-document 特征，理解 NDCG、MRR、MAP 和位置偏差；用 LambdaMART 建立可解释排序基线。',tips:['按 query 分组切分数据','避免把展示位置直接当成相关性'],out:'一个 LTR 模型 + 特征贡献分析',links:[]},
  {id:'search_system',t:'搜索工程与评测',time:'1 周',src:'索引更新 / 缓存 / 分片 / 超时降级',d:'建立标注集和回归测试，理解全量与增量索引、热门查询缓存、结果去重及故障降级。',tips:['每次改相关性都跑固定 query 集','P95 延迟与相关性同等重要'],out:'相关性回归集 + 延迟/质量看板',links:[]},
  {id:'search_project',t:'垂直搜索项目',time:'2–4 周',src:'文档、商品或岗位数据',d:'实现采集清洗、索引、query 理解、混合召回、排序和评测，不把聊天界面当作搜索系统本身。',tips:['准备 30–50 条人工相关性标注','展示典型好例和坏例'],out:'一个可搜索的垂直领域系统 + 评测报告',links:[]}
 ]},
 ads:{name:'广告算法',icon:'📣',prereq:'公共基础；排序模型需要机器学习或深度学习能力。',goal:'解决“在预算、竞价和用户体验约束下展示什么广告”。',exit:'完成 CTR/CVR、校准、竞价与增量评估组成的广告实验。',intro:'广告不是推荐系统换个数据集。它同时受竞价、预算、计费、校准、归因和合规约束，目标通常是多方收益平衡。',steps:[
  {id:'ads_market',t:'广告业务与拍卖机制',time:'3–5 天',src:'广告主 / 平台 / 用户 / CPM / CPC / CPA',d:'理解流量、广告、出价、计费和收益链路，掌握一价、二价、GSP 与质量分的基本作用。',tips:['先画清资金流和信息流','区分平台排序分与最终扣费'],out:'一张广告链路与计费示例',links:[]},
  {id:'ads_ctr',t:'CTR / CVR 预估',time:'1–2 周',src:'LR / GBDT / Wide&Deep / DeepFM',d:'处理稀疏特征、负采样、延迟转化和样本选择偏差，分别评估排序与概率准确性。',tips:['CVR 标签窗口必须定义清楚','训练、校准和线上分布要分别监控'],out:'CTR 与 CVR 两个可复现实验',links:[]},
  {id:'ads_calibration',t:'校准与多目标排序',time:'1 周',src:'LogLoss / AUC / calibration / eCPM',d:'理解 AUC 高不代表概率准，用 Platt 或 isotonic 等方法校准，并把 pCTR、pCVR、出价和体验约束组合成排序目标。',tips:['画 reliability diagram','权重变化必须做敏感性分析'],out:'校准前后对比 + 多目标排序模拟',links:[]},
  {id:'ads_bidding',t:'竞价、预算与节奏控制',time:'1–2 周',src:'bid optimization / pacing / ROI constraint',d:'学习在预算、ROI 与流量波动下分配出价，理解实时反馈、探索和约束优化的基本问题。',tips:['先做离线仿真再讨论线上策略','明确策略可观察到的信息边界'],out:'一个预算 pacing 仿真器',links:[]},
  {id:'ads_causal',t:'归因、增量与实验',time:'1–2 周',src:'attribution / uplift / incrementality / A/B',d:'区分相关转化和广告带来的增量，理解归因窗口、最后点击偏差、uplift 建模与实验分流。',tips:['归因指标不能替代因果增量','随机实验优先于复杂归因规则'],out:'一个 uplift 或增量评估案例',links:[['Google Rules of ML','https://developers.google.com/machine-learning/guides/rules-of-ml']]},
  {id:'ads_project',t:'广告排序仿真项目',time:'2–4 周',src:'公开点击日志或合成数据',d:'构建 CTR 预估、概率校准、eCPM 排序、预算约束和离线回放，明确数据只模拟哪部分真实系统。',tips:['公开数据无法还原真实竞价时要主动说明','同时报告收益、体验和公平性指标'],out:'广告仿真仓库 + 指标看板 + 局限说明',links:[]}
 ]},
 llm:{name:'大模型',icon:'🤖',prereq:'公共基础 + 深度学习中的 Transformer。',goal:'掌握语言模型的数据、预训练、微调、对齐、评测和推理。',exit:'完成一个小模型训练或微调实验，并能解释性能与成本。',intro:'本路线研究模型本身。RAG、工具调用和业务工作流放在下一条应用路线，避免把“会调接口”与“理解大模型训练”混为一谈。',steps:[
  {id:'llm_arch',t:'Tokenizer 与 Decoder-only Transformer',time:'1–2 周',src:'BPE / causal mask / RoPE / MHA / GQA / FFN',d:'从文本分词到 logits 串起完整前向过程，理解位置编码、KV cache 和自回归生成。',tips:['逐层写出 batch、sequence、hidden 维度','手写一个最小 BPE 和 attention'],out:'Tokenizer + mini Transformer 前向实现',links:[['复旦大模型教材','https://intro-llm.github.io/']]},
  {id:'llm_pretrain',t:'预训练数据与训练',time:'1–2 周',src:'清洗 / 去重 / 混合 / scaling / checkpoint',d:'理解数据质量、token 配比、next-token objective、优化器、学习率和分布式训练的基本矛盾。',tips:['数据治理与模型结构同样重要','报告 token 数、上下文长度和算力假设'],out:'一个小语料预训练实验记录',links:[['Stanford CS336','https://stanford-cs336.github.io/']]},
  {id:'llm_sft',t:'SFT 与参数高效微调',time:'1–2 周',src:'instruction data / LoRA / QLoRA / PEFT',d:'设计指令数据、模板和 loss mask，比较全量微调、LoRA 与量化微调的资源和效果。',tips:['严格划分训练与评测指令','记录可训练参数量和显存峰值'],out:'一个 LoRA 微调 + 基线对比',links:[['Hugging Face PEFT','https://huggingface.co/docs/peft/']]},
  {id:'llm_align',t:'偏好对齐',time:'1–2 周',src:'RM / RLHF / PPO / DPO / GRPO',d:'理解偏好数据、奖励建模与策略优化的关系，重点掌握 DPO 类方法的输入、目标和局限。',tips:['先掌握监督信号来自哪里','区分回答风格提升与事实能力提升'],out:'一张对齐方法对照表 + 小型 DPO 实验',links:[]},
  {id:'llm_eval',t:'评测、安全与推理优化',time:'1–2 周',src:'任务评测 / 人工评测 / 量化 / batching / vLLM',d:'建立质量、幻觉、安全、吞吐、首 token 延迟和成本的联合评估，理解量化、KV cache 与 continuous batching。',tips:['评测集要覆盖失败模式','同一硬件同一请求集比较推理方案'],out:'一份质量与推理性能联合报告',links:[['vLLM 文档','https://docs.vllm.ai/']]},
  {id:'llm_project',t:'从零训练或专项微调项目',time:'3–8 周',src:'minimind 或 CS336 作业',d:'二选一：从零训练小模型理解底层，或围绕明确任务做数据构造、微调和评测；不要把 RAG 项目算成模型训练项目。',tips:['结果必须与未微调基线比较','保留数据卡与模型卡'],out:'模型代码/权重 + 实验报告 + 模型卡',links:[['minimind','https://github.com/jingyaogong/minimind']]}
 ]},
 agent:{name:'RAG / Agent',icon:'🧰',prereq:'公共基础；理解大模型生成与 embedding，数据库能力沿用前面阶段。',goal:'构建可检索、可调用工具、可评测、可审计的 LLM 应用。',exit:'完成一个有证据引用、工具权限和自动评测的工作流。',intro:'这是大模型应用系统路线，不重复预训练、SFT、SQL 语法或 Python 基础。先把单 Agent 工作流做稳，再考虑 Multi-Agent。',steps:[
  {id:'rag_pipeline',t:'RAG 数据与索引',time:'1 周',src:'解析 / chunk / metadata / embedding / vector index',d:'围绕真实文档设计切分、元数据、权限和增量更新，理解 embedding 与向量索引的质量和成本。',tips:['切分策略必须由文档结构驱动','索引中保留来源和版本'],out:'可增量更新的知识库索引',links:[['Datawhale hello-agents','https://github.com/datawhalechina/hello-agents']]},
  {id:'rag_retrieval',t:'检索、重排与引用',time:'1–2 周',src:'hybrid retrieval / reranker / query rewrite / citation',d:'组合关键词与向量召回，加入 reranker、上下文压缩和证据引用；区分“没检到”与“模型没用好证据”。',tips:['分别评估 retrieval 和 generation','答案必须能回到原文定位'],out:'一套检索评测集 + 带引用的问答链路',links:[]},
  {id:'agent_tools',t:'工具调用与协议边界',time:'1 周',src:'Function Calling / MCP / structured output',d:'设计窄而清晰的工具 schema、参数验证、超时重试和幂等性；理解 MCP 是上下文与工具连接协议，不是 Agent 决策算法。',tips:['默认拒绝超出权限的操作','所有外部副作用都要可审计'],out:'三个可靠工具 + 权限与错误处理测试',links:[]},
  {id:'agent_workflow',t:'状态化工作流与记忆',time:'1–2 周',src:'LangGraph / state / checkpoint / human-in-the-loop',d:'用明确节点和状态表达任务，加入重试、回退、暂停审批和短长期记忆；只有任务确实需要角色分工时才使用 Multi-Agent。',tips:['先用确定性流程包住模型不确定性','避免用无限循环代替失败处理'],out:'一个可暂停、恢复和回放的 Agent 工作流',links:[['LangGraph','https://github.com/langchain-ai/langgraph']]},
  {id:'agent_eval',t:'评测、观测与安全',time:'1–2 周',src:'trace / golden set / groundedness / prompt injection',d:'建立任务成功率、检索命中、事实一致性、延迟和成本指标，覆盖提示注入、越权工具调用和敏感数据泄漏测试。',tips:['每次发布跑固定回归集','保存输入、检索证据、工具参数和输出 trace'],out:'自动评测集 + 安全红队用例 + trace 看板',links:[['Ragas','https://docs.ragas.io/']]},
  {id:'agent_project',t:'领域 Agent 项目',time:'2–4 周',src:'真实工作流，不做万能聊天框',d:'选择文档审阅、数据分析或客服辅助中的一个，限定用户、数据、工具和成功标准，完成部署、评测与失败降级。',tips:['项目介绍先讲业务闭环，再讲框架','展示至少三个失败案例及修复'],out:'可演示系统 + 架构图 + 评测报告 + 项目逐字稿',links:[]}
 ]},
 engineering:{name:'AI 工程',icon:'🛠️',prereq:'公共基础 + 任一模型或应用方向。',goal:'把实验变成可部署、可观测、可回滚的服务。',exit:'部署一个带版本、监控、压测和回滚策略的 AI 服务。',intro:'这条路线服务所有方向，专注数据、训练和推理系统，不再重教具体模型。想做算法工程落地或 MLOps 时选它。',steps:[
  {id:'eng_api',t:'服务接口与软件质量',time:'1 周',src:'FastAPI / typing / test / config / logging',d:'把模型封装为稳定 API，处理输入校验、批量请求、异常、配置、日志和单元测试。',tips:['业务逻辑与模型推理解耦','接口先定义契约再实现'],out:'一个有测试和 OpenAPI 文档的模型服务',links:[['FastAPI','https://fastapi.tiangolo.com/']]},
  {id:'eng_data',t:'数据与特征管道',time:'1–2 周',src:'validation / batch / stream / feature consistency',d:'建立数据校验、训练样本生成和特征版本，理解训练服务偏差、迟到数据和回填。',tips:['原始数据保持只读可追溯','离线与在线共享特征定义'],out:'一条可重跑的数据/特征流水线',links:[]},
  {id:'eng_experiment',t:'实验、模型与数据版本',time:'1 周',src:'MLflow / artifact / registry / lineage',d:'记录参数、指标、模型、数据版本和代码提交，建立候选、灰度、生产和归档状态。',tips:['模型文件必须能追到训练数据与代码','发布不等于覆盖旧版本'],out:'实验追踪 + 模型注册与回滚流程',links:[['MLflow','https://mlflow.org/docs/latest/']]},
  {id:'eng_serving',t:'推理性能与容量规划',time:'1–2 周',src:'batching / cache / quantization / concurrency / load test',d:'围绕吞吐、P50/P95 延迟、显存和成本做压测，选择缓存、批处理、量化或异步队列。',tips:['先测再优化','区分冷启动、首请求和稳定态'],out:'一份压测报告 + 容量估算',links:[]},
  {id:'eng_observe',t:'监控、漂移与可靠性',time:'1 周',src:'metrics / trace / drift / canary / fallback',d:'监控输入分布、输出质量、资源、错误和业务指标，设计灰度、熔断、降级与回滚。',tips:['模型可用不等于业务可用','告警必须对应明确处理动作'],out:'监控面板 + 故障演练记录',links:[]},
  {id:'eng_deploy',t:'容器化与完整交付',time:'1–2 周',src:'Docker / CI / environment / security',d:'将任一前述项目容器化，自动测试并部署到可复现环境，管理密钥、依赖和最小权限。',tips:['敏感配置只从环境或密钥服务读取','README 写清启动、验证和回滚'],out:'可一键启动的服务 + CI + 部署与回滚文档',links:[['Docker 文档','https://docs.docker.com/']]}
 ]}
};

const MODES=[
 {id:'core',name:'核心代码模式',sub:'LeetCode 默认 · 平时刷题',
  note:'平台帮你解析输入、构造数据结构、调用函数，你只需要填空。刷题效率高，但别只会这个。',
  tips:['平时用它保效率：第一遍每天 8~10 题','顺手把每题的「模板句」抄进自己的笔记','卡 15 分钟直接看题解，别恋战'],
  code:'# LeetCode 核心代码模式：只需要填这个类（以 206. 反转链表 为例）\n# 输入解析、链表构造、结果打印全都由平台完成\n\nclass Solution:\n    def reverseList(self, head):\n        prev = None\n        cur = head\n        while cur:\n            nxt = cur.next   # 先存住下一个节点\n            cur.next = prev  # 掉转指针\n            prev = cur       # prev 前进\n            cur = nxt        # cur 前进\n        return prev'},
 {id:'iv',name:'面试手写模式',sub:'现场手撕 · 必须会',
  note:'面试通常需要自己写输入输出、导入类库、定义 ListNode / TreeNode，并手动构造测试数据。',
  tips:['链表 = class ListNode，二叉树 = class TreeNode，都要自己 new 出来连好','需要的库自己 import：deque、heapq、defaultdict 最常用','写完别急着说完事：口头带一组用例把代码走一遍','每个主题至少用这个模式完整写一次（主题卡里的「面试手写提醒」就是为这准备的）'],
  code:'# 面试手写模式：什么都要自己来\n\nclass ListNode:                        # ① 自己定义节点类\n    def __init__(self, val=0, nxt=None):\n        self.val = val\n        self.next = nxt\n\ndef reverse_list(head):                # ② 核心逻辑（和刷题时一样）\n    prev, cur = None, head\n    while cur:\n        cur.next, prev, cur = prev, cur, cur.next\n    return prev\n\nif __name__ == "__main__":\n    # ③ 手动把节点一个一个连起来：1 -> 2 -> 3\n    n3 = ListNode(3)\n    n2 = ListNode(2, n3)\n    n1 = ListNode(1, n2)\n\n    head = reverse_list(n1)\n\n    # ④ 自己写打印来验证：期望输出 3 2 1\n    while head:\n        print(head.val, end=" ")\n        head = head.next'},
 {id:'acm',name:'ACM 模式',sub:'牛客 · 大厂笔试',
  note:'笔试严格要求处理标准输入输出。牛客有专门的输入输出练习，用 30 分钟把例题自己写一遍就彻底懂了。',
  tips:['「第一行 n，第二行 n 个数」：sys.stdin.read().split() 一次读完按下标切','「多组数据直到 EOF」：for line in sys.stdin','n×m 矩阵：先读 n、m，再逐行 append 成二维列表','大数据量禁用 input() 循环——会超时，一律 sys.stdin','输出格式严格对齐题目：换行、空格、末尾不要多余字符'],
  code:'import sys\n\n# ACM 模式（大厂笔试）：自己读 stdin、自己 print 结果\n\n# 套路一：一次读入全部数据再解析（最稳，推荐）\n# 假设输入：第一行 n，第二行 n 个整数，输出它们的和\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = list(map(int, data[1:1 + n]))\nprint(sum(nums))\n\n# 套路二：多组数据、逐行读取（题目说 "输入包含多组测试" 时用）\n# for line in sys.stdin:\n#     if not line.strip():\n#         continue\n#     a, b = map(int, line.split())\n#     print(a + b)\n\n# 套路三：读入 n 行 m 列的矩阵\n# first = sys.stdin.readline().split()\n# n, m = int(first[0]), int(first[1])\n# grid = [list(map(int, sys.stdin.readline().split())) for _ in range(n)]'},
];

const RESUME={
 basics:[
  {id:'r1',t:'项目/经历一律<b>时间倒序</b>写',n:'HR 原话——现场真有两位同学是正着写的'},
  {id:'r2',t:'页数控制在<b>一页</b>',n:'内容实在多：简历保持一页，另备一页 PPT 面试时当场讲，写太密面试官也看不到'},
  {id:'r3',t:'投国内公司：名字可以不写拼音，地点不用过度标注',n:'比如学校名称后面不必重复标注所在城市'},
  {id:'r4',t:'白底证件照加一个深色边框，或换其他底色',n:'不然像半个身子浮在简历上，有点诡异'},
 ],
 adv:[
  {id:'a1',t:'项目的所有成果<b>加粗</b>；数字型成果（如 CTR +x.xx%）加粗甚至<b>标红</b>',n:'百度和腾讯的 HR 都强调了这一条'},
  {id:'a2',t:'<b>跟着岗位 JD 调整简历</b>：与岗位特别对口的内容加粗或标注出来',n:'一份简历打天下 = 每一份都平庸'},
  {id:'a3',t:'重要的项目写在前面',n:'与倒序不冲突：先按时间倒序，同一时期内再把最重要的放最前'},
 ],
 qa:[
  {q:'校招生一年就跳槽，会怎么样？',a:'HR：一年确实有点短，可能连一两个完整项目都做不完。情况允许的话优先考虑<b>内部活水</b>，去核心团队积累一段时间（比如两年）再看机会；但如果真的待得不开心，这种特殊情况直接跳也没问题。'},
  {q:'背景一般，第一份实习必须是大厂吗？',a:'不必执着大厂，<b>中小厂广泛投递先入行</b>。实习生日薪多在 300–400，对公司成本不高，更看重<b>能否稳定到岗、愿意学习、按时做事</b>——你一个月的工资可能就是正式员工几天的收入，不用担心自己不够强，很多能力本来就是实习里补起来的。'},
 ],
};

const JOB={
 channels:[
  {n:'Boss 直聘',d:'岗位真实、覆盖广，只要叫得上名字的互联网公司都在上面发需求；<b>推进速度比官网快很多</b>，身边不少人的第一份实习甚至秋招都来自这里。',u:'https://www.zhipin.com/'},
  {n:'前程无忧',d:'求职意向设成「算法工程师」，能看到企业的急招实习和秋招信息，一键投递广撒网；在关注与订阅里<b>订阅关键词</b>，有匹配岗位上新会推送；还有典范雇主榜单可以直接投。',u:'https://www.51job.com/'},
  {n:'官网 / 内推',d:'流程正规但慢。官网投完，同岗位可以再去 Boss 找 HR 对话推进，两条腿走路。',u:''},
  {n:'多平台矩阵',d:'官网 + <b>实习僧、智联招聘、鱼泡直聘、脉脉、猎聘、牛客</b>同步铺开。部分平台每日投递有上限，不要只在单一渠道等待；热门岗位竞争激烈，未回复是常态。',u:''},
 ],
 boss:[
  {t:'① 打招呼话术涵盖关键信息',d:'准备一段简短清晰的自我介绍模板，直接说清：1) 能否稳定实习半年或一年；2) 学校/专业背景；3) 有无垂直经验——没有就多突出主动的态度。对面是活生生的人，不是冰冷的机器。'},
  {t:'② 不等回复，主动发简历长图',d:'Boss 要双方都回复才能发附件，但你可以提前把简历整理成清晰的截图/长图直接发进聊天框，明显提高简历被看到的概率，也更符合高压快筛的节奏。'},
  {t:'③ 优先投「最新发布 + 今日活跃」',d:'实习招聘是滚动的：一边收简历一边面试，收满即止。一个岗位放出来一两天可能就收到上百份简历，新岗位和今日活跃的招聘方回复率高得多。'},
 ],
 tmpl:'您好！我正在求职算法相关实习。\n① 可稳定实习较长时间，每周可按岗位要求到岗；\n② 有 Python/PyTorch 基础，完成过相关练习项目；\n③ 学习主动性强，愿意持续投入。\n方便的话我把简历发您看一下，期待您的回复！',
 flow:[
  {t:'投递 / 约面',d:'Boss 上主动聊 + 官网流程并行；打磨好 1 分钟自我介绍与打招呼模板。'},
  {t:'笔试 / 测评',d:'大厂笔试 = ACM 模式（提前去牛客练输入输出）；行测/性格测评别裸考，找两套例题看看题型。'},
  {t:'一面 · 技术基础',d:'手撕 1~2 题（按「面试手写模式」！）+ ML 八股 + 简历项目过一遍。口述思路比闷头写更重要。'},
  {t:'二面 · 深挖与场景',d:'项目三层 why 深挖；场景设计题（如「怎么给新用户做推荐」）；可能再手撕一题。'},
  {t:'HR 面',d:'实习时长和到岗时间是最关键的问题，明确表达稳定性与热情；反问环节别浪费（问业务方向、实习生培养）。'},
 ],
 bagu:[
  {q:'过拟合怎么判断、怎么治？',a:'训练集指标好、验证集差 → 过拟合。药方：更多数据/数据增强、L1/L2 正则、Dropout、早停、降模型复杂度、交叉验证调参。'},
  {q:'L1 和 L2 正则化的区别？',a:'L1 会把不重要的权重压到 0，产生<b>稀疏解</b>，可做特征选择；L2 平滑收缩权重，解更稳定。概率视角：L1 对应拉普拉斯先验，L2 对应高斯先验。'},
  {q:'BN 和 LN 的区别？为什么 Transformer 用 LN？',a:'BN 沿 batch 维归一化，依赖 batch 大小、对变长序列不友好；LN 沿特征维、每个样本独立计算。NLP 序列变长且 batch 小，所以 Transformer 用 LN。'},
  {q:'分类为什么用交叉熵不用 MSE？',a:'交叉熵来自极大似然，与 softmax 搭配时梯度是干净的 (p − y)，不易饱和；MSE 配 sigmoid/softmax 会梯度消失、优化面更难。'},
  {q:'AUC 是什么？推荐为什么更看 GAUC？',a:'AUC = 随机取一正一负样本，正样本得分更高的概率；对不平衡和阈值不敏感，适合 CTR。GAUC 按用户分组算 AUC 再加权——因为跨用户的打分不可比，推荐真正关心的是「单个用户内部排得对不对」。'},
  {q:'精确率和召回率怎么取舍？',a:'P = 预测为正中真为正的比例；R = 所有正样本中被找回的比例。召回层重 R（宁多勿漏），精排/风控重 P；综合看 F1 或 PR 曲线。'},
  {q:'梯度消失 / 爆炸怎么办？',a:'残差连接、合理初始化、BN/LN、ReLU 系激活、梯度裁剪（RNN 与大模型训练标配）、检查学习率。'},
  {q:'Adam 相比 SGD 好在哪？',a:'一阶动量 + 二阶自适应步长，收敛快、对超参鲁棒；但泛化有时略差。大模型时代常用 AdamW（把权重衰减从梯度里解耦出来）。'},
  {q:'Dropout 训练和推理有什么不同？',a:'训练时随机置零神经元并按保留率缩放（inverted dropout），推理时完全关闭。效果近似模型集成，防止神经元共适应。'},
  {q:'BERT 和 GPT 的本质区别？',a:'BERT：encoder + 双向 MLM，擅长理解类任务；GPT：decoder + 自回归逐词生成，天然适合生成。现代 LLM 走 GPT 路线，因为「生成」是最通用的任务接口。'},
 ],
 iv:[
  {id:'i1',t:'1 分钟自我介绍打磨到脱口而出'},
  {id:'i2',t:'简历上每个项目能深挖三层 why：为什么这么做 / 换个方案行不行 / 指标变化的原因'},
  {id:'i3',t:'手撕代码按「面试手写模式」练过：自己写输入输出、自己定义 ListNode/TreeNode'},
  {id:'i4',t:'ML 八股过一遍（上面十问 + 知识卡片过到秒答）'},
  {id:'i5',t:'牛客 ACM 输入输出练习，30 分钟写一遍例题'},
  {id:'i6',t:'准备 2 个反问：业务方向、实习生的成长安排'},
 ],
 act:[
  {id:'j1',t:'按上面两张清单改出一版简历 PDF'},
  {id:'j2',t:'注册 Boss/前程无忧，完善在线简历与求职意向（算法工程师）'},
  {id:'j3',t:'把打招呼模板改成自己的信息，存好备用'},
  {id:'j4',t:'简历导出成清晰长图，方便聊天框直接发'},
  {id:'j5',t:'首批投递 20 家（含中小厂），只挑新发布/今日活跃的岗位'},
  {id:'j6',t:'每天刷新投递、记录进展；已读不回 3 天就换下一批'},
 ],
 mj:[
  {t:'某小厂 · Agent 开发一面（12 问）',meta:'传统软件 + AI 融合的研发团队',
   qs:['讲一下之前的大概经历','大概讲一下项目——看上去都是你自己做的一些尝试和实验对吧？','项目里是偏意图识别相关的查询，还是常规意义上的 prompt 工程？','学习期间做过相关的实习尝试吗？','你想在这段实习中学到什么？','加入我们团队，你觉得自己能做哪些工作？产品、运营还是开发？','讲一下数据查询系统以外的开发工作（理解你之前偏后端多一些）','最近用 AI 做项目的分享——后端/大模型之外，前端的工作呢？','如果变成真实项目，讲讲前端的规范','讲一下你对 AI 的认知与使用：比如 Coze 这类工具、智能体搭建的积累或心得','有完整地用 AI 去开发一个项目吗？','还有什么要问的吗？'],
   cmt:'匿名经验：面试中可能出现冷门英文词，也可能用「缺少实习经历」压价。<b>问题本身很典型，团队氛围和待遇需要自行判断。</b>'},
  {t:'某小厂 · Agent 一面（15 问）',meta:'技术题偏常见八股',
   qs:['自我介绍','平时有用一些 AI 软件吗？','第二个项目：审计平台是在做什么？','有了解我们公司吗？','这个岗位会用到 Agent，有了解过吗？','有操作过 Agent 的部署、调试和优化吗？','第一个项目是自己做的还是基于别人的改的？加了什么东西？有什么自己的思考？','（第二个项目）检测漏洞有考虑准确度吗？','训练数据来源于哪里？','了解的机器学习框架有什么？','大模型框架有哪些？','模型微调是怎么设计的？主要微调哪部分？','可以做数据处理、数据清理这类工作吗？','数据脱敏了解过吗？','前后端的开发框架了解过吗？'],
   cmt:'匿名经验：岗位采用明显偏低的阶梯式薪资。<b>这类条款应当作为风险信号。</b>'},
 ],
 mjPoints:[
  {t:'项目深挖必问三连',d:'「自己做的还是改别人的？」「你加了什么？」「有什么自己的思考？」——大方承认基于开源改造，改造点就是答案，提前写进项目逐字稿。'},
  {t:'微调设计',d:'微调哪部分、参数量多大、训练数据从哪来、效果/准确度怎么保证——对应路线里「微调与对齐全流程」一步。'},
  {t:'数据功底',d:'数据处理、数据清洗、数据脱敏是企业侧常见要求；回答时应结合自己真实做过的工作。'},
  {t:'框架清单',d:'机器学习框架（sklearn/PyTorch）、大模型框架（LangChain/LangGraph/vLLM）、前后端框架——小厂常期待全栈，至少要能说出名字和分工。'},
  {t:'AI 工具认知',d:'Coze 等平台用过什么、搭过什么智能体、有没有「完整用 AI 开发一个项目」——路线第 2 步和两个项目就是为这题准备的。'},
  {t:'软性三问',d:'想学到什么 / 能为团队做什么 / 讲讲经历——提前各准备三句话，别现场组织语言。'},
 ],
 mjFlags:[
  '明显偏低的阶梯式薪资应当作为红旗：不要让企业把信任和留任风险转嫁成求职者的成本',
  '拿学生身份、无实习经历贬低你——面试是双向选择，被压价不代表你不行',
  '研发/产品/运营实习生薪资一刀切，说明岗位定位模糊',
  '「传统 Software + AI」贴皮团队：反问环节问清 AI 在业务里的真实占比，再决定去不去',
  '初创谈薪先要具体数字：若薪资明显低于岗位和当地行情，可以礼貌退出',
  '外地岗位先算租房/通勤账：一两百一天的实习覆盖不了异地生活成本，面试官自己都会劝退外地实习生',
 ],
 projTmpl:{
  formula:[
   '骨架：项目名 + 一句话定位（基于 XX 的 XX 系统）→ 项目背景（场景 + 目标）→ 技术栈一行 → 4~5 条项目实现',
   '每条实现 = 加粗小标题 + 动词开头 + 具体技术名词 + 量化数字',
   '数字从哪来：任务路径数、修复轮数、触发阈值、事件类数、样本量——做项目时随手记，写简历时不用编',
   '每条都要经得起深挖三连：怎么做的？为什么这么做？换个方案行不行？写之前先自问',
   '反面教材：「参与/负责 XX」没有动作、功能罗列没有数字、技术名词堆砌讲不清——HR 眼里的「过于模板化」',
  ],
  examples:[
   {name:'项目示例 A：基于 LangGraph 的多智能体数据查询系统',role:'匿名教学示例 · 请替换为真实经历',
    bg:'示例场景：面向结构化数据查询，构建从自然语言到 SQL、数据分析与结果展示的自动化链路。',
    stack:'Python | LangGraph | Flask | SQLite | MCP | Tavily | ECharts | SSE',
    pts:[
     '<b>多智能体编排：</b>基于 LangGraph 构建主从状态图，由路由节点完成意图识别与条件分发，调度查询、分析和检索节点；实际简历中填入真实任务类型数量。',
     '<b>NL2SQL 闭环：</b>结合数据库 Schema 与 Few-shot 示例生成 SQL，将执行异常回传模型进行 Reflection，设置有限轮次自动修复，并增加只读语句校验。',
     '<b>双层记忆系统：</b>基于 MemorySaver 管理会话内短期记忆，超过实际测试阈值时触发摘要压缩；使用 SQLite 持久化必要的业务信息。',
     '<b>工具调用与联合分析：</b>通过 MCP 封装数据库查询工具，集成 Tavily 补充外部信息，由分析智能体汇总内外部数据并生成 ECharts 图表配置。',
     '<b>SSE 流式服务：</b>基于 Flask 封装查询、会话与流式接口，分阶段返回执行状态、SQL、数据来源、图表配置及回答内容。',
    ],
    note:'示例重点是「加粗小标题 + 动词 + 技术 + 可验证数字」。每条都应能回答：路由怎么做、Reflection 怎么触发、为什么要只读校验。'},
   {name:'项目示例 B：智能审计 Agent 平台',role:'匿名教学示例 · 请替换为真实经历',
    bg:'示例场景：融合图模型、RAG 与语言模型，构建检测、证据分析与建议生成流程。',
    stack:'PyTorch Geometric | RAG | BM25 | MySQL | Qwen | SFT | DPO',
    pts:[
     '<b>审计平台开发：</b>完成用户鉴权、角色权限、检测任务、证据报告及智能助手等模块，支持本地文件、批量合约与链上地址检测，并通过 MySQL 管理用户及任务数据。',
     '<b>漏洞检测流水线：</b>构建代码解析、风险路径提取、可达性验证与图模型推理流程，融合多阶段检测结果，输出风险等级、漏洞位置与可解释证据链。',
     '<b>审计 Agent 与 RAG：</b>设计检索、证据校验、回答生成与结果验证闭环，覆盖风险总结、代码解释和修复建议等任务；融合 BM25、向量及图检索增强回答依据。',
     '<b>领域数据构建：</b>批量处理原始检测结果，清洗形成有效记录，再围绕风险解释、修复建议与证据链构造 SFT 与偏好样本；简历中只写真实统计数量。',
     '<b>模型接入与推理：</b>接入 Qwen 构建领域问答与报告生成服务，根据漏洞证据生成风险解释和修复方案；设计流式输出与模型降级机制，提升交互体验及服务可用性。',
    ],
    note:'示例重点是用数据漏斗回答「训练数据来自哪里」「微调如何设计」。公开仓库不应放入可关联个人履历的专有名称、日期或未确认数据。'},
  ],
  warn:'⚠️ 范本的价值是「写法」不是「内容」：照抄项目会在深挖三连问上当场露馅。用这个格式，把<b>你自己项目</b>的动作和数字重写一遍。',
 },
 review:[
  {t:'简历「过于模板化」',d:'即使内容真实也会踩：套话多、看不到动作和数字。应按上面「项目描述范本」重写，并保留可验证细节。'},
  {t:'回填数据库与 Python 深层知识（HR 建议）',d:'速成留下的坑要补：MySQL 索引/事务、Python 类型系统与不可变对象、装饰器/生成器这些面试常问点。对应路线第 5 步。'},
  {t:'「Agent 岗」很多其实是开发岗',d:'小公司喊着 Agent，日常还是工程开发——前后端、数据库这些开发底子，决定你能不能接住 offer。'},
  {t:'真实旧项目可以升级',d:'不必全新造轮子；可以在真实完成改造后，把旧项目升级到新的技术场景，但不能虚构经历或结果。'},
  {t:'投递看时机',d:'七月底官网和三方平台都「没什么活人」；八月初/中 HC 回暖再集中投。休整期查漏补缺，同时保证随时到岗。'},
 ],
};

const RESLIB=[
 {g:'⌨️ 刷题',items:[
  {n:'hello-algo 图解算法',d:'零基础打底首选：数据结构与算法全图解 + 可跑的 Python 代码',u:'https://www.hello-algo.com/',lang:'中'},
  {n:'代码随想录',d:'成体系的刷题路线与题解，动态规划（动规五部曲）必看',u:'https://programmercarl.com/',lang:'中'},
  {n:'灵茶山艾府 · B站',d:'视频题解思路最清爽；⚠️ 他的 DP 部分跳过',u:'https://space.bilibili.com/206214',lang:'中'},
  {n:'LeetCode · 数据结构与算法探险模式',d:'当前刷题主线：按关卡系统推进数据结构与算法题目',u:'https://leetcode.cn/quest/data-structures-and-algorithms-quest/',lang:'中'},
  {n:'牛客网',d:'ACM 模式练习 + 大厂笔试历史真题（免费，别花冤枉钱买）',u:'https://www.nowcoder.com/',lang:'中'},
  {n:'牛客 · 输入输出练习场',d:'30 分钟把例题写一遍就彻底懂 ACM 模式；若链接失效，站内搜「输入输出练习」',u:'https://ac.nowcoder.com/acm/contest/5657',lang:'中'},
 ]},
 {g:'🧱 AI 公共基础',items:[
  {n:'南瓜书',d:'配合西瓜书补机器学习需要的公式与推导；只按路线中的知识点查漏补缺',u:'https://datawhalechina.github.io/pumpkin-book/',lang:'中'},
  {n:'scikit-learn 模型选择指南',d:'数据切分、交叉验证、调参与评价的官方入口',u:'https://scikit-learn.org/stable/model_selection.html',lang:'英'},
  {n:'《动手学深度学习》中文版',d:'公共基础使用张量与训练循环章节，后续网络结构放到深度学习方向',u:'https://zh.d2l.ai/',lang:'中'},
 ]},
 {g:'🧠 深度学习',items:[
  {n:'《动手学深度学习》中文版',d:'MLP、CNN、序列模型、注意力与 Transformer 的体系化教材',u:'https://zh.d2l.ai/',lang:'中'},
  {n:'动手学深度学习 · 视频课',d:'B 站李沐亲授，配套课件与讨论区',u:'https://courses.d2l.ai/zh-v2/',lang:'中'},
  {n:'跟李沐学AI · B站',d:'论文精读系列也在这个号，读论文姿势跟着学',u:'https://space.bilibili.com/1567748478',lang:'中'},
 ]},
 {g:'🛒 推荐系统',items:[
  {n:'王树森 · 推荐系统讲义',d:'8 小时神课的课件与目录（GitHub，内容中文）',u:'https://github.com/wangshusen/RecommenderSystem',lang:'中'},
  {n:'王树森课程视频 · B站搜索',d:'搜「王树森 推荐系统」即可全套观看',u:'https://search.bilibili.com/all?keyword=%E7%8E%8B%E6%A0%91%E6%A3%AE%20%E6%8E%A8%E8%8D%90%E7%B3%BB%E7%BB%9F',lang:'中'},
  {n:'《互联网大厂推荐算法实战》《深度学习推荐系统 2.0》',d:'两本纸质书：前者偏工程上手，后者偏体系理论（图书馆 / 电商自购）',u:'',lang:'中'},
 ]},
 {g:'🔎 搜索系统',items:[
  {n:'Introduction to Information Retrieval',d:'倒排索引、BM25、相关性与评测的经典免费教材',u:'https://nlp.stanford.edu/IR-book/',lang:'英'},
  {n:'BEIR',d:'稀疏、稠密与混合检索的公开评测基准和代码',u:'https://github.com/beir-cellar/beir',lang:'英'},
 ]},
 {g:'📣 广告算法',items:[
  {n:'Google Rules of ML',d:'机器学习系统、指标、反馈回路和上线迭代的工程原则',u:'https://developers.google.com/machine-learning/guides/rules-of-ml',lang:'英'},
  {n:'Criteo Display Advertising Challenge',d:'经典广告点击率预估公开数据与基线入口',u:'https://www.kaggle.com/c/criteo-display-ad-challenge',lang:'英'},
 ]},
 {g:'🤖 大模型',items:[
  {n:'复旦《大语言模型：从理论到实践》',d:'免费开源中文教材，LLM 全景第一本',u:'https://intro-llm.github.io/',lang:'中'},
  {n:'斯坦福 CS336 课程主页',d:'从零实现 LLM；英文吃力配右边的中文解读',u:'https://stanford-cs336.github.io/',lang:'英'},
  {n:'CS336 中文解读 · B站搜索',d:'搜「CS336」有搬运与中文讲解视频',u:'https://search.bilibili.com/all?keyword=CS336',lang:'中'},
  {n:'蘑菇书 EasyRL',d:'强化学习中文入门；看懂 PPO/GRPO 知识卡的底子',u:'https://datawhalechina.github.io/easy-rl/',lang:'中'},
  {n:'minimind',d:'从零手搓中文小模型，覆盖结构、预训练、微调与推理',u:'https://github.com/jingyaogong/minimind',lang:'中'},
 ]},
 {g:'🧰 RAG / Agent',items:[
  {n:'Datawhale hello-agents',d:'中文开源 Agent 教程，覆盖核心概念与实践案例',u:'https://github.com/datawhalechina/hello-agents',lang:'中'},
  {n:'扣子 Coze',d:'字节的智能体搭建平台：拖拽建 Agent，面试聊「AI 工具认知」的素材',u:'https://www.coze.cn/',lang:'中'},
  {n:'MetaGPT',d:'经典 Multi-Agent 框架（中文文档完善），理解角色分工与协作模式',u:'https://github.com/geekan/MetaGPT',lang:'中'},
  {n:'LangGraph',d:'状态化工作流、持久化、人机协作和工具调用框架',u:'https://github.com/langchain-ai/langgraph',lang:'英'},
  {n:'Ollama',d:'本地跑开源模型的最简方式，配 Chatbox 五分钟搭出机器人',u:'https://ollama.com/',lang:'英'},
 ]},
 {g:'🛠️ AI 工程',items:[
  {n:'FastAPI',d:'将模型封装为有输入校验和接口文档的服务',u:'https://fastapi.tiangolo.com/',lang:'中'},
  {n:'MLflow',d:'实验追踪、模型注册、版本与部署生命周期管理',u:'https://mlflow.org/docs/latest/',lang:'英'},
  {n:'Docker',d:'模型服务容器化、环境复现和部署基础',u:'https://docs.docker.com/',lang:'英'},
  {n:'vLLM 文档',d:'推理框架事实标准：KV 缓存、PagedAttention 出处',u:'https://docs.vllm.ai/',lang:'英'},
 ]},
 {g:'🏆 竞赛与论文',items:[
  {n:'天池',d:'阿里系竞赛平台：找推荐类比赛的 baseline（中文社区活跃）',u:'https://tianchi.aliyun.com/',lang:'中'},
  {n:'知网',d:'找目标方向的中文综述定边界，再回头读英文原作',u:'https://www.cnki.net/',lang:'中'},
  {n:'Kaggle',d:'国际竞赛平台；英文界面，讨论区质量高',u:'https://www.kaggle.com/',lang:'英'},
  {n:'Papers with Code',d:'挑「有官方代码」的论文来复现，避免从零造轮子',u:'https://paperswithcode.com/',lang:'英'},
 ]},
 {g:'💼 求职',items:[
  {n:'Boss 直聘',d:'推进最快的渠道；配合「求职宝典」的三招使用',u:'https://www.zhipin.com/',lang:'中'},
  {n:'前程无忧',d:'意向设「算法工程师」看急招；订阅关键词收推送',u:'https://www.51job.com/',lang:'中'},
  {n:'实习僧',d:'实习岗位较集中的垂直平台；热门岗位竞争大，未回复是常态',u:'https://www.shixiseng.com/',lang:'中'},
  {n:'牛客 · 面经与讨论区',d:'搜目标公司「算法实习 面经」，考点八九不离十',u:'https://www.nowcoder.com/',lang:'中'},
 ]},
];

