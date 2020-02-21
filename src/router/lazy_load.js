import React from 'react'
import Loadable from 'react-loadable'
const loadingComponent = function () {
	return <div>loading...</div>
}
export default (component) => {
	return Loadable({
		loader: component,
		loading: loadingComponent
	})
}