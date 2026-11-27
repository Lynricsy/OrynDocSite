---
title: "oryn project"
description: "项目管理"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn project

```text
项目管理

Usage:
  oryn project [command]

Available Commands:
  create      新建项目（--setup / --resume 可用 @文件 读取脚本）
  ls          列出项目
  snapshots   项目快照（ls / rm）
  update      修改项目（目前支持 git 提交身份覆盖）

Flags:
  -h, --help   help for project

Use "oryn project [command] --help" for more information about a command.
```

## oryn project create

```text
新建项目（--setup / --resume 可用 @文件 读取脚本）

Usage:
  oryn project create <name> [flags]

Flags:
      --branch string      基线分支
      --color string       颜色
      --git-email string   本项目 orb 的 git user.email
      --git-name string    本项目 orb 的 git user.name（须与 --git-email 同用）
  -h, --help               help for create
      --hosted             新建 Oryn 托管的空白仓库（带初始提交）
      --json               输出 JSON
      --provider string    默认 provider 名称
      --push               把当前目录的 git 仓库建成托管项目并推上去（基线 = 当前分支）
      --remote string      --push 时加的远端名（缺省 origin）
      --repo string        仓库 URL
      --resume string      resume 脚本内容，或 @文件
      --setup string       setup 脚本内容，或 @文件
      --shallow            浅克隆（--depth 1）
      --type string        默认 orb 类型
```

## oryn project ls

```text
列出项目

Usage:
  oryn project ls [flags]

Flags:
      --archived   只列出已归档项目
  -h, --help       help for ls
      --json       输出 JSON
```

## oryn project snapshots

```text
项目快照（ls / rm）

Usage:
  oryn project snapshots [command]

Available Commands:
  ls          列出项目快照（含 building / ready / retired）
  rm          清除项目快照（把 ready 快照退役，镜像由控制面异步回收）

Flags:
  -h, --help   help for snapshots

Use "oryn project snapshots [command] --help" for more information about a command.
```

## oryn project update

```text
修改项目（目前支持 git 提交身份覆盖）

Usage:
  oryn project update <name|id> [flags]

Flags:
      --clear-git          清除本项目的 git 身份覆盖（回落到全局默认）
      --git-email string   本项目 orb 的 git user.email
      --git-name string    本项目 orb 的 git user.name（须与 --git-email 同用）
  -h, --help               help for update
      --json               输出 JSON
```

## oryn project snapshots ls

```text
列出项目快照（含 building / ready / retired）

Usage:
  oryn project snapshots ls <name|id> [flags]

Flags:
  -h, --help   help for ls
      --json   输出 JSON
```

## oryn project snapshots rm

```text
清除项目快照（把 ready 快照退役，镜像由控制面异步回收）

Usage:
  oryn project snapshots rm <name|id> [flags]

Flags:
  -h, --help          help for rm
      --type string   只清除该 orb 类型的快照（缺省 = 全部类型）
```
