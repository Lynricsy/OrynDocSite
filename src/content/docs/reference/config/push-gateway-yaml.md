---
title: "推送网关 gateway.yaml"
description: "自建推送网关配置文件的全部键、类型、默认值与约束。"
type: reference
generated: true
sources:
  - file: internal/pushgw/config.go
---

<!-- 由 scripts/gen-config.ts 生成，勿手改；改 reference-data/config-notes.yaml 与 config-intro/ -->

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

## 顶层键

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `listen` | 字符串 | `127.0.0.1:7700` | 网关的监听地址。只监听回环、由本机反代终止 TLS：网关只在请求来自回环地址时采信 `X-Real-IP` / `X-Forwarded-For`。 约束：不能为空。 |
| `public_origin` | 字符串 | （必填） | `public_origin` 是客户端看到的网关 origin（签名输入的一部分）：https，或回环主机的 http；不带路径。 约束：须是 `scheme://host[:port]`：`https`，或回环主机的 `http`；不带路径、查询与用户信息，结尾的 `/` 会被去掉。 |
| `data_dir` | 字符串 | `/var/lib/oryn-push-gateway` | 数据目录，存放 `master.key`（32 字节主密钥，首次启动生成）与 `gateway.db`（授权表）。备份时两者缺一不可。 约束：不能为空。 |
| `log_level` | 字符串 | `info` | 网关的日志级别。 约束：取 `debug`、`info`、`warn`、`error` 之一。 |

## apns

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `apns.key_file` | 字符串 | 空 | Apple Developer 下载的 APNs 密钥文件 `AuthKey_<Key ID>.p8`。空 = 不提供 APNs。 |
| `apns.key_id` | 字符串 | 空 | APNs 密钥的 Key ID（密钥文件名里那串，也显示在密钥详情页）。 约束：设置了 `key_file` 时必填。 |
| `apns.team_id` | 字符串 | 空 | Apple Developer 团队的 Team ID（Membership details 页可查）。 约束：设置了 `key_file` 时必填。 |
| `apns.topic` | 字符串 | 空 | `topic` 是 App 的 bundle id，也是 challenge 里 appId 必须等于的值。 约束：设置了 `key_file` 时必填。 |
| `apns.environments` | 字符串列表 | 空（两者都接受） | `environments` 是接受的 APNs 环境（production / sandbox）；为空时两者都接受。 约束：每项为 `production` 或 `sandbox`，不得重复。 |

## fcm

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `fcm.service_account_file` | 字符串 | 空 | Firebase 服务账号 JSON 文件（Firebase 控制台 → 项目设置 → 服务账号 → 生成新的私钥）。空 = 不提供 FCM。 |
| `fcm.app_id` | 字符串 | 空 | `app_id` 是 Android 应用标识（包名），challenge 里 appId 必须等于它。 约束：设置了 `service_account_file` 时必填。 |

## limits

| 键 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `limits.grant_per_minute` | 整数 | `60` | 每个授权每分钟可推送的次数。 约束：正整数。 |
| `limits.grant_per_day` | 整数 | `2000` | 每个授权每天可推送的次数。 约束：正整数。 |
| `limits.host_per_minute` | 整数 | `600` | 每个主机公钥（每台 orynd）每分钟可推送的次数。 约束：正整数。 |
| `limits.challenges_per_ip_hour` | 整数 | `30` | 每个来源 IP 每小时可发起的 `POST /v1/challenges` 次数。 约束：正整数。 |
