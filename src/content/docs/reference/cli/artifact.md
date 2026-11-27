---
title: "oryn artifact"
description: "Artifacts（orb 内）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

只在执行环境（orb）内可用：经 orbd 控制口，以当前线程（环境变量 `ORYN_THREAD_ID`）的名义执行。在其它位置调用报调用错误。Runner 上的线程不设置 `ORYN_ORB`，也不可用。

### 退出码

0 成功；1 错误；2 调用错误（不在环境内、缺少操作名或 artifact id、`pull` 的目标文件已存在且未给覆盖参数等）。

### 相关指南

- [Artifacts 概览](/guide/artifacts/overview/)

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
