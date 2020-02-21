import {
	USER_LIST
} from '../const/user'
export const user_list_reduce = function (state = [], action) {
	switch (action.type) {
		case USER_LIST:
			return action.data
		default:
			return state
	}
}