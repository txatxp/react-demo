import lazy_load_component from './lazy_load'
export const indexRoutes = [
	{
		path: '/',
		exact:true,
		name: 'home',
		component: lazy_load_component(() => import('../view/home'))
	},
	{
		path: '/user_list',
		name: 'user_list',
		component: lazy_load_component(() => import('../view/user_list'))
	},
	{
		path: '/user_detail/:id',
		name: 'user_detail',
		component: lazy_load_component(() => import('../view/user_list/user_detail'))
	},
	{
		path: '/my',
		name: 'my',
		component: lazy_load_component(() => import('../view/my'))
	}
]