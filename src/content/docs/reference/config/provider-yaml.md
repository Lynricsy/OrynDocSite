---
title: "provider.yaml"
description: "Provider 配置文件的全部键、类型、默认值与约束。"
type: reference
generated: true
sources:
  - file: internal/config/config.go
  - file: internal/config/firecracker.go
---

<!-- 由 scripts/gen-config.ts 生成，勿手改；改 reference-data/config-notes.yaml 与 config-intro/ -->

## 文件位置与加载

Provider 进程是 `oryn provider run`，启动时读取一个 YAML 配置文件，默认路径是 `/etc/oryn/provider.yaml`，用 `--config` 指定其它路径。`oryn provider preflight` 读同一个文件，逐项打印预检结果：

```bash
oryn provider run --config /etc/oryn/provider.yaml
sudo oryn provider preflight --config /etc/oryn/provider-fc.yaml
```

一个 Provider 进程只用一种驱动。同一台主机上既跑 Docker 又跑 Firecracker 时，分别起两个进程、各用一份配置与令牌：部署文档里 Docker Provider 用 `/etc/oryn/provider.yaml`（systemd 单元 `oryn-provider.service`），Firecracker Provider 用 `/etc/oryn/provider-fc.yaml`（单元 `oryn-provider-fc.service`）。

- **严格解析。** 文件里出现未知键时 Provider 拒绝启动。
- **未写的键取默认值。** 下表「默认值」一列就是不写该键时的取值；标「（必填）」的键没有默认值。
- **启动时校验。** 取值不合法时 Provider 拒绝启动，并一次列出全部错误。`docker.types` 的 `runtime` / `nested_docker` 与 `docker.pids_limit` 总会校验；其余驱动专属的键只在 `driver` 选中该驱动时校验（例如 `firecracker.*` 只在 `driver: firecracker` 时校验）。
- **规格表整表替换。** `docker.types` 与 `firecracker.types` 不写时取默认的 `small`、`medium`、`large` 三档；写了就只有你写的类型，不与默认合并。

## 驱动

`driver` 可取 `docker`、`dispatch`、`firecracker`，各自读取同名的段：

| `driver` | 读取的段 | 说明 |
|---|---|---|
| `docker` | `docker` | 每个环境是一个容器 |
| `dispatch` | `dispatch`，以及 `docker` 段的 `image`、`types`、`default_type` | 每个任务执行一次你的脚本 |
| `firecracker` | `firecracker` | 每个环境是一台 Firecracker microVM，Provider 须以 root 运行 |

`driver: runner` 会被拒绝：Runner 不经 Provider 进程，在那台机器上以 `orbd run --runner` 接入。另有仅供测试的 `process` 驱动，不在此列。

## 最小示例

与控制面同机的 Docker Provider：

```yaml
url: "http://127.0.0.1:7600"         # Provider 与控制面同机，直连本地端口
token_file: "/etc/oryn/provider.token"
orb_url: "http://172.17.0.1:7600"    # 注入环境的 ORYN_URL = docker0 地址 + orynd 的第二个 listen
driver: docker
docker:
  image: "oryn-orb:dev"
  types: { small: {cpus: 2, memory: "4g"}, medium: {cpus: 4, memory: "8g"}, large: {cpus: 8, memory: "16g"} }
  default_type: medium
```

Provider 放在另一台主机时，`url` 与 `orb_url` 都写主域名（`https://oryn.example.com`），环境经反代建立 link。

## 顶层键

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `url` | 字符串 | （必填） | Provider 连接控制面的地址。与控制面同机时直连本地端口（如 `http://127.0.0.1:7600`）；在另一台主机时写主域名（如 `https://oryn.example.com`）。 约束：须是绝对 URL。 |
| `token_file` | 字符串 | （必填） | Provider 令牌文件的路径，内容是 `oryn provider create <名称>` 的输出，权限设为 `0600`。 约束：不能为空。 |
| `orb_url` | 字符串 | 同 `url` | 注入环境的 `ORYN_URL`，环境里的 `orbd` 用它连回控制面。同机 Docker 部署写 docker0 网桥地址加 orynd 对应的 `listen` 端口（如 `http://172.17.0.1:7600`）；开启 `orb_tls` 后写 TLS 监听地址（如 `https://172.17.0.1:7643`）；Provider 在另一台主机时写主域名。 |
| `driver` | 字符串 | `docker` | 创建环境的驱动。Runner 不经 Provider 进程，在那台机器上以 `orbd run --runner` 接入。 约束：取 `docker`、`dispatch`、`firecracker` 之一；`runner` 会被拒绝。 |

## docker

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `docker.image` | 字符串 | `oryn-orb:dev` | 环境使用的镜像，在同一版本的源码里用 `make image` 构建。Agent 沙箱固定使用它（不用项目快照）。`dispatch` 驱动在任务未指定镜像时把它作为 `ORB_IMAGE` 传给脚本。 |
| `docker.extra_run_args` | 字符串列表 | `[]` | 追加到 `docker run` 的参数，例如 `["--network", "oryn-orbs"]` 把环境接入专用网桥，`["--dns", "1.1.1.1"]` 指定公网解析器。参数里自带 `seccomp` 选项时不再追加内置的 seccomp 配置。Agent 沙箱容器不追加这些参数。 |
| `docker.types` | 对象 | `small` / `medium` / `large` | 环境规格表，键是类型名称。不写时取默认三档：`small`（2 CPU、`4g`）、`medium`（4 CPU、`8g`）、`large`（8 CPU、`16g`）；写了就整表替换默认值，不与默认合并。`dispatch` 驱动同样用这张表声明类型。 |
| `docker.types.<名称>.cpus` | 数字 | — | 该类型的 CPU 数，传给 `docker run --cpus`，可以是小数。默认规格：`small` 为 2，`medium` 为 4，`large` 为 8。 |
| `docker.types.<名称>.memory` | 字符串 | — | 该类型的内存上限，传给 `docker run --memory`（如 `4g`）。默认规格：`small` 为 `4g`，`medium` 为 `8g`，`large` 为 `16g`。 |
| `docker.types.<名称>.runtime` | 字符串 | 空 | `runtime` 是 `docker run --runtime` 的值；只接受空（Docker 默认）或 sysbox-runc。 约束：空或 `sysbox-runc`；Provider 启动时预检，`docker info` 里没有该 runtime 就拒绝启动。 |
| `docker.types.<名称>.nested_docker` | 布尔 | `false` | `nested_docker` 为 true 时该类型的 orb 内由 orbd 监督 dockerd；要求 `runtime` 为 sysbox-runc。 约束：要求 `runtime` 为 `sysbox-runc`；不支持特权模式。 |
| `docker.default_type` | 字符串 | `medium` | 未指定类型时使用的规格名称。 约束：`driver: docker` 时须是 `types` 里的名称。 |
| `docker.pids_limit` | 整数 | `4096` | `pids_limit` 是所有类型的 `docker run --pids-limit`；缺省 4096，0 = 不限。 约束：不能为负（`0` = 不限）。 |
| `docker.sandbox.enabled` | 布尔 | `false` | 是否让这个 Docker Provider 提供 Agent 沙箱（`backend: docker`）。为 `false` 时 `network`、`dns`、`socket_dir` 不校验。开启前要重建镜像（`make image`）。 |
| `docker.sandbox.network` | 字符串 | 空 | `network` 是 egress 模式接入的 docker 网络（由 deploy/docker/oryn-sbx-net.sh 建立）；`enabled` 时必填。 约束：`enabled` 时必填；Provider 预检与启动时要求 `docker network inspect <network>` 成功。 |
| `docker.sandbox.dns` | 字符串列表 | `[]` | `dns` 是 egress 模式的 --dns，每项须是 IP。 约束：每项须是 IP。 |
| `docker.sandbox.socket_dir` | 字符串 | `/run/oryn-sbx` | 存放各沙箱 link 中继 socket 的目录（`<socket_dir>/`<orbId>`/link.sock`）。Provider 预检与启动时建出它（`0700`）。 约束：须是绝对路径。 |

## dispatch

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `dispatch.script` | 字符串 | 空 | dispatch 驱动执行的脚本。每个任务执行一次（无参数），输入经环境变量传递，退出码 0 = 成功；脚本在独立进程组中运行，任务超时（5 分钟）时整组被终止。 约束：`driver: dispatch` 时必填。 |

## firecracker

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `firecracker.bin` | 字符串 | `/usr/local/bin/firecracker` | `bin` / `jailer` 是 firecracker 与 jailer 可执行文件。 约束：`driver: firecracker` 时须是非空的绝对路径。 |
| `firecracker.jailer` | 字符串 | `/usr/local/bin/jailer` | jailer 可执行文件。 约束：`driver: firecracker` 时须是非空的绝对路径。 |
| `firecracker.kernel` | 字符串 | `/var/lib/oryn-fc/artifacts/vmlinux` | `kernel` / `rootfs` 是 guest 内核（vmlinux）与只读根盘（ext4）；须与 `state_dir` 在同一文件系统（驱动硬链接它们）。 约束：`driver: firecracker` 时须是非空的绝对路径。 |
| `firecracker.rootfs` | 字符串 | `/var/lib/oryn-fc/artifacts/rootfs.ext4` | 只读根盘（ext4），须与 `state_dir` 在同一文件系统。更新时用 `install` 换成新文件，不能原地覆盖：运行中 VM 的基础盘是它的硬链接。 约束：`driver: firecracker` 时须是非空的绝对路径。 |
| `firecracker.state_dir` | 字符串 | `/var/lib/oryn-fc` | `state_dir` 存基础盘、各 VM 的可写盘与元数据、快照、jailer 的 chroot 与槽位表。 约束：`driver: firecracker` 时须是非空的绝对路径。 |
| `firecracker.disk_gb` | 整数 | `40` | `disk_gb` 是每台 VM 可写盘（稀疏文件）的大小。 约束：至少为 8。 |
| `firecracker.uid_base` | 整数 | `2000000000` | `uid_base` 是槽位 n 的 jailer uid / gid = `uid_base` + n。默认 2000000000：避开 useradd 的 subuid 分配区（100000 起每段 65536，sysbox 默认 165536 起）和 systemd 的容器区（524288–1879048191）。 约束：1 至 2147467327；预检要求区间 `[uid_base, uid_base+16320)` 不与 `/etc/subuid`、`/etc/subgid` 的任何一段及已有用户 / 组重叠。 |
| `firecracker.network.cidr` | 字符串 | `172.31.0.0/16` | guest 网络的网段。每台 VM 一个 /30（槽位 n：宿主侧 = 基址 + 4n + 1，guest = 基址 + 4n + 2），网段的最后一个 /24 留给 `host_addr`。 约束：须是 IPv4 /16 网段。 |
| `firecracker.network.host_addr` | 字符串 | `172.31.255.1` | 宿主上 dummy 接口 `oryn-fc` 的地址，orynd 在它上面给 guest 提供 link。缺省值与 `deploy/firecracker/oryn-fc-net.sh` 建立的地址相同。 约束：须是网段最后一个 /24 内的 IPv4 地址。 |
| `firecracker.network.dns` | 字符串列表 | `["1.1.1.1", "1.0.0.1"]` | 下发给 guest 的 DNS 服务器。 约束：至少一个，每项须是 IP。 |
| `firecracker.limits.max_vms` | 整数 | `8` | VM 数上限，启动 VM 前核对，超出时创建失败，原因 `capacity`。运行或冻结中的 box 与 Agent 沙箱的 VM 也占名额。 约束：1 至 16320。 |
| `firecracker.limits.max_memory_mb` | 整数 | `32768` | 全部 VM 的内存合计上限（MiB），冻结的 VM 也算在内；超出时创建失败，原因 `capacity`。 约束：至少为 1。 |
| `firecracker.types` | 对象 | `small` / `medium` / `large` | microVM 规格表，键是类型名称。不写时取默认三档（与 Docker 驱动的默认规格同名同量）；写了就整表替换默认值，不与默认合并。 |
| `firecracker.types.<名称>.cpus` | 整数 | — | 该类型的 vCPU 数，写小数会报错。默认规格：`small` 为 2，`medium` 为 4，`large` 为 8。 约束：至少为 1，只能是整数。 |
| `firecracker.types.<名称>.memory` | 字符串 | — | 该类型的内存。默认规格：`small` 为 `4g`，`medium` 为 `8g`，`large` 为 `16g`。 约束：须为正整数并带单位 `m`、`g` 或 `t`（不区分大小写），如 `4g`、`512m`。 |
| `firecracker.default_type` | 字符串 | `medium` | 未指定类型时使用的规格名称。 约束：`driver: firecracker` 时须是 `types` 里的名称。 |
| `firecracker.sandbox.enabled` | 布尔 | `false` | 是否让这个 Firecracker Provider 提供 Agent 沙箱（`backend: kvm`）。沙箱的 link 走 vsock，不需要额外的网络配置；开启前要重装含新 `orbd` 的根盘。 |
