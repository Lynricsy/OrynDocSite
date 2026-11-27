---
title: "oryn schedule"
description: "定时：线程内定时（set）、每次新建线程的项目定时（add）与入站 Webhook（webhook）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

`oryn schedule` 在你的电脑上与执行环境（orb）内都能运行，按当前位置选择实现；判定方式见[命令行总览](/reference/cli/)。环境内的命令只作用于当前线程（环境变量 `ORYN_THREAD_ID`）的线程内定时。

| 子命令 | 你的电脑 | 环境内 |
|---|---|---|
| `set` | 须给 `<thread>` | 不接受线程参数，作用于当前线程；不能设置运行前闸门（`--gate-host`、`--gate-command`、`--gate-timeout`） |
| `show`、`pause`、`resume`、`rm` | 须给 `<ref>` | 不接受参数，作用于当前线程的定时 |
| `add`、`update`、`ls`、`run`、`runs`、`webhook`、`webhook rm` | 可用 | 不可用 |

### 退出码

0 成功；1 错误；2 调用错误（含在环境内调用不可用的子命令、在环境内给出线程参数或闸门参数）。

### 相关指南

- [定时任务](/guide/automation/schedules/)
- [入站 Webhook](/guide/automation/webhooks/)

## oryn schedule

```text
定时：线程内定时（set）、每次新建线程的项目定时（add）与入站 Webhook（webhook）

Usage:
  oryn schedule [command]

Available Commands:
  add         新建项目定时：每次运行用固定提示词新建一个线程；stdout 打印定时 id
  ls          列出定时（--project 只列该项目的项目定时；none = 没有项目的）
  pause       暂停定时
  resume      恢复定时（从现在起重新计算下一次，不补跑暂停期间错过的）
  rm          删除定时（连同运行记录）
  run         立即运行一次（不改下一次时间；上一次未结束时回 schedule_busy）
  runs        最近的运行（新的在前）
  set         设置线程内定时（每线程一个；到点提示词作为新消息出现在该线程）；orb 内省略 <thread>，作用于当前线程
  show        显示定时（<ref> 为 sch_… 或线程 id；orb 内省略，显示当前线程的定时）
  update      修改定时（只改给出的参数；<ref> 为 sch_… 或线程 id）
  webhook     开启或修改定时的入站 Webhook（仅每次新建线程的定时）；新生成的地址打印到 stdout，只显示这一次

Flags:
  -h, --help   help for schedule

Use "oryn schedule [command] --help" for more information about a command.
```

## oryn schedule add

```text
新建项目定时：每次运行用固定提示词新建一个线程；stdout 打印定时 id

Usage:
  oryn schedule add (--project <名称> | --no-project) --name <N> (--cron | --every | --at | --manual) (--prompt | --prompt-file) [flags]

Flags:
      --at string             一次性：RFC3339 时刻，或相对现在的 +时长（如 +15m）
      --cron string           cron 表达式（5 段，或 @hourly / @daily / @weekly / @monthly / @yearly）
      --disabled              保存为暂停
      --every string          固定间隔（Go 时长，≥1m，如 30m、2h）
      --gate-command string   运行前闸门：每次运行前执行的命令（本机沙箱的工作目录是数据目录 gates/）；最后一行输出 {"wakeAgent": false} 时跳过本次运行
      --gate-host string      运行前闸门在哪台 SSH 主机上执行（设置 → SSH 主机）；省略 = 控制面本机沙箱，update 时空串 = 改回本机
      --gate-timeout int      运行前闸门的执行上限（秒，1–600） (default 60)
  -h, --help                  help for add
      --json                  以 JSON 输出定时
      --keep int              只保留最近 N 个未归档的运行线程（1–50），更早且已静止的自动归档 (default 5)
      --manual                没有时间触发：只由 oryn schedule run 或入站 Webhook（oryn schedule webhook）触发（与 --cron / --every / --at 互斥，不能带 --until）
      --model string          模型（provider/id；与 --role 互斥）
      --name string           名称
      --no-gate               去掉运行前闸门（update）
      --no-project            新线程不关联项目
      --overlap string        上一次运行未结束时：skip（缺省）跳过 / allow 照常新建（至多 3 个并存）
      --project string        新线程所在的项目（名称或 id）
      --prompt string         到点要做的事（提示词；支持 {{now}} {{date}} {{scheduled_at}} {{run_number}} {{last_run_at}}）
      --prompt-file string    从文件读取提示词（- = stdin）
      --provider string       orb provider 名称
      --role string           新线程开场的 omp 模型 role（与 --model 互斥；update 时空串 = 不指定）
      --space string          新线程加入的 Space（名称或 id；update 时 none = 不加入）
      --thinking string       思考级别
      --type string           orb 类型
      --tz string             IANA 时区（缺省取环境变量 TZ，再缺省 UTC）
      --until string          截止时刻（RFC3339）
```

## oryn schedule ls

```text
列出定时（--project 只列该项目的项目定时；none = 没有项目的）

Usage:
  oryn schedule ls [flags]

Flags:
  -h, --help             help for ls
      --json             以 JSON 输出
      --mode string      thread 或 new_thread
      --project string   项目（名称、id 或 none）
```

## oryn schedule pause

```text
暂停定时

Usage:
  oryn schedule pause [<ref>] [flags]

Flags:
  -h, --help   help for pause
```

## oryn schedule resume

```text
恢复定时（从现在起重新计算下一次，不补跑暂停期间错过的）

Usage:
  oryn schedule resume [<ref>] [flags]

Flags:
  -h, --help   help for resume
```

## oryn schedule rm

```text
删除定时（连同运行记录）

Usage:
  oryn schedule rm [<ref>] [flags]

Flags:
  -h, --help   help for rm
```

## oryn schedule run

```text
立即运行一次（不改下一次时间；上一次未结束时回 schedule_busy）

Usage:
  oryn schedule run <ref> [flags]

Flags:
  -h, --help   help for run
      --json   以 JSON 输出运行
```

## oryn schedule runs

```text
最近的运行（新的在前）

Usage:
  oryn schedule runs <ref> [flags]

Flags:
  -h, --help    help for runs
      --json    以 JSON 输出
  -n, --n int   条数（≤100） (default 20)
```

## oryn schedule set

```text
设置线程内定时（每线程一个；到点提示词作为新消息出现在该线程）；orb 内省略 <thread>，作用于当前线程

Usage:
  oryn schedule set <thread> [flags]

Flags:
      --at string             一次性：RFC3339 时刻，或相对现在的 +时长（如 +15m）
      --cron string           cron 表达式（5 段，或 @hourly / @daily / @weekly / @monthly / @yearly）
      --disabled              保存为暂停
      --every string          固定间隔（Go 时长，≥1m，如 30m、2h）
      --gate-command string   运行前闸门：每次运行前执行的命令（本机沙箱的工作目录是数据目录 gates/）；最后一行输出 {"wakeAgent": false} 时跳过本次运行
      --gate-host string      运行前闸门在哪台 SSH 主机上执行（设置 → SSH 主机）；省略 = 控制面本机沙箱，update 时空串 = 改回本机
      --gate-timeout int      运行前闸门的执行上限（秒，1–600） (default 60)
  -h, --help                  help for set
      --json                  以 JSON 输出定时
      --name string           名称
      --no-gate               去掉运行前闸门（update）
      --prompt string         到点要做的事（提示词；支持 {{now}} {{date}} {{scheduled_at}} {{run_number}} {{last_run_at}}）
      --prompt-file string    从文件读取提示词（- = stdin）
      --tz string             IANA 时区（缺省取环境变量 TZ，再缺省 UTC）
      --until string          截止时刻（RFC3339）
```

## oryn schedule show

```text
显示定时（<ref> 为 sch_… 或线程 id；orb 内省略，显示当前线程的定时）

Usage:
  oryn schedule show <ref> [flags]

Flags:
  -h, --help   help for show
      --json   以 JSON 输出
```

## oryn schedule update

```text
修改定时（只改给出的参数；<ref> 为 sch_… 或线程 id）

Usage:
  oryn schedule update <ref> [flags]

Flags:
      --at string             一次性：RFC3339 时刻，或相对现在的 +时长（如 +15m）
      --cron string           cron 表达式（5 段，或 @hourly / @daily / @weekly / @monthly / @yearly）
      --disabled              保存为暂停
      --every string          固定间隔（Go 时长，≥1m，如 30m、2h）
      --gate-command string   运行前闸门：每次运行前执行的命令（本机沙箱的工作目录是数据目录 gates/）；最后一行输出 {"wakeAgent": false} 时跳过本次运行
      --gate-host string      运行前闸门在哪台 SSH 主机上执行（设置 → SSH 主机）；省略 = 控制面本机沙箱，update 时空串 = 改回本机
      --gate-timeout int      运行前闸门的执行上限（秒，1–600） (default 60)
  -h, --help                  help for update
      --json                  以 JSON 输出定时
      --keep int              只保留最近 N 个未归档的运行线程（1–50），更早且已静止的自动归档 (default 5)
      --manual                没有时间触发：只由 oryn schedule run 或入站 Webhook（oryn schedule webhook）触发（与 --cron / --every / --at 互斥，不能带 --until）
      --model string          模型（provider/id；与 --role 互斥）
      --name string           名称
      --no-gate               去掉运行前闸门（update）
      --overlap string        上一次运行未结束时：skip（缺省）跳过 / allow 照常新建（至多 3 个并存）
      --prompt string         到点要做的事（提示词；支持 {{now}} {{date}} {{scheduled_at}} {{run_number}} {{last_run_at}}）
      --prompt-file string    从文件读取提示词（- = stdin）
      --provider string       orb provider 名称
      --role string           新线程开场的 omp 模型 role（与 --model 互斥；update 时空串 = 不指定）
      --space string          新线程加入的 Space（名称或 id；update 时 none = 不加入）
      --thinking string       思考级别
      --type string           orb 类型
      --tz string             IANA 时区（缺省取环境变量 TZ，再缺省 UTC）
      --until string          截止时刻（RFC3339）
```

## oryn schedule webhook

```text
开启或修改定时的入站 Webhook（仅每次新建线程的定时；<ref> 为 sch_…）。

还没有 Webhook 时新建并生成调用地址；--rotate 换一个新地址（旧地址立即失效）。新生成的地址单独一行打印到 stdout，
只显示这一次，之后无法取回，丢失只能用 --rotate 换新；没有生成新地址时打印 Webhook 状态。

对该地址 POST 任意 UTF-8 文本（≤64 KiB）即触发一次运行（trigger = webhook，服务端回 202）：请求体连同 User-Agent、
名称含 Event / Delivery 的请求头与查询参数作为不可信内容附在提示词之后交给新线程。上一次运行未结束时按 --overlap
处理（跳过的也记一条运行）；运行前闸门同样生效（闸门拿不到请求体）。没有时间触发的定时见 add / update --manual。

签名：--secret / --secret-stdin 设置签名密钥后，调用须带 X-Oryn-Signature-256 或 X-Hub-Signature-256:
sha256=<HMAC-SHA256(密钥, 原始请求体) 的十六进制>（与 GitHub Webhook 相同）；--clear-secret 去掉签名；
都不给时保留原值。--secret-stdin 从标准输入读密钥，避免出现在 shell 历史里。

Webhook 运行建出的线程一律是全自动线程且标记为不可信：GitHub 只用 Agent 账号（不可用时运行失败，
error = github_agent_required，不回退到主人账号），SSH 只能用允许全自动线程的主机；开着「交给助手」时结果只投给
受限的主线一轮。项目级密钥与环境变量照常注入。签名只管谁能触发，不替代这些限制。按时 / 手动触发的运行不受影响。

Usage:
  oryn schedule webhook <ref> [--rotate] [--secret <值> | --secret-stdin | --clear-secret] [flags]
  oryn schedule webhook [command]

Available Commands:
  rm          关闭定时的入站 Webhook（地址立即失效；幂等）

Flags:
      --clear-secret    去掉签名密钥（不再要求签名）
  -h, --help            help for webhook
      --json            以 JSON 输出结果（含仅此一次的 url）
      --rotate          换一个新的调用地址（旧地址立即失效）
      --secret string   签名密钥（≤256 字符；会留在 shell 历史里，建议用 --secret-stdin）
      --secret-stdin    从标准输入读取签名密钥

Use "oryn schedule webhook [command] --help" for more information about a command.
```

## oryn schedule webhook rm

```text
关闭定时的入站 Webhook（地址立即失效；幂等）

Usage:
  oryn schedule webhook rm <ref> [flags]

Flags:
  -h, --help   help for rm
```
