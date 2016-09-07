import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './src/App'
import HomePage from './src/pages/HomePage'

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={HomePage}/>
	</Route>
)

export default routes
