// 按 reference-data/shots.manifest.json 同步截图到 src/assets/shots/。
//   readme/<名>：Oryn 仓库 docs/assets/<名>-{light,dark}.png，转 WebP
//   site/<名>：  OrynWebsite public/product/<名>-{light,dark}.webp，原样复制
//   ui/<名>：    在 Oryn/web 下用 mock 模式现截 1280 宽的整窗图，转 WebP
// 任一来源缺失：打印缺失清单并退出非 0。
// 用法：bun run sync:shots
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { orynRepo, orynWebsite, run, siteRoot } from './lib/oryn';

interface Manifest {
	readme: string[];
	site: string[];
	ui: string[];
}

const manifest = JSON.parse(readFileSync(join(siteRoot, 'reference-data/shots.manifest.json'), 'utf8')) as Manifest;
const outRoot = join(siteRoot, 'src/assets/shots');
const missing: string[] = [];

async function toWebp(src: string, dest: string) {
	await sharp(src).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
}

// readme：亮色必需，暗色可选
mkdirSync(join(outRoot, 'readme'), { recursive: true });
for (const name of manifest.readme) {
	for (const variant of ['light', 'dark'] as const) {
		const src = join(orynRepo, `docs/assets/${name}-${variant}.png`);
		if (existsSync(src)) await toWebp(src, join(outRoot, `readme/${name}-${variant}.webp`));
		else if (variant === 'light') missing.push(src);
	}
}

// site：亮色必需，暗色可选
mkdirSync(join(outRoot, 'site'), { recursive: true });
for (const name of manifest.site) {
	for (const variant of ['light', 'dark'] as const) {
		const src = join(orynWebsite, `public/product/${name}-${variant}.webp`);
		if (existsSync(src)) copyFileSync(src, join(outRoot, `site/${name}-${variant}.webp`));
		else if (variant === 'light') missing.push(src);
	}
}

// ui：mock 模式现截
if (manifest.ui.length > 0) {
	const shotsDir = join(siteRoot, '.cache/shots');
	rmSync(shotsDir, { recursive: true, force: true });
	mkdirSync(shotsDir, { recursive: true });
	run(['bun', 'run', 'shots:all', '--only', manifest.ui.join(',')], join(orynRepo, 'web'), {
		...process.env,
		ORYN_SHOTS_DIR: shotsDir,
	} as Record<string, string>);
	mkdirSync(join(outRoot, 'ui'), { recursive: true });
	for (const name of manifest.ui) {
		for (const variant of ['light', 'dark'] as const) {
			const src = join(shotsDir, `${name}-1280-${variant}.png`);
			if (existsSync(src)) await toWebp(src, join(outRoot, `ui/${name}-${variant}.webp`));
			else missing.push(src);
		}
	}
}

if (missing.length > 0) {
	console.error(`缺少 ${missing.length} 个截图来源：\n${missing.join('\n')}`);
	process.exit(1);
}
console.log(`截图同步完成：readme ${manifest.readme.length}、site ${manifest.site.length}、ui ${manifest.ui.length}`);
