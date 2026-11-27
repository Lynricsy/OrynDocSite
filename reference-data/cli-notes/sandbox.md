## 说明

### 运行位置

| 子命令 | 运行位置 |
|---|---|
| `up`、`exec`、`cp`、`net`、`jobs`、`extend` | 只在执行环境（orb）内，经 orbd 控制口以当前线程（环境变量 `ORYN_THREAD_ID`）的名义调用控制面 |
| `ls` | 环境内列出本环境的沙箱；你的电脑上列出全部在用的沙箱，`--thread` 只能在环境外使用 |
| `rm` | 环境内与你的电脑上都可用 |

判定方式见[命令行总览](/reference/cli/)。

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn sandbox exec`（不带 `--detach`） | 透传沙箱内命令的退出码 |
| 全部子命令 | 2 调用错误：位置不对、参数不合法、控制面拒绝请求或 orbd 控制口出错 |

### 相关指南

- [Agent 沙箱](/guide/environments/sandboxes/)
- [启用 Agent 沙箱](/admin/backends/sandbox/)
