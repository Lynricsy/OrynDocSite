---
title: "oryn provider"
description: "orb provider 管理"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

| 子命令 | 运行位置 |
|---|---|
| `create`、`ls`、`rm` | 你的电脑：用 `oryn login` 的凭据调用控制面 API |
| `run` | Provider 主机：读取 `--config` 指定的 Provider 配置（缺省 `/etc/oryn/provider.yaml`）与其中 `token_file` 的令牌（必须以 `opv_` 开头），先运行驱动的启动前检查，再向控制面拉取任务 |
| `preflight` | Provider 主机：只读取配置并运行驱动的启动前检查，不连接控制面、不读令牌 |

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn provider preflight` | 0 全部检查通过（或驱动没有启动前检查）；1 有检查项失败或配置出错 |
| `oryn provider run` | 收到 SIGTERM 或 SIGINT 后退出，退出码 0；1 配置、令牌或启动前检查出错 |
| 其它子命令 | 0 成功；1 错误 |

### 相关指南

- [接入 Docker Provider](/admin/install/docker-provider/)
- [Firecracker Provider](/admin/backends/firecracker/)
- [用脚本接入其它后端（dispatch）](/admin/backends/dispatch/)
- [`provider.yaml` 配置参考](/reference/config/provider-yaml/)
- [故障排查](/admin/operations/troubleshooting/)

## oryn provider

```text
orb provider 管理

Usage:
  oryn provider [command]

Available Commands:
  create      新建 provider，stdout 只打印令牌（只显示这一次）
  ls          列出 provider 与在线状态
  preflight   只运行 provider 驱动的启动前检查并逐项打印结果
  rm          删除 provider（其令牌随即失效）
  run         运行 orb provider（向控制面拉取任务并在本机执行）

Flags:
  -h, --help   help for provider

Use "oryn provider [command] --help" for more information about a command.
```

## oryn provider create

```text
新建 provider，stdout 只打印令牌（只显示这一次）

Usage:
  oryn provider create <name> [flags]

Flags:
  -h, --help   help for create
```

## oryn provider ls

```text
列出 provider 与在线状态

Usage:
  oryn provider ls [flags]

Flags:
  -h, --help   help for ls
      --json   输出 JSON
```

## oryn provider preflight

```text
只运行 provider 驱动的启动前检查并逐项打印结果

Usage:
  oryn provider preflight [flags]

Flags:
      --config string   provider 配置文件 (default "/etc/oryn/provider.yaml")
  -h, --help            help for preflight
```

## oryn provider rm

```text
删除 provider（其令牌随即失效）

Usage:
  oryn provider rm <名称|id> [flags]

Flags:
  -h, --help   help for rm
```

## oryn provider run

```text
运行 orb provider（向控制面拉取任务并在本机执行）

Usage:
  oryn provider run [flags]

Flags:
      --allow-multiple   允许与同一 provider 的其它实例并存
      --config string    provider 配置文件 (default "/etc/oryn/provider.yaml")
      --debug            输出调试日志
  -h, --help             help for run
```
