# 构建：Astro 静态站点
FROM oven/bun:1.4.4 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# 运行：Caddy 提供静态文件（版本与 PhoenixServer 的 infra/caddy 一致）
FROM caddy:2.11.9-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 8080
