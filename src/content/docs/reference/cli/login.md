---
title: "oryn login"
description: "发起设备配对：打印网页批准地址与配对码，在已登录的浏览器里批准后自动取得设备令牌。"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

在你要使用 `oryn` 的机器上运行。凭据文件的位置与覆盖方式见[命令行总览](/reference/cli/)：设置了 `ORYN_CREDENTIALS` 时写到它指向的文件；凭据文件总以 0600 权限写入。`--token` 给出的令牌会先向控制面校验，通过后才写入。

### 退出码

0 成功；1 错误。

### 相关指南

- [命令行 oryn](/guide/clients/cli/)
- [浏览器：登录、设备与外观](/guide/clients/web/)

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
