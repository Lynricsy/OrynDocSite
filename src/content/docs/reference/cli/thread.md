---
title: "oryn thread"
description: "线程"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

`oryn thread` 在你的电脑上与执行环境（orb）内都能运行，按当前位置选择实现；判定方式见[命令行总览](/reference/cli/)。在环境内运行时，调用方线程取自环境变量 `ORYN_THREAD_ID`。

| 子命令 | 你的电脑 | 环境内 |
|---|---|---|
| `new` | 可用 | 在本项目开一个子线程；只接受 `--title`、`--type`、`--json` |
| `show` | 可用 | 可用；不支持 `--entries` |
| `send` | 可用 | 可用 |
| `wait` | 不可用，改用 `oryn thread attach --exit-on-idle` | 可用 |
| `list`、`archive`、`rpc`、`abort`、`fork`、`attach` | 可用 | 不可用 |

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn thread wait` | 0 线程静止；2 调用错误（不在环境内、控制口出错、不允许的目标、`--timeout` 不在 (0, 24h] 之内）；3 线程在等你回答；4 线程出错；124 等待超时 |
| `oryn thread attach --exit-on-idle` | 见到一个回合结束后：线程 idle 为 0，awaiting_input 为 3，error 为 4；在环境内调用为 2；尚未登录为 1 |
| 其它子命令 | 0 成功；1 错误；2 调用错误（含在环境内调用不可用的子命令） |

### 相关指南

- [新建线程与选择执行位置](/guide/threads/new-thread/)
- [回退、分叉与会话树](/guide/threads/rewind-fork/)
- [浏览器 Profile：复用登录态](/guide/workbench/browser-profiles/)
- [在自己的机器上跑线程（Runner）](/guide/environments/runner/)
- [在 box 上开线程](/guide/boxes/threads-on-box/)
- [命令行 oryn](/guide/clients/cli/)

## oryn thread

```text
线程

Usage:
  oryn thread [command]

Available Commands:
  abort       中止线程当前的回合
  archive     归档线程（--undo 取消归档）
  attach      挂到线程上：流式打印转录，可输入消息（steer）、作答待答请求或审批计划；挂着即算正在查看该线程
  fork        分叉线程（默认从当前叶子、共用当前 orb；--env copy 连环境快照出副本 orb），打印新线程 id
  list        列出线程（默认未归档）
  new         新建线程（默认新建 orb；--orb 挂到已有 orb；--runner --dir 在 runner 的目录里）；orb 内在本项目开一个子线程
  rpc         向线程的 agent 下发任意 omp RPC 命令并打印应答（如 get_state、set_thinking_level、compact）
  send        向线程发送消息（agent 忙时排在当前回合之后；--steer 插入当前回合）
  show        显示线程（--entries 按活动分支逐条打印角色与文本）
  wait        orb 内：等线程静止并打印最后的回复（退出码 0 完成 / 3 等主人回答 / 4 出错 / 124 超时）

Flags:
  -h, --help   help for thread

Use "oryn thread [command] --help" for more information about a command.
```

## oryn thread abort

```text
中止线程当前的回合

Usage:
  oryn thread abort <id> [flags]

Flags:
  -h, --help               help for abort
      --timeout duration   等待 agent 应答的时长 (default 1m0s)
```

## oryn thread archive

```text
归档线程（--undo 取消归档）

Usage:
  oryn thread archive <id>… [flags]

Flags:
  -h, --help   help for archive
      --json   以 JSON 输出线程
      --undo   取消归档
```

## oryn thread attach

```text
退出码（--exit-on-idle）：见到一个回合结束后，线程 idle → 0、awaiting_input → 3、error → 4。
输入：每行一条；有待答请求时作为作答（编号或文字）；有待审批的计划时输入编号或选项名批准，
"save <路径>" 保存计划（相对路径按 agent 工作目录解析），其它文字作为修改意见发回；否则 steer 当前回合。/abort 中断，/quit 退出；
终端上 EOF 或 Ctrl-C 退出（agent 继续），管道输入结束后继续查看。

Usage:
  oryn thread attach <id> [flags]

Flags:
      --all            先打印全部消息
      --exit-on-idle   回合结束后退出（idle 0 / awaiting_input 3 / error 4）
  -h, --help           help for attach
      --json           把该线程的 thread.snapshot / entries / frame / ui.resolved / plan.resolved 原样逐行输出（NDJSON）
      --no-input       不读取输入
      --tail int       先打印活动分支上最近 N 条消息（0 = 不打印） (default 10)
```

## oryn thread fork

```text
分叉线程（默认从当前叶子、共用当前 orb；--env copy 连环境快照出副本 orb），打印新线程 id

Usage:
  oryn thread fork <id> [flags]

Flags:
      --entry string   从该条目分叉（缺省取当前叶子）
      --env string     share 共用当前 orb；copy 连环境快照出副本 orb (default "share")
  -h, --help           help for fork
      --json           以 JSON 输出新线程
```

## oryn thread list

```text
列出线程（默认未归档）

Usage:
  oryn thread list [flags]

Flags:
      --archived         只列已归档线程
  -h, --help             help for list
      --json             以 JSON 输出
      --project string   按项目过滤（项目名、id 或 none）
  -q, --query string     标题 / 标签关键字
      --state string     按状态过滤（provisioning / working / awaiting_input / idle / error）
```

## oryn thread new

```text
新建线程（默认新建 orb；--orb 挂到已有 orb；--runner --dir 在 runner 的目录里）；orb 内在本项目开一个子线程

Usage:
  oryn thread new <prompt> [flags]

Flags:
      --app string               与 --box 同用：工作目录是该 app 的线上目录（缺省为机器本身）
      --box string               在 box 上开线程（名字或 id；与 --runner / --orb / --provider / --type 互斥）
      --browser-profile string   新 orb 选用的浏览器 Profile（名字或 id；none = 不用；缺省 = 项目默认）
      --dir string               runner 上的工作目录（绝对路径，须在 runner 声明的目录之内）
  -h, --help                     help for new
      --json                     以 JSON 输出线程
      --label stringArray        标签（可重复）
      --no-project               不关联项目
      --orb string               挂到已有 orb（orb-…；与 --provider / --type 互斥）
      --project string           项目名
      --provider string          orb provider 名称
      --readonly                 以只读副本使用浏览器 Profile（不取租约、不回写）
      --runner string            在 runner 上执行（名字或 id；需要 --dir）
      --share-dir                允许与其它未归档线程共用 --dir
      --space string             加入 Space（名字或 id；未给 --project 时取 Space 的项目）
      --takeover                 接管正被别的 orb 使用的浏览器 Profile（对方降级为只读）
      --title string             线程标题
      --type string              orb 类型
      --worktree string          先在 --dir（git 仓库）旁新建该名字的 worktree 与分支，线程在其中工作
```

## oryn thread rpc

```text
<json> 是带字符串 type 的 omp 命令对象，例如 '{"type":"get_state"}'。应答以缩进 JSON 打印到标准输出；
agent 拒绝（success: false）时错误打到标准错误并以 1 退出。会话绑定、凭据等由 Oryn 管理的命令会被拒绝（managed_by_oryn），
分叉请用 `oryn thread fork`。

Usage:
  oryn thread rpc <id> <json> [flags]

Flags:
  -h, --help               help for rpc
      --timeout duration   等待 agent 应答的时长（含唤醒 orb） (default 5m0s)
```

## oryn thread send

```text
向线程发送消息（agent 忙时排在当前回合之后；--steer 插入当前回合）

Usage:
  oryn thread send <id> <message> [flags]

Flags:
  -h, --help               help for send
      --steer              插入当前回合（steer）
      --timeout duration   等待 agent 应答的时长（含唤醒 orb） (default 5m0s)
```

## oryn thread show

```text
显示线程（--entries 按活动分支逐条打印角色与文本）

Usage:
  oryn thread show <id> [flags]

Flags:
      --entries   按活动分支打印条目
  -h, --help      help for show
      --json      以 JSON 输出线程
```

## oryn thread wait

```text
orb 内：等线程静止并打印最后的回复（退出码 0 完成 / 3 等主人回答 / 4 出错 / 124 超时）

Usage:
  oryn thread wait <id> [flags]

Flags:
  -h, --help               help for wait
      --json               以 JSON 输出线程信息
      --timeout duration   最长等待时间（上限 24h） (default 30m0s)
```
