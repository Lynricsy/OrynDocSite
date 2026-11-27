---
title: "oryn git-identity"
description: "orb 内 git 提交身份的全局默认值（项目可单独覆盖）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn git-identity

```text
orb 内 git 提交身份的全局默认值（项目可单独覆盖）

Usage:
  oryn git-identity [command]

Available Commands:
  clear       清除全局默认身份（已有 orb 的 git 配置保持不变）
  get         查看全局默认身份
  set         设置全局默认身份（下次 setup / 唤醒时写入 orb）

Flags:
  -h, --help   help for git-identity

Use "oryn git-identity [command] --help" for more information about a command.
```

## oryn git-identity clear

```text
清除全局默认身份（已有 orb 的 git 配置保持不变）

Usage:
  oryn git-identity clear [flags]

Flags:
  -h, --help   help for clear
```

## oryn git-identity get

```text
查看全局默认身份

Usage:
  oryn git-identity get [flags]

Flags:
  -h, --help   help for get
      --json   输出 JSON
```

## oryn git-identity set

```text
设置全局默认身份（下次 setup / 唤醒时写入 orb）

Usage:
  oryn git-identity set --name <名字> --email <邮箱> [flags]

Flags:
      --email string   git user.email
  -h, --help           help for set
      --name string    git user.name
```
