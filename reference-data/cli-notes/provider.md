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
