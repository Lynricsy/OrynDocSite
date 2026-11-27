import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// 页面类型；手写页由 scripts/check-content.ts 强制必填
				type: z.enum(['tutorial', 'how-to', 'reference', 'explanation']).optional(),
				// 事实来源：相对 Oryn 仓库根的文件，可选限定到某个标题（含 #）及其上级标题
				sources: z
					.array(
						z.object({
							file: z.string(),
							section: z.string().optional(),
							under: z.string().optional(),
						}),
					)
					.default([]),
				// 核对内容时 Oryn 的 commit
				verified: z
					.string()
					.regex(/^[0-9a-f]{12,40}$/)
					.optional(),
				// 由脚本生成的页面
				generated: z.boolean().default(false),
			}),
		}),
	}),
};
