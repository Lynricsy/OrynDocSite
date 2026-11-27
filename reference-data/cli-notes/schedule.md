## 说明

### 运行位置

`oryn schedule` 在你的电脑上与执行环境（orb）内都能运行，按当前位置选择实现；判定方式见[命令行总览](/reference/cli/)。环境内的命令只作用于当前线程（环境变量 `ORYN_THREAD_ID`）的线程内定时。

| 子命令 | 你的电脑 | 环境内 |
|---|---|---|
| `set` | 须给 `<thread>` | 不接受线程参数，作用于当前线程；不能设置运行前闸门（`--gate-host`、`--gate-command`、`--gate-timeout`） |
| `show`、`pause`、`resume`、`rm` | 须给 `<ref>` | 不接受参数，作用于当前线程的定时 |
| `add`、`update`、`ls`、`run`、`runs`、`webhook`、`webhook rm` | 可用 | 不可用 |

### 退出码

0 成功；1 错误；2 调用错误（含在环境内调用不可用的子命令、在环境内给出线程参数或闸门参数）。

### 相关指南

- [定时任务](/guide/automation/schedules/)
- [入站 Webhook](/guide/automation/webhooks/)
