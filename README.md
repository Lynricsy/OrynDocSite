# Oryn 文档站

[Oryn](https://github.com/Lynricsy/Oryn) 的使用、部署与参考文档，基于 [Astro Starlight](https://starlight.astro.build)，线上地址 <https://docs.oryn.best>。

## 本地开发

```bash
bun install
bun run dev      # 开发服务器
bun run build    # 构建静态站点到 dist/
bun run preview  # 预览构建结果
bun run check    # 类型检查与内容规范检查
```

## 目录

| 路径 | 内容 |
|---|---|
| `src/content/docs/` | 页面。手写页的 frontmatter 带 `type`、`sources`、`verified`；`generated: true` 的页由脚本生成，勿手改 |
| `src/assets/shots/` | 同步进来的界面截图（`bun run sync:shots`） |
| `reference-data/` | 生成参考页的输入：OpenAPI 规格、配置字段、手写的命令与配置说明 |
| `scripts/` | 同步、生成、漂移检查与内容检查脚本 |
| `tools/gen-config/` | 从 Oryn 源码解析配置结构体的 Go 工具 |
| `oryn.lock.json` | 内容核对到的 Oryn commit，页脚会显示 |

## 与 Oryn 仓库同步

脚本默认从 `../Oryn` 读取 Oryn 源码（可用环境变量 `ORYN_REPO` 覆盖），截图另从 `../OrynWebsite` 读取（`ORYN_WEBSITE`）。

- `bun run sync`：更新 `oryn.lock.json`，复制 OpenAPI 规格，重新生成命令行与配置参考页。Oryn 工作区相关路径有未提交改动时拒绝执行，可加 `--allow-dirty`。
- `bun run sync:shots`：按 `reference-data/shots.manifest.json` 同步截图。
- `bun run drift`：对比每页 `verified` 记录的 Oryn commit 与当前 HEAD，列出来源章节已经变化的页面；加 `--check` 时有漂移即以退出码 1 结束。

## 写作规范

见 [AUTHORING.md](AUTHORING.md)。

## 部署

推送到 `main` 后由 PhoenixServer 按 `Dockerfile` 构建镜像并上线。
