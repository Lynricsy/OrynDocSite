---
title: "oryn runner"
description: "runner 管理（自己的机器以 orbd run --runner 接入）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn runner

```text
runner 管理（自己的机器以 orbd run --runner 接入）

Usage:
  oryn runner [command]

Available Commands:
  create      新建 runner，stdout 只打印令牌（只显示这一次），启动命令写到 stderr
  ls          列出 runner、在线状态、主机与目录
  rm          删除 runner（令牌随即失效；线程保留转录）

Flags:
  -h, --help   help for runner

Use "oryn runner [command] --help" for more information about a command.
```

## oryn runner create

```text
新建 runner，stdout 只打印令牌（只显示这一次），启动命令写到 stderr

Usage:
  oryn runner create <name> [flags]

Flags:
  -h, --help   help for create
```

## oryn runner ls

```text
列出 runner、在线状态、主机与目录

Usage:
  oryn runner ls [flags]

Flags:
  -h, --help   help for ls
      --json   输出 JSON
```

## oryn runner rm

```text
删除 runner（令牌随即失效；线程保留转录）

Usage:
  oryn runner rm <名称|id> [flags]

Flags:
  -h, --help   help for rm
```
