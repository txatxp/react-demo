import {
	PERSON_INFO,
	ADD_PERSON_INFO,
	DEL_PERSON_INFO
} from '../const/person'
// 获取人
export const get_person_info = function (params) {
	return function (dispatch) {
		dispatch({
			type: PERSON_INFO,
			data: params?params:null
		})
	}
}
// 添加人
export const add_person_info = function (params) {
	return function (dispatch) {
		dispatch({
			type: ADD_PERSON_INFO,
			data: params?params:null
		})
	}
}
// 删除人
export const del_person_info = function (params) {
	return function (dispatch) {
		dispatch({
			type: DEL_PERSON_INFO,
			data: params?params:null
		})
	}
}
