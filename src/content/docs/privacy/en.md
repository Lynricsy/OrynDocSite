---
title: Privacy Policy
description: How the Oryn apps, the Oryn server software and the official push gateway handle your data.
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

<div lang="en">

Effective date: November 27, 2026

中文版：[隐私政策](/privacy/)

## Who we are and what this policy covers

Oryn is developed and published by Lynricsy ("we", "us"). This policy covers:

- the Oryn apps for iOS, Android and desktop (Windows, macOS, Linux);
- the Oryn server software (the orynd control plane and its bundled components), which you deploy and run yourself;
- the official push gateway we operate at `https://push.oryn.best`.

Third-party services you connect to your own Oryn server handle data under their own privacy policies; see "Third-party AI services" and "Other third-party services you configure" below.

## Self-hosted: your data stays on your server

Oryn is self-hosted software. Each Oryn server has a single owner: the person who deploys it. The account is created on your server, in a browser, using the setup link the server provides; after that you sign in with a passkey and recovery codes. Accounts cannot be created in the app.

The app connects only to the server you pair it with. On first launch you enter the server address or scan a pairing QR code, confirm, and complete pairing; from then on the app loads that server's own web interface. Your conversations, files, attachments, memory, projects and settings are stored on your server. We cannot access them and do not receive copies.

Using Oryn does not require an account with us. We do not collect your name, email address, phone number or location.

## Third-party AI services

Oryn's agent and assistant features rely on third-party model providers. When you use these features, your server (not your device) sends the following to the providers configured by the server owner:

- conversation content, including attachments and images you send;
- contents of files the agent reads while working on a task, and tool results;
- text processed by memory features, sent to the configured model, embedding and reranking services; the owner-memory judge model defaults to Google Gemini;
- when web search, web fetch or image generation is enabled: search queries and URLs go to the configured search service or the target websites, and image prompts go to the configured image generation service.

Providers are configured by the server owner on the server and may include Anthropic, OpenAI, Google, DeepSeek, OpenRouter, or any OpenAI-compatible service. Data is sent directly from your server to the provider, without passing through us, and each provider handles it under its own privacy policy and terms.

Before you use AI features in the app for the first time, the app lists the providers that will receive your data and asks for your explicit consent; it asks again whenever the server adds a new provider. Until you consent, your server does not send your data to any provider you have not approved, and background jobs (scheduled tasks, memory processing, web research) are refused as well. You can review the recipients and withdraw consent at any time in Settings → Privacy & data; after you withdraw, your server stops sending new requests to those providers and AI features stop working. One exception: a model key that the server owner hands to an execution environment as an environment variable (a non-built-in provider without a `baseUrl`) is only withdrawn the next time that environment starts.

## Other third-party services you configure

The following are enabled by the server owner on the server, and data is sent directly from your server:

- **GitHub**: once the GitHub integration is connected, the server accesses repositories as you authorize it. GitHub is not used to sign in to Oryn.
- **Notification channels**: Telegram, ntfy, Bark, webhooks and similar channels receive notification titles and summaries.
- **MCP servers**: when the agent calls an MCP tool, the call arguments and related content are sent to the MCP server you configured.

The desktop app's automatic updates download update metadata and packages from GitHub Releases, so GitHub receives those requests.

## Push notifications

The iOS app and the Android gms build receive push notifications through the official push gateway we operate at `push.oryn.best`; the gateway hands notifications to the Apple Push Notification service (APNs) or Firebase Cloud Messaging (FCM) for delivery. The Android foss build uses UnifiedPush through a distributor you choose (such as ntfy) and does not go through our gateway.

After pairing, the app turns on push notifications automatically and shows the system permission prompt; you can decline.

**Data the gateway stores** (one record per push grant):

- the push token (APNs or FCM device token), encrypted at rest with AES-256-GCM;
- a device public key generated by the app, and your server's host public key;
- the push channel, app identifier and environment;
- created, last-used and revoked timestamps.

The gateway does not store your server's address or any notification content.

**End-to-end encryption**: notification content is encrypted on your server under RFC 8291 and can be decrypted only by your device; the gateway, Apple and Google see only ciphertext. On iOS the text visible to APNs is a fixed placeholder, replaced with the real content after the notification extension on your device decrypts it.

**Retention**: grants unused for 90 consecutive days are deleted; revoked grants are deleted after 7 days. Cleanup runs every hour.

**Logs**: gateway logs record only the request route, HTTP status, duration, grant ID, the first 8 hex characters of a hash of the host public key, and the upstream error code. They do not record push tokens or request contents. Your IP address is used only in memory for rate limiting and is not written to disk; the reverse proxy in front of the gateway keeps no access log.

**Apple, Google and UnifiedPush distributors** deliver notifications for APNs, FCM and UnifiedPush respectively, and handle push tokens and delivery under their own privacy policies. Notification content passes through them only as ciphertext.

**Stopping push**: when you turn off push in the app, unpair, or change servers, the app revokes its grant on the gateway (retrying later if offline). Revoking this device on your server under Settings → Account & devices also makes the app turn off push.

## Camera

The app uses the camera only to scan pairing QR codes and to take photos you attach to messages. Photos are uploaded only to your server; we do not receive them.

## Data stored on your device

The app stores the device token obtained during pairing and the keys needed for push notifications. The device token is kept in the system's secure storage: the iOS Keychain, Android Keystore-encrypted private storage, or the desktop system credential store. When you unpair or change servers, the app deletes the device token and revokes its push grant.

## What we do not do

- The app contains no analytics, crash reporting, advertising or tracking SDKs. Apart from what push notifications require, it integrates no third-party SDKs: the Android gms build uses only Firebase Cloud Messaging, with Firebase analytics collection and auto-initialization turned off; the foss build uses UnifiedPush; iOS uses the system's APNs.
- We do not track your activity across other companies' apps or websites, and we do not sell or rent your data or use it for advertising.

## Children

Oryn is intended for developers and is not directed to children under 13. We do not knowingly collect personal information from children.

## Your choices and deletion

- **Data on your server** is under your control: you can delete threads, files and memory on the server, or shut down and delete the whole server and its data.
- **Data on your device**: unpairing deletes the device token; uninstalling the app deletes its local data.
- **Data on the push gateway**: turning off push, unpairing or changing servers revokes the grant, which is deleted 7 days later. The gateway has no accounts and cannot link records to a specific person, so the in-app controls are the most direct way; you can also contact us at privacy@ling.plus.

## International transfers

The official push gateway's servers may be located outside your country or region. Once push is enabled, the data listed under "Data the gateway stores" is transferred to and processed where the gateway is located. Apple, Google and the AI providers configured by the server owner may also process data in other countries.

## Changes to this policy

The current version of this policy is published at `https://docs.oryn.best/privacy/en/`. When it changes, we post the new version on this page and update the effective date.

## Contact

- Privacy questions and requests: privacy@ling.plus
- Issues: [github.com/Lynricsy/Oryn/issues](https://github.com/Lynricsy/Oryn/issues)

</div>
