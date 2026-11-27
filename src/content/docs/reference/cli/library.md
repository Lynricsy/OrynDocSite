---
title: "oryn library"
description: "全局助手文件库（orb 内）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn library

```text
全局助手文件库（orb 内）

Usage:
  oryn library [command]

Available Commands:
  put         把 orb 里的文件存进全局助手文件库（库内共享）

Flags:
  -h, --help   help for library

Use "oryn library [command] --help" for more information about a command.
```

## oryn library put

```text
把 orb 里的文件存进全局助手文件库（库内共享）

Usage:
  oryn library put <文件> [flags]

Flags:
  -h, --help          help for put
      --json          以 JSON 输出文件记录
      --name string   库内文件名（缺省取文件名）
```
