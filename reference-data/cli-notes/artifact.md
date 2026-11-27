## 说明

### 运行位置

只在执行环境（orb）内可用：经 orbd 控制口，以当前线程（环境变量 `ORYN_THREAD_ID`）的名义执行。在其它位置调用报调用错误。Runner 上的线程不设置 `ORYN_ORB`，也不可用。

### 退出码

0 成功；1 错误；2 调用错误（不在环境内、缺少操作名或 artifact id、`pull` 的目标文件已存在且未给覆盖参数等）。

### 相关指南

- [Artifacts 概览](/guide/artifacts/overview/)
