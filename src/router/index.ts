import { createRouter, createWebHashHistory } from 'vue-router';

interface IRoute {
	path: string;
	name: string;
	component: () => void;
	meta: {
		title?: string;
		icon?: string | Array<string>;
		requireAuth?: boolean;
	};
}

export const routes: IRoute[] = [
	{
		path: '/',
		name: 'search',
		component: () => import('@/views/SearchMusic.vue'),
		meta: {
			title: 'search',
			icon: ['fab', 'fa-chrome'],
			requireAuth: false
		}
	},
	{
		path: '/sub',
		name: 'sub',
		component: () => import('@/components/HelloWorld.vue'),
		meta: {
			title: 'list',
			icon: ['fas', 'fa-list'],
			requireAuth: false
		}
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
