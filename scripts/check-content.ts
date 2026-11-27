// 内容规范检查：手写页的 frontmatter、防泄漏、截图 id、损坏字符。
// 用法：bun scripts/check-content.ts；有问题时逐条打印并以退出码 1 结束。
import { Glob } from 'bun';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';

const root = join(import.meta.dir, '..');
const docsDir = join(root, 'src/content/docs');
const shotsDir = join(root, 'src/assets/shots');
const problems: string[] = [];

const leakPatterns: RegExp[] = [
	/ling\.plus/,
	/DevelopServerUS/,
	/oryn-prod/,
	/\/root\//,
	/64\.20\.45\.163/,
	/XDPWT9ABRD/,
	/plan-m\d/,
	/[（(]M\d+(\.\d+)?[ab]?[)）]/,
];

function frontmatter(text: string): Record<string, unknown> {
	const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	return m ? ((parse(m[1]) as Record<string, unknown>) ?? {}) : {};
}

function scanLeaks(file: string, text: string) {
	const lines = text.split('\n');
	lines.forEach((line, i) => {
		for (const re of leakPatterns) {
			if (re.test(line)) problems.push(`${file}:${i + 1}: 命中禁用内容 ${re}`);
		}
	});
}

function scanBroken(file: string, text: string) {
	const lines = text.split('\n');
	lines.forEach((line, i) => {
		if (line.includes('\uFFFD')) problems.push(`${file}:${i + 1}: 含损坏字符 U+FFFD`);
	});
}

for (const path of new Glob('**/*.{md,mdx}').scanSync(docsDir)) {
	const abs = join(docsDir, path);
	const rel = relative(root, abs);
	const text = readFileSync(abs, 'utf8');
	const fm = frontmatter(text);
	scanBroken(rel, text);
	if (fm.generated === true) continue;

	// frontmatter 的 sources.section 必须照抄 Oryn 原标题（可能带里程碑标签），只查正文
	const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---/, (fm) => '\n'.repeat(fm.split('\n').length - 1));
	scanLeaks(rel, body);

	if (path.endsWith('.mdx') && path !== 'index.mdx') {
		if (!fm.type) problems.push(`${rel}: 缺少 type`);
		if (!Array.isArray(fm.sources) || fm.sources.length === 0) problems.push(`${rel}: 缺少 sources`);
		if (!fm.verified) problems.push(`${rel}: 缺少 verified`);
	}

	for (const m of text.matchAll(/<Shot\b[^>]*\bid=["']([^"']+)["']/g)) {
		if (!existsSync(join(shotsDir, `${m[1]}-light.webp`))) {
			problems.push(`${rel}: 截图 ${m[1]} 不存在（src/assets/shots/${m[1]}-light.webp）`);
		}
	}
}

const refData = join(root, 'reference-data');
if (existsSync(refData)) {
	for (const path of new Glob('**/*').scanSync(refData)) {
		if (path === 'openapi.yaml' || path === 'config.json') continue;
		const abs = join(refData, path);
		const text = readFileSync(abs, 'utf8');
		scanLeaks(relative(root, abs), text);
		scanBroken(relative(root, abs), text);
	}
}

if (problems.length > 0) {
	for (const p of problems) console.error(p);
	console.error(`\n内容检查失败：${problems.length} 个问题`);
	process.exit(1);
}
console.log('内容检查通过');
