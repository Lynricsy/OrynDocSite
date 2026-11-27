---
title: 隐私政策
description: Oryn App、Oryn 服务端软件与官方推送网关如何处理你的数据。
sources:
  - file: docs/push-gateway.md
    section: '## 配置'
  - file: docs/push-gateway.md
    section: '## 反代（OpenResty）'
  - file: deploy/openresty/oryn-push-gateway.conf
  - file: docs/protocol.md
    section: '### 官方推送网关（M28）'
  - file: docs/mobile.md
    section: '## 首次运行与配对'
  - file: docs/mobile.md
    section: '## 推送'
  - file: docs/mobile.md
    section: '## 其它能力'
  - file: docs/mobile.md
    section: '## 附录 A：iOS'
  - file: docs/desktop.md
    section: '## 自动更新'
  - file: docs/features.md
    section: '### 主人记忆'
  - file: docs/features.md
    section: '### GitHub'
verified: '61675840e117'
template: splash
---

生效日期：2026 年 11 月 27 日

English version: [Privacy Policy](/privacy/en/)

## 我们是谁，本政策适用于什么

Oryn 由 Lynricsy（下称「我们」）开发和发布。本政策适用于：

- Oryn 的 iOS、Android 与桌面（Windows、macOS、Linux）App；
- Oryn 服务端软件（控制面 orynd 及随附组件），由你自己部署和运行；
- 我们运营的官方推送网关 `https://push.oryn.best`。

你在自己的 Oryn 服务器上接入的第三方服务按它们各自的隐私政策处理数据，见下文「第三方 AI 服务」与「你配置的其它第三方服务」。

## 自托管：你的数据留在你的服务器上

Oryn 是自托管软件。每台 Oryn 服务器只有一个所有者，即部署它的人。账号在你的服务器上创建：用服务器给出的设置链接在浏览器里完成，之后用 Passkey 与恢复码登录。App 里不能注册账号。

App 只连接你配对的那台服务器。首次运行时你填写服务器地址或扫描配对二维码，确认后完成配对，此后 App 加载该服务器自己的网页界面。你的对话、文件、附件、记忆、项目与设置都存放在你的服务器上；我们无法访问，也不会收到副本。

使用 Oryn 不需要在我们这里注册账号。我们不收集你的姓名、邮箱、电话号码或位置。

## 第三方 AI 服务

Oryn 的 Agent 与助手功能依赖第三方模型服务。使用这些功能时，由你的服务器（而不是你的设备）把下列内容发给服务器所有者配置的服务商：

- 对话内容，以及你发送的附件与图片；
- Agent 执行任务时读取的文件内容与工具调用结果；
- 记忆功能处理的文本：发往配置的模型、向量化与重排服务；主人记忆的判断模型默认是 Google Gemini；
- 启用联网搜索、网页抓取或图片生成时：搜索词与网址发给所配置的搜索服务或目标网站，图片生成的提示词发给所配置的图片生成服务。

服务商由服务器所有者在服务器上配置，可以是 Anthropic、OpenAI、Google、DeepSeek、OpenRouter，或任何兼容 OpenAI 接口的服务。数据由你的服务器直接发给服务商，不经过我们；服务商按其各自的隐私政策与服务条款处理这些数据。

在 App 里第一次使用 AI 功能之前，App 会列出将接收数据的服务商，并请你明确同意；服务器新增服务商时会再次请你同意。你可以随时在「设置 → 隐私与数据」查看接收方并撤回同意。撤回后，App 里不能再使用 AI 功能。

## 你配置的其它第三方服务

以下服务由服务器所有者在服务器上启用，数据从你的服务器直接发出：

- **GitHub**：连接 GitHub 集成后，服务器按你的授权访问仓库。GitHub 不用于登录 Oryn。
- **通知渠道**：Telegram、ntfy、Bark、Webhook 等会收到通知的标题与摘要。
- **MCP 服务器**：Agent 调用 MCP 工具时，调用参数与相关内容发给你配置的 MCP 服务器。

桌面 App 的自动更新从 GitHub Releases 下载更新信息与更新包，GitHub 会收到这些请求。

## 推送通知

iOS App 与 Android 的 gms 版本经我们运营的官方推送网关 `push.oryn.best` 接收推送，网关把通知交给 Apple 推送通知服务（APNs）或 Firebase 云消息（FCM）投递。Android 的 foss 版本使用 UnifiedPush，经你选择的分发器（如 ntfy）接收，不经过我们的网关。

配对后 App 会自动启用推送，并弹出系统的通知授权框；你可以拒绝。

**网关保存的数据**（每个推送授权一条）：

- 推送令牌（APNs 或 FCM 的设备令牌），以 AES-256-GCM 加密存储；
- App 生成的设备公钥，以及你的服务器的主机公钥；
- 推送通道、App 标识与环境；
- 创建时间、最后使用时间与吊销时间。

网关不保存你的服务器地址，也不保存任何通知内容。

**端到端加密**：通知内容在你的服务器上按 RFC 8291 加密，只有你的设备能解开；网关、Apple 与 Google 只看到密文。iOS 上 APNs 可见的通知文字是一句固定的占位，设备上的通知扩展解密后才替换成真实内容。

**保存期限**：连续 90 天未使用的授权会被删除；已吊销的授权在 7 天后删除。清理每小时执行一次。

**日志**：网关日志只记录请求路由、HTTP 结果、耗时、授权 id、主机公钥哈希的前 8 位与上游错误码，不记录推送令牌与请求内容。你的 IP 地址只在内存中用于限流，不写入磁盘；网关前的反向代理不记录访问日志。

**Apple、Google 与 UnifiedPush 分发器**分别负责 APNs、FCM 与 UnifiedPush 的投递，按各自的隐私政策处理推送令牌与投递过程。通知内容经过它们时只是密文。

**停止推送**：在 App 里关闭推送、解除配对或更换服务器时，App 在网关上吊销授权（离线时之后重试）。在服务器的「设置 → 账户与设备」吊销这台设备，App 也会关闭推送。

## 相机

App 只在两种情况下使用相机：扫描配对二维码，以及你在输入区拍照作为消息附件。照片只上传到你的服务器，我们不会收到。

## 设备上保存的数据

App 在设备上保存配对得到的设备令牌，以及推送所需的密钥。设备令牌放在系统提供的安全存储里：iOS 钥匙串、Android Keystore 加密的私有存储，或桌面系统的凭据库。解除配对或更换服务器时，App 删除设备令牌并吊销推送授权。

## 我们不做的事

- App 不含任何统计分析、崩溃上报、广告或跟踪 SDK。除推送所需的组件外不集成其它第三方 SDK：Android gms 版本只用 Firebase Cloud Messaging，且关闭了 Firebase 的统计采集与自动初始化；foss 版本用 UnifiedPush；iOS 用系统自带的 APNs。
- 我们不跟踪你在其它公司的 App 或网站上的活动，不出售、不出租你的数据，也不把它用于广告。

## 儿童

Oryn 面向开发者，不面向 13 岁以下的儿童。我们不会有意收集儿童的个人信息。

## 你的选择与数据删除

- **服务器上的数据**由你控制：你可以在服务器上删除线程、文件与记忆，或停用、删除整台服务器及其数据。
- **设备上的数据**：解除配对会删除设备令牌；卸载 App 会删除 App 的本地数据。
- **推送网关上的数据**：关闭推送、解除配对或更换服务器会吊销授权，授权在 7 天后删除。网关没有账号，无法把记录对应到具体的人，所以在 App 里操作是最直接的方式；你也可以发邮件到 privacy@ling.plus 联系我们。

## 跨境传输

官方推送网关的服务器可能位于你所在的国家或地区之外。启用推送后，上文「网关保存的数据」会传输到网关所在地处理。Apple、Google 以及服务器所有者配置的 AI 服务商也可能在其它国家处理数据。

## 政策变更

本政策的最新版本发布在 `https://docs.oryn.best/privacy/`。政策有变化时，我们在本页发布新版本并更新生效日期。

## 联系我们

- 隐私问题与请求：privacy@ling.plus
- 问题反馈：[github.com/Lynricsy/Oryn/issues](https://github.com/Lynricsy/Oryn/issues)
