## 说明

### 运行位置

`oryn thread` 在你的电脑上与执行环境（orb）内都能运行，按当前位置选择实现；判定方式见[命令行总览](/reference/cli/)。在环境内运行时，调用方线程取自环境变量 `ORYN_THREAD_ID`。

| 子命令 | 你的电脑 | 环境内 |
|---|---|---|
| `new` | 可用 | 在本项目开一个子线程；只接受 `--title`、`--type`、`--json` |
| `show` | 可用 | 可用；不支持 `--entries` |
| `send` | 可用 | 可用 |
| `wait` | 不可用，改用 `oryn thread attach --exit-on-idle` | 可用 |
| `list`、`archive`、`rpc`、`abort`、`fork`、`attach` | 可用 | 不可用 |

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn thread wait` | 0 线程静止；2 调用错误（不在环境内、控制口出错、不允许的目标、`--timeout` 不在 (0, 24h] 之内）；3 线程在等你回答；4 线程出错；124 等待超时 |
| `oryn thread attach --exit-on-idle` | 见到一个回合结束后：线程 idle 为 0，awaiting_input 为 3，error 为 4；在环境内调用为 2；尚未登录为 1 |
| 其它子命令 | 0 成功；1 错误；2 调用错误（含在环境内调用不可用的子命令） |

### 相关指南

- [新建线程与选择执行位置](/guide/threads/new-thread/)
- [回退、分叉与会话树](/guide/threads/rewind-fork/)
- [浏览器 Profile：复用登录态](/guide/workbench/browser-profiles/)
- [在自己的机器上跑线程（Runner）](/guide/environments/runner/)
- [在 box 上开线程](/guide/boxes/threads-on-box/)
- [命令行 oryn](/guide/clients/cli/)
