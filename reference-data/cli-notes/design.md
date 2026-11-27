## 说明

### 运行位置

只在执行环境（orb）内可用：经 orbd 控制口，以当前线程（环境变量 `ORYN_THREAD_ID`）的名义执行。在其它位置调用报调用错误。

### 退出码

0 成功；1 错误；2 调用错误（不在环境内、缺少 artifact id 等）。

### 相关指南

- [设计画布与多版方案](/guide/artifacts/design-canvas/)
- [部署第一个应用](/guide/boxes/deploy-app/)
