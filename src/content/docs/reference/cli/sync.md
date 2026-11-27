---
title: "oryn sync"
description: "持续镜像：本地 HEAD 游离在 orb 的提交上，工作区 = orb 的工作区；Ctrl-C / SIGTERM 后还原到原分支原提交。"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

在你的电脑上、要接收镜像的 git 检出目录里运行，用 `oryn login` 的凭据调用控制面 API。线程必须有执行环境（orb），否则报「线程没有 orb」。Runner 上的线程不支持 `oryn sync`。

### 退出码

见下方 `oryn sync` 的说明（0 至 3）。

### 相关指南

- [命令行 oryn](/guide/clients/cli/)

## oryn sync

```text
持续镜像：本地 HEAD 游离在 orb 的提交上，工作区 = orb 的工作区；Ctrl-C / SIGTERM 后还原到原分支原提交。
每次覆盖本地文件前都会复核：本地文件被改动（含下载期间）时停止且不覆盖；退出时有本地改动则不还原（退出码 3），
保存好需要的改动后用 `oryn sync --restore --discard` 丢弃改动并还原。
本地被忽略的文件（如 .env）与 orb 的文件路径冲突时拒绝（退出码 3），不会覆盖。
--apply：一次性挂到与 orb 同名的分支（能快进时）并带上未提交改动。
退出码：0 成功；1 运行或接口错误；2 前置条件不满足（不在仓库、检出不干净、有未还原的状态）；3 本地改动或被忽略文件冲突。

Usage:
  oryn sync <thread> [flags]

Flags:
      --apply               一次性应用后退出（不写状态、不还原）
      --detach              --apply 时总是游离检出
      --discard             与 --restore 一起：丢弃镜像期间的本地改动后还原
      --force               本地与 orb 没有共同提交时仍同步（传输完整历史）
  -h, --help                help for sync
      --interval duration   镜像模式的轮询间隔 (default 3s)
      --restore             按状态文件还原上一次中断的镜像（有本地改动时拒绝）
      --root string         orb 内仓库路径（缺省 = orb 当前工作目录）
```
