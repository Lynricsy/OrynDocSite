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
				starlightLinksValidator(),
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
							items: [group('开始', 'start', false)],
						},
						{
							id: 'reference',
							label: '参考',
							link: '/reference/',
							icon: 'document',
							items: [
								group('命令行', 'reference/cli'),
								group('配置文件', 'reference/config'),
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
