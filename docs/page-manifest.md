## 页面清单

来源缩写：F = `docs/features.md`，D = `docs/deploy.md`，K = `docs/desktop.md`，M = `docs/mobile.md`，G = `docs/push-gateway.md`，P = `docs/protocol.md`，R = `README.md`；「」里是该文件中的标题文字（写进 frontmatter `sources.section` 时带上 `#`）。`help:<cmd>` = `/reference/cli/<cmd>/` 生成页；`i18n:<ns>` = `web/src/i18n/locales/zh-CN.json` 的顶层键。路径 = `src/content/docs/` 下的 `.mdx`。类型：T tutorial，H how-to，E explanation，Rf reference。带里程碑标签的标题只用于定位，页面里不出现标签。

### 使用 · 开始 `start/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `what-is-oryn` | 认识 Oryn | E | R 首屏至「工作台」之前、R「架构与安全」、F「执行环境」首段 | 本页回答「Oryn 是什么、由哪几部分组成」；一句话定位；线程 → 环境 → 控制面 → 客户端的关系图（改写 README 的 mermaid，组件名用本站术语）；组件表（`orynd` / `orbd` / `oryn` / Web 与壳）；单所有者、自托管；当前为预发布版本 | `readme/hero` |
| 2 | `concepts` | 核心概念 | E | F 全文各节首段；R「执行环境」「Boxes」「全局助手与 Space」 | 本页回答「读后面的文档前要认识哪些词」；项目、线程、环境、Provider、Runner、快照与预热池、全局助手、主线、Space、Artifact、视图、Portal、Boxes、Agent 沙箱，各 2–3 句并链到对应指南；一张关系图 | — |
| 3 | `quickstart` | 快速开始：在本机跑起来 | T | R「快速开始」；D「1. 安装二进制与镜像」（镜像体积、git 版本） | 唯一路径：源码构建 + Docker Provider + `localhost`；前置依赖与版本照抄；四步命令照抄 README；每步写出 README 里给出的可见结果（`orb 镜像离线冒烟：通过`、日志里的 `setup#token=` 链接、注册 Passkey 与保存恢复码、线程在 Docker 环境里启动）；结尾链到「第一个线程」与「部署总览」 | — |
| 4 | `first-thread` | 第一个线程 | T | F「项目」「转录与工具卡」「工程面板」；i18n:`newThread` `projects` `changes` | 唯一路径：用一个公开的 `https://` 仓库新建项目 → 首屏输入框发第一条消息 → 看工具卡 → 右面板「改动」看 diff → 归档线程；每步写界面上出现什么。写之前在 `cd $ORYN_REPO/web && bun run dev:mock` 里走一遍，按钮文案以界面为准 | — |
| 5 | `tour` | 界面导览 | E | `web/src/components/layout/Sidebar.tsx`、`web/src/lib/sections.ts`、`web/src/App.tsx`、`web/src/state/ui.ts`（`PanelTab`）、`web/src/components/layout/more-entries.ts`；R「工作台」 | 本页回答「每个区域是干什么的、在哪里找东西」；侧栏四个分区（线程 / 全局助手 / 项目 / 更多）与「更多」里的五个入口；线程页三栏；右面板七个页签及各自出现的条件；命令面板；设置入口；窄屏布局的差别 | `readme/workbench` |

### 使用 · 线程与对话 `guide/threads/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `new-thread` | 新建线程与选择执行位置 | H | F「首屏直达」「orb 跟随线程」「四种执行后端」；help:`thread`；i18n:`newThread` `roleCapsule` | 首屏输入框；角色胶囊（角色 / 指定模型与思考档位 / 全局助手）；项目胶囊；执行位置三类（Provider 与类型、Runner 目录与 worktree、box）；「新对话默认对象」存服务端；`oryn thread new` 的对应参数与互斥关系 | — |
| 2 | `transcript` | 读懂转录与工具卡 | E | F「转录与工具卡」；R「工作台」下的工具卡段 | 本页回答「对话里每种元素表示什么」；工具卡头部意图与读数；展开体；bash 的 Pseudo 视图（Runner 线程的差别）；思考块；后台任务标记与事件行；思考档位图标与生效优先级；表格复制为 CSV / Markdown / PNG | `site/tool-cards` `site/tool-diff` |
| 3 | `composer` | 输入框：发送、引导与排队 | H | F「输入框」；`web/src/lib/composer.ts`；`web/src/lib/shortcuts.ts`；`web/src/components/composer/RefMenu.tsx` | 两种发送键模式；回合进行中的引导 / 排队 / 中断并发送；前缀 `!` `!!` `$` `$$` `?` `->` `=>` 与单独的 `.`；`#` 引用 issue / PR；附件；下一条消息预测（开关位置、计费提示）；提示缓存读数 | — |
| 4 | `rewind-fork` | 回退、分叉与会话树 | H | F「输入框」里的回退；F「orb 跟随线程」（共用环境的分叉）；help:`thread`（`fork`）；`web/src/lib/slash.ts`（`/tree` `/fork` `/branch` `/rewind`） | 连按两次 <kbd>Esc</kbd> 在空闲与进行中的不同含义；回退后原路径保留为分支与「撤销」；`/tree`；分叉的两种环境方式（`share` / `copy`） | — |
| 5 | `selection-actions` | 选区动作与右键菜单 | H | F「右键菜单与选区动作」 | 选中文字后的动作；解释卡与旁路提问；自定义动作在哪里管理及其上限（12 条、名称 24 字、提示词 2000 字）；哪些位置有右键菜单、键盘与触屏的触发方式 | `site/explain-card` |
| 6 | `inbox` | 收件箱：处理等你的事 | H | F「收件箱与命令面板」；i18n:`inbox` `uiRequest` `plan` | 侧栏「需要你」；`/inbox` 的分节顺序与筛选；行内一触作答；出错归类；线程里的提问卡与计划审批 | `site/inbox` |
| 7 | `search` | 命令面板与全文搜索 | H | F「收件箱与命令面板」；P「对话内容搜索」 | <kbd>Ctrl/⌘</kbd>+<kbd>K</kbd>；能跳到哪些对象；对话正文全文搜索（中文无需分词、分叉复制的消息只计一次） | `site/palette` |
| 8 | `sharing` | 公开分享线程 | H | P「M5：公开分享、通知与 sync」下「REST（已鉴权）」「匿名面」「限额」；i18n:`share`；F「视图」里的公开分享、F「头像」末段 | 创建与撤销分享；分享前的密钥扫描提示；分享页能看到什么、不能做什么；限额 | — |
### 使用 · 工程面板 `guide/workbench/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `info-panel` | 信息面板 | H | F「工程面板」；R「工作台」首段 | 环境卡（状态、资源、唤醒）；入口行（服务、环境、浏览器 Profile、能力、SSH 主机）；待办；子 Agent 派发树；后台任务详情与停止；沙箱区块 | `site/info-panel` `site/orb-card` |
| 2 | `changes` | 查看改动、提交与开 PR | H | F「工程面板」；F「托管仓库」里的交付；F「GitHub」；R「工作台」解释卡之后一段 | 改动范围切换；暂存与取消暂存；推送并开 PR；托管项目的「提交并推送到基线」；线程页头的 PR 与 CI 状态；合并即「已交付」 | `site/changes-diff` `site/thread-header-pr` |
| 3 | `files` | 文件面板与预览 | H | F「文件预览」；F「冻结、唤醒与停机」里的停机只读 | 支持预览的格式表（照抄）；预览 / 源码切换；HTML 的沙箱帧；环境停机时只读浏览、不唤醒 | `readme/file-preview` |
| 4 | `terminal` | 终端 | H | F「工程面板」的终端行；i18n:`terminal` | 打开终端；断线后的快照续传（256K 字符）；提醒点（终端等输入） | — |
| 5 | `portal-services` | 受管服务与 Portal 预览 | H | F「工程面板」的 Portal 行；D「Portal（受管服务的浏览器入口）」；`internal/orbdrt/servicefile.go`；help:`orb` | 在 `.oryn/services.yaml` 声明服务（字段链到参考页）；`oryn orb service` 的用法；Portal 地址形式；访问控制与限时公开预览；服务故障时的重启 | — |
| 6 | `desktop` | 远程桌面与人机接管 | H | F「远程桌面与人机控制」；R「工作台」下远程桌面两段 | 四种控制状态；接管与交还；Agent 请你操作时在哪里作答；任务栏里的应用；录屏的规格与上限；已知限制 | `site/desktop-takeover` |
| 7 | `browser-profiles` | 浏览器 Profile：复用登录态 | H | P「M8：Desktop 与浏览器 Profile」；F「工程面板」的桌面行；help:`thread`（`--browser-profile` `--readonly` `--takeover`）；i18n:`browserProfiles` | Profile 是什么；在设置与项目设置里选用；占用冲突时的只读与接管 | — |
### 使用 · 项目 `guide/projects/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `manage` | 创建与管理项目 | H | F「项目」（到「仓库浏览」之前） | 三种仓库类型；项目总览与主页的各区块；线程子页的筛选；设置七个分组各管什么；归档与删除各自的后果 | `site/projects-overview` `site/project-home` |
| 2 | `repo-browser` | 仓库浏览 | H | F「仓库浏览」 | 镜像何时同步、手动同步；用哪份凭据；提交关联线程的三种来源；「不可用」说明表照抄；Git LFS 的行为与上限 | — |
| 3 | `hosted-repo` | 托管仓库 | H | F「托管仓库」；help:`clone` `project` | 新建托管仓库；`oryn clone`；把本机仓库建成托管项目；交付流程；推送后 Webhook（请求头、载荷、验签示例照抄）；基线分支被强推后的找回；归档与删除；LFS 与容量 | — |
| 4 | `environment` | 环境配置：setup、resume、快照与预热 | H | F「环境自配置」「项目快照与预热池」；`internal/orbdrt/setup.go`（超时常量、`setupInputFiles`）；help:`orb`（`setup`） | 两个脚本各在何时运行、超时、失败后的表现与修复入口；项目设置里的脚本与仓库脚本的先后；快照何时生成与失效；预热池（1–3 台）；Git LFS | — |
| 5 | `secrets` | 密钥与环境变量 | H | F「项目级密钥与环境变量」「出站代理凭据隔离」；help:`secrets` | 全局与项目两层；命名规则；保密与不保密；优先级；`.env` 批量导入；谁拿不到；何时生效；CLI | — |
### 使用 · 执行环境 `guide/environments/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `lifecycle` | 环境如何随线程生灭 | E | F「orb 跟随线程」「冻结、唤醒与停机」；D「行为差异」（位于「12. Firecracker provider（M11b）」下） | 本页回答「环境什么时候创建、冻结、停机、删除」；状态图；归档与删除线程分别导致什么；定时任务的旧运行如何回收 | — |
| 2 | `backends` | 选择执行后端 | E | F「四种执行后端」；R「执行环境」 | 本页回答「四种后端差在哪、各适合什么」；对比表照抄；各自需要管理员先做什么（链到部署页） | — |
| 3 | `dev-image` | 开发镜像里有什么 | Rf | F「开发镜像」 | 基础系统与架构；预装工具表照抄；怎样在 setup 里加装系统包；BlackArch 源；镜像内的清单文件路径 | — |
| 4 | `runner` | 在自己的机器上跑线程（Runner） | H | D「11. Runner：在自己的机器上跑线程（M11b）」全部小节；F「四种执行后端」里的 worktree；`cmd/orbd/main.go`（flag 与校验） | 先读的安全边界；支持的平台；`oryn runner create` 与启动命令；systemd 用户单元；在 Runner 上开线程、worktree、共用目录；Runner 线程没有哪些能力 | — |
| 5 | `sandboxes` | Agent 沙箱 | H | F「Agent 沙箱」；help:`sandbox` | `<Requires ids={['sandbox']} />`；用途；两种后端与两种网络；运行命令与后台作业的上限；传文件；回收与级联规则；配额；谁能用；你在哪里查看与销毁；零凭据 | `site/sandbox` |
| 6 | `browser-relay` | 让 Agent 使用你本机的 Chrome | H | F「本机浏览器中继（Chrome 扩展）」；P「M27：客户端浏览器中继（Browser Relay）」 | 用途；安装扩展并切到云端模式；配对与绑定到线程；与环境内桌面浏览器的分工；审批队列的三个选项；在哪里吊销 | — |

### 使用 · Agent 配置 `guide/agent/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `models-and-keys` | 模型与密钥 | H | D「6. omp 配置」「模型密钥绑定」；R「快速开始」第 3 步；F「中央模型目录」「出站代理凭据隔离」；help:`config` `secrets` | `oryn config push ~/.omp/agent`；明文 Key 抽入密钥库；`proxy` 与 `env` 两种模式；`oryn config pull` 与 `models.oryn.yml`；`.orynignore`；模型目录的刷新；备份 `master.key` 的提醒 | — |
| 2 | `roles` | 模型角色与思考档位 | H | `web/src/pages/settings/agent/RolesPage.tsx`；i18n:`roles` `roleCapsule`；F「转录与工具卡」里的思考档位；`web/src/lib/shortcuts.ts` | 设置「模型与角色」里能配什么；轮换顺序与切换快捷键；思考档位的生效优先级 | `site/model-roles` |
| 3 | `instructions` | 技能、规则与指令 | H | F「图形化配置，保存即生效」；F「项目级中央配置」里的 `/omfg`；i18n:`agentPages` | 设置「技能与指令」各页签；保存后多久生效、哪些热重载；`/omfg` 生成规则并选择写回的层 | — |
| 4 | `subagents` | 子 Agent | H | `web/src/pages/settings/agent/SubagentsPage.tsx`；i18n:`subagent`；F「头像」；F「工程面板」的派发树 | 启停与模型覆盖；线程里在哪里看子 Agent（信息面板、`/agents`）；状态光环的含义 | — |
| 5 | `extensions-mcp` | 扩展、工具与 MCP | H | F「图形化配置，保存即生效」；i18n:`agentPages` `agentConfig`；F「视图」里的开关 | 扩展、hook、自定义工具需要重启会话及「安排空闲时懒重启」；MCP 配置在哪里；「生成式 UI」开关 | — |
| 6 | `project-config` | 项目级 Agent 配置 | H | F「项目级中央配置」；help:`config` | 能放什么；三层优先级；不写进仓库；`oryn config push --project` 与 `oryn config pull --project`；88 MiB 上限与编码约束 | — |
| 7 | `avatars` | 头像与身份 | H | F「头像」 | 哪些对象能设头像；选图弹层的两页与搜索方式；分享页带出哪些头像 | `site/avatar-picker` |
| 8 | `memory` | 记忆 | H | F「Hindsight 记忆」；i18n:`memoryPage` | `<Requires ids={['hindsight']} />`；自动写入与召回；项目隔离；全局层的候选审核；管理页能做的操作；删除项目时一并删除 | `site/memory` |

### 使用 · 全局助手 `guide/assistant/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `overview` | 认识全局助手 | E | F「全局助手与 Space」首段、「全局助手」「首屏直达」；R「全局助手与 Space」 | `<Requires ids={['coordinator']} />`；本页回答「助手能替你做什么、哪些事必须你点头」；三层能力；内置 `oryn` 技能；确认卡规则与 24 小时过期；只有你本人能做的事；设置项（模型、思考档位、自定义提示词 8000 字） | `readme/assistant` `site/assistant-confirm` |
| 2 | `mainline` | 主线：结果汇总与提醒 | H | F「主线」（后台研究之外的部分） | 主线是什么；哪些消息会进来；「交给助手」与静默；提醒（上限 50 条）；分段运行与备忘（1500 字）；「在新对话中继续」 | `site/assistant-mainline` |
| 3 | `research` | 后台研究与跟进 | H | F「主线」里的后台研究；R「全局助手与 Space」后台研究一条；D「后台研究（M26）」 | `<Requires ids={['assistant-network']} />`；总开关与四条管线；跟进清单的两种话题与节奏；每日花费上限；发现如何呈现；数据边界（链到安全页） | `site/follow-ups` `site/research-settings` |
| 4 | `computer` | 助手的电脑 | H | F「助手的电脑」；D「助手的电脑（M19）」 | 唯一一台、共用、空闲冻结；`/assistant/computer` 的三个页签；在哪里选 Provider 与类型；重置 | `site/assistant-computer` |
| 5 | `library` | 文件库 | H | F「文件库」；help:`library` | 文件从哪里进来；面板里的操作；带库文件开线程 | — |
| 6 | `owner-memory` | 主人记忆 | H | F「主人记忆」；D「全局助手的主人记忆（M17）」 | `<Requires ids={['hindsight']} />`；何时写入、写什么不写什么；每日整理；管理页的操作（失效、按来源遗忘、排除） | — |

### 使用 · 自动化与集成 `guide/automation/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `spaces` | Space：并行协调多条线程 | H | F「Space 协调者」；R「全局助手与 Space」Space 一条；help:`space`；i18n:`space` | `<Requires ids={['coordinator']} />`；新建 Space 与目标；协调者怎样派线程（角色、模型、思考档位）；协调者不能做什么 | `site/space` |
| 2 | `schedules` | 定时任务 | H | F「定时任务」（到「入站 Webhook」之前）；help:`schedule` | 线程内定时与项目级定时的区别；`--manual`；运行前闸门（本机与 SSH 主机、前提、跳过条件）；`[SILENT]`；保留运行数与重叠策略 | — |
| 3 | `webhooks` | 入站 Webhook | H | F「入站 Webhook」；help:`schedule`（`webhook`） | 开启、换新、关闭；签名；请求体限制；响应码表；curl 示例照抄；按不可信输入处理的后果 | — |
| 4 | `github` | GitHub：仓库绑定、PR 与回流 | H | F「GitHub」；D「仓库绑定与 orb 内凭据」「身份规则」「事件来源与额度」「审计」 | `<Requires ids={['github-oauth']} />`；连接「我的账号」与「Agent 账号」；环境里 `git` 与 `gh` 免登录；自动绑定；哪些事件回流、怎样显示；审计 | — |
| 5 | `github-automation` | GitHub 自动化：触发规则、门禁与发布哨兵 | H | F「GitHub」；D「门禁」「发布哨兵」「issue 任务」「CLI」「风险说明」；help:`github` | 三个预设；触发者档位与所用账号；推送 / 开 PR 门禁；发布哨兵（至多 5 轮）；issue 任务；`oryn github` 子命令 | — |
| 6 | `ssh-hosts` | SSH 主机 | H | F「SSH 主机」；D「15. SSH 主机与控制面网关（M18）」；help:`ssh` | 生成或导入钥匙；登记主机（全局 / 项目）、跳板；环境里的三种用法；全自动线程的放行；测试、状态快照、网页终端；审计与指纹重置 | `site/ssh` |
| 7 | `stats` | 成本统计与预算 | H | F「成本与产出统计」；D「9. 统计分析（M10）」；help:`stats`；i18n:`stats` | 统计页三个页签；可下钻的维度；预算与告警；CSV；CLI | `site/stats` |
| 8 | `notifications` | 通知渠道 | H | P「M5：公开分享、通知与 sync」下「通知与投递」；i18n:`notifySettings` `notify`；M「在通知上作答」 | 支持的渠道（Web Push、Telegram、Webhook、ntfy、Bark、手机推送）；各在哪里配置；何时会通知；在通知上直接作答 | — |
### 使用 · Artifacts 与视图 `guide/artifacts/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `overview` | Artifacts 概览 | E | F「Artifacts」（版本、隔离渲染、入口、查看器、演示、在场） | 本页回答「Artifact 是什么、和视图有什么不同」；种类；版本与「最近删除」（30 天）；入口；查看器的功能；导出格式 | `site/artifacts-grid` |
| 2 | `office` | Word、Excel、PowerPoint 与 PDF | H | F「Artifacts」的 Office 文件与 Office 引擎 | 七种类型与大小上限；预览、评论、上传新版本、下载；「转为 artifact」；在线编辑需要 `<Requires ids={['office-engine']} />` 及编辑期间的锁 | — |
| 3 | `design-canvas` | 设计画布与多版方案 | H | F「Artifacts」的画布编辑器、设计画布、品质与迭代、多版方案、原型与交付；help:`design` | 画布编辑器；设计画布的实时 / 静态切换及其前提；品质检查（14 条规则）；方案组（2–4 版）与「选定此方案」；设备外壳与导出；部署到 box | `site/artifact-variants` |
| 4 | `publishing` | 发布 Artifact 与页面能力 | H | F「Artifacts」的页面能力与发布；i18n:`publish` | 私有、访问码、公开链接；发布前的密钥扫描；`oryn.use(…)` 的三种能力（`db`、`files`、`sample`）与首次同意、在哪里收回 | — |
| 5 | `views` | 视图：对话里的交互界面 | E | F「视图」 | 本页回答「视图是什么、你的操作去了哪里」；两种形态；回传的两种方式（下一条消息 / 等待作答，10 分钟）；用过即锁；谁能用；开关；分享页里的行为；自建 Anthropic 兼容网关时逐块显示的配置 | `site/view-form` `site/view-form-answered` `site/view-dashboard` `site/view-actions` |

### 使用 · Boxes `guide/boxes/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `overview` | 认识 Boxes | E | F「Boxes」；R「Boxes」 | 本页回答「box 和线程的环境有什么不同、适合放什么」；上限（16 台、每台 16 个应用）；隔离边界；哪些线程不能用 box | `site/boxes` `site/box-detail` |
| 2 | `deploy-app` | 部署第一个应用 | T | F「Boxes」（部署配置、激活与回滚、地址与公开性）；`internal/boxcfg/boxcfg.go`；help:`boxes`（`deploy`） | `<Requires ids={['portal']} />`；唯一路径：仓库里写最小 `.oryn/box.yaml`（示例照抄）并提交 → 线程里 `oryn boxes deploy --on <box> --name <应用> --create` → 打开应用地址；未提交的改动不会带上 | — |
| 3 | `manage-apps` | 管理应用：密钥、回滚、日志与运行时段 | H | F「Boxes」；help:`boxes` | 密钥与明文变量；重启；回滚与保留的 release 数；日志；`exec` 与 `cp`；公开 / 私有；运行时段；下线与清数据；悬停预览的 meta | — |
| 4 | `threads-on-box` | 在 box 上开线程 | H | F「Boxes」里的在 box 上开线程；help:`thread`（`--box` `--app`） | 两种工作目录；在 box 上改了代码后的部署保护与 `--discard-box-changes` | — |

### 使用 · 客户端 `guide/clients/`

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 | 截图 |
|---|---|---|---|---|---|---|
| 1 | `web` | 浏览器：登录、设备与外观 | H | D「4. 启动控制面并初始化」；R「全平台客户端」；`web/src/pages/settings/registry.ts`（`account` `appearance`）；i18n:`auth` `devices` `appearance` `pair` | Passkey 登录与恢复码；批准设备配对、吊销设备；主题、主题色、壁纸、语言（简体中文 / English） | — |
| 2 | `desktop` | 桌面 App | H | K 开头至「自动更新」（不含「窗口与标题栏」「开发」及其后） | 各平台安装包与 Linux 依赖；首次运行与配对；托盘、通知、深链接、全局快捷键；已知限制；自动更新 | `site/desktop-app` |
| 3 | `android` | Android App | H | M 开头至「已知限制」（不含「开发」及其后）；`.github/workflows/release.yml`（产物名） | `foss` 与 `gms` 的区别；下载与用 `apksigner` 校验（指纹照抄）；配对；省电设置；已知限制 | — |
| 4 | `ios` | iOS App | H | M「已知限制」；F「移动」 | 当前只经 TestFlight 内部测试这一状态；已有的界面与功能；推送经官方网关 | — |
| 5 | `cli` | 命令行 oryn | H | R「CLI 速查」；F「终端」；`cmd/oryn/client.go`（凭据路径）；help:`login` `thread` `sync` | 从哪里得到二进制；`oryn login`；凭据文件位置与 `ORYN_CREDENTIALS`；`thread attach`；`sync`（含 `--apply` 与还原）；完整命令见参考 | — |
| 6 | `push` | 手机推送 | H | M「推送」全部小节；F「移动」；D「移动 App 推送」 | `<Requires ids={['push']} />`；三条路径（官方网关 → APNs / FCM、UnifiedPush）；端到端加密；通知上作答；锁屏；国产 ROM | — |

### 部署与运维

| # | 路径 | 标题 | 类型 | 来源 | 必须覆盖 |
|---|---|---|---|---|---|
| — | `admin/overview` | 部署总览 | E | D 开头；R「架构与安全」；D 各节的前置说明 | 本页回答「一套 Oryn 由什么组成、先装什么后装什么」；单节点拓扑图；必需与可选的对照表（功能 → 需要的组件 → 对应页面）；系统前提；最小安装的顺序清单（链到「基础部署」1–5 与「模型与密钥」） |
| 1 | `admin/install/binaries-and-image` | 安装二进制与镜像 | H | D「1. 安装二进制与镜像」；`.github/workflows/release.yml:140-160` | 两种来源；校验；`make image`；服务用户与目录；git ≥ 2.31；包内文件以 release.yml 为准 |
| 2 | `admin/install/control-plane` | 配置控制面 | H | D「2. 控制面配置 `/etc/oryn/orynd.yaml`」（到「移动 App 推送」之前）；`internal/opsconf/opsconf.go` | 最小配置示例；每个必改键的含义；仓库镜像上限；哪些键可在「设置 → 控制面」覆盖；全部键见参考 |
| 3 | `admin/install/reverse-proxy` | 反向代理与 HTTPS | H | D「3. 反代（1Panel OpenResty）」；`deploy/openresty/oryn.conf` | 对反代的要求清单（WebSocket、超时、不缓冲、请求体上限、`/git/`、公开路径、`X-Real-IP`）；给出 OpenResty / Nginx 参考配置（来自仓库文件，域名换成示例）；不写来源里没有的其它反代配置 |
| 4 | `admin/install/first-start` | 启动与初始化 | H | D「4. 启动控制面并初始化」；`deploy/systemd/orynd.service` | 安装 systemd 单元；取 setup 链接；注册 Passkey、保存恢复码；`orynd setup-token`；必须 HTTPS 的原因 |
| 5 | `admin/install/docker-provider` | 接入 Docker Provider | H | D「5. 本机 Docker provider」（到「Agent 沙箱」之前）；`deploy/systemd/oryn-provider.service` | `oryn login`、`oryn provider create`、`provider.yaml`、systemd 单元；环境类型；停机环境的只读预览前提 |
| 6 | `admin/install/portal` | 启用 Portal 泛域名 | H | D「Portal（受管服务的浏览器入口）」「Boxes 应用与数据持久化（M23）」 | 通配 DNS 与通配证书；`portal_domain`；同一域名还承载 Boxes 应用地址、Artifact 隔离帧与发布页；哪些操作会丢 box 数据 |
| 7 | `admin/install/network-isolation` | 网络隔离与加固 | H | D「7. 安全」下「容器能力」「桌面浏览器沙箱（M8）」「网络隔离」 | 不隔离时环境能访问什么；专用网桥与 iptables 规则（命令照抄）；容器默认去掉的能力；浏览器沙箱与定期重建镜像 |
| 1 | `admin/backends/snapshots-pool` | 快照与预热池 | H | D「10. 加速：项目快照、预热池与带 Docker 的 orb（M11a）」的引言、「项目快照」「预热池」；help:`project` | 默认值；何时拍、何时失效；磁盘占用与清理；预热池上限 |
| 2 | `admin/backends/sysbox` | 带 Docker 的环境（Sysbox） | H | D「带 Docker 的 orb（sysbox）」「orb link 的 TLS」 | 前提（先做网络隔离、开 link TLS）；安装与 `daemon.json`；类型配置；必须接受的风险照抄 |
| 3 | `admin/backends/firecracker` | Firecracker Provider | H | D「12. Firecracker provider（M11b）」的「前提」「产物」「网络」「配置与启动」「行为差异」；`deploy/firecracker/oryn-fc-net.sh`；`deploy/systemd/oryn-provider-fc.service` `oryn-fc-net.service` | 硬件与内核前提；`make fc-artifacts` 与安装；网络脚本；`provider-fc.yaml`；`oryn provider preflight`；与 Docker 的行为差异 |
| 4 | `admin/backends/sandbox` | 启用 Agent 沙箱 | H | D 里三个「Agent 沙箱（M30）」（分别在 2、5、12 节下） | 控制面配额键；Docker Provider 的网络脚本与配置（规则重启后不保留）；Firecracker Provider 的开关；需要重建镜像 / 根盘 |
| 5 | `admin/backends/dispatch` | 用脚本接入其它后端（dispatch） | Rf | D「dispatch 驱动的脚本契约（令牌轮换部分）」；`internal/providerrt/dispatch.go` | 配置键；脚本收到的环境变量；操作名；退出码与输出约定；超时；令牌轮换义务 |
| 1 | `admin/components/coordinator` | 协调宿主：启用全局助手与 Space | H | D「8. 协调宿主（Space 与全局助手）」的「安装 omp」「配置」「专用账号（root 部署）」「启动条件」「沙箱里有什么」「不同环境得到的隔离」「排查」「升级」 | 安装钉定版本的 omp；配置键；内核与权限前提；`orynd coordinator check`；不同部署方式得到的隔离程度 |
| 2 | `admin/components/assistant-network` | 助手联网、MCP 与后台研究 | H | D「全局助手联网与 MCP（M19）」「后台研究（M26）」「助手的电脑（M19）」 | 联网总开关与只连公网；MCP 服务器；后台研究的开关与花费上限；助手电脑的 Provider 选择 |
| 3 | `admin/components/github-oauth` | GitHub 集成：注册 OAuth App | H | D「13. GitHub 集成（M15）」引言、「注册 OAuth App」「Scope」「组织批准与 SAML SSO」「事件来源与额度」 | 注册步骤与回调地址；scope 表照抄；组织限制下的两种错误；webhook 与轮询 |
| 4 | `admin/components/hindsight` | Hindsight 记忆服务 | H | D「14. Hindsight 记忆服务（M16）」的「部署」「备份」「升级」「换嵌入模型（reembed）」「全局助手的主人记忆（M17）」；`deploy/hindsight/compose.yaml` `.env.example` | 管理页生成 `.env`；compose 启动；连接与开关；备份与恢复；升级；换嵌入模型须停机；启用主人记忆 |
| 5 | `admin/components/office-engine` | Office 引擎（Collabora） | H | D「Office 引擎（M32）」；`deploy/collabora/compose.yaml`；`deploy/openresty/oryn-office.conf` | 独立域名与证书；compose；三个配置键；能力检查接口 |
| 6 | `admin/components/push-gateway` | 移动推送与自建推送网关 | H | D「移动 App 推送」（不含「从 M28 之前的版本升级」）；G 开头至「自建网关」（不含「部署清单」） | 缺省使用官方网关及其只见密文；出站 443；何时才需要自建；自建的构建、配置、systemd、反代、备份、APNs key 与 Firebase 服务账号 |
| 7 | `admin/components/repos` | 仓库镜像与托管仓库入口 | H | D「项目仓库镜像」「托管仓库入口 `/git/`」「git 出站策略」 | 镜像目录与磁盘保护；`/git/` 的反代要求与认证；git 出站规则摘要（细则链到安全页） |
| 1 | `admin/operations/backup` | 备份 | H | D 中所有提到备份的段落（`data_dir`、`master.key`、`repos/`、`push-gateway.key`、`ssh-gateway.key`）；D「备份」（14 节下）；G「备份」 | 必须备份的清单与各自丢失的后果；Hindsight 的备份与恢复命令；推送网关的备份。只写来源里有的恢复步骤 |
| 2 | `admin/operations/upgrade` | 升级 | H | D「1. 安装二进制与镜像」；D「升级」（8 节下与 14 节下）；D「桌面浏览器沙箱（M8）」里的重建镜像；F「Agent 沙箱」的升级与兼容；K「自动更新」 | 升级控制面二进制与同版本镜像；协调宿主的 omp 同步替换；已有环境里的 `orbd`；Hindsight；客户端自动更新。只写来源里有的步骤 |
| 3 | `admin/operations/stats-retention` | 统计数据的保留与重算 | H | D「9. 统计分析（M10）」；`cmd/orynd/admin.go`（`rebuild-stats`） | 三个保留期键；`orynd admin rebuild-stats`；预算 |
| 4 | `admin/operations/troubleshooting` | 故障排查 | Rf | D「排查」（8 节下）；D「配置与启动」里的 preflight 检查项；F「环境自配置」（setup 失败）；F「仓库浏览」的不可用说明表；F「收件箱与命令面板」的出错归类 | 一张「现象 → 原因 → 处理」表，每行都来自来源；诊断命令：`orynd coordinator check`、`oryn provider preflight`、`oryn orb setup logs` |
| 1 | `security/overview` | 安全模型总览 | E | F「安全边界」；R「架构与安全」的四条边界 | 本页回答「把代码和凭据交给 Oryn 时，边界在哪里」；四条边界各一段并链到细页；信任假设（环境里的 Agent 有 root） |
| 2 | `security/credentials` | 凭据隔离与出站代理 | E | F「出站代理凭据隔离」；D「模型密钥绑定」「git 出站策略」 | 本页回答「API Key 和令牌为什么不在环境里」；占位符与注入；回显脱敏；哪些情况会以环境变量下发 |
| 3 | `security/git-scope` | Git 访问范围与门禁 | E | F「Git 访问范围」；D「门禁」「风险说明」 | 本页回答「环境里的 Agent 能读写哪些仓库」；github.com、其它主机、托管仓库、LFS 四种情形；门禁；令牌无法按仓库收窄的风险 |
| 4 | `security/tokens-trust` | 令牌、设备与单向信任 | E | F「令牌轮换与单向信任」；D「orb 令牌」；D「安全边界（先读）」（11 节下）；P「通用约定」的鉴权一条 | 本页回答「谁凭什么证明自己、谁能指挥谁」；各类令牌与前缀；环境令牌的轮换；Runner 的单向边界；谁能操控 Runner |
| 5 | `security/sandbox-untrusted` | 协调沙箱与不可信输入 | E | F「全局助手与 Space」首段、「公开的自动化入口」；D「沙箱里有什么」「残余风险」「后台研究（M26）」；R 的第四条边界 | 本页回答「外部内容进来时怎样不变成指令、不带走数据」；协调沙箱的唯一出口；公开入口的凭据限制；后台研究的两类研究员；残余风险照抄 |

### 参考（手写 15 页）

| # | 路径 | 标题 | 来源 | 内容 |
|---|---|---|---|---|
| — | `reference/index` | 参考 | — | 各参考页的一句话说明与链接；`sources` 填 `README.md` |
| 0 | `reference/cli/index` | 命令行总览 | `cmd/oryn/main.go`、`client.go`、`orb_thread.go` | 三个运行位置（你的电脑 / 环境内 / Provider 主机）及判定；凭据文件与 `ORYN_CREDENTIALS`、`ORYN_API_URL` + `ORYN_API_TOKEN`；退出码约定；24 个命令的一句话索引表 |
| 90 | `reference/cli/orynd` | orynd | `cmd/orynd/main.go` `admin.go` `coordinator_host.go` | 启动参数；全局参数须写在子命令之前；`setup-token`、`admin create-device` / `create-web-session` / `rebuild-stats`、`coordinator check`。不写三个内部子进程命令 |
| 91 | `reference/cli/orbd` | orbd | `cmd/orbd/main.go`；`internal/orbdrt/runner.go` | `orbd run` 与 `--runner` 形态的全部参数、校验规则、信号与退出码 |
| 92 | `reference/cli/oryn-push-gateway` | oryn-push-gateway | `cmd/oryn-push-gateway/main.go` | 两个参数 |
| 1 | `reference/project-files/setup-resume` | `.oryn/setup` 与 `.oryn/resume` | `internal/orbdrt/setup.go` | 查找顺序与回退路径；须有可执行位；工作目录；超时（setup 20 分钟；resume 等待 10 秒、总上限 10 分钟）；失败语义；日志路径；哪些文件变化会让快照失效 |
| 2 | `reference/project-files/services-yaml` | `.oryn/services.yaml` | `internal/orbdrt/servicefile.go`、`services.go`（常量） | 字段表（`command` `cwd` `port` `env` `health` `portal` `portals` `platforms`）与校验；服务名规则；注入的环境变量；上限 32；就绪探测与重启退避 |
| 3 | `reference/project-files/box-yaml` | `.oryn/box.yaml` | `internal/boxcfg/boxcfg.go` | 字段表（`build` `source` `artifacts` `include` `services`）与规则；查找方式；`.oryn/box-deploy.json` 由 CLI 维护 |
| 4 | `reference/project-files/desktop-resume` | `.oryn/desktop/resume` | `internal/orbdrt/deskresume.go` | 查找顺序；触发时机；等待 60 秒且不杀进程；日志路径 |
| 1 | `reference/ui/shortcuts` | 键盘快捷键 | `web/src/lib/shortcuts.ts`、`web/src/lib/composer.ts` | 应用级表；输入框两种模式各一张表 |
| 2 | `reference/ui/slash-commands` | 斜杠命令与输入前缀 | `web/src/lib/slash.ts`；i18n:`slash` | 客户端命令表（命令、参数提示、说明）；别名；在 Oryn 里不可用的命令及原因；协调对话里可用的子集；输入前缀表 |
| 3 | `reference/ui/settings` | 设置页索引 | `web/src/pages/settings/registry.ts`；i18n:`settings`；F「项目」的七个分组 | 21 个设置分区（分组、名称、地址、管什么、对应指南）；项目设置七个分组 |
| — | `reference/env-vars` | 环境变量 | `cmd/oryn/client.go`、`orb_thread.go`；`internal/orbdrt/runtime.go`、`runner.go`、`corefetch.go`；`internal/boxes/deploy.go` | 三张表：`oryn` 读取的；`orbd` 读取的（只列用户会设置的）；环境内与应用进程里可以读到的（`ORYN_ORB`、`ORYN_THREAD_ID`、`PORT`、`PUBLIC_URL`、`ORYN_DEPLOYMENT_*`） |
| — | `reference/glossary` | 术语表 | F 全文；P「通用约定」 | 按拼音排序的术语与一句话定义；各类标识前缀表（`ost_` `odt_` `opv_` `oot_` `ort_` `owh_` `sch_` `ght_` `oryn-ph-`） |
| — | `reference/api-guide` | API 使用约定 | P「通用约定」「分区」；`schema/openapi.yaml` 的 `info.description` | 基础地址；两种鉴权与 CSRF 头；时间与错误体格式；路径参数里 `/` 的编码；WebSocket 的入口；规格文件在仓库里的位置 |

