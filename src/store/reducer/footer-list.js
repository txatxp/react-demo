import {
	FOOTER_LIST
} from '../const/user'
let footer_state = [
	{
		name: '首页',
		id: 1
	},
	{
		name: '用户列表',
		id: 2
	},
	{
		name: '个人中心',
		id: 3
	}
]
export const footer_list_reduce = function (state = footer_state, action) {
	switch (action.type) {
		case FOOTER_LIST:
			return action.data
		default:
			return state
	}
}