// 从 Oryn 仓库同步生成物：版本锁、OpenAPI 规格、命令行参考、配置参考。
// 用法：bun run sync [--allow-dirty]
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { assertClean, git, orynRepo, run, siteRoot, writeLock } from './lib/oryn';

const allowDirty = process.argv.includes('--allow-dirty');
assertClean(['cmd/oryn', 'internal/config', 'internal/pushgw', 'internal/opsconf', 'schema/openapi.yaml'], allowDirty);

const commit = git(['rev-parse', 'HEAD']);
const describe = git(['describe', '--tags', '--match', 'v[0-9]*', '--always']);
writeLock({ commit, describe, syncedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z') });
console.log(`Oryn ${describe}（${commit.slice(0, 12)}）`);

mkdirSync(join(siteRoot, 'reference-data'), { recursive: true });
copyFileSync(join(orynRepo, 'schema/openapi.yaml'), join(siteRoot, 'reference-data/openapi.yaml'));

run(['bun', 'scripts/gen-cli.ts']);
run(['go', 'run', './tools/gen-config', '-src', orynRepo, '-out', 'reference-data/config.json']);
run(['bun', 'scripts/gen-config.ts']);
console.log('同步完成');
