// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import starlightSidebarTopics from 'starlight-sidebar-topics';

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
				starlightSidebarTopics(
					[
						{
							id: 'guide',
							label: '使用',
							link: '/start/what-is-oryn/',
							icon: 'open-book',
							items: [{ label: '开始', items: [{ autogenerate: { directory: 'start' } }] }],
						},
					],
					{ exclude: ['/'] },
				),
			],
		}),
	],
});
