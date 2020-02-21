import {
	USER_LIST
} from '../const/user'
import {
	getUser
} from '../../http/user'
export const user_list_action = function (params) {
	return async function (dispatch) {
		let res = await getUser()
		dispatch({
			type: USER_LIST,
			data: res.status == 200 ? res.data : []
		})
		return (res.status == 200 ? res.data : [])
	}
}