import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import { user_list_reduce } from './reducer/user-list'
import { footer_list_reduce } from './reducer/footer-list'
import { person_info_reduce } from './reducer/person-info'
const reducers = combineReducers({
	user_list_reduce: user_list_reduce,
	footer_list_reduce: footer_list_reduce,
	person_info_reduce: person_info_reduce
})
export const createAppStore = function () {
	let store = createStore(
			reducers,
			compose(applyMiddleware(thunk))
		)
	return store
}