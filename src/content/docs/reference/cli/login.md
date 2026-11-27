---
title: "oryn login"
description: "发起设备配对：打印网页批准地址与配对码，在已登录的浏览器里批准后自动取得设备令牌。"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn login

```text
发起设备配对：打印网页批准地址与配对码，在已登录的浏览器里批准后自动取得设备令牌。
令牌写入 ~/.config/oryn/credentials.json（0600）。--token 直接写入已有的 odt_ 令牌。

Usage:
  oryn login [flags]

Flags:
  -h, --help           help for login
      --name string    设备名（默认取主机名）
      --token string   直接使用已有的设备令牌 odt_…
      --url string     控制面地址，如 https://oryn.example.com（必填）
```
