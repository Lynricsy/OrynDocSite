---
title: "oryn ssh"
description: "SSH 主机与钥匙：登记、测试、重置指纹、审计"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn ssh

```text
SSH 主机与钥匙：登记、测试、重置指纹、审计

Usage:
  oryn ssh [command]

Available Commands:
  add            登记主机，随后立即测试一次连接
  audit          查询 SSH 审计（网关连接与命令、测试、终端、文件操作；按时间倒序，保留 30 天）
  key            SSH 钥匙：生成、导入、查看公钥、删除
  ls             列出主机（缺省全局；--project 列该项目，--all 列全部）
  reset-host-key 清除已固定的主机指纹；下次成功连接时重新固定
  rm             删除主机
  set            修改主机（只发送给出的字段）
  test           测试连接并采一次状态快照；失败时退出码 1

Flags:
  -h, --help   help for ssh

Use "oryn ssh [command] --help" for more information about a command.
```

## oryn ssh add

```text
登记主机，随后立即测试一次连接

Usage:
  oryn ssh add <name> [flags]

Flags:
      --allow-automation   允许全自动线程使用
      --allow-forward      允许经网关做本地端口转发
      --compat string      Core 的 compat 开关：on 或 off；缺省不写
      --desc string        描述
      --disabled           登记为停用
  -h, --help               help for add
      --host string        目标机地址（主机名或 IP）
      --jump string        经这台主机跳转（主机名；项目主机可用同项目或全局主机）
      --key string         用这把钥匙登录（钥匙名或 id）
      --password-stdin     用密码登录，密码从标准输入读取
      --port int           SSH 端口 (default 22)
      --project string     主机所属项目（名称或 id）；缺省 = 全局
      --tag stringArray    标签（可重复）
      --user string        登录用户
```

## oryn ssh audit

```text
查询 SSH 审计（网关连接与命令、测试、终端、文件操作；按时间倒序，保留 30 天）

Usage:
  oryn ssh audit [flags]

Flags:
      --before int       只返回 id 小于该值的记录（分页游标）
  -h, --help             help for audit
      --host string      只看该主机（主机名或 id）
      --json             输出原始 JSON
      --limit int        最多返回条数（1–200） (default 50)
      --project string   --host 所在项目（名称或 id）；缺省先找全局主机
      --thread string    只看该线程（T-…）
```

## oryn ssh key

```text
SSH 钥匙：生成、导入、查看公钥、删除

Usage:
  oryn ssh key [command]

Available Commands:
  gen         生成 ed25519 钥匙，把公钥打印到标准输出
  import      导入私钥（带口令的私钥解开后以无口令形式加密保存，口令不落库）
  ls          列出钥匙
  pub         打印钥匙的公钥（authorized_keys 一行）
  rename      重命名钥匙（公钥注释随之改变）
  rm          删除钥匙（仍有主机使用时被拒绝）

Flags:
  -h, --help   help for key

Use "oryn ssh key [command] --help" for more information about a command.
```

## oryn ssh ls

```text
列出主机（缺省全局；--project 列该项目，--all 列全部）

Usage:
  oryn ssh ls [flags]

Aliases:
  ls, list

Flags:
      --all              列出全局与全部项目的主机
  -h, --help             help for ls
      --json             输出 JSON（{hosts}）
      --project string   只列该项目的主机（名称或 id）
```

## oryn ssh reset-host-key

```text
清除已固定的主机指纹；下次成功连接时重新固定

Usage:
  oryn ssh reset-host-key <name> [flags]

Flags:
  -h, --help             help for reset-host-key
      --project string   主机所属项目（名称或 id）；缺省 = 全局
```

## oryn ssh rm

```text
删除主机

Usage:
  oryn ssh rm <name> [flags]

Flags:
  -h, --help             help for rm
      --project string   主机所属项目（名称或 id）；缺省 = 全局
```

## oryn ssh set

```text
修改主机（只发送给出的字段）

Usage:
  oryn ssh set <name> [flags]

Flags:
      --allow-automation   允许全自动线程使用
      --allow-forward      允许经网关做本地端口转发
      --compat string      Core 的 compat 开关：on、off 或 default（不写进 ssh.json）
      --desc string        描述
      --disable            停用
      --enable             启用
  -h, --help               help for set
      --host string        目标机地址（主机名或 IP）
      --jump string        经这台主机跳转（主机名；项目主机可用同项目或全局主机）
      --key string         用这把钥匙登录（钥匙名或 id）
      --name string        改名
      --no-jump            取消跳板
      --no-tags            清空标签
      --password-stdin     用密码登录，密码从标准输入读取
      --port int           SSH 端口 (default 22)
      --project string     主机所属项目（名称或 id）；缺省 = 全局
      --tag stringArray    标签（可重复）
      --user string        登录用户
```

## oryn ssh test

```text
测试连接并采一次状态快照；失败时退出码 1

Usage:
  oryn ssh test <name> [flags]

Flags:
  -h, --help             help for test
      --json             输出原始 JSON
      --project string   主机所属项目（名称或 id）；缺省 = 全局
```

## oryn ssh key gen

```text
生成 ed25519 钥匙，把公钥打印到标准输出

Usage:
  oryn ssh key gen <name> [flags]

Flags:
  -h, --help   help for gen
```

## oryn ssh key import

```text
导入私钥（带口令的私钥解开后以无口令形式加密保存，口令不落库）

Usage:
  oryn ssh key import <name> <file|-> [flags]

Flags:
  -h, --help                     help for import
      --passphrase-file string   从该文件读取私钥口令
```

## oryn ssh key ls

```text
列出钥匙

Usage:
  oryn ssh key ls [flags]

Aliases:
  ls, list

Flags:
  -h, --help   help for ls
      --json   输出原始 JSON
```

## oryn ssh key pub

```text
打印钥匙的公钥（authorized_keys 一行）

Usage:
  oryn ssh key pub <name> [flags]

Flags:
  -h, --help   help for pub
```

## oryn ssh key rename

```text
重命名钥匙（公钥注释随之改变）

Usage:
  oryn ssh key rename <name> <new-name> [flags]

Flags:
  -h, --help   help for rename
```

## oryn ssh key rm

```text
删除钥匙（仍有主机使用时被拒绝）

Usage:
  oryn ssh key rm <name> [flags]

Flags:
  -h, --help   help for rm
```
