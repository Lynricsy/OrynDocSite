---
title: "oryn github"
description: "GitHub 集成：分诊、重放投递、状态、清理、审计"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn github

```text
GitHub 集成：分诊、重放投递、状态、清理、审计

Usage:
  oryn github [command]

Available Commands:
  audit       查询 GitHub 写操作审计（按时间倒序，保留 30 天）
  cleanup     把 issue 线程置为 abandoned 并冻结其 orb（不改动远端）
  replay      重放 7 天内已结束的 webhook 投递
  status      显示 issue 线程、发布哨兵与仓库 hook 的状态
  triage      拉取线上 issue，合成 issues.opened 交给触发规则，打印线程 id

Flags:
  -h, --help   help for github

Use "oryn github [command] --help" for more information about a command.
```

## oryn github audit

```text
查询 GitHub 写操作审计（按时间倒序，保留 30 天）

Usage:
  oryn github audit [flags]

Flags:
      --before int      只返回 id 小于该值的记录（分页游标）
  -h, --help            help for audit
      --json            输出原始 JSON
      --limit int       最多返回条数（1–200） (default 50)
      --repo string     只看该仓库（owner/repo）
      --thread string   只看该线程（T-…）
```

## oryn github cleanup

```text
把 issue 线程置为 abandoned 并冻结其 orb（不改动远端）

Usage:
  oryn github cleanup <owner>/<repo>#<n> [flags]

Flags:
  -h, --help   help for cleanup
      --json   输出原始 JSON
```

## oryn github replay

```text
重放 7 天内已结束的 webhook 投递

Usage:
  oryn github replay <delivery-guid> [flags]

Flags:
  -h, --help   help for replay
      --json   输出 JSON
```

## oryn github status

```text
显示 issue 线程、发布哨兵与仓库 hook 的状态

Usage:
  oryn github status [flags]

Flags:
  -h, --help   help for status
      --json   输出原始 JSON（{tasks, hooks}）
```

## oryn github triage

```text
拉取线上 issue，合成 issues.opened 交给触发规则，打印线程 id

Usage:
  oryn github triage <owner>/<repo>#<n> [flags]

Flags:
  -h, --help          help for triage
      --json          输出原始 JSON
      --rule string   指定触发规则 id（ght_…）；缺省由服务端按规则匹配
```
