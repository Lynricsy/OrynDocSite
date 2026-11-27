---
title: "oryn secrets"
description: "密钥库（值只写不读）与项目级环境变量"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn secrets

```text
密钥库（值只写不读）与项目级环境变量

Usage:
  oryn secrets [command]

Available Commands:
  ls          列出密钥名称与元数据（--project 列该项目的条目）
  rm          删除密钥（--project 删该项目的条目）
  set         写入密钥；省略 value 时从标准输入读取

Flags:
  -h, --help   help for secrets

Use "oryn secrets [command] --help" for more information about a command.
```

## oryn secrets ls

```text
列出密钥名称与元数据（--project 列该项目的条目）

Usage:
  oryn secrets ls [flags]

Flags:
  -h, --help             help for ls
      --json             输出 JSON
      --project string   列出该项目（名称或 id）的条目
```

## oryn secrets rm

```text
删除密钥（--project 删该项目的条目）

Usage:
  oryn secrets rm <name> [flags]

Flags:
  -h, --help             help for rm
      --project string   删除该项目（名称或 id）的条目
```

## oryn secrets set

```text
mode=proxy（默认）：值留在控制面，由 egress 代理注入请求；git 主机令牌命名为 git/<host>/token。
mode=env：以同名环境变量注入 agent 进程，名称须匹配 [A-Z_][A-Z0-9_]*。

--project <名称或 id>：写成该项目的条目，只注入本项目的 orb，与全局同名时以项目为准。
项目级条目只能是环境变量（env）或 Git 令牌 git/<host>/token（proxy，总是保密）；
不给 --mode 时按名称推断（git/ 开头为 proxy，否则 env）。模型供应商密钥只能全局设置。
--plain：只与 --project 同用，存为普通环境变量（值之后可用 ls --project 读回）。

Usage:
  oryn secrets set <name> [value] [flags]

Flags:
  -h, --help             help for set
      --hosts strings    proxy 模式下允许注入的上游主机，逗号分隔（仅全局）
      --mode string      proxy | env（--project 时缺省按名称推断） (default "proxy")
      --plain            不保密：存为普通环境变量，值可读（需 --project）
      --project string   写成该项目（名称或 id）的条目
```
