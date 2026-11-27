## 说明

### 运行位置

在你要使用 `oryn` 的机器上运行。凭据文件的位置与覆盖方式见[命令行总览](/reference/cli/)：设置了 `ORYN_CREDENTIALS` 时写到它指向的文件；凭据文件总以 0600 权限写入。`--token` 给出的令牌会先向控制面校验，通过后才写入。

### 退出码

0 成功；1 错误。

### 相关指南

- [命令行 oryn](/guide/clients/cli/)
- [浏览器：登录、设备与外观](/guide/clients/web/)
