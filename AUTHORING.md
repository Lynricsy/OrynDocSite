# 写作规范

本站所有手写页都按本规范写。事实源是 [Oryn 仓库](https://github.com/Lynricsy/Oryn) 的 `docs/*.md` 与源码；本站按读者要完成的任务重写，不复制工程规格。

## 页面类型

每页只属于一种类型，写在 frontmatter 的 `type` 里。

| 类型 | 用途 | 写法 |
|---|---|---|
| `tutorial` | 带第一次使用的人走通一条路径 | 开头写「完成后你会得到什么」和「开始之前」（确切版本与命令）；正文用 `<Steps>`，每步以读者能看到的结果结尾；只给一条路径、不给备选；结尾「下一步」放链接 |
| `how-to` | 读者已知道要做什么，查怎么做 | 开头一段说明这件事是什么、什么时候用（不复述标题）；有前置组件时紧跟 `<Requires>`；每个二级标题是一件要做的事，先写界面路径（「设置 → …」），再给等价命令；页尾「限制」列数字上限，「相关」放链接 |
| `explanation` | 讲清一个机制或取舍 | 正文第一行是斜体的「本页回答：……？」；不写步骤列表 |
| `reference` | 查值 | 表格与完整列表；不叙事，不写「下一步」 |

## 事实规则

- 每句陈述都要能在 frontmatter `sources` 列出的来源里找到。数字照抄；来源里没有的不写、不推测。
- 界面文案照抄 `web/src/i18n/locales/zh-CN.json`。
- 命令与参数以 `/reference/cli/` 下的生成页为准。
- 代码块里的输出只能是来源里已有的原文，或本次真实运行捕获的；不凭印象重构输出。

## 不写进来的东西

- 里程碑标签（如「（M30）」）、`plan-m*.md`、验收脚本、CI 与签名密钥、发版流程、Oryn 开发者用的 `.dev/` 路径（快速开始照抄 README 的 `.dev/quickstart-*` 命令除外：它们面向用户，在仓库检出目录里运行）。
- 内部函数名与 RPC 名，除非是读者要敲的。
- `docs/deploy.md` 第 16 节（作者本机的生产实例），`docs/push-gateway.md` 的「部署清单」。
- 任何真实主机名、域名、IP。示例域名统一用 `oryn.example.com` 与 `*.orb.example.com`。例外：官方推送网关 `push.oryn.best` 照写；隐私政策（`privacy/index.md`、`privacy/en.md`）是法律页面，照写本站与推送网关的真实地址和联系邮箱 `privacy@ling.plus`，`scripts/check-content.ts` 的 `leakExemptions` 只对这两页放行这个邮箱。隐私政策不属于上面四种页面类型，不写 `type`，用 `template: splash`（无侧栏），从页脚与[参考索引](/reference/)进入。

`bun run check` 会拦下其中可机器识别的部分。

## 术语

一个概念只用一个名字。

| 概念 | 写法 |
|---|---|
| thread | 线程 |
| orb | 每页首次出现写「执行环境（orb）」，其后写「环境」；命令、配置键、界面原文里保留 `orb` |
| orynd | 控制面 |
| owner | 称读者为「你」；讲权限时写「所有者」；功能名照界面写（如「主人记忆」） |
| agent | Agent |
| role | 首次写「角色（role）」，其后写「角色」 |
| Provider、Runner、Space、Portal、Artifact / Artifacts、Boxes / box | 不译。功能名写 Boxes，单台写 box，box 上的 app 在正文里写「应用」 |

其余固定写法：全局助手、主线、视图、子 Agent、技能、规则、定时任务、闸门、全自动线程、工作线程、受管服务、快照、预热池、冻结 / 唤醒 / 停机、出站代理、设备令牌、确认卡。

## 文风

- 简体中文，第二人称。句子陈述事实、决定或风险，不写宣传语，不用「简单」「只需」「强大」「轻松」。
- 中英文之间留空格。
- 界面文案用「」；按键用 `<kbd>`；路径、命令、键名用反引号。
- 占位符写成 `<中文说明>`，只出现在代码里。
- 正文标题从二级起，不带 emoji；标题下第一句不复述标题。
- 代码块标注语言（`bash` `yaml` `json` `text`）；省略处用该语言的注释，不用 `...`。
- Starlight 的 `<Tabs>` 只用于 how-to 里按操作系统分支，不出现在 tutorial 里。
- `<Aside type="caution">` 只用于会丢数据或影响安全的地方。

## 链接

- 站内链接写根绝对路径并带尾斜杠：`/guide/threads/composer/`。
- 指向 Oryn 源文件：`https://github.com/Lynricsy/Oryn/blob/main/<路径>`。

## frontmatter

```yaml
---
title: 定时任务
description: 让线程按时间表或手动触发运行，并在运行前检查前提。
type: how-to
sources:
  - file: docs/features.md
    section: '### 定时任务'
  - file: docs/deploy.md
    section: '### Agent 沙箱（M30）'
    under: '## 5. 本机 Docker provider'
verified: 572a210d695a
sidebar:
  order: 2
---
```

- `sources[].file`：相对 Oryn 仓库根的路径。
- `sources[].section`：该文件里某个标题行的原文，含 `#`；整文件作为来源时省略。
- `sources[].under`：上级标题行的原文，只在同名标题不止一个时填。
- `verified`：核对内容时 Oryn 的 commit（12–40 位）。`bun run drift` 用它找出来源已经变化的页面。
- `sidebar.order`：页面在本组内的顺序。
- 由脚本生成的页面带 `generated: true`，不手改。

## 组件

```mdx
import Shot from '@/components/Shot.astro';
import Requires from '@/components/Requires.astro';
import { Steps, Aside, Tabs, TabItem, LinkCard, CardGrid } from '@astrojs/starlight/components';

<Requires ids={['coordinator']} />

<Shot id="site/inbox" alt="收件箱按「需要你」「出错」「已完成」分节列出线程" />
```

- `<Shot>`：`id` 是 `src/assets/shots/` 下去掉 `-light.webp` 的路径；`alt` 必填；可选 `caption`。有 `-dark.webp` 时随主题切换。
- `<Requires>`：`ids` 取自 `src/data/requirements.ts`，未登记的 id 会让构建失败。

## 截图

- 只用已同步进 `src/assets/shots/` 的图（`reference-data/shots.manifest.json`）。
- 先打开图看清内容再写 `alt`，一句话说出图里有什么。
- 图与正文对不上就不用。不从图里读数字写进正文。

## 交稿自检

- 类型唯一。
- 每个二级标题下的事实都有来源。
- 所有站内链接可达。
- `bun run check` 通过。
