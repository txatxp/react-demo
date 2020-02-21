import { ajax } from './index'
export const getUser = async function (params) {
	return await ajax.get('users/52Lau/following', (params ? {...params} : {}), {})
}