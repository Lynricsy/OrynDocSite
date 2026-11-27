---
title: "oryn config"
description: "omp 文本配置（全局 omp-home 或项目级 Agent 配置）"
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## 说明

### 运行位置

在你的电脑上运行：从本机目录打包上传，或下载到本机目录；用 `oryn login` 的凭据调用控制面 API。

### 退出码

0 成功；1 错误。

### 相关指南

- [模型与密钥](/guide/agent/models-and-keys/)
- [项目级 Agent 配置](/guide/agent/project-config/)

## oryn config

```text
omp 文本配置（全局 omp-home 或项目级 Agent 配置）

Usage:
  oryn config [command]

Available Commands:
  pull        把控制面上的 omp-home（--project 时为该项目的 Agent 配置）下载到本机目录
  push        打包上传本机 omp 配置目录，整体替换控制面上的 omp-home（--project 时替换该项目的 Agent 配置）

Flags:
  -h, --help   help for config

Use "oryn config [command] --help" for more information about a command.
```

## oryn config pull

```text
逐个下载文件并按服务端记录的权限写入 dir，不删除本地多出的文件。

不给 --project 时下载全局 omp-home 到 dir（默认 ~/.omp/agent）。服务端的 models.yml 是模板
（密钥已替换为 ${oryn:secret:…} 引用），默认写成 models.oryn.yml，避免覆盖本地带真实密钥的
models.yml；--force 时直接覆盖 models.yml。

--project <名称或 id> 时下载该项目的 Agent 配置到 dir（默认当前目录下的 .omp）；
项目级配置没有 models.yml，--force 不起作用。

写入前检查本地目录：父目录经符号链接指向 dir 之外、或要写的文件本身是符号链接时拒绝（不覆盖链接，
请先删除该链接）。

Usage:
  oryn config pull [dir] [flags]

Flags:
      --dry-run          只列出将写入的文件
      --force            直接覆盖 models.yml（其中只有密钥引用，没有真实值）
  -h, --help             help for pull
      --project string   项目名或 id；给出时操作该项目的 Agent 配置
```

## oryn config push

```text
不给 --project 时上传 dir（默认 ~/.omp/agent），整体替换控制面上的全局 omp-home。
排除 sessions/ blobs/ cache/ logs/ natives/ terminal-sessions/ *.db *.db-* auth.json history*。
models.yml 中的字面 apiKey 会被控制面抽取进密钥库，磁盘上只留引用；其它文件原样保存，
其中形似密钥的字符串只给出警告。

--project <名称或 id> 时上传 dir（默认当前目录下的 .omp），整体替换该项目的 Agent 配置；
目录结构同仓库里的 .omp/（rules/、skills/、mcp.json、config.yml…），在项目的每台 orb 里生效。
项目级配置另外不收 models.yml（模型与密钥只在全局管理）与 plans/，
上限为单文件 1 MiB、合计 16 MiB、2000 个文件。

额外排除：--exclude <glob>（可重复），以及 dir/.orynignore 中每行一个 glob（# 开头为注释）。
glob 按相对路径匹配，匹配到目录即排除整个目录，例如 extensions/omp-notify、omp-notify*。

只上传普通文件：设备、FIFO、socket 会直接报错（可用 --exclude 排除）；rules/ 下的文件与
*.md *.yml *.yaml *.json 必须是 UTF-8 文本，含 NUL 或非 UTF-8 字节时拒绝上传。
--project 时符号链接解析后还必须仍在 dir 之内，指向 dir 之外、无法解析或指向被排除路径的链接
直接报错；全局时照常跟随链接（含指向 dir 之外的目录），悬空链接与指向被排除路径的链接跳过并提示。

Usage:
  oryn config push [dir] [flags]

Flags:
      --exclude stringArray   额外排除的相对路径 glob（可重复）
  -h, --help                  help for push
      --project string        项目名或 id；给出时操作该项目的 Agent 配置
```
