// 前置组件登记表：<Requires ids={[...]} /> 只接受这里登记的 id。
export interface Requirement {
	name: string;
	href: string;
}

export const requirements: Record<string, Requirement> = {
	portal: { name: 'Portal 泛域名', href: '/admin/install/portal/' },
	coordinator: { name: '协调宿主', href: '/admin/components/coordinator/' },
	'assistant-network': { name: '助手联网', href: '/admin/components/assistant-network/' },
	'github-oauth': { name: 'GitHub OAuth App', href: '/admin/components/github-oauth/' },
	hindsight: { name: 'Hindsight 记忆服务', href: '/admin/components/hindsight/' },
	'office-engine': { name: 'Office 引擎', href: '/admin/components/office-engine/' },
	push: { name: '移动推送', href: '/admin/components/push-gateway/' },
	sandbox: { name: 'Agent 沙箱', href: '/admin/backends/sandbox/' },
	firecracker: { name: 'Firecracker Provider', href: '/admin/backends/firecracker/' },
	sysbox: { name: 'Sysbox', href: '/admin/backends/sysbox/' },
	snapshots: { name: '快照与预热池', href: '/admin/backends/snapshots-pool/' },
};
