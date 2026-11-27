---
title: "orynd.yaml"
description: "控制面配置文件的全部键、类型、默认值与约束。"
type: reference
generated: true
sources:
  - file: internal/config/config.go
  - file: internal/opsconf/opsconf.go
---

<!-- 由 scripts/gen-config.ts 生成，勿手改；改 reference-data/config-notes.yaml 与 config-intro/ -->

## 文件位置与加载

控制面 `orynd` 启动时读取一个 YAML 配置文件，默认路径是 `/etc/oryn/orynd.yaml`，用 `--config` 指定其它路径：

```bash
orynd --config /etc/oryn/orynd.yaml
```

本机管理子命令同样读这个文件，`--config` 要写在子命令之前，例如 `orynd --config /etc/oryn/orynd.yaml setup-token`。

- **严格解析。** 文件里出现未知键时 orynd 拒绝启动；升级后若某个键已被删除，要先从文件里删掉它。
- **未写的键取默认值。** 下表「默认值」一列就是不写该键时的取值；标「（必填）」的键没有默认值。
- **启动时校验。** 取值不合法时 orynd 拒绝启动，并一次列出全部错误，错误信息里带出对应的键（如 `sandbox.idle`）。
- **时长**写成 Go 时长字符串，如 `10s`、`5m`、`720h`；`0s` 表示零。
- **相对路径**（`data_dir`、`coordinator.dir`、`artifacts.render.dir` 等）按 orynd 启动时的工作目录转成绝对路径。`artifacts.render.chromium` 与 `repos.git` 写不带斜杠的名字时按 `PATH` 查找。
- **运行时覆盖。** 说明里注明「可在 设置 → 控制面 覆盖」的 12 个键，覆盖值存在 `oryn.db` 里，优先于本文件，改完不用重启；在那里点「恢复」删除覆盖后回落到本文件的值。其余键改动后要重启 orynd。

## 最小示例

```yaml
listen: ["127.0.0.1:7600", "172.17.0.1:7600"]   # 第二项 = docker0 网桥地址，供本机的环境直连
public_url: "https://oryn.example.com"          # WebAuthn RP ID 取其主机名，必须与浏览器访问地址一致
portal_domain: "orb.example.com"               # Portal 泛域名；留空则不启用 Portal
data_dir: "/var/lib/oryn"
log_level: "info"
idle: { agent_idle: "5m", user_idle: "20m", stop_after_frozen: "24h", wake_on_focus: true }
orb_defaults: { provider: "", type: "" }
push: { gateway: { url: "https://push.oryn.best" } }   # 官方推送网关；空串 = 关闭
repos: { git: "", max_mirror_gb: 5, max_lfs_cache_gb: 2, min_free_gb: 2 }   # 项目仓库镜像（此行为默认值）
```

## 顶层键

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `listen` | 字符串列表 | `["127.0.0.1:7600"]` | 控制面的监听地址列表（`host:port`）。环境（orb）不经反代、直连这里；与 Docker Provider 同机部署时通常再加一项 docker0 网桥地址（如 `172.17.0.1:7600`，用 `ip -4 addr show docker0` 查看）。 约束：不能为空；每项须是 `host:port`。 |
| `public_url` | 字符串 | （必填） | 浏览器访问 Oryn 的地址，如 `https://oryn.example.com`。WebAuthn 的 RP ID 取它的主机名，必须与浏览器访问地址一致；Portal 地址沿用它的协议与端口。 约束：须是绝对 URL。 |
| `portal_domain` | 字符串 | 空 | Portal 泛域名，如 `orb.example.com`。受管服务的 Portal 地址、Boxes 应用地址、Artifact 隔离帧与发布页都在 `*.<portal_domain>` 之下。空 = 不启用 Portal。 约束：须是小写主机名，不带协议、端口与尾点；`public_url` 的主机名不得是 `<单标签>.<portal_domain>`，等于 `portal_domain` 本身是允许的。 |
| `data_dir` | 字符串 | `/var/lib/oryn` | 控制面数据目录：`oryn.db`、密钥库的 `master.key`、项目仓库镜像与托管仓库所在的 `repos/` 都在这里，备份时必须包含 `repos/`。相对路径按启动时的工作目录转成绝对路径。 约束：不能为空。 |
| `log_level` | 字符串 | `info` | 控制面的日志级别。 约束：取 `debug`、`info`、`warn`、`error` 之一。 |

## idle

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `idle.agent_idle` | 时长 | `5m` | Agent 空闲多久后冻结环境。运行中的环境在 Agent 空闲达到本值、且用户空闲达到 `user_idle` 时自动冻结。 约束：须为正。 可在 设置 → 控制面 覆盖，无需重启。 |
| `idle.user_idle` | 时长 | `20m` | 用户空闲多久后冻结环境，与 `agent_idle` 同时满足才冻结。已授权的 Portal 请求（含公开访客）也计为用户交互。 约束：须为正。 可在 设置 → 控制面 覆盖，无需重启。 |
| `idle.stop_after_frozen` | 时长 | `24h` | 环境冻结超过本值后转为停机。停机保留磁盘状态，唤醒要冷启动。 约束：须为正。 可在 设置 → 控制面 覆盖，无需重启。 |
| `idle.wake_on_focus` | 布尔 | `true` | 打开线程页时是否唤醒冻结的环境。已停机的环境不会因此唤醒：文件面板只读浏览，发消息或点「唤醒」后才冷启动。 可在 设置 → 控制面 覆盖，无需重启。 |

## orb_defaults

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `orb_defaults.provider` | 字符串 | 空 | 新建环境时省略 Provider 所用的 Provider 名称。确定顺序：显式指定 → 项目默认 → 本键 → 源环境的 Provider → 唯一可用的 Provider。空 = 不设。 约束：不能是保留名 `@host`。 |
| `orb_defaults.type` | 字符串 | 空 | 新建环境时省略类型所用的类型名称。确定顺序：显式指定 → 项目默认 → 本键 → Provider 的 `default_type`。空 = 不设。 |

## push

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `push.gateway.url` | 字符串 | `https://push.oryn.best` | `url` 是网关的 origin（不带路径）：https，或回环主机的 http（本机验收）；空串 = 关闭网关。 约束：空串，或不带路径、查询串、用户信息与结尾斜杠的 origin：`https://…`，或回环主机（`localhost` 或回环 IP）的 `http://…`。 |

## coordinator

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `coordinator.omp_path` | 字符串 | `/usr/local/lib/oryn/omp` | `omp_path` 是宿主上的 omp 二进制（与 orb 镜像同一份发布产物）。 约束：不能为空。 |
| `coordinator.dir` | 字符串 | 空 | `dir` 是协调宿主的工作目录（omp 副本、HOME、host.log）；空 = `<data_dir>`/coordinator。 |
| `coordinator.user` | 字符串 | 空 | `user` 是 orynd 以 root 运行时协调宿主降权到的账号。空（缺省）、nobody、nfsnobody 或 uid 65534 的账号 = 自动：使用（必要时用 useradd 创建）本实例专用的系统账号 oryn-coord-<协调目录路径的 fnv32a>。写别的名字则用该账号（须不是 root，且不被本实例以外的进程使用）。 |
| `coordinator.egress_port` | 整数 | `7811` | `egress_port` 是协调宿主内模型代理监听的回环端口。 约束：1–65535。 |
| `coordinator.verify_omp` | 布尔 | `true` | 为 `true`（或不写）时，orynd 核对 omp 的 sha256 与编进 orynd 的 `core/source.json` 是否一致，不一致时协调功能不可用。本地改过 Core、确实要用自己的构建时设为 `false`。 |
| `coordinator.model` | 字符串 | 空 | `model` 是协调对话的默认模型（"provider/id"）；空 = omp 配置的默认模型。 约束：非空时须是 `provider/id` 形式。 |
| `coordinator.web_allow_hosts` | 字符串列表 | `[]` | `web_allow_hosts` 是全局助手联网时允许连接的非公网目标：小写的 host 或 host:port，只对域名有意义；不在表里的目标若解析到回环、私网、链路本地等地址，正向代理一律拒绝。 |

## schedule

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `schedule.deliver_timeout` | 时长 | `10m` | 线程内定时任务一次投递的超时时间，超时的运行记为失败（`deliver_timeout`）。 约束：至少 `1m`。 |
| `schedule.max_failures` | 整数 | `3` | 定时任务连续失败多少次后自动暂停并发出通知。 约束：至少为 1。 |

## stats

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `stats.retention.samples` | 时长 | `720h` | `samples` 是 orb 资源采样（orb_samples）的保留期。 约束：为 `0`（永久）或至少 `24h`。 可在 设置 → 控制面 覆盖，无需重启。 |
| `stats.retention.events` | 时长 | `8760h` | `events` 是已删除 orb 的事件与 setup 记录、预算告警账本的保留期（活 orb 的事件永不删）。 约束：为 `0`（永久）或至少 `24h`。 可在 设置 → 控制面 覆盖，无需重启。 |
| `stats.retention.usage` | 时长 | `0s`（永久） | `usage` 是用量 / 工具调用 / 回合事实行的保留期。 约束：为 `0`（永久）或至少 `24h`。 可在 设置 → 控制面 覆盖，无需重启。 |

## snapshots

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `snapshots.enabled` | 布尔 | `true` | `enabled` 是全局开关；关闭后既不建立也不使用项目快照（项目自己的开关之上）。 |
| `snapshots.max_age` | 时长 | `72h` | `max_age` 是一条快照血统（从基础镜像全新 setup 起算，刷新不重置）的最长复用时间。 约束：须为正。 |
| `snapshots.max_depth` | 整数 | `16` | `max_depth` 是同一血统内的刷新次数上限，超过即退役、下次从基础镜像重建。 约束：1–64。 |
| `snapshots.min_setup` | 时长 | `10s` | `min_setup` 是值得建立新血统的最短 setup 耗时；更快的 setup 不建快照。 约束：须为正。 |
| `snapshots.max_total_gb` | 整数 | `40` | `max_total_gb` 是每个 provider 上项目快照（相对基础镜像）合计占用的上限。 约束：至少为 1。 可在 设置 → 控制面 覆盖，无需重启。 |
| `snapshots.max_snapshot_gb` | 整数 | `0`（自动） | 单个快照（相对基础镜像）的大小上限，单位 GB；超出即作废删除，不挤占其它快照。`0` = 未设置，取 10 与 `max_total_gb` 中较小的一个。 约束：`0` 或 1 至 `max_total_gb`。 可在 设置 → 控制面 覆盖，无需重启。 |

## pool

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `pool.max_total` | 整数 | `2` | `max_total` 是全局预热 orb（warming + idle）上限；0 = 关闭预热池。 约束：0–16（`0` = 关闭预热池）。 |
| `pool.max_age` | 时长 | `12h` | `max_age` 是 idle 池 orb 的最长存活时间，到期回收换新。 约束：须为正。 |
| `pool.active_window` | 时长 | `72h` | `active_window` 是项目「活跃」的判定窗口：窗口内没有新线程的项目不预热。 约束：须为正。 |

## orb_tls

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `orb_tls.listen` | 字符串列表 | `[]`（不开启） | `listen` 是 TLS 监听地址（host:port，host 必须是 IP，例如 172.18.0.1:7643）；这些 IP 总会写进服务端证书。 约束：每项为 `host:port`，主机部分须是 IP，端口 1–65535。 |
| `orb_tls.hosts` | 字符串列表 | `[]` | `hosts` 是服务端证书里额外的 SAN（主机名或 IP）。 约束：每项须是 IP 或合法主机名。 |

## github

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `github.api_url` | 字符串 | `https://api.github.com` | GitHub API 的上游地址。连接 github.com 时不需要改。 约束：须是带协议与主机的 http(s) 地址，不带查询串与片段；结尾的 `/` 会被去掉。 |
| `github.web_url` | 字符串 | `https://github.com` | GitHub 网页的上游地址，例如注册 OAuth App 的链接 `<web_url>/settings/applications/new`。连接 github.com 时不需要改。 约束：须是带协议与主机的 http(s) 地址，不带查询串与片段；结尾的 `/` 会被去掉。 |

## artifacts

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `artifacts.render.chromium` | 字符串 | 空 | `chromium` 是可执行文件路径；空 = 依次在 PATH 里找 chromium、chromium-browser、google-chrome-stable、google-chrome。 |
| `artifacts.render.user` | 字符串 | 空 | `user` 是 orynd 以 root 运行时跑 `chromium` 的账号（不能是 root）；root 下为空则渲染停用。非 root 时不用。 约束：不能是 `root`。 |
| `artifacts.render.no_sandbox` | 布尔 | `false` | `no_sandbox` 为真时给 `chromium` 传 --no-sandbox：只在 orynd 自己跑在专用容器里、`chromium` 的命名空间沙箱起不来时才打开。 |
| `artifacts.render.concurrency` | 整数 | `2` | `concurrency` 是同时运行的 `chromium` 上限；0（缺省）= 2。 约束：0–16（`0` 按 2 处理）。 |
| `artifacts.render.dir` | 字符串 | 空 | `dir` 是作业目录的上级目录；空 = `<data_dir>`/artifacts/render。渲染账号必须能进入它的每一级上级目录（data_dir 是 root 的 0700 目录时，要设到 /var/tmp/oryn-render 这类位置）。 |
| `artifacts.office.url` | 字符串 | 空 | `url` 是浏览器访问引擎的地址（编辑器 iframe 与表单提交的目标）；空 = 不启用引擎。 约束：须是不带路径与查询的 http(s) 绝对地址；结尾的 `/` 会被去掉。 |
| `artifacts.office.internal_url` | 字符串 | 空 | `internal_url` 是控制面访问引擎的地址（discovery、能力、转换）；空 = 同 `url`。 约束：须是不带路径与查询的 http(s) 绝对地址；需要同时配置 `artifacts.office.url`。 |
| `artifacts.office.wopi_base` | 字符串 | 空 | `wopi_base` 是引擎回调控制面 WOPI 端点的地址；空 = public_url。 约束：须是不带路径与查询的 http(s) 绝对地址；需要同时配置 `artifacts.office.url`。 |

## repos

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `repos.git` | 字符串 | 空 | `git` 是 git 可执行文件；空 = 在 PATH 里找 git（不带斜杠的名字也按 PATH 查找）。 |
| `repos.max_mirror_gb` | 整数 | `5` | `max_mirror_gb` 是单个镜像的大小上限；0（缺省）= 5。拉取后超出即删除镜像并记 too_large。 约束：不能为负（`0` 按缺省值处理）。 可在 设置 → 控制面 覆盖，无需重启。 |
| `repos.min_free_gb` | 整数 | `2` | `min_free_gb` 是数据盘要保留的可用空间：低于它时不克隆、不拉取、不接受推送；0（缺省）= 2。 约束：不能为负（`0` 按缺省值处理）。 可在 设置 → 控制面 覆盖，无需重启。 |
| `repos.max_lfs_cache_gb` | 整数 | `2` | `max_lfs_cache_gb` 是镜像项目 `git` LFS 对象缓存的总上限（所有项目合计，按最近使用淘汰）；0（缺省）= 2。 约束：不能为负（`0` 按缺省值处理）。 可在 设置 → 控制面 覆盖，无需重启。 |

## sandbox

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `sandbox.enabled` | 布尔 | `true` | 控制面是否提供 Agent 沙箱。关掉后新建沙箱返回 `sandbox_disabled`，Agent 的系统提示里也不再有沙箱指引。Provider 默认不提供沙箱，须在 `provider.yaml` 里另行开启。 |
| `sandbox.max_per_orb` | 整数 | `2` | `max_per_orb` 是每台 owner orb 同时在用的沙箱上限；`max_total` 是全局上限。 约束：至少为 1。 |
| `sandbox.max_total` | 整数 | `8` | 全局同时在用（创建中与就绪）的沙箱上限。 约束：不小于 `max_per_orb`。 |
| `sandbox.idle` | 时长 | `30m` | `idle` 是缺省空闲超时（创建时可设 5–240 分钟覆盖）；`max_lifetime` 是最长寿命硬上限。 约束：`5m`–`4h`。 |
| `sandbox.max_lifetime` | 时长 | `12h` | 沙箱最长寿命的硬上限，绝对 TTL 与续期都不能越过它。 约束：不小于 `idle`，不超过 `72h`。 |
| `sandbox.default_backend` | 字符串 | `kvm` | `default_backend` 是 backend 省略时优先选的后端：kvm 或 docker。 约束：`kvm` 或 `docker`。 |
