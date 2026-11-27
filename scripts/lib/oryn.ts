// Oryn 仓库定位、版本锁与工作区检查（各同步脚本共用）。
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const siteRoot = resolve(import.meta.dir, '../..');
export const orynRepo = resolve(siteRoot, process.env.ORYN_REPO ?? '../Oryn');
export const orynWebsite = resolve(siteRoot, process.env.ORYN_WEBSITE ?? '../OrynWebsite');
const lockPath = join(siteRoot, 'oryn.lock.json');

export interface Lock {
	commit: string;
	describe: string;
	syncedAt: string;
}

export function readLock(): Lock {
	return JSON.parse(readFileSync(lockPath, 'utf8')) as Lock;
}

export function writeLock(lock: Lock) {
	writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
}

/** 在 Oryn 仓库里运行 git，返回去掉首尾空白的输出；失败时抛错。 */
export function git(args: string[], opts: { allowFail?: boolean } = {}): string {
	const r = Bun.spawnSync(['git', '-C', orynRepo, ...args], { stdout: 'pipe', stderr: 'pipe' });
	if (r.exitCode !== 0) {
		if (opts.allowFail) return '';
		throw new Error(`git ${args.join(' ')} 失败：${r.stderr.toString().trim()}`);
	}
	return r.stdout.toString().replace(/\s+$/, '');
}

/** 读取某个 commit 下的文件内容；文件不存在时返回 null。 */
export function showFile(rev: string, file: string): string | null {
	const r = Bun.spawnSync(['git', '-C', orynRepo, 'show', `${rev}:${file}`], { stdout: 'pipe', stderr: 'pipe' });
	return r.exitCode === 0 ? r.stdout.toString() : null;
}

/** Oryn 工作区在这些路径下有未提交改动时退出，避免把半成品同步进来。 */
export function assertClean(paths: string[], allowDirty: boolean) {
	if (!existsSync(join(orynRepo, '.git'))) {
		console.error(`找不到 Oryn 仓库：${orynRepo}（用 ORYN_REPO 指定）`);
		process.exit(1);
	}
	const dirty = git(['status', '--porcelain', '--', ...paths]);
	if (dirty && !allowDirty) {
		console.error(`Oryn 工作区有未提交改动，稍后重试或加 --allow-dirty：\n${dirty}`);
		process.exit(1);
	}
	if (dirty) console.warn(`警告：Oryn 工作区有未提交改动（--allow-dirty）：\n${dirty}`);
}

/** 运行一个命令，继承输出；非 0 退出码时结束当前进程。 */
export function run(cmd: string[], cwd = siteRoot, env?: Record<string, string>) {
	const r = Bun.spawnSync(cmd, { cwd, stdout: 'inherit', stderr: 'inherit', env: env ?? process.env });
	if (r.exitCode !== 0) {
		console.error(`命令失败（退出码 ${r.exitCode}）：${cmd.join(' ')}`);
		process.exit(r.exitCode ?? 1);
	}
}

// 里程碑标签（M5、M11b、M9.6、M24 阶段 ③）。前后不能紧挨字母、数字或路径字符，避免误伤 `m5`、`/M2/` 之类。
const MS = String.raw`(?<![A-Za-z0-9_/.\x60-])M\d+[ab]?(?:\.\d+)?(?:\s*阶段\s*[①-⑩\d]+)?(?![A-Za-z0-9_])`;
export const milestonePattern = new RegExp(MS);

/**
 * 去掉工程规格里的里程碑标签，文档站不展示它们。按出现形态逐条处理，保留括号里的其余说明：
 * 「（M5）」整段删；「（M24；…」「（M16：…」删标签与分隔符；「…，M27）」「…，M4，…」删标签；
 * 「M30：…」「M3（…」「M16 记忆」删前缀标签；「为 M11b」删整个短语。
 */
export function scrubMilestones(text: string): string {
	const list = String.raw`${MS}(?:\s*/\s*${MS})*`;
	return text
		.replace(new RegExp(String.raw`[（(]\s*${list}\s*[)）]`, 'g'), '')
		.replace(new RegExp(String.raw`([（(])\s*${list}\s*[；;：:，,]\s*`, 'g'), '$1')
		.replace(new RegExp(String.raw`\s*[，,；;]\s*${MS}\s*(?=[)）])`, 'g'), '')
		.replace(new RegExp(String.raw`${list}\s*[：:]\s*`, 'g'), '')
		.replace(new RegExp(String.raw`${list}\s*(?=[（(])`, 'g'), '')
		.replace(new RegExp(String.raw`${MS}\s+(?=\S)`, 'g'), '')
		.replace(new RegExp(String.raw`\s*[，,]\s*${MS}\s*(?=[，,])`, 'g'), '')
		.replace(new RegExp(String.raw`\s*为\s*${MS}`, 'g'), '');
}
