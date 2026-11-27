---
title: "oryn artifact"
description: "Artifacts（orb 内）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn artifact

```text
Artifacts（orb 内）

Usage:
  oryn artifact [command]

Available Commands:
  call        执行一个 artifact 操作（create_artifact、read_artifact、update_artifact 等）
  pull        把 artifact 的一个文件（缺省入口文件）取回到本机

Flags:
  -h, --help   help for artifact

Use "oryn artifact [command] --help" for more information about a command.
```

## oryn artifact call

```text
执行一个 artifact 操作（create_artifact、read_artifact、update_artifact 等）

Usage:
  oryn artifact call <op> [flags]

Flags:
  -h, --help                 help for call
      --json                 以 JSON 输出整个结果
      --params string        操作参数（JSON 对象）
      --params-file string   从文件读取操作参数（JSON 对象）
```

## oryn artifact pull

```text
把 artifact 的一个文件（缺省入口文件）取回到本机

Usage:
  oryn artifact pull <artifact-id> [flags]

Flags:
  -h, --help          help for pull
      --json          以 JSON 输出结果
      --overwrite     保存路径已存在时覆盖
      --path string   取哪个文件（缺省入口文件）
      --to string     保存到的本机路径（必填）
      --version int   取哪个版本（缺省最新）
```
