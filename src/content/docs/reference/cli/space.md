---
title: "oryn space"
description: "Space（目标 + 协调聊天 + 关联项目）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn space

```text
Space（目标 + 协调聊天 + 关联项目）

Usage:
  oryn space [command]

Available Commands:
  create      新建 Space（同时建出它的协调聊天线程），打印 Space id
  ls          列出 Space（--archived 含已归档）
  rm          删除 Space（连同它的协调聊天；Space 里的线程保留，只是不再属于它）
  show        显示 Space

Flags:
  -h, --help   help for space

Use "oryn space [command] --help" for more information about a command.
```

## oryn space create

```text
新建 Space（同时建出它的协调聊天线程），打印 Space id

Usage:
  oryn space create <name> [flags]

Flags:
      --goal string      目标（一句话）
  -h, --help             help for create
      --json             以 JSON 输出
      --project string   新线程的默认项目（名称或 id）
```

## oryn space ls

```text
列出 Space（--archived 含已归档）

Usage:
  oryn space ls [flags]

Flags:
      --archived   含已归档的 Space
  -h, --help       help for ls
      --json       以 JSON 输出
```

## oryn space rm

```text
删除 Space（连同它的协调聊天；Space 里的线程保留，只是不再属于它）

Usage:
  oryn space rm <名称|id> [flags]

Flags:
  -h, --help   help for rm
```

## oryn space show

```text
显示 Space

Usage:
  oryn space show <名称|id> [flags]

Flags:
  -h, --help   help for show
      --json   以 JSON 输出
```
