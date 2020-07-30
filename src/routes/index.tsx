import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Capsule from '../pages/Capsule';
import routeMap from './routeMap';
import HOME from '../pages/Home';

export default class RouteMap extends Component {
    private getRoute = () => {
        const basic = '/demo/';
        return routeMap.map((route, index) => {
            return <Route key={index} path={ `${basic}${route.name}` } component={route.component}/>;
        });
    }

    render () {
       return (
        <HashRouter>
            <Switch>
                <Route path="/" exact={true} component={HOME}/>
                <Route path="/capsule" exact={true} component={Capsule} />
                {/* {
                    this.getRoute()
                } */}
            </Switch>
        </HashRouter>
       );
    }
}