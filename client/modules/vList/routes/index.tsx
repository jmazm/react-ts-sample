import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import HOME from '../pages';
import ListV2 from '../pages/v2';
import ListV3 from '../pages/v3';
import ListV4 from '../pages/v4';
import ListV5 from '../pages/v5';

export default class RouteMap extends Component {
	componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('componentDidCatch', error, errorInfo)
	}
	
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path="/list/v1" component={HOME} />
					<Route path="/list/v2" component={ListV2} />
					<Route path="/list/v3" component={ListV3} />
					<Route path="/list/v4" component={ListV4} />
					<Route path="/list/v5" component={ListV5} />
				</Switch>
			</HashRouter>
		);
	}
}
