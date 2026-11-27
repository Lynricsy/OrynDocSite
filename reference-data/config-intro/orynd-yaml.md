## 文件位置与加载

控制面 `orynd` 启动时读取一个 YAML 配置文件，默认路径是 `/etc/oryn/orynd.yaml`，用 `--config` 指定其它路径：

```bash
orynd --config /etc/oryn/orynd.yaml
```

本机管理子命令同样读这个文件，`--config` 要写在子命令之前，例如 `orynd --config /etc/oryn/orynd.yaml setup-token`。

- **严格解析。** 文件里出现未知键时 orynd 拒绝启动；升级后若某个键已被删除，要先从文件里删掉它。
- **未写的键取默认值。** 下表「默认值」一列就是不写该键时的取值；标「（必填）」的键没有默认值。
- **启动时校验。** 取值不合法时 orynd 拒绝启动，并一次列出全部错误，错误信息里带出对应的键（如 `sandbox.idle`）。
- **时长**写成 Go 时长字符串，如 `10s`、`5m`、`720h`；`0s` 表示零。
- **相对路径**（`data_dir`、`coordinator.dir`、`artifacts.render.dir` 等）按 orynd 启动时的工作目录转成绝对路径。`artifacts.render.chromium` 与 `repos.git` 写不带斜杠的名字时按 `PATH` 查找。
- **运行时覆盖。** 说明里注明「可在 设置 → 控制面 覆盖」的 12 个键，覆盖值存在 `oryn.db` 里，优先于本文件，改完不用重启；在那里点「恢复」删除覆盖后回落到本文件的值。其余键改动后要重启 orynd。

## 最小示例

```yaml
listen: ["127.0.0.1:7600", "172.17.0.1:7600"]   # 第二项 = docker0 网桥地址，供本机的环境直连
public_url: "https://oryn.example.com"          # WebAuthn RP ID 取其主机名，必须与浏览器访问地址一致
portal_domain: "orb.example.com"               # Portal 泛域名；留空则不启用 Portal
data_dir: "/var/lib/oryn"
log_level: "info"
idle: { agent_idle: "5m", user_idle: "20m", stop_after_frozen: "24h", wake_on_focus: true }
orb_defaults: { provider: "", type: "" }
push: { gateway: { url: "https://push.oryn.best" } }   # 官方推送网关；空串 = 关闭
repos: { git: "", max_mirror_gb: 5, max_lfs_cache_gb: 2, min_free_gb: 2 }   # 项目仓库镜像（此行为默认值）
```
