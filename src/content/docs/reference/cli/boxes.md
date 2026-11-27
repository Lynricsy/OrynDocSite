---
title: "oryn boxes"
description: "Boxes：常驻机器与应用部署"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

`oryn boxes` 在你的电脑上与执行环境（orb）内都能运行：在你的电脑上用 `oryn login` 的设备令牌调用控制面 API；在环境内经 orbd 控制口，以当前线程（环境变量 `ORYN_THREAD_ID`）的名义由控制面执行。判定方式见[命令行总览](/reference/cli/)。

| 子命令 | 限制 |
|---|---|
| `deploy` | 只在线程所在的环境内可用；在你的电脑上调用报调用错误 |
| `delete` | 只在环境外可用；在环境内调用报调用错误，需在 Boxes 页面或已登录的机器上执行 |
| `undeploy --purge-data` | 只在环境外可用 |
| `exec` | `--timeout` 在环境内至多 1800 秒，在环境外至多 3600 秒 |
| `cp` | 在环境内，本地一侧的路径必须位于 `$HOME` 之下 |

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn boxes exec` | 透传 box 上命令的退出码 |
| `oryn boxes deploy` | 部署失败为 1 |
| 全部子命令 | 2 调用错误（如上表的位置限制） |

### 相关指南

- [认识 Boxes](/guide/boxes/overview/)
- [部署第一个应用](/guide/boxes/deploy-app/)
- [管理应用：密钥、回滚、日志与运行时段](/guide/boxes/manage-apps/)
- [在 box 上开线程](/guide/boxes/threads-on-box/)
- [`.oryn/box.yaml`](/reference/project-files/box-yaml/)

## oryn boxes

```text
Boxes：常驻机器与应用部署

Usage:
  oryn boxes [command]

Aliases:
  boxes, box

Available Commands:
  cancel-deploy 取消 app 卡住的部署（已进入激活的不能取消）
  cp            在本地与 box 之间复制文件（恰有一侧是 <box>:<路径>；box 路径相对 ~/，给了 --app 则相对其数据目录）
  create        新建 box
  delete        删除 box（连同全部 app 与数据，不可恢复）
  deploy        把当前仓库（HEAD 提交）部署到 box（只在线程的 orb 里可用）
  deployments   列出 box 上的 app：地址、公开性、仓库、分支、commit、部署时间
  exec          在 box 上执行命令（给了 --app 时在 app 的线上目录里）
  list          列出全部 box
  logs          app 服务的日志末尾
  rename        改名（app 地址不变）；顺带改写当前仓库 .oryn/box-deploy.json 里指向旧名的 target
  restart       重启 app 的全部服务（重新下发密钥）
  rollback      回滚到保留着的 release（缺省上一个）
  schedule      设置每日运行时段（--on HH:MM --off HH:MM --tz <IANA>），或 --clear 清除
  secrets       app 的密钥与环境变量
  show          查看一台 box：时段、停机原因、各 app 的地址与 live commit
  start         启动 box（保持到下一个时段边界）
  stop          停止 box（保持到下一个时段边界）
  undeploy      下线 app（数据目录保留；--purge-data 一并删除，只在 orb 外可用）

Flags:
  -h, --help   help for boxes

Use "oryn boxes [command] --help" for more information about a command.
```

## oryn boxes cancel-deploy

```text
取消 app 卡住的部署（已进入激活的不能取消）

Usage:
  oryn boxes cancel-deploy <box> --app <app> [flags]

Flags:
      --app string   app 名
  -h, --help         help for cancel-deploy
```

## oryn boxes cp

```text
在本地与 box 之间复制文件（恰有一侧是 <box>:<路径>；box 路径相对 ~/，给了 --app 则相对其数据目录）

Usage:
  oryn boxes cp <源> <目标> [--app <app>] [flags]

Flags:
      --app string   box 路径相对该 app 的数据目录
  -h, --help         help for cp
```

## oryn boxes create

```text
新建 box

Usage:
  oryn boxes create <name> [flags]

Flags:
  -h, --help              help for create
      --provider string   provider 名（缺省按默认落点）
      --type string       orb 类型
```

## oryn boxes delete

```text
删除 box（连同全部 app 与数据，不可恢复）

Usage:
  oryn boxes delete <box> [flags]

Flags:
  -h, --help   help for delete
      --yes    不再确认
```

## oryn boxes deploy

```text
把当前仓库（HEAD 提交）部署到 box（只在线程的 orb 里可用）

Usage:
  oryn boxes deploy [target] [--on <box>] [--name <app>] [flags]

Flags:
      --create                box 不存在时新建
      --discard-box-changes   丢弃 box 上 live release 里未推送的改动
  -h, --help                  help for deploy
      --move                  把 app 绑定到当前仓库 / 目录
      --name string           app 名（同时是地址 <app>.<portal_domain>）
      --on string             目标 box（名字或 id）
      --private               只允许主人登录后访问
      --provider string       新建 box 时的 provider
      --public                任何人都能访问（缺省）
      --type string           新建 box 时的 orb 类型
```

## oryn boxes deployments

```text
列出 box 上的 app：地址、公开性、仓库、分支、commit、部署时间

Usage:
  oryn boxes deployments <box> [flags]

Flags:
  -h, --help   help for deployments
      --json   以 JSON 输出
```

## oryn boxes exec

```text
在 box 上执行命令（给了 --app 时在 app 的线上目录里）

Usage:
  oryn boxes exec <box> [--app <app>] [--timeout 秒] -- <命令…> [flags]

Flags:
      --app string    在 app 的线上目录里执行
  -h, --help          help for exec
      --timeout int   超时秒数（缺省 600；orb 内至多 1800，orb 外至多 3600）
```

## oryn boxes list

```text
列出全部 box

Usage:
  oryn boxes list [flags]

Flags:
  -h, --help   help for list
      --json   以 JSON 输出
```

## oryn boxes logs

```text
app 服务的日志末尾

Usage:
  oryn boxes logs <box> --app <app> [--service S] [--tail N] [flags]

Flags:
      --app string       app 名
  -h, --help             help for logs
      --service string   服务名（缺省第一个）
      --tail int         末尾字节数（缺省 65536，至多 1048576）
```

## oryn boxes rename

```text
改名（app 地址不变）；顺带改写当前仓库 .oryn/box-deploy.json 里指向旧名的 target

Usage:
  oryn boxes rename <box> <new> [flags]

Flags:
  -h, --help   help for rename
```

## oryn boxes restart

```text
重启 app 的全部服务（重新下发密钥）

Usage:
  oryn boxes restart <box> --app <app> [flags]

Flags:
      --app string   app 名
  -h, --help         help for restart
```

## oryn boxes rollback

```text
回滚到保留着的 release（缺省上一个）

Usage:
  oryn boxes rollback <box> --app <app> [--to <releaseId>] [flags]

Flags:
      --app string   app 名
  -h, --help         help for rollback
      --to string    目标 release id
```

## oryn boxes schedule

```text
设置每日运行时段（--on HH:MM --off HH:MM --tz <IANA>），或 --clear 清除

Usage:
  oryn boxes schedule <box> [flags]

Flags:
      --clear        清除时段（一直运行）
  -h, --help         help for schedule
      --off string   关机时刻 HH:MM
      --on string    开机时刻 HH:MM
      --tz string    IANA 时区，如 Europe/Berlin
```

## oryn boxes secrets

```text
app 的密钥与环境变量

Usage:
  oryn boxes secrets [command]

Available Commands:
  ls          列出 app 的密钥与环境变量
  rm          删除密钥或环境变量
  set         设置密钥（--plain 为明文环境变量）；重启或下次部署后生效

Flags:
  -h, --help   help for secrets

Use "oryn boxes secrets [command] --help" for more information about a command.
```

## oryn boxes show

```text
查看一台 box：时段、停机原因、各 app 的地址与 live commit

Usage:
  oryn boxes show <box> [flags]

Flags:
  -h, --help   help for show
      --json   以 JSON 输出
```

## oryn boxes start

```text
启动 box（保持到下一个时段边界）

Usage:
  oryn boxes start <box> [flags]

Flags:
  -h, --help   help for start
```

## oryn boxes stop

```text
停止 box（保持到下一个时段边界）

Usage:
  oryn boxes stop <box> [flags]

Flags:
  -h, --help   help for stop
```

## oryn boxes undeploy

```text
下线 app（数据目录保留；--purge-data 一并删除，只在 orb 外可用）

Usage:
  oryn boxes undeploy <box> --app <app> [flags]

Flags:
      --app string   app 名
  -h, --help         help for undeploy
      --purge-data   连数据目录一起删除
```

## oryn boxes secrets ls

```text
列出 app 的密钥与环境变量

Usage:
  oryn boxes secrets ls --box <box> --app <app> [flags]

Flags:
      --app string   app 名
      --box string   box 名
  -h, --help         help for ls
```

## oryn boxes secrets rm

```text
删除密钥或环境变量

Usage:
  oryn boxes secrets rm <NAME> --box <box> --app <app> [flags]

Flags:
      --app string   app 名
      --box string   box 名
  -h, --help         help for rm
```

## oryn boxes secrets set

```text
设置密钥（--plain 为明文环境变量）；重启或下次部署后生效

Usage:
  oryn boxes secrets set <NAME> --box <box> --app <app> (--data-file F | --value V) [--plain] [flags]

Flags:
      --app string         app 名
      --box string         box 名
      --data-file string   从文件读取值
  -h, --help               help for set
      --plain              明文环境变量（API 可读回值）
      --value string       值
```
