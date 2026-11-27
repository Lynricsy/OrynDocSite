// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
import starlightSidebarTopics from 'starlight-sidebar-topics';

/**
 * 侧栏组：目录下的页面按 frontmatter 的 sidebar.order 排序。
 * @param {string} label
 * @param {string} directory
 */
const group = (label, directory, collapsed = true) => ({
	label,
	collapsed,
	items: [{ autogenerate: { directory } }],
});

export default defineConfig({
	site: 'https://docs.oryn.best',
	integrations: [
		mermaid({ autoTheme: true, enableLog: false }),
		starlight({
			title: 'Oryn 文档',
			locales: { root: { label: '简体中文', lang: 'zh-CN' } },
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'Oryn',
			},
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Lynricsy/Oryn' }],
			editLink: { baseUrl: 'https://github.com/Lynricsy/OrynDocSite/edit/main/' },
			// Phoenix 构建只取单个 commit，git 时间不可靠
			lastUpdated: false,
			customCss: ['./src/styles/fonts.css', './src/styles/theme.css'],
			components: { Footer: './src/components/Footer.astro' },
			plugins: [
				// API 端点页由 starlight-openapi 生成，不在内容集合里，校验器看不到
				starlightLinksValidator({ exclude: ['/reference/api/', '/reference/api/**'] }),
				starlightImageZoom(),
				starlightOpenAPI([
					{
						base: 'reference/api',
						schema: './reference-data/openapi.yaml',
						sidebar: {
							label: 'API 端点',
							collapsed: true,
							operations: { badges: true, labels: 'summary' },
						},
					},
				]),
				starlightSidebarTopics(
					[
						{
							id: 'guide',
							label: '使用',
							link: '/start/what-is-oryn/',
							icon: 'open-book',
							items: [
								group('开始', 'start', false),
								group('线程与对话', 'guide/threads'),
								group('工程面板', 'guide/workbench'),
								group('项目', 'guide/projects'),
								group('执行环境', 'guide/environments'),
								group('Agent 配置', 'guide/agent'),
								group('全局助手', 'guide/assistant'),
								group('自动化与集成', 'guide/automation'),
								group('Artifacts 与视图', 'guide/artifacts'),
								group('Boxes', 'guide/boxes'),
								group('客户端', 'guide/clients'),
							],
						},
						{
							id: 'admin',
							label: '部署与运维',
							link: '/admin/overview/',
							icon: 'setting',
							items: [
								group('基础部署', 'admin/install'),
								group('执行后端', 'admin/backends'),
								group('可选组件', 'admin/components'),
								group('运维', 'admin/operations'),
								group('安全模型', 'security'),
							],
						},
						{
							id: 'reference',
							label: '参考',
							link: '/reference/',
							icon: 'document',
							items: [
								'reference',
								group('命令行', 'reference/cli'),
								group('配置文件', 'reference/config'),
								group('项目文件', 'reference/project-files'),
								group('界面', 'reference/ui'),
								'reference/env-vars',
								'reference/glossary',
								'reference/api-guide',
								...openAPISidebarGroups,
							],
						},
					],
					// starlight-openapi 生成的概览页不在侧栏里，归到「参考」主题
					{ exclude: ['/'], topics: { reference: ['/reference/api', '/reference/api/**'] } },
				),
			],
		}),
	],
});
