---
title: "oryn follow"
description: "全局助手的跟进话题（orb 内）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn follow

```text
全局助手的跟进话题（orb 内）

Usage:
  oryn follow [command]

Available Commands:
  add         登记一个由全局助手定期查公开信息的跟进话题

Flags:
  -h, --help   help for follow

Use "oryn follow [command] --help" for more information about a command.
```

## oryn follow add

```text
登记一个由全局助手定期查公开信息的跟进话题

Usage:
  oryn follow add [flags]

Flags:
  -h, --help              help for add
      --json              以 JSON 输出结果
      --kind string       question（问题跟进，缺省）或 interest（长期关注）
      --question string   要查的公开信息
      --quote string      主人在本线程里让你跟进的原话
      --title string      一句话标题
```
