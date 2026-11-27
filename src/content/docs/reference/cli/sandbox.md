---
title: "oryn sandbox"
description: "Agent 沙箱：零凭据、用完即焚的隔离环境"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn sandbox

```text
Agent 沙箱：零凭据、用完即焚的隔离环境

Usage:
  oryn sandbox [command]

Aliases:
  sandbox, sandboxes, sbx

Available Commands:
  cp          在本机与沙箱之间复制文件或目录（恰有一侧形如 <id>:<路径>；dst 是完整目标路径）
  exec        在沙箱里运行命令（输出实时转发，退出码透传；--detach 起后台作业）
  extend      把沙箱的绝对期限设为从现在起 --ttl（不超过最长寿命）
  jobs        沙箱里的后台作业
  ls          列出沙箱（orb 内：本机的；orb 外：全部在用的，或 --thread 线程名下的）
  net         切换沙箱的网络（创建时为 none 的不能开网）
  rm          销毁沙箱
  up          开一台沙箱（就绪后打印 id）

Flags:
  -h, --help   help for sandbox

Use "oryn sandbox [command] --help" for more information about a command.
```

## oryn sandbox cp

```text
在本机与沙箱之间复制文件或目录（恰有一侧形如 <id>:<路径>；dst 是完整目标路径）

Usage:
  oryn sandbox cp [--exclude P]... [--gitignore] <src> <dst> [flags]

Flags:
      --exclude stringArray   排除的 glob（带 / 匹配相对路径，否则匹配任意层的文件名；可重复）
      --gitignore             只复制 git 会跟踪的文件（源是 git 工作树里的目录）
  -h, --help                  help for cp
```

## oryn sandbox exec

```text
在沙箱里运行命令（输出实时转发，退出码透传；--detach 起后台作业）

Usage:
  oryn sandbox exec <id> [--cwd D] [--env K=V]... [--timeout 600] [--detach] -- <命令…> [flags]

Flags:
      --cwd string        沙箱里的工作目录（缺省 ~）
      --detach            作为后台作业启动并打印作业 id
      --env stringArray   额外的环境变量 K=V（可重复）
  -h, --help              help for exec
      --timeout int       超时秒数（同步 1–1800；--detach 时 0 = 不限） (default 600)
```

## oryn sandbox extend

```text
把沙箱的绝对期限设为从现在起 --ttl（不超过最长寿命）

Usage:
  oryn sandbox extend <id> --ttl 1h [flags]

Flags:
  -h, --help           help for extend
      --ttl duration   从现在起多久后销毁（必填）
```

## oryn sandbox jobs

```text
沙箱里的后台作业

Usage:
  oryn sandbox jobs <id> [ls | logs <job> | kill <job>] [flags]

Flags:
  -h, --help         help for jobs
      --offset int   logs：从这个字节偏移开始读（省略 = 末尾 256 KiB） (default -1)
```

## oryn sandbox ls

```text
列出沙箱（orb 内：本机的；orb 外：全部在用的，或 --thread 线程名下的）

Usage:
  oryn sandbox ls [--json] [--thread <id>] [flags]

Flags:
  -h, --help            help for ls
      --json            以 JSON 输出
      --thread string   只列这个线程名下的（orb 外）
```

## oryn sandbox net

```text
切换沙箱的网络（创建时为 none 的不能开网）

Usage:
  oryn sandbox net <id> none|egress [flags]

Flags:
  -h, --help   help for net
```

## oryn sandbox rm

```text
销毁沙箱

Usage:
  oryn sandbox rm <id> [flags]

Flags:
  -h, --help   help for rm
```

## oryn sandbox up

```text
开一台沙箱（就绪后打印 id）

Usage:
  oryn sandbox up --network none|egress [--backend docker|kvm] [--type T] [--idle 30m] [--ttl 2h] [flags]

Flags:
      --backend string   docker 或 kvm（省略由 Oryn 选择）
  -h, --help             help for up
      --idle duration    空闲多久后销毁（5m–4h，缺省 30m）
      --json             以 JSON 输出整个沙箱
      --network string   none = 完全没有网卡；egress = 可访问公网（必填）
      --ttl duration     绝对期限：多久后销毁（哪怕命令在跑）
      --type string      provider 的 orb 类型名（省略取默认）
```
