// 漂移检查：比较每页 verified 记录的 Oryn commit 与当前 HEAD 下各来源（或来源中的章节）是否变化。
// 用法：bun run drift [--check]；带 --check 时有漂移即以退出码 1 结束。
import { Glob } from 'bun';
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import { git, orynRepo, showFile, siteRoot } from './lib/oryn';

interface Source {
	file: string;
	section?: string;
	under?: string;
}

const check = process.argv.includes('--check');
const head = git(['rev-parse', 'HEAD']);
const docsDir = join(siteRoot, 'src/content/docs');

/** 标题级别（# 的个数）；不是标题行返回 0。忽略代码块里的行由调用方处理。 */
function level(line: string): number {
	const m = line.match(/^(#{1,6})\s/);
	return m ? m[1].length : 0;
}

/** 截取从 heading 行到下一个同级或更高级标题之前的文本；找不到返回 null。 */
function extract(text: string, section: string, under?: string): string | null {
	const lines = text.split('\n');
	let inFence = false;
	const headingAt: number[] = [];
	lines.forEach((l, i) => {
		if (/^(```|~~~)/.test(l)) inFence = !inFence;
		if (!inFence && level(l)) headingAt.push(i);
	});
	const span = (start: number) => {
		const lv = level(lines[start]);
		const next = headingAt.find((i) => i > start && level(lines[i]) <= lv);
		return [start, next ?? lines.length] as const;
	};
	let [from, to] = [0, lines.length];
	if (under) {
		const u = headingAt.find((i) => lines[i].trim() === under.trim());
		if (u === undefined) return null;
		[from, to] = span(u);
	}
	const s = headingAt.find((i) => i >= from && i < to && lines[i].trim() === section.trim());
	if (s === undefined) return null;
	const [a, b] = span(s);
	return lines.slice(a, b).join('\n');
}

const rows: string[][] = [];
for (const path of new Glob('**/*.{md,mdx}').scanSync(docsDir)) {
	const text = readFileSync(join(docsDir, path), 'utf8');
	const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) continue;
	const fm = (parse(m[1]) ?? {}) as { sources?: Source[]; verified?: string };
	if (!fm.verified || !fm.sources?.length) continue;
	const page = relative(siteRoot, join(docsDir, path));
	for (const src of fm.sources) {
		const label = src.section ? `${src.file} ${src.section}` : src.file;
		const diffCmd = `git -C ${orynRepo} diff ${fm.verified}..HEAD -- ${src.file}`;
		const old = showFile(fm.verified, src.file);
		const cur = showFile(head, src.file);
		let status = '';
		if (old === null || cur === null) status = old === null ? '旧版本无此文件' : '文件已删除';
		else if (src.section) {
			const a = extract(old, src.section, src.under);
			const b = extract(cur, src.section, src.under);
			if (a === null || b === null) status = '章节已改名或删除';
			else if (a !== b) status = '章节有变化';
		} else if (old !== cur) status = '文件有变化';
		if (status) rows.push([page, label, status, diffCmd]);
	}
}

if (rows.length === 0) {
	console.log('无漂移');
	process.exit(0);
}
console.log('| 页面 | 来源 | 状态 | 查看改动 |\n|---|---|---|---|');
for (const r of rows) console.log(`| ${r[0]} | ${r[1]} | ${r[2]} | \`${r[3]}\` |`);
console.log(`\n${rows.length} 处漂移`);
process.exit(check ? 1 : 0);
