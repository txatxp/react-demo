import {
	FOOTER_LIST
} from '../const/user'
export const footer_list_action = function (params) {
	return function (dispatch) {
		dispatch({
			type: FOOTER_LIST,
			data: params?params:null
		})
	}
}