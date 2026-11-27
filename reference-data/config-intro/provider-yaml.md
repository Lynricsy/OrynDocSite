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
