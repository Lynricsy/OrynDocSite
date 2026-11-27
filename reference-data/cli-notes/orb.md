## 说明

### 运行位置

| 子命令 | 运行位置 |
|---|---|
| `ls`、`show`、`metrics`、`pause`、`resume`、`rm` | 你的电脑：用 `oryn login` 的凭据调用控制面 API |
| `desktop`、`service`、`setup` | 只在执行环境（orb）内：经 orbd 本地控制口 `~/.oryn/orbd.sock` 执行。环境变量 `ORYN_ORB` 不是 `1` 时报错；orbd 未运行时报找不到控制口 |

Runner 上的线程不设置 `ORYN_ORB`，`desktop`、`service`、`setup` 在 Runner 上不可用。

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn orb setup run` | 0 成功；1 失败；2 调用错误 |
| `oryn orb service start`、`oryn orb service restart` | 0 全部服务 running；1 有服务不是 running；2 调用错误。不带服务名的 `start` 不把你手动停掉的服务算作失败 |
| `oryn orb desktop …` | 0 成功；1 未就绪、桌面未启用或启动失败；2 调用错误（不在环境内、orbd 不可达等） |
| 其它子命令 | 0 成功；1 错误 |

`oryn orb service` 的输出约定：每个受影响的服务向 stderr 写一行 `<name>: <status>, port <port>`；服务未停止、未失败且有 Portal 地址时，再向 stdout 写一行 `<Portal 地址>/`。

### 相关指南

- [环境如何随线程生灭](/guide/environments/lifecycle/)
- [受管服务与 Portal 预览](/guide/workbench/portal-services/)
- [远程桌面与人机接管](/guide/workbench/desktop/)
- [环境配置：setup、resume、快照与预热](/guide/projects/environment/)
- [`.oryn/services.yaml`](/reference/project-files/services-yaml/)
- [`.oryn/setup` 与 `.oryn/resume`](/reference/project-files/setup-resume/)
