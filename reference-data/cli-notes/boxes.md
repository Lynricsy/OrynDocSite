## 说明

### 运行位置

`oryn boxes` 在你的电脑上与执行环境（orb）内都能运行：在你的电脑上用 `oryn login` 的设备令牌调用控制面 API；在环境内经 orbd 控制口，以当前线程（环境变量 `ORYN_THREAD_ID`）的名义由控制面执行。判定方式见[命令行总览](/reference/cli/)。

| 子命令 | 限制 |
|---|---|
| `deploy` | 只在线程所在的环境内可用；在你的电脑上调用报调用错误 |
| `delete` | 只在环境外可用；在环境内调用报调用错误，需在 Boxes 页面或已登录的机器上执行 |
| `undeploy --purge-data` | 只在环境外可用 |
| `exec` | `--timeout` 在环境内至多 1800 秒，在环境外至多 3600 秒 |
| `cp` | 在环境内，本地一侧的路径必须位于 `$HOME` 之下 |

### 退出码

| 命令 | 退出码 |
|---|---|
| `oryn boxes exec` | 透传 box 上命令的退出码 |
| `oryn boxes deploy` | 部署失败为 1 |
| 全部子命令 | 2 调用错误（如上表的位置限制） |

### 相关指南

- [认识 Boxes](/guide/boxes/overview/)
- [部署第一个应用](/guide/boxes/deploy-app/)
- [管理应用：密钥、回滚、日志与运行时段](/guide/boxes/manage-apps/)
- [在 box 上开线程](/guide/boxes/threads-on-box/)
- [`.oryn/box.yaml`](/reference/project-files/box-yaml/)
