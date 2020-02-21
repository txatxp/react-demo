import React from 'react'
import {Route} from 'react-router-dom'
export default function RouteWithSubRoutes (route) {
	let {path, routes, exact} = route
	return (
	    <Route
	      path={path}
	      exact={exact}
	      render={props => (
	        <route.component {...props} routes={routes} />
	      )}
	    />
	);
}