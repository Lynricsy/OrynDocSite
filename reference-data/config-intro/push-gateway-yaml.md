只有自己编 App（换了 bundle id、Firebase 项目或 APNs 团队）时才需要自建推送网关；其余情况 orynd 缺省使用官方网关 `https://push.oryn.best`，不需要这份配置。

## 文件位置与加载

`oryn-push-gateway` 启动时读取一个 YAML 配置文件，默认路径是 `/etc/oryn-push-gateway/gateway.yaml`。命令行只有两个参数：`-config`（配置文件路径）与 `-version`（打印版本号并退出）。

```bash
oryn-push-gateway -config /etc/oryn-push-gateway/gateway.yaml
```

- **严格解析。** 文件里出现未知键时网关拒绝启动。
- **未写的键取默认值。** 下表「默认值」一列就是不写该键时的取值；标「（必填）」的键没有默认值。`limits` 整段可以省略。
- **启动时校验。** 取值不合法时网关拒绝启动，并一次列出全部错误。
- **相对路径**（`data_dir`、`apns.key_file`、`fcm.service_account_file`）按启动时的工作目录转成绝对路径。
- **通道按需开启。** `apns.key_file` 为空即不提供 APNs，`fcm.service_account_file` 为空即不提供 FCM。改配置或换凭据后要重启网关。

## 最小示例

只写 `listen`、`public_origin`、`data_dir` 也能启动：两个通道都不提供，`/v1/info` 返回 `{"v":1}`，适合先验证部署链路。

```yaml
listen: "127.0.0.1:7700"                     # 只监听回环，由反代终止 TLS
public_origin: "https://push.example.com"    # 客户端看到的 origin：https，或回环主机的 http；不带路径。签名覆盖它
data_dir: "/var/lib/oryn-push-gateway"       # master.key 与 gateway.db
```

`public_origin` 必须与手机、orynd 访问的 origin 逐字一致（无结尾斜杠），orynd 的 `push.gateway.url` 也要改成同一个 origin。
