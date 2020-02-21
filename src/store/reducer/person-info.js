import {
	PERSON_INFO,
	ADD_PERSON_INFO,
	DEL_PERSON_INFO
} from '../const/person'
export const person_info_reduce = function (state = {}, action) {
	let person_data = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : []
	switch (action.type) {
		// 获取人信息
		case PERSON_INFO:
			console.log(person_data, '___person_data')
			let filterData = person_data.filter((item, index) => {
				return item.id == action.data.id
			})
			return (filterData.length > 0 ? filterData[0] : null)
			break
		// 添加人
		case ADD_PERSON_INFO:
			person_data.push(action.data)
			localStorage.setItem('person', JSON.stringify(person_data))
			return null
		// 删除人
		case DEL_PERSON_INFO:
			let index = 0
			index = person_data.findIndex((item, index) => {
				return item.id == action.data.id
			})
			person_data.splice(index, 1)
			localStorage.setItem('person', JSON.stringify(person_data))
			return null
		default:
			return null
			break
	}
}