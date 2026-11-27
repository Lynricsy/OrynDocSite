// 生成命令行参考：构建 oryn，广度遍历 cobra 命令树，每个顶层命令一页，原样收录 --help 输出。
// cobra 命令树在 package main 里，仓库没有文档导出；原样收录 help 不会与实际行为不符。
// 用法：bun scripts/gen-cli.ts
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { orynRepo, run, siteRoot } from './lib/oryn';

const bin = join(siteRoot, '.cache/bin/oryn');
mkdirSync(join(siteRoot, '.cache/bin'), { recursive: true });
run(['go', 'build', '-o', bin, './cmd/oryn'], orynRepo, { ...process.env, CGO_ENABLED: '0' } as Record<string, string>);

const home = mkdtempSync(join(tmpdir(), 'oryn-help-'));
// 干净环境：不带 ORYN_* 与用户配置，help 输出与读者看到的一致
const env = { HOME: home, PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' };

function help(path: string[]): string {
	const r = Bun.spawnSync([bin, ...path, '--help'], { env, stdout: 'pipe', stderr: 'pipe' });
	if (r.exitCode !== 0) throw new Error(`oryn ${path.join(' ')} --help 失败：${r.stderr.toString()}`);
	return r.stdout.toString().replace(/\s+$/, '');
}

function subcommands(text: string): string[] {
	const lines = text.split('\n');
	const start = lines.indexOf('Available Commands:');
	if (start < 0) return [];
	const out: string[] = [];
	for (const line of lines.slice(start + 1)) {
		const m = line.match(/^ {2}(\S+)\s+\S/);
		if (!m) break;
		if (m[1] !== 'help') out.push(m[1]);
	}
	return out;
}

const rootHelp = help([]);
const topLevel = subcommands(rootHelp);
const outDir = join(siteRoot, 'src/content/docs/reference/cli');
const notesDir = join(siteRoot, 'reference-data/cli-notes');
mkdirSync(outDir, { recursive: true });

// 清掉上次生成、已不存在的命令页（只删带生成标记的文件）
const marker = '<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->';
for (const f of readdirSync(outDir)) {
	const p = join(outDir, f);
	if (f.endsWith('.md') && readFileSync(p, 'utf8').includes(marker) && !topLevel.includes(f.slice(0, -3))) rmSync(p);
}

for (const cmd of topLevel) {
	// 广度遍历该命令及其全部后代
	const queue: string[][] = [[cmd]];
	const sections: string[] = [];
	let description = '';
	while (queue.length > 0) {
		const path = queue.shift()!;
		const text = help(path);
		if (path.length === 1) description = text.split('\n')[0];
		sections.push(`## oryn ${path.join(' ')}\n\n\`\`\`text\n${text}\n\`\`\``);
		for (const sub of subcommands(text)) queue.push([...path, sub]);
	}
	const notesPath = join(notesDir, `${cmd}.md`);
	const notes = existsSync(notesPath) ? `${readFileSync(notesPath, 'utf8').trim()}\n\n` : '';
	const page = [
		'---',
		`title: ${JSON.stringify(`oryn ${cmd}`)}`,
		`description: ${JSON.stringify(description)}`,
		'type: reference',
		'generated: true',
		'sidebar:',
		'  order: 10',
		'---',
		'',
		marker,
		'',
		`${notes}${sections.join('\n\n')}`,
		'',
	].join('\n');
	writeFileSync(join(outDir, `${cmd}.md`), page);
}

rmSync(home, { recursive: true, force: true });
console.log(`命令行参考：${topLevel.length} 个顶层命令`);
