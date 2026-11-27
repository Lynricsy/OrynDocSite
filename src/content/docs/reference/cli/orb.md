---
title: "oryn orb"
description: "管理 orb（列表、详情、冻结 / 停机、唤醒、删除、资源采样）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn orb

```text
管理 orb（列表、详情、冻结 / 停机、唤醒、删除、资源采样）

Usage:
  oryn orb [command]

Available Commands:
  desktop     orb 内：查看桌面状态、启停桌面上的浏览器
  ls          列出 orb
  metrics     显示 orb 资源采样
  pause       冻结（--mode freeze，默认）或停机（--mode stop）
  resume      唤醒 orb
  rm          删除 orb（其线程保留条目）
  service     orb 内：启动 / 停止 / 查看受管服务（.oryn/services.yaml 与临时服务）
  setup       orb 内：重跑与查看环境 setup / resume、读写项目脚本
  show        显示 orb 详情（JSON）

Flags:
  -h, --help   help for orb

Use "oryn orb [command] --help" for more information about a command.
```

## oryn orb desktop

```text
orb 内：查看桌面状态、启停桌面上的浏览器

Usage:
  oryn orb desktop [command]

Available Commands:
  browser     启停桌面上的浏览器
  status      显示桌面状态（显示、浏览器、CDP 地址、Profile）

Flags:
  -h, --help   help for desktop

Use "oryn orb desktop [command] --help" for more information about a command.
```

## oryn orb ls

```text
列出 orb

Usage:
  oryn orb ls [flags]

Flags:
      --all            包含已删除的 orb
  -h, --help           help for ls
      --json           输出 JSON
      --state string   只列出该状态
```

## oryn orb metrics

```text
显示 orb 资源采样

Usage:
  oryn orb metrics <orb-id> [flags]

Flags:
  -h, --help             help for metrics
      --json             输出 JSON
      --since duration   起始时间（距今） (default 1h0m0s)
      --step int         降采样步长（秒）；0 = 原始采样
```

## oryn orb pause

```text
冻结（--mode freeze，默认）或停机（--mode stop）

Usage:
  oryn orb pause <orb-id> [flags]

Flags:
  -h, --help          help for pause
      --mode string   freeze 或 stop (default "freeze")
```

## oryn orb resume

```text
唤醒 orb

Usage:
  oryn orb resume <orb-id> [flags]

Flags:
  -h, --help   help for resume
```

## oryn orb rm

```text
删除 orb（其线程保留条目）

Usage:
  oryn orb rm <orb-id> [flags]

Flags:
  -h, --help   help for rm
```

## oryn orb service

```text
orb 内：启动 / 停止 / 查看受管服务（.oryn/services.yaml 与临时服务）

Usage:
  oryn orb service [command]

Available Commands:
  logs        显示服务日志末尾（-f：持续输出新内容）
  ls          列出受管服务
  restart     重读 services.yaml 后重启服务
  start       无 name：按 services.yaml 确保全部服务运行；--command：建立 / 替换临时服务；否则启动已声明的服务
  stop        停止服务（--remove：同时删除临时服务的定义）

Flags:
  -h, --help   help for service

Use "oryn orb service [command] --help" for more information about a command.
```

## oryn orb setup

```text
orb 内：重跑与查看环境 setup / resume、读写项目脚本

Usage:
  oryn orb setup [command]

Available Commands:
  logs           显示 setup 日志末尾（--resume：resume 日志）
  project-script 读写本 orb 所属项目的 setup / resume 项目脚本
  run            重跑 setup（--resume：重跑 resume）并实时输出；退出码 0 成功 / 1 失败 / 2 调用错误
  status         显示最近一次 setup / resume 的结果

Flags:
  -h, --help   help for setup

Use "oryn orb setup [command] --help" for more information about a command.
```

## oryn orb show

```text
显示 orb 详情（JSON）

Usage:
  oryn orb show <orb-id> [flags]

Flags:
  -h, --help   help for show
```

## oryn orb desktop browser

```text
启停桌面上的浏览器

Usage:
  oryn orb desktop browser [command]

Available Commands:
  start       启动浏览器并等到 DevTools 就绪（至多 30 秒）
  stop        关闭浏览器

Flags:
  -h, --help   help for browser

Use "oryn orb desktop browser [command] --help" for more information about a command.
```

## oryn orb desktop status

```text
显示桌面状态（显示、浏览器、CDP 地址、Profile）

Usage:
  oryn orb desktop status [flags]

Flags:
  -h, --help   help for status
      --json   输出 JSON
```

## oryn orb service logs

```text
显示服务日志末尾（-f：持续输出新内容）

Usage:
  oryn orb service logs <name> [flags]

Flags:
  -f, --follow      持续输出新内容直到中断
  -h, --help        help for logs
  -n, --lines int   显示末尾 N 行（0 = 全部） (default 200)
```

## oryn orb service ls

```text
列出受管服务

Usage:
  oryn orb service ls [flags]

Flags:
  -h, --help   help for ls
      --json   输出 JSON
```

## oryn orb service restart

```text
重读 services.yaml 后重启服务

Usage:
  oryn orb service restart <name> [flags]

Flags:
  -h, --help   help for restart
```

## oryn orb service start

```text
无 name：按 services.yaml 确保全部服务运行；--command：建立 / 替换临时服务；否则启动已声明的服务

Usage:
  oryn orb service start [name] [flags]

Flags:
      --command string    临时服务的命令（以 bash -lc 运行，须监听 $PORT）
      --cwd string        相对工作区根的工作目录
      --env stringArray   环境变量 KEY=VALUE（可重复）
      --health string     就绪探测的 HTTP 路径（如 /healthz）
  -h, --help              help for start
      --port int          固定端口（省略则自动分配，跨重启不变）
      --portal            为该服务开 portal（打印可从浏览器访问的地址）
```

## oryn orb service stop

```text
停止服务（--remove：同时删除临时服务的定义）

Usage:
  oryn orb service stop <name> [flags]

Flags:
  -h, --help     help for stop
      --remove   同时删除临时服务的定义与端口分配
```

## oryn orb setup logs

```text
显示 setup 日志末尾（--resume：resume 日志）

Usage:
  oryn orb setup logs [flags]

Flags:
  -h, --help        help for logs
  -n, --lines int   显示末尾 N 行（0 = 全部） (default 200)
      --resume      查看 resume 日志
```

## oryn orb setup project-script

```text
读写本 orb 所属项目的 setup / resume 项目脚本

Usage:
  oryn orb setup project-script [command]

Available Commands:
  get         打印项目脚本（给出阶段时只打印该脚本的原文）
  set         从文件（- 为标准输入）设置项目脚本；空内容表示清除

Flags:
  -h, --help   help for project-script

Use "oryn orb setup project-script [command] --help" for more information about a command.
```

## oryn orb setup run

```text
重跑 setup（--resume：重跑 resume）并实时输出；退出码 0 成功 / 1 失败 / 2 调用错误

Usage:
  oryn orb setup run [flags]

Flags:
  -h, --help     help for run
      --resume   重跑 resume 而不是 setup
```

## oryn orb setup status

```text
显示最近一次 setup / resume 的结果

Usage:
  oryn orb setup status [flags]

Flags:
  -h, --help   help for status
      --json   输出 JSON
```

## oryn orb desktop browser start

```text
启动浏览器并等到 DevTools 就绪（至多 30 秒）

Usage:
  oryn orb desktop browser start [flags]

Flags:
  -h, --help   help for start
```

## oryn orb desktop browser stop

```text
关闭浏览器

Usage:
  oryn orb desktop browser stop [flags]

Flags:
  -h, --help   help for stop
```

## oryn orb setup project-script get

```text
打印项目脚本（给出阶段时只打印该脚本的原文）

Usage:
  oryn orb setup project-script get [setup|resume] [flags]

Flags:
  -h, --help   help for get
```

## oryn orb setup project-script set

```text
从文件（- 为标准输入）设置项目脚本；空内容表示清除

Usage:
  oryn orb setup project-script set setup|resume --file <path>|- [flags]

Flags:
      --file string   脚本文件路径，- 表示标准输入
  -h, --help          help for set
```
