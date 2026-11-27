---
title: "oryn design"
description: "设计画布（orb 内）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn design

```text
设计画布（orb 内）

Usage:
  oryn design [command]

Available Commands:
  eject       把设计画布导出为可部署到 box 的独立工程

Flags:
  -h, --help   help for design

Use "oryn design [command] --help" for more information about a command.
```

## oryn design eject

```text
把设计画布导出为可部署到 box 的独立工程

Usage:
  oryn design eject <artifact-id> [flags]

Flags:
  -h, --help          help for eject
      --json          以 JSON 输出结果
      --to string     导出目标目录（空目录或尚不存在）
      --version int   导出指定版本（默认最新）
```
