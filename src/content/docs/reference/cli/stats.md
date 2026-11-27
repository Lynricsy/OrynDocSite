---
title: "oryn stats"
description: "统计分析：用量、工具、orb、产出、预算（不带子命令时同 `stats usage`）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn stats

```text
统计分析：用量、工具、orb、产出、预算（不带子命令时同 `stats usage`）

Usage:
  oryn stats [flags]
  oryn stats [command]

Available Commands:
  budget      成本预算：查看（缺省）/ set / off
  orbs        orb 运行 / 冻结 / 停机时长与 setup 汇总
  output      线程产出：新建 / 交付 / 归档、提交数、回合与每交付成本
  thread      单个线程自创建以来的用量、工具与所在 orb 的时长
  tools       工具调用次数与错误率
  usage       按模型 / 时间 / 线程 / 项目 / Space / 用途汇总 token、成本与请求

Flags:
      --by string        分组：total | hour | day | week | month | model | thread | project | space | purpose (default "model")
      --csv              以 CSV 输出（服务端 format=csv 的响应）
      --from string      起始本地日期 YYYY-MM-DD（含；与 --since 互斥）
  -h, --help             help for stats
      --json             原样打印服务端 JSON
      --limit int        非时间分组最多列出几组（1–500；缺省 50，其余并入 __other__）
      --model string     只统计该模型（<provider>/<model>）
      --project string   只统计该项目（名称 / id / none）
      --series string    附带时间序列的粒度：hour | day | week | month
      --since string     窗口长度（距今）：Go 时长（如 36h）或 Nd / Nw (default "7d")
      --space string     只统计该 Space（名称 / id / none）
      --thread string    只统计该线程
      --to string        结束本地日期 YYYY-MM-DD（含；缺省到现在）
      --tz string        IANA 时区（缺省取环境变量 TZ，再取 /etc/localtime，都没有则 UTC）

Use "oryn stats [command] --help" for more information about a command.
```

## oryn stats budget

```text
成本预算：查看（缺省）/ set / off

Usage:
  oryn stats budget [flags]
  oryn stats budget [command]

Available Commands:
  off         停用预算告警（保留已设的上限）
  set         设置预算（只改给出的项，并启用）；--daily / --monthly 给 0 表示取消该上限
  show        打印上限、当日 / 当月已花与级别

Flags:
  -h, --help   help for budget
      --json   原样打印服务端 JSON

Use "oryn stats budget [command] --help" for more information about a command.
```

## oryn stats orbs

```text
orb 运行 / 冻结 / 停机时长与 setup 汇总

Usage:
  oryn stats orbs [flags]

Flags:
      --by string        分组：type | day | week | month | project | orb (default "type")
      --csv              以 CSV 输出（服务端 format=csv 的响应）
      --from string      起始本地日期 YYYY-MM-DD（含；与 --since 互斥）
  -h, --help             help for orbs
      --json             原样打印服务端 JSON
      --orb string       只统计该 orb
      --project string   只统计该项目（名称 / id / none）
      --since string     窗口长度（距今）：Go 时长（如 36h）或 Nd / Nw (default "7d")
      --to string        结束本地日期 YYYY-MM-DD（含；缺省到现在）
      --tz string        IANA 时区（缺省取环境变量 TZ，再取 /etc/localtime，都没有则 UTC）
```

## oryn stats output

```text
线程产出：新建 / 交付 / 归档、提交数、回合与每交付成本

Usage:
  oryn stats output [flags]

Flags:
      --by string        分组：day | week | month | project | space (default "day")
      --csv              以 CSV 输出（服务端 format=csv 的响应）
      --from string      起始本地日期 YYYY-MM-DD（含；与 --since 互斥）
  -h, --help             help for output
      --json             原样打印服务端 JSON
      --project string   只统计该项目（名称 / id / none）
      --since string     窗口长度（距今）：Go 时长（如 36h）或 Nd / Nw (default "7d")
      --space string     只统计该 Space（名称 / id / none）
      --to string        结束本地日期 YYYY-MM-DD（含；缺省到现在）
      --tz string        IANA 时区（缺省取环境变量 TZ，再取 /etc/localtime，都没有则 UTC）
```

## oryn stats thread

```text
单个线程自创建以来的用量、工具与所在 orb 的时长

Usage:
  oryn stats thread <id> [flags]

Flags:
  -h, --help        help for thread
      --json        原样打印服务端 JSON
      --tz string   IANA 时区（缺省取环境变量 TZ，再取 /etc/localtime，都没有则 UTC）
```

## oryn stats tools

```text
工具调用次数与错误率

Usage:
  oryn stats tools [flags]

Flags:
      --csv              以 CSV 输出（服务端 format=csv 的响应）
      --from string      起始本地日期 YYYY-MM-DD（含；与 --since 互斥）
  -h, --help             help for tools
      --json             原样打印服务端 JSON
      --limit int        最多列出几个工具（1–500；缺省 50）
      --project string   只统计该项目（名称 / id / none）
      --since string     窗口长度（距今）：Go 时长（如 36h）或 Nd / Nw (default "7d")
      --space string     只统计该 Space（名称 / id / none）
      --thread string    只统计该线程
      --to string        结束本地日期 YYYY-MM-DD（含；缺省到现在）
      --tz string        IANA 时区（缺省取环境变量 TZ，再取 /etc/localtime，都没有则 UTC）
```

## oryn stats usage

```text
按模型 / 时间 / 线程 / 项目 / Space / 用途汇总 token、成本与请求

Usage:
  oryn stats usage [flags]

Flags:
      --by string        分组：total | hour | day | week | month | model | thread | project | space | purpose (default "model")
      --csv              以 CSV 输出（服务端 format=csv 的响应）
      --from string      起始本地日期 YYYY-MM-DD（含；与 --since 互斥）
  -h, --help             help for usage
      --json             原样打印服务端 JSON
      --limit int        非时间分组最多列出几组（1–500；缺省 50，其余并入 __other__）
      --model string     只统计该模型（<provider>/<model>）
      --project string   只统计该项目（名称 / id / none）
      --series string    附带时间序列的粒度：hour | day | week | month
      --since string     窗口长度（距今）：Go 时长（如 36h）或 Nd / Nw (default "7d")
      --space string     只统计该 Space（名称 / id / none）
      --thread string    只统计该线程
      --to string        结束本地日期 YYYY-MM-DD（含；缺省到现在）
      --tz string        IANA 时区（缺省取环境变量 TZ，再取 /etc/localtime，都没有则 UTC）
```

## oryn stats budget off

```text
停用预算告警（保留已设的上限）

Usage:
  oryn stats budget off [flags]

Flags:
  -h, --help   help for off
      --json   原样打印服务端 JSON
```

## oryn stats budget set

```text
设置预算（只改给出的项，并启用）；--daily / --monthly 给 0 表示取消该上限

Usage:
  oryn stats budget set [flags]

Flags:
      --daily float     日上限（美元；0 = 取消）
  -h, --help            help for set
      --json            原样打印服务端 JSON
      --monthly float   月上限（美元；0 = 取消）
      --tz string       划分自然日 / 月的 IANA 时区
      --warn int        预警百分比（0–99；0 = 不预警）
```

## oryn stats budget show

```text
打印上限、当日 / 当月已花与级别

Usage:
  oryn stats budget show [flags]

Flags:
  -h, --help   help for show
      --json   原样打印服务端 JSON
```
