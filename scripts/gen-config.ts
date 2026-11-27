// 生成配置参考页：reference-data/config.json（tools/gen-config 从源码解析）+ config-notes.yaml（手写默认值、约束）。
// 两边的叶子键集合必须完全一致，否则列出差异并退出非 0。
// 用法：bun scripts/gen-config.ts
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { siteRoot } from './lib/oryn';

interface Field {
	path: string;
	goType: string;
	object: boolean;
	doc: string;
	goName: string;
}

interface Note {
	default: string;
	constraint?: string;
	runtimeOverride?: boolean;
	doc?: string;
}

type FileKey = 'orynd' | 'provider' | 'pushGateway';

const pages: { key: FileKey; slug: string; title: string; description: string; sources: string[] }[] = [
	{
		key: 'orynd',
		slug: 'orynd-yaml',
		title: 'orynd.yaml',
		description: '控制面配置文件的全部键、类型、默认值与约束。',
		sources: ['internal/config/config.go', 'internal/opsconf/opsconf.go'],
	},
	{
		key: 'provider',
		slug: 'provider-yaml',
		title: 'provider.yaml',
		description: 'Provider 配置文件的全部键、类型、默认值与约束。',
		sources: ['internal/config/config.go', 'internal/config/firecracker.go'],
	},
	{
		key: 'pushGateway',
		slug: 'push-gateway-yaml',
		title: '推送网关 gateway.yaml',
		description: '自建推送网关配置文件的全部键、类型、默认值与约束。',
		sources: ['internal/pushgw/config.go'],
	},
];

const config = JSON.parse(readFileSync(join(siteRoot, 'reference-data/config.json'), 'utf8')) as Record<FileKey, Field[]>;
const notes = parse(readFileSync(join(siteRoot, 'reference-data/config-notes.yaml'), 'utf8')) as Record<
	FileKey,
	Record<string, Note>
>;

// 里程碑标签不进页面
const milestone = /[（(]M\d+[^)）]*[)）]/g;

const problems: string[] = [];
for (const { key } of pages) {
	const leaves = new Set(config[key].filter((f) => !f.object).map((f) => f.path));
	const noted = new Set(Object.keys(notes?.[key] ?? {}));
	for (const p of leaves) if (!noted.has(p)) problems.push(`config-notes.yaml 缺少 ${key}.${p}`);
	for (const p of noted) if (!leaves.has(p)) problems.push(`config-notes.yaml 多出 ${key}.${p}（源码里没有这个键）`);
	for (const f of config[key].filter((f) => !f.object)) {
		const n = notes?.[key]?.[f.path];
		if (!n) continue;
		if (!n.default) problems.push(`${key}.${f.path}：缺少 default`);
		if (!n.doc && !f.doc) problems.push(`${key}.${f.path}：字段注释为空，须在 config-notes.yaml 写 doc`);
	}
}
if (problems.length > 0) {
	for (const p of problems) console.error(p);
	process.exit(1);
}

function typeLabel(goType: string): string {
	switch (goType) {
		case 'string':
			return '字符串';
		case 'int':
			return '整数';
		case 'float64':
			return '数字';
		case 'bool':
		case '*bool':
			return '布尔';
		case 'Duration':
			return '时长';
		case '[]string':
			return '字符串列表';
		default:
			return '对象';
	}
}

const cell = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');

/** 把注释里同一结构体的 Go 字段名换成 YAML 键名，并去掉里程碑标签。 */
function describeField(f: Field, siblings: Field[], note: Note): string {
	let text = note.doc ?? f.doc;
	if (!note.doc) {
		for (const s of siblings) {
			const key = s.path.split('.').pop()!;
			text = text.replace(new RegExp(`(?<![A-Za-z0-9_\`])${s.goName}(?![A-Za-z0-9_])`, 'g'), `\`${key}\``);
		}
	}
	// 注释里裸写的 `<data_dir>` 这类占位符放进代码格式，避免被当成 HTML 标签
	text = text
		.replace(milestone, '')
		.replace(/(?<!`)<([^<>\s`]+)>(?!`)/g, '`<$1>`')
		.trim();
	const parts = [text];
	if (note.constraint) parts.push(`约束：${note.constraint}。`.replace(/。。$/, '。'));
	if (note.runtimeOverride) parts.push('可在 设置 → 控制面 覆盖，无需重启。');
	return parts.join(' ');
}

const parentOf = (path: string) => path.split('.').slice(0, -1).join('.');

for (const page of pages) {
	const fields = config[page.key];
	const leaves = fields.filter((f) => !f.object);
	const topScalars = leaves.filter((f) => !f.path.includes('.'));
	const topObjects = fields.filter((f) => f.object && !f.path.includes('.'));

	const table = (rows: Field[]) =>
		[
			'| 键 | 类型 | 默认值 | 说明 |',
			'|---|---|---|---|',
			...rows.map((f) => {
				const n = notes[page.key][f.path];
				const siblings = fields.filter((s) => parentOf(s.path) === parentOf(f.path));
				return `| \`${f.path}\` | ${typeLabel(f.goType)} | ${cell(n.default)} | ${cell(describeField(f, siblings, n))} |`;
			}),
		].join('\n');

	const sections: string[] = [];
	if (topScalars.length > 0) sections.push(`## 顶层键\n\n${table(topScalars)}`);
	for (const obj of topObjects) {
		const rows = leaves.filter((f) => f.path.startsWith(`${obj.path}.`));
		const intro = obj.doc ? `${obj.doc.replace(milestone, '').trim()}\n\n` : '';
		sections.push(`## ${obj.path}\n\n${intro}${table(rows)}`);
	}

	const introPath = join(siteRoot, `reference-data/config-intro/${page.slug}.md`);
	const intro = existsSync(introPath) ? `${readFileSync(introPath, 'utf8').trim()}\n\n` : '';
	const out = [
		'---',
		`title: ${JSON.stringify(page.title)}`,
		`description: ${JSON.stringify(page.description)}`,
		'type: reference',
		'generated: true',
		'sources:',
		...page.sources.map((s) => `  - file: ${s}`),
		'---',
		'',
		'<!-- 由 scripts/gen-config.ts 生成，勿手改；改 reference-data/config-notes.yaml 与 config-intro/ -->',
		'',
		`${intro}${sections.join('\n\n')}`,
		'',
	].join('\n');
	const dir = join(siteRoot, 'src/content/docs/reference/config');
	mkdirSync(dir, { recursive: true });
	writeFileSync(join(dir, `${page.slug}.md`), out);
}
console.log('配置参考：3 页');
